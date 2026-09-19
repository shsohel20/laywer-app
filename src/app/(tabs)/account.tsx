// Account. Same structure for both roles, different content — a client manages
// requests and preferences, a lawyer manages a practice.

import { router, type Href } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { PlanCard } from "@/components/law/PlanUsage";
import { RoleSelector } from "@/components/law/RoleSelector";
import { VerificationBanner } from "@/components/law/VerificationBanner";
import {
  Avatar,
  Button,
  GroupedList,
  Icon,
  IconButton,
  InkPanel,
  Rule,
  Screen,
  ScreenHeader,
  ScreenScroll,
  SettingsRow,
} from "@/components/ui";
import {
  CLIENT_SETTINGS,
  CURRENT_USER,
  LAWYER_SETTINGS,
  ME_AS_LAWYER,
  VERIFY_ICONS,
  VERIFY_LABELS,
} from "@/data";
import { useSaved, useSession, useSubscription, useVerification } from "@/state/app-state";
import { colors, layout, radius, spacing, type } from "@/theme";
import type { Role } from "@/types";

interface Tile {
  value: string;
  label: string;
  href: Href;
  emphasised: boolean;
}

export default function AccountScreen() {
  const { role, setRole, signOut } = useSession();
  const { savedLawyerIds } = useSaved();
  const { plan } = useSubscription();
  const { status: verifyStatus } = useVerification();
  const isLawyer = role === "lawyer";

  // The badge follows the identity check, not the role — both sides are
  // verified, and neither wears the badge until the check has cleared.
  const badge = {
    label: VERIFY_LABELS[verifyStatus].toUpperCase(),
    icon: VERIFY_ICONS[verifyStatus],
    /** Yellow is reserved for cleared; anything short of it reads softer. */
    tinted: verifyStatus !== "verified",
  };

  const identity = isLawyer
    ? {
        name: ME_AS_LAWYER.name,
        email: ME_AS_LAWYER.email,
        photo: ME_AS_LAWYER.photo,
        editLabel: "Edit public profile",
        editHref: "/law/profile" as Href,
        gearHref: "/law/availability" as Href,
      }
    : {
        name: CURRENT_USER.name,
        email: CURRENT_USER.email,
        photo: CURRENT_USER.photo,
        editLabel: "Edit profile",
        editHref: "/edit-profile" as Href,
        gearHref: "/notification-settings" as Href,
      };

  const tiles: Tile[] = isLawyer
    ? [
        { value: "3", label: "New requests", href: "/inbox", emphasised: true },
        { value: "11", label: "Active matters", href: "/messages", emphasised: false },
        { value: "$4.3k", label: "Ready to pay out", href: "/law/earnings", emphasised: false },
      ]
    : [
        { value: "3", label: "Open matters", href: "/requests", emphasised: false },
        { value: "6", label: "Unread replies", href: "/messages", emphasised: true },
        {
          value: String(savedLawyerIds.length),
          label: "Saved lawyers",
          href: "/saved",
          emphasised: false,
        },
      ];

  const groups = isLawyer ? LAWYER_SETTINGS : CLIENT_SETTINGS;

  return (
    <Screen>
      <ScreenScroll>
        <ScreenHeader
          title="Account"
          trailing={
            <IconButton
              icon="gear"
              label="Settings"
              onPress={() => router.push(identity.gearHref)}
            />
          }
        />

        <View style={styles.gutter}>
          <InkPanel style={styles.hero}>
            <View style={styles.heroRow}>
              <Avatar source={identity.photo} size={62} cornerRadius={17} />
              <View style={styles.heroBody}>
                <View style={styles.nameRow}>
                  <Text style={styles.heroName}>{identity.name}</Text>
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: badge.tinted ? colors.tint : colors.yellow },
                    ]}
                  >
                    <Icon name={badge.icon} size={10} color={colors.ink} strokeWidth={3} />
                    <Text style={styles.badgeLabel}>{badge.label}</Text>
                  </View>
                </View>
                <Text style={styles.heroEmail} numberOfLines={1}>
                  {identity.email}
                </Text>
              </View>
            </View>
            <Button
              label={identity.editLabel}
              icon="edit"
              iconColor={colors.yellow}
              variant="onDark"
              size="sm"
              onPress={() => router.push(identity.editHref)}
              style={styles.heroButton}
            />
          </InkPanel>
        </View>

        <View style={styles.gutter}>
          <VerificationBanner style={styles.verifySlot} />
        </View>

        <View style={[styles.gutter, styles.tiles]}>
          {tiles.map((tile) => (
            <Pressable
              key={tile.label}
              onPress={() => router.push(tile.href)}
              accessibilityRole="button"
              accessibilityLabel={`${tile.value} ${tile.label}`}
              style={({ pressed }) => [
                styles.tile,
                tile.emphasised && styles.tileEmphasised,
                pressed && styles.tilePressed,
              ]}
            >
              <Text style={styles.tileValue}>{tile.value}</Text>
              <Text
                style={[styles.tileLabel, tile.emphasised && { color: colors.amber }]}
              >
                {tile.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Above the settings groups: changing or cancelling a plan should not
            be four sections down inside "Money". */}
        {isLawyer ? (
          <View style={[styles.gutter, styles.planSlot]}>
            <PlanCard />
          </View>
        ) : null}

        {groups.map((group) => (
          <View key={group.title} style={[styles.gutter, styles.group]}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <GroupedList>
              {group.rows.map((row, index) => (
                <View key={row.id}>
                  <SettingsRow
                    icon={row.icon}
                    label={row.label}
                    hint={row.hint}
                    // The subscription and verification rows report live state
                    // rather than a value baked into the settings data.
                    value={
                      row.id === "subscription"
                        ? plan.name
                        : row.id === "verification"
                          ? VERIFY_LABELS[verifyStatus]
                          : row.value
                    }
                    onPress={row.href ? () => router.push(row.href as Href) : undefined}
                  />
                  {index < group.rows.length - 1 ? <Rule /> : null}
                </View>
              ))}
            </GroupedList>
          </View>
        ))}

        <View style={[styles.gutter, styles.group]}>
          <RoleSwitcher role={role} onPick={setRole} />
          <Button
            label="Log out"
            variant="outline"
            onPress={() => {
              signOut();
              router.replace("/login");
            }}
            style={styles.logout}
          />
          <Text style={styles.version}>Lawey v2.4.1 · Listings are not legal advice.</Text>
        </View>
      </ScreenScroll>
    </Screen>
  );
}

/**
 * Both sides of the marketplace ship in one binary, so this demo control swaps
 * the whole experience without a second login.
 */
function RoleSwitcher({ role, onPick }: { role: Role; onPick: (role: Role) => void }) {
  return (
    <View style={styles.switcher}>
      <View style={styles.switcherHead}>
        <View style={styles.demoTag}>
          <Text style={styles.demoLabel}>DEMO</Text>
        </View>
        <Text style={styles.switcherTitle}>View the app as</Text>
      </View>
      <RoleSelector
        variant="demo"
        value={role}
        onChange={(next) => {
          onPick(next);
          router.replace(next === "lawyer" ? "/practice" : "/");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gutter: {
    paddingHorizontal: layout.gutter,
  },
  hero: {
    gap: spacing.lg,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg - 2,
  },
  heroBody: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    flexWrap: "wrap",
  },
  heroName: {
    ...type.h3,
    fontSize: 19,
    color: colors.white,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    minHeight: 22,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
  },
  badgeLabel: {
    ...type.pill,
    fontSize: 10,
  },
  heroEmail: {
    ...type.caption,
    fontSize: 13,
    color: colors.onDarkMuted,
    marginTop: spacing.xxs,
  },
  heroButton: {
    minHeight: 46,
    borderRadius: radius.sm,
  },
  verifySlot: {
    marginTop: spacing.lg - 2,
  },
  tiles: {
    flexDirection: "row",
    gap: 9,
    paddingTop: spacing.lg - 2,
  },
  tile: {
    flex: 1,
    gap: 3,
    paddingVertical: spacing.lg - 2,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.md,
    backgroundColor: colors.white,
  },
  tileEmphasised: {
    borderColor: colors.ink,
    backgroundColor: colors.tint,
  },
  tilePressed: {
    borderColor: colors.ink,
  },
  tileValue: {
    ...type.stat,
  },
  tileLabel: {
    ...type.micro,
    fontSize: 11.5,
    lineHeight: 15,
  },
  planSlot: {
    paddingTop: spacing.lg,
  },
  group: {
    paddingTop: spacing.xxl,
  },
  groupTitle: {
    ...type.sectionLabel,
    marginBottom: spacing.md - 1,
  },
  logout: {
    marginTop: spacing.md,
  },
  version: {
    ...type.caption,
    textAlign: "center",
    lineHeight: 18,
    marginTop: spacing.lg - 2,
  },
  switcher: {
    gap: 11,
    padding: 15,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  switcherHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  demoTag: {
    minHeight: 20,
    justifyContent: "center",
    paddingHorizontal: 7,
    borderRadius: spacing.sm + 2,
    backgroundColor: colors.ink,
  },
  demoLabel: {
    ...type.pill,
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.yellow,
  },
  switcherTitle: {
    ...type.bodySemi,
    fontSize: 13,
  },
});
