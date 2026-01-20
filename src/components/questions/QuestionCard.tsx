'use client';

import type { Question } from '@/components/questions/types';

interface QuestionCardProps {
  question: Question;
  onReplyClick: (questionId: string) => void;
  isExpanded: boolean;
}

export default function QuestionCard({ question, onReplyClick, isExpanded }: QuestionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
          {question.user_name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white">{question.user_name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(question.created_at)}</p>
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {question.question_text}
      </p>
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => onReplyClick(question.id)}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{isExpanded ? 'Hide' : 'Reply'} {question.reply_count ? `(${question.reply_count})` : ''}</span>
        </button>
      </div>
    </div>
  );
}
