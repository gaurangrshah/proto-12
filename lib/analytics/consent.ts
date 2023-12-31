import { APP_CONSENT, isClient, isDev, isProd } from '@/utils';
import googleTagManager from '@analytics/google-tag-manager';
import Analytics, { type AnalyticsInstance } from 'analytics';
import doNotTrack from 'analytics-plugin-do-not-track';

import { loggerPlugin } from './logger';

// @link: https://getanalytics.io/plugins/do-not-track/

// @TODO: Impelment tab events @SEE: https://getanalytics.io/plugins/tab-events/

export function getConsent(): boolean {
  if (!isClient) return false;
  // @TTODO: extract key name to const and use in other places
  const consent = localStorage.getItem(APP_CONSENT);
  if (consent !== null) return JSON.parse(consent);
  localStorage.setItem(APP_CONSENT, 'false');
  return false;
}

const analyze = !isDev && getConsent();
export const analytics = Analytics({
  app: 'swatchr',
  debug: isDev,
  plugins: [
    analyze
      ? googleTagManager({
          containerId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MGR_CONTAINER_ID,
          // @TODO: add tracking ID
        })
      : doNotTrack(),
    loggerPlugin({ enabled: !isProd }),
  ],
});

export type WindowWithAnalytics = Window &
  typeof globalThis & { Analytics: AnalyticsInstance };
if (isClient) {
  (window as WindowWithAnalytics).Analytics = analytics;
}

/**
 * @NOTE: FIREFOX BROWSER
 * Firefox blocks cookies from third-party trackers by default.
 * @SEE: https://developer.mozilla.org/en-US/docs/Web/Privacy/Storage_access_policy/Errors/CookieBlockedTracker
 *
 */
