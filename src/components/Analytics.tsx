"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CONSENT_KEY = "analytics-consent";

function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(CONSENT_KEY) === "granted";
}

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    setHasConsent(hasAnalyticsConsent());

    const handleConsentChanged = () => {
      setHasConsent(hasAnalyticsConsent());
    };

    window.addEventListener("analytics-consent-changed", handleConsentChanged);
    return () => {
      window.removeEventListener("analytics-consent-changed", handleConsentChanged);
    };
  }, []);

  useEffect(() => {
    if (!hasConsent || !GA_MEASUREMENT_ID) return;
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [hasConsent, pathname, searchParams]);

  if (!GA_MEASUREMENT_ID || !hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname
          });
        `}
      </Script>
    </>
  );
}


