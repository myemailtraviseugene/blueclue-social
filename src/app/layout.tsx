import { type Metadata } from 'next';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import './globals.css';
import RetroSidebar from "./RetroSidebar";

export const metadata: Metadata = {
  title: 'BlueClue Social',
  description: 'Connect with friends and share your moments',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#EDEFF4] min-h-screen">
          <SignedIn>
            <header className="bg-white border-b sticky top-0 z-50">
              <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                  {/* Logo and primary navigation */}
                  <div className="flex items-center gap-8">
                    <Link href="/" className="text-2xl font-bold text-[#3B5998]">
                      BlueClue
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                      <Link href="/feed" className="text-gray-600 hover:text-[#3B5998]">
                        Feed
                      </Link>
                      <Link href="/directory" className="text-gray-600 hover:text-[#3B5998]">
                        Directory
                      </Link>
                      <Link href="/messages" className="text-gray-600 hover:text-[#3B5998]">
                        Messages
                      </Link>
                    </nav>
                  </div>

                  {/* User menu */}
                  <div className="flex items-center gap-4">
                    <Link href="/profile" className="text-gray-600 hover:text-[#3B5998]">
                      Profile
                    </Link>
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8"
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </header>
          </SignedIn>

          <main className="flex min-h-screen">
            <RetroSidebar />
            <div className="flex-1">
              {children}
            </div>
          </main>

        </body>
      </html>
    </ClerkProvider>
  );
}
