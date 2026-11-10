import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 bg-[#131f24]">
      <div className="w-full px-6 sm:px-8 h-[72px] flex items-center justify-start">
        {/* Logo and App Name flushed left */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#ffc800] flex items-center justify-center text-[#131f24] shadow-md border-b-4 border-[#cc9f00]">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5v14M7 8v8M2 11v2M22 11v2" />
            </svg>
          </div>
          <span className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">
            Pronounce<span className="text-[#ffc800]">AI</span>
          </span>
        </div>
      </div>
    </header>
  );
};
