import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-neutral-200/90 shadow-2xs">
      <div className="w-full px-6 sm:px-8 h-[72px] flex items-center justify-start">
        {/* Only Logo and App Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5v14M7 8v8M2 11v2M22 11v2" />
            </svg>
          </div>
          <span className="font-bold text-lg sm:text-xl text-neutral-900 tracking-tight">
            Pronounce<span className="text-indigo-600">AI</span>
          </span>
        </div>
      </div>
    </header>
  );
};
