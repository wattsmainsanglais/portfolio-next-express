import '../[locale]/globals.css';

export default function FacturesLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className="bg-background text-white antialiased">{children}</body>
    </html>
  );
}
