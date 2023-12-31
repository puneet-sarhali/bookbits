import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import localFont from "next/font/local";
import Newsletter from "@/components/newsletter";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const cabinet = localFont({
  src: "../public/CabinetGrotesk-Variable.ttf",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bookbit: Curated short reads for busy people",
  description:
    "Standalone chapters and essays from non-fiction, perfect for curious minds who love to learn without the commitment of a full book.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-3xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between px-6">
                <nav className="mr-auto text-sm font-medium space-x-6">
                  <Link href="/">Bookbit</Link>
                </nav>
                <ModeToggle />
              </div>
            </header>
            <main>{children}</main>
          </div>
          <section className="max-w-3xl mx-auto">
            <Newsletter />
          </section>
          <footer>
            <div className="max-w-3xl mx-auto py-10 px-8 dark:text-neutral-400 text-neutral-600">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium space-x-6">
                  <Link href="/">Bookbit</Link>
                </div>
                <div className="text-sm font-medium space-x-6">
                  <p>© 2023</p>
                </div>
              </div>
            </div>
          </footer>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-S2SV8LYSHJ" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-S2SV8LYSHJ');
        `}
      </Script>
    </html>
  );
}
