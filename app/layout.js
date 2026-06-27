import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Solana Tools",
  description: "Solana token platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        <Sidebar />
        <main className="ml-[260px] min-h-screen bg-gray-950">
          {children}
        </main>
      </body>
    </html>
  );
}