import { partialMaskEmail } from '@/utils';

import { EmailWrapper } from './email-wrapper';

export function feedbackEmail({
  subject,
  email,
}: {
  subject: string;
  email: string;
}) {
  return (
    <EmailWrapper subject={subject}>
      <div className="rounded-4 border bg-black p-4">
        <h1 className="mb-4 text-xl">
          Hey!👋 Thanks for providing your feedback
        </h1>
        <p className="mb-4">
          {/* eslint-disable-next-line react/no-unescaped-entities  */}
          We'll keep you updated on this issue. You'll receive updates at{' '}
          {partialMaskEmail(email)}
        </p>
      </div>
    </EmailWrapper>
  );
}

export function adminFeedbackEmail({
  subject,
  email,
}: {
  subject: string;
  email?: string;
}) {
  return (
    <EmailWrapper subject={subject}>
      <div className="rounded-4 border bg-black p-4">
        <h1 className="mb-4 text-xl">New Feedback Submitted</h1>
        {/* partialMaskEmail(email) */}
        {email ? <p className="mb-4">from: {email}</p> : null}
        {subject}
      </div>
    </EmailWrapper>
  );
}
