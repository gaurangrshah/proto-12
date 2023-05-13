import { useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { APP_CONSENT, isBrowser } from '@/utils';
import { analytics, getConsent } from 'lib/analytics';

import { CookieIcon } from '@/components/icons';

interface BannerProps {
  children: ReactNode;
  btnLabel: string;
  consent: boolean;
  handleConsent: () => void;
}

export const Banner: FC<BannerProps> = ({
  children,
  btnLabel,
  consent,
  handleConsent,
}) => {
  const [hide, setHide] = useState<boolean>(consent);

  useEffect(() => {
    if (isBrowser && !consent) document.body.style.overflow = 'hidden';
    () => {
      if (isBrowser) document.body.style.overflow = 'visible';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
  }, [hide, consent]);

  return !hide ? (
    <>
      <div className="absolute inset-0 z-[1] overflow-hidden bg-black/50 dark:bg-white/50" />
      <div className="alert absolute bottom-6 z-[2] w-9/12 shadow-lg">
        <div className="flex h-full w-full flex-col items-center justify-between space-y-3 md:flex-row md:space-x-2">
          <div className="h-12 w-12">
            <CookieIcon />
          </div>
          <div className="flex flex-col items-start space-x-4 md:flex-row md:items-center">
            <div className="p-4 sm:p-0">{children}</div>
          </div>
          <div className="flex flex-col items-center gap-y-2 space-y-2">
            <button
              aria-label="accept-button"
              className="btn-outline btn-sm btn w-36"
              onClick={handleConsent}
            >
              {btnLabel}
            </button>
            <button
              aria-label="accept-button"
              className="btn-ghost btn-sm btn text-neutral-focus w-36"
              onClick={() => {
                setHide(!hide);
              }}
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export function Consent() {
  'use client';
  const [consent, setConsent] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const localConsent = getConsent();
    if (localConsent) document.body.style.overflow = 'visible';
    setConsent(localConsent);
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!consent) return;
    localStorage.setItem(APP_CONSENT, 'true');
  }, [consent]);

  const handleConsent = () => {
    if (isBrowser) document.body.style.overflow = 'visible';
    setConsent(true);
    analytics.track(APP_CONSENT, {
      category: 'consent-approval',
      label: 'consent',
      value: 1,
    });
  };

  return mounted && !consent ? (
    <Banner
      btnLabel="I Understand"
      handleConsent={handleConsent}
      consent={consent}
    >
      <p className="text-sm font-medium leading-3 md:text-base">
        We use cookies to personalize content and provide you with a better
        browsing experience.
      </p>
      <p className="font-italic mt-1 text-xs leading-3 text-gray-500">
        For more info visit our{' '}
        <Link className="text-xs underline" href="/policies/privacy">
          Privacy Policy
        </Link>
        . and{' '}
        <Link className="text-xs underline" href="/policies/terms">
          Terms and Condition
        </Link>
        .
      </p>
    </Banner>
  ) : null;
}
