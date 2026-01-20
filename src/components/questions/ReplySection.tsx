'use client';

import { useState } from 'react';
import type { Reply } from '@/components/questions/types';

interface ReplySectionProps {
  questionId: string;
  replies: Reply[];
  onSubmitReply: (questionId: string, userName: string, replyText: string) => void;
}

export default function ReplySection({ questionId, replies, onSubmitReply }: ReplySectionProps) {
  const [userName, setUserName] = useState('');
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && replyText.trim()) {
      onSubmitReply(questionId, userName, replyText);
      setUserName('');
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
      {/* Existing Replies */}
      {replies.length > 0 && (
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Replies ({replies.length})
          </h4>
          {replies.map((reply) => (
            <div key={reply.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                  {reply.user_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-gray-900 dark:text-white text-sm">{reply.user_name}</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(reply.created_at)}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 ml-11">{reply.reply_text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reply Form */}
      {!showReplyForm ? (
        <button
          onClick={() => setShowReplyForm(true)}
          className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add your reply
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            required
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => {
                setShowReplyForm(false);
                setUserName('');
                setReplyText('');
              }}
              className="px-4 py-1.5 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-sm bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              Post Reply
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
