import "./globals.css";
import Sidebar from "./components/Sidebar";
import SolanaWalletProvider from "./components/WalletProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#080b16] text-white">
        <SolanaWalletProvider>
          <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 ml-64 overflow-x-hidden">
  {children}
</main>
          </div>
        </SolanaWalletProvider>
      </body>
    </html>
  );
}