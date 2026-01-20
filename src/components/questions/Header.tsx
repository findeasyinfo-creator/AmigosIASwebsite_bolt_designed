'use client';

interface HeaderProps {
  onPostQuestion: () => void;
}

export default function Header({ onPostQuestion }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Community Forum</h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1">
          Ask questions, share knowledge, and help fellow UPSC aspirants
        </p>
      </div>
      <button
        onClick={onPostQuestion}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 md:px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="hidden sm:inline">Post Question</span>
        <span className="sm:hidden">Post</span>
      </button>
    </div>
  );
}
