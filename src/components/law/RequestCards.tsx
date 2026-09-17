// Request cards, one per side of the marketplace.
//
// The client's card is a status line with a single action. The lawyer's carries
// the whole brief plus the accept / ask / decline decision, because that is the
// screen where the decision is actually made.

import { StyleSheet, Text, View } from "react-native";

import { Avatar, Button, Card, Icon, Pill, type PillTone } from "@/components/ui";
import { colors, radius, spacing, type } from "@/theme";
import type { ClientRequest, InboxRequest, InboxStatus, RequestStatus } from "@/types";

const CLIENT_TONES: Record<RequestStatus, PillTone> = {
  accepted: "strong",
  pending: "soft",
  declined: "muted",
};

export interface ClientRequestCardProps {
  request: ClientRequest;
  onAction: () => void;
}

export function ClientRequestCard({ request, onAction }: ClientRequestCardProps) {
  const cta =
    request.status === "accepted"
      ? "Open chat"
      : request.status === "pending"
        ? "Withdraw"
        : "Find another";

  return (
    <Card style={styles.clientCard}>
      <View style={styles.head}>
        <Avatar source={request.photo} size={46} cornerRadius={13} />
        <View style={styles.identity}>
          <Text style={styles.name}>{request.name}</Text>
          <Text style={styles.matter}>{request.matter}</Text>
        </View>
        <Pill label={request.status.toUpperCase()} tone={CLIENT_TONES[request.status]} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerNote}>{request.date}</Text>
        <Button label={cta} onPress={onAction} variant="outline" size="sm" block={false} style={styles.smallAction} />
      </View>
    </Card>
  );
}

const INBOX_TONES: Record<InboxStatus, PillTone> = {
  new: "strong",
  accepted: "soft",
  declined: "muted",
};

export interface InboxCardProps {
  request: InboxRequest;
  status: InboxStatus;
  /** False once a capped plan's monthly allowance is spent. */
  canAccept?: boolean;
  onAccept: () => void;
  /** Where the accept button leads instead, when the allowance is spent. */
  onUpgrade?: () => void;
  onAsk: () => void;
  onDecline: () => void;
  onReconsider: () => void;
  onOpenThread: () => void;
}

export function InboxCard({
  request,
  status,
  canAccept = true,
  onAccept,
  onUpgrade,
  onAsk,
  onDecline,
  onReconsider,
  onOpenThread,
}: InboxCardProps) {
  const isNew = status === "new";

  return (
    <Card emphasised={isNew} style={styles.inboxCard}>
      <View style={styles.head}>
        <Avatar source={request.photo} size={48} cornerRadius={13} />
        <View style={styles.identity}>
          <Text style={styles.name}>{request.name}</Text>
          <Text style={styles.meta}>{request.meta}</Text>
        </View>
        <Pill label={status.toUpperCase()} tone={INBOX_TONES[status]} />
      </View>

      <View style={styles.brief}>
        <Text style={styles.briefArea}>{request.area.toUpperCase()}</Text>
        <Text style={styles.briefText}>{request.summary}</Text>
      </View>

      <View style={styles.facts}>
        <Fact icon="clock" label={request.urgency} />
        <Fact icon="send" label={request.location} />
        {request.docs ? <Fact icon="doc" label={request.docs} /> : null}
      </View>

      {isNew ? (
        <View style={styles.decision}>
          {/* When the allowance is spent the button stays live and leads to the
              plan screen — a dead control would just look broken. */}
          <Button
            label={canAccept ? "Accept and open thread" : "Upgrade to accept"}
            onPress={canAccept ? onAccept : onUpgrade}
            size="md"
            accessibilityHint={
              canAccept ? undefined : "Your plan's monthly request allowance is spent"
            }
          />
          <View style={styles.decisionPair}>
            <Button label="Ask a question" onPress={onAsk} variant="outline" size="sm" style={styles.half} />
            <Button label="Decline" onPress={onDecline} variant="quiet" size="sm" style={styles.half} />
          </View>
        </View>
      ) : (
        <View style={[styles.footer, styles.settledFooter]}>
          <Text style={styles.footerNote}>
            {status === "accepted"
              ? "Thread open with this client"
              : "Client was released to search again"}
          </Text>
          <Button
            label={status === "accepted" ? "Open thread" : "Reconsider"}
            onPress={status === "accepted" ? onOpenThread : onReconsider}
            variant="outline"
            size="sm"
            block={false}
            style={styles.smallAction}
          />
        </View>
      )}
    </Card>
  );
}

function Fact({ icon, label }: { icon: "clock" | "send" | "doc"; label: string }) {
  return (
    <View style={styles.fact}>
      <Icon name={icon} size={14} color={colors.textMuted} />
      <Text style={styles.factLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  clientCard: {
    gap: spacing.md,
    padding: 15,
  },
  inboxCard: {
    gap: spacing.md + 1,
    padding: 15,
  },
  head: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  identity: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    ...type.bodySemi,
    fontSize: 15.5,
    letterSpacing: -0.16,
  },
  matter: {
    ...type.caption,
    fontSize: 13,
    marginTop: 3,
  },
  meta: {
    ...type.caption,
    fontSize: 12.5,
    marginTop: 3,
  },
  brief: {
    gap: spacing.xs + 1,
    paddingVertical: spacing.md,
    paddingHorizontal: 13,
    borderRadius: 13,
    backgroundColor: colors.surface,
  },
  briefArea: {
    ...type.pill,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 11.5,
    letterSpacing: 0.46,
    color: colors.textMuted,
  },
  briefText: {
    ...type.lede,
    color: colors.textStrong,
    lineHeight: 21,
  },
  facts: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.lg - 2,
  },
  fact: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  factLabel: {
    ...type.caption,
    fontSize: 12.5,
  },
  decision: {
    gap: 9,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.cream,
  },
  decisionPair: {
    flexDirection: "row",
    gap: 9,
  },
  half: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm + 2,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },
  settledFooter: {
    borderTopColor: colors.cream,
  },
  footerNote: {
    ...type.caption,
    flex: 1,
    fontSize: 12.5,
  },
  smallAction: {
    minHeight: 40,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg - 2,
  },
});
