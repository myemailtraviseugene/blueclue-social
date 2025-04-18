import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Hero section */}
      <div className="flex-1 bg-[#3B5998] p-8 flex flex-col justify-center items-center text-white">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to BlueClue Social</h1>
          <p className="text-xl mb-8">Connect with friends and share your moments in a familiar, comfortable space.</p>
          <div className="flex flex-col items-center mt-8">
            <Image
              src="/The God Father of Social.webp"
              alt="The God Father of Social"
              width={220}
              height={220}
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />
            <p className="mt-4 text-lg font-semibold text-white drop-shadow text-center">The God Father of Social</p>
          </div>
        </div>
      </div>

      {/* Right side - Auth section */}
      <div className="flex-1 p-8 flex flex-col justify-center items-center bg-[#EDEFF4]">
        <div className="w-full max-w-md space-y-6">
          <SignedOut>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-[#3B5998] mb-6 text-center">Get Started</h2>
              <div className="space-y-4">
                <SignInButton mode="modal">
                  <button className="w-full bg-[#3B5998] text-white px-6 py-3 rounded-md hover:bg-[#365899] transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full border-2 border-[#3B5998] text-[#3B5998] px-6 py-3 rounded-md hover:bg-gray-50 transition-colors">
                    Create New Account
                  </button>
                </SignUpButton>
              </div>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <p className="mb-6 text-gray-600">BlueClue Social 2015 &copy;</p>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
