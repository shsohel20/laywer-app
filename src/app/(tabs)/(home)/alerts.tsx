// Notifications. Pushed from the home bell, so the tab bar stays visible.

import { AlertRow } from "@/components/law/AlertRow";
import { BackHeader, EmptyState, Screen, ScreenScroll } from "@/components/ui";
import { CLIENT_ALERTS, LAWYER_ALERTS } from "@/data";
import { useSession } from "@/state/app-state";

export default function AlertsScreen() {
  const { role } = useSession();
  const alerts = role === "lawyer" ? LAWYER_ALERTS : CLIENT_ALERTS;

  return (
    <Screen>
      <BackHeader title="Notifications" />
      <ScreenScroll>
        {alerts.length > 0 ? (
          alerts.map((alert) => <AlertRow key={alert.id} alert={alert} />)
        ) : (
          <EmptyState icon="bell" message="Nothing new. We will tell you when something moves." />
        )}
      </ScreenScroll>
    </Screen>
  );
}
