export interface Question {
  id: string;
  user_name: string;
  question_text: string;
  created_at: string;
  reply_count?: number;
}

export interface Reply {
  id: string;
  question_id: string;
  user_name: string;
  reply_text: string;
  created_at: string;
}
