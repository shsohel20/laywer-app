// A lawyer's public profile — what a client reads before sending a request.

import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RequestSheet } from "@/components/law/RequestSheet";
import {
  Avatar,
  Button,
  EmptyState,
  GroupedList,
  Icon,
  IconButton,
  Rule,
  Screen,
  ScreenScroll,
  Stars,
} from "@/components/ui";
import { REVIEWS, lawyerById } from "@/data";
import { useSaved } from "@/state/app-state";
import { colors, layout, radius, spacing, type } from "@/theme";

export default function LawyerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [requestOpen, setRequestOpen] = useState(false);
  const { isSaved, toggleSaved } = useSaved();

  const lawyer = lawyerById(id);

  if (!lawyer) {
    return (
      <Screen>
        <EmptyState
          icon="nav-lawyers"
          message="We could not find that lawyer."
          actionLabel="Browse lawyers"
          onActionPress={() => router.navigate("/lawyers")}
        />
      </Screen>
    );
  }

  const saved = isSaved(lawyer.id);

  return (
    <Screen edges={[]}>
      <ScreenScroll contentContainerStyle={styles.scroll}>
        <View>
          <View style={styles.cover} />
          <View style={[styles.coverActions, { paddingTop: insets.top + spacing.md }]}>
            <IconButton
              icon="arrow-left"
              label="Go back"
              variant="glass"
              iconSize={20}
              onPress={() => router.back()}
            />
            <IconButton
              icon="heart"
              label={saved ? "Remove from shortlist" : "Save to shortlist"}
              variant="glass"
              color={colors.yellow}
              fill={saved ? colors.yellow : "none"}
              onPress={() => toggleSaved(lawyer.id)}
            />
          </View>
          <View style={styles.portraitWrap}>
            <Avatar source={lawyer.photo} size={96} cornerRadius={radius.sheet} style={styles.portrait} />
          </View>
        </View>

        <View style={styles.identity}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{lawyer.name}</Text>
            <View style={styles.verified}>
              <Icon name="check" size={12} color={colors.amber} strokeWidth={2.6} />
              <Text style={styles.verifiedLabel}>Verified</Text>
            </View>
          </View>
          <Text style={styles.headline}>
            {lawyer.specialism} · Admitted {lawyer.admitted}
          </Text>
          <View style={styles.ratingRow}>
            <Icon name="star" size={14} color={colors.yellow} />
            <Text style={styles.ratingValue}>{lawyer.rating.toFixed(1)}</Text>
            <Text style={styles.ratingCount}>· {lawyer.reviewCount} client reviews</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <Stat value={lawyer.years} label="Years in practice" />
          <Stat value={lawyer.matters} label="Matters handled" />
          <Stat value={lawyer.replyTime} label="Median reply" emphasised />
        </View>

        <Block title="Practice areas">
          <View style={styles.areas}>
            {lawyer.areas.map((area) => (
              <View key={area} style={styles.area}>
                <Text style={styles.areaLabel}>{area}</Text>
              </View>
            ))}
          </View>
        </Block>

        <Block title="About">
          <Text style={styles.about}>{lawyer.about}</Text>
        </Block>

        <Block title="Credentials">
          <View style={styles.credentials}>
            {[
              { label: "Admitted", value: lawyer.bar },
              { label: "Education", value: lawyer.school },
              { label: "Languages", value: lawyer.languages },
            ].map((item) => (
              <View key={item.label} style={styles.credential}>
                <View style={styles.bullet} />
                <View style={styles.credentialBody}>
                  <Text style={styles.credentialLabel}>{item.label.toUpperCase()}</Text>
                  <Text style={styles.credentialValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </Block>

        <Block title="Fees">
          <View style={styles.fees}>
            <View style={[styles.fee, styles.feeDivider]}>
              <Text style={styles.feeLabel}>First consultation</Text>
              <Text style={styles.feeValue}>{lawyer.fee}</Text>
            </View>
            <View style={styles.fee}>
              <Text style={styles.feeLabel}>Thereafter</Text>
              <Text style={styles.feeValue}>{lawyer.hourly}</Text>
            </View>
          </View>
        </Block>

        <Block title="Client reviews">
          <View style={styles.reviews}>
            {REVIEWS.map((review) => (
              <View key={review.id} style={styles.review}>
                <View style={styles.reviewHead}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewMeta}>
                  <Stars rating={review.rating} />
                  <Text style={styles.reviewMatter}>{review.matter}</Text>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>
        </Block>

        <Block title="Chambers">
          <GroupedList>
            <ContactRow icon="phone" label="Clerk" value="+001-2424-5544" />
            <Rule />
            <ContactRow icon="mail" label="Email" value={lawyer.email} />
            <Rule />
            <ContactRow icon="map-pin" label="Address" value={lawyer.chambers} />
          </GroupedList>
        </Block>
      </ScreenScroll>

      <View style={[styles.actionBar, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
        <Button
          label="Message"
          icon="chat"
          variant="outline"
          onPress={() => router.push(`/chat/${lawyer.id}`)}
          block={false}
          style={styles.messageButton}
        />
        <Button
          label="Request consultation"
          onPress={() => setRequestOpen(true)}
          style={styles.requestButton}
        />
      </View>

      <RequestSheet
        visible={requestOpen}
        onClose={() => setRequestOpen(false)}
        lawyer={lawyer}
        onTrack={() => router.push("/requests")}
      />
    </Screen>
  );
}

function Stat({
  value,
  label,
  emphasised = false,
}: {
  value: string;
  label: string;
  emphasised?: boolean;
}) {
  return (
    <View style={[styles.stat, emphasised && styles.statEmphasised]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={[styles.statLabel, emphasised && { color: colors.amber }]}>{label}</Text>
    </View>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>
      {children}
    </View>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: "phone" | "mail" | "map-pin";
  label: string;
  value: string;
}) {
  return (
    <View style={styles.contact}>
      <Icon name={icon} size={17} color={colors.ink} />
      <View style={styles.contactBody}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    // Clears the pinned action bar.
    paddingBottom: 104,
  },
  cover: {
    width: "100%",
    height: 124,
    backgroundColor: colors.ink,
  },
  coverActions: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg - 2,
  },
  portraitWrap: {
    paddingHorizontal: layout.gutter,
    marginTop: -52,
  },
  portrait: {
    borderWidth: 3,
    borderColor: colors.white,
    borderRadius: radius.sheet + 3,
    overflow: "hidden",
  },
  identity: {
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.lg - 2,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  name: {
    ...type.h1,
    fontSize: 26.7,
    lineHeight: 29,
  },
  verified: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
    minHeight: 26,
    paddingHorizontal: 9,
    borderRadius: radius.full,
    backgroundColor: colors.tint,
  },
  verifiedLabel: {
    ...type.pill,
    fontFamily: type.bodySemi.fontFamily,
    letterSpacing: 0.22,
    color: colors.amber,
  },
  headline: {
    ...type.lede,
    marginTop: 7,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: 9,
  },
  ratingValue: {
    ...type.bodySemi,
    fontSize: 14,
  },
  ratingCount: {
    ...type.caption,
    fontSize: 13,
  },
  stats: {
    flexDirection: "row",
    gap: 9,
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.xl,
  },
  stat: {
    flex: 1,
    gap: 3,
    paddingVertical: spacing.lg - 2,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.md,
  },
  statEmphasised: {
    borderColor: colors.ink,
    backgroundColor: colors.tint,
  },
  statValue: {
    ...type.stat,
  },
  statLabel: {
    ...type.micro,
    fontSize: 11.5,
    lineHeight: 15,
  },
  block: {
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.xxl,
  },
  blockTitle: {
    ...type.sectionLabel,
    marginBottom: 11,
  },
  areas: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  area: {
    minHeight: 32,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  areaLabel: {
    ...type.captionMedium,
    fontSize: 13,
    color: colors.textStrong,
  },
  about: {
    ...type.body,
    fontSize: 15.5,
    lineHeight: 26,
    color: colors.textStrong,
  },
  credentials: {
    gap: 15,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.lg,
  },
  credential: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  bullet: {
    width: 5,
    height: 5,
    marginTop: 7,
    flexShrink: 0,
    borderRadius: radius.full,
    backgroundColor: colors.yellow,
  },
  credentialBody: {
    flex: 1,
    minWidth: 0,
  },
  credentialLabel: {
    ...type.pill,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 11.5,
    letterSpacing: 0.46,
    color: colors.textMuted,
  },
  credentialValue: {
    ...type.body,
    fontSize: 14.5,
    lineHeight: 21,
    marginTop: 3,
  },
  fees: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  fee: {
    flex: 1,
    minWidth: 0,
    gap: 3,
    paddingVertical: 15,
    paddingHorizontal: spacing.lg,
  },
  feeDivider: {
    borderRightWidth: 1,
    borderRightColor: colors.cream,
  },
  feeLabel: {
    ...type.caption,
  },
  feeValue: {
    ...type.bodySemi,
    fontSize: 17,
  },
  reviews: {
    gap: spacing.md,
  },
  review: {
    gap: spacing.sm,
    paddingVertical: 15,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.lg,
  },
  reviewHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm + 2,
  },
  reviewName: {
    ...type.bodySemi,
    fontSize: 14,
  },
  reviewDate: {
    ...type.caption,
  },
  reviewMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  reviewMatter: {
    ...type.caption,
  },
  reviewText: {
    ...type.body,
    fontSize: 14.5,
    lineHeight: 23,
    color: colors.textStrong,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 56,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg - 2,
  },
  contactBody: {
    flex: 1,
    minWidth: 0,
  },
  contactLabel: {
    ...type.caption,
  },
  contactValue: {
    ...type.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
  },
  actionBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: spacing.sm + 2,
    paddingTop: spacing.md,
    paddingHorizontal: layout.gutter,
    borderTopWidth: 1,
    borderTopColor: colors.cream,
    backgroundColor: colors.white,
  },
  messageButton: {
    minHeight: 52,
    paddingHorizontal: 18,
  },
  requestButton: {
    flex: 1,
    minHeight: 52,
  },
});
