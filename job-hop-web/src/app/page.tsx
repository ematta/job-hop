"use client";
import Image from "next/image";

export default function Home() {
  // Placeholder for authentication state
  const isLoggedIn = false; // Change to true to simulate logged-in state

  return (
    <>
      {/* Fixed, always-visible top-right circle button */}
      <a
        href={isLoggedIn ? "/profile" : "/login"}
        className="fixed top-6 right-6 z-50"
        aria-label={isLoggedIn ? "Profile" : "Login"}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <div
          className={`w-10 h-10 max-w-[40px] max-h-[40px] rounded-full flex items-center justify-center shadow-md transition-colors duration-200 ${
            isLoggedIn ? "bg-purple-500" : "bg-gray-300 hover:bg-gray-400"
          }`}
          style={{ minWidth: 32, minHeight: 32 }}
        >
          {/* Placeholder for profile image */}
          {isLoggedIn ? (
            <span className="text-white font-bold text-base">P</span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
              style={{ display: 'block' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
              />
            </svg>
          )}
        </div>
      </a>
      <style jsx global>{`
        @media not all and (min-resolution:.001dpcm) { @supports (-webkit-appearance:none) {
          a[aria-label="Profile"], a[aria-label="Login"] > div {
            width: 36px !important;
            height: 36px !important;
            max-width: 36px !important;
            max-height: 36px !important;
          }
        }}
        @media screen and (-webkit-min-device-pixel-ratio:0) {
          a[aria-label="Profile"], a[aria-label="Login"] > div {
            width: 36px !important;
            height: 36px !important;
            max-width: 36px !important;
            max-height: 36px !important;
          }
        }
      `}</style>
      <main className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-100">Welcome to Job Hop</h2>
          <p className="text-center text-gray-300">Your job search starts here!</p>
          <Image
            src="/job_hop_logo.png"
            alt="Job Hop Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>
      </main>
      <footer className="bg-gray-950 text-gray-300 py-4 text-center border-t border-gray-800">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Job Hop. All rights reserved.
        </p>
        <p className="text-sm">
          <a href="/privacy-policy" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms-of-service" className="text-blue-400 hover:underline">
            Terms of Service
          </a>
        </p>
        <p className="text-sm">
          <a href="/contact" className="text-blue-400 hover:underline">
            Contact Us
          </a>
        </p>
        <p className="text-sm">
          <a href="/about" className="text-blue-400 hover:underline">
            About Us
          </a>
        </p>
        <p className="text-sm">
          <a href="/help" className="text-blue-400 hover:underline">
            Help Center
          </a>
        </p>
        <p className="text-sm">
          <a href="/feedback" className="text-blue-400 hover:underline">
            Feedback
          </a>
        </p>
      </footer>
    </>
  );
}
