import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0B0E14] text-white m-0">
        {children}
      </body>
    </html>
  );
}
