export function EmailWrapper({
  subject,
  children,
}: {
  subject: string;
  children: React.ReactNode;
}) {
  return (
    <html>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <meta charSet="utf-8" />
        <title>{subject || 'Swatchr App'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <main className="border-width-1 rounded-4 border border-red-400 bg-black p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
