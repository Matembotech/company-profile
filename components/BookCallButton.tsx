"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function BookCallButton({ className }: { className?: string }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <button
      data-cal-link="matembo-dev-usjakh/project-discovery-call"
      data-cal-config='{"layout":"month_view"}'
      className={className}
    >
      Book a call
    </button>
  );
}
