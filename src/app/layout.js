import "./globals.css";


export const metadata = {
  title: "Team Text",
  description: "Collab Text as Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.svg" sizes="any" />
      <body  className= "min-h-[100vh]">
       
        {children}</body>
    </html>
  );
}
