import React from 'react';

interface HeaderProps {
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#131f24]">
      <div className="w-full px-6 sm:px-8 h-[72px] flex items-center justify-start">
        {/* Logo and App Name flushed left - Clickable to return to Sentence Options Home */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer group text-left focus:outline-none select-none active:scale-95 transition-transform"
          title="Return to Sentence Options"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#ffc800] group-hover:bg-[#e5b400] flex items-center justify-center text-[#131f24] shadow-md border-b-4 border-[#cc9f00] transition-colors">
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
          <span className="font-extrabold text-xl sm:text-2xl text-white tracking-tight group-hover:text-white/90">
            Pronounce<span className="text-[#ffc800]">AI</span>
          </span>
        </button>
      </div>
    </header>
  );
};
