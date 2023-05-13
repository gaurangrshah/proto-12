import { partialMaskEmail } from '@/utils';

import { EmailWrapper } from './email-wrapper';

export function verificationEmail({
  subject,
  email,
}: {
  subject: string;
  email: string;
}) {
  return (
    <EmailWrapper subject={subject}>
      <div className="border-width-1 rounded-4 border bg-black p-4">
        <h1 className="xl mb-4">Hey!👋 Thanks for joining the Swatchr Beta!</h1>
        <h2 className="lg mb-4">Let&apos;s get you started.</h2>
        <p className="mb-4">
          An account is pending for the following email:{' '}
          {partialMaskEmail(email)}
        </p>
        <h2 className="text-md mb-4">Verify Your Email</h2>
        <p className="mb-4">
          Please click the button below to verify your email address.
        </p>
        <a href="https://swatchr.app" target="_blank" rel="noopener noreferrer">
          Verify Email
        </a>
      </div>
    </EmailWrapper>
  );
}
