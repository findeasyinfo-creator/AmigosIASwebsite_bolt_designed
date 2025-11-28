"use client";

import { useMemo, useState } from "react";

interface Comment {
  id: string;
  author: string;
  text: string;
  created_at: string;
  mentions?: string[];
}

interface Post {
  id: string;
  user: string;
  title: string;
  body: string;
  created_at: string;
  category: string;
  votes: number;
  comments: Comment[];
}

const initialPosts: Post[] = [
  {
    id: "p1",
    user: "Jeanne Dimmick",
    title:
      "Videoask Widget is overlaid with next Videoask Widget – how to dismiss first?",
    body:
      "I added a Videoask widget to the bottom of my page — the little circular one from the corner. Then another on the next page. Now they overlap. How do I dismiss the first?",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    category: "Asked in Share your videask",
    votes: 21,
    comments: [
      { id: "c1", author: "Ankit", text: "Close the first instance via the widget settings.", created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
      { id: "c2", author: "Dr. Anjali", text: "Adjust z-index; ensure only one widget per page.", created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
    ],
  },
  {
    id: "p2",
    user: "Dom Nayek",
    title: "Decimals",
    body:
      "Number input rejects decimals; any way to allow 2 decimal places?",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    category: "Asked in Build your typeform",
    votes: 5,
    comments: [
      { id: "c3", author: "Support", text: "Use currency format instead of number input.", created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
    ],
  },
  {
    id: "p3",
    user: "Mimi38",
    title:
      "How can I refund and cancel a subscription I got just now?",
    body:
      "Signed up by mistake for monthly; my bank balance is low. Can I refund and cancel immediately?",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 9 - 1000 * 60 * 15).toISOString(),
    category: "Asked in Manage your account",
    votes: 2,
    comments: [
      { id: "c4", author: "Admin", text: "Contact billing support immediately for refund assistance.", created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
    ],
  },
  {
    id: "p4",
    user: "CaseyT",
    title: "Pop-up attached to custom button (image)",
    body:
      "Site menu buttons are images. Need to attach a popup form for kids signups. Any examples?",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    category: "Asked in Build your typeform",
    votes: 8,
    comments: [],
  },
  {
    id: "p5",
    user: "Luis",
    title: "Search stage between two different forms using webhooks",
    body: "Looking to chain two forms and pass state via webhook. Best approach?",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    category: "Asked in Typeform developers",
    votes: 5,
    comments: [],
  },
  {
    id: "p6",
    user: "Aisha",
    title: "Best template for faculty feedback?",
    body: "Need a clean template to collect structured feedback from students.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    category: "Asked in Share templates",
    votes: 7,
    comments: [],
  },
  {
    id: "p7",
    user: "Rahul",
    title: "Daily quiz: inflation and GDP",
    body: "Sharing today's quiz questions focusing on inflation trends and GDP components.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    category: "Asked in Current Affairs",
    votes: 3,
    comments: [],
  },
  {
    id: "p8",
    user: "Neha",
    title: "Where to find previous year's papers?",
    body: "Looking for a consolidated list of PYQs for UPSC and State PSCs.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    category: "Asked in Resources",
    votes: 12,
    comments: [],
  },
  {
    id: "p9",
    user: "Vikram",
    title: "Which optional suits humanities background?",
    body: "Confused between Sociology and Anthropology optional. Suggestions?",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    category: "Asked in Courses",
    votes: 1,
    comments: [],
  },
];

const topCreators = [
  { name: "john.desborough", points: 299 },
  { name: "ibrahim masudi", points: 117 },
  { name: "nam.th", points: 96 },
  { name: "Darnell", points: 93 },
  { name: "mathio", points: 88 },
  { name: "christienglsee", points: 60 },
  { name: "okdachsam", points: 51 },
  { name: "sairam natarajan", points: 49 },
  { name: "VTPharaoh", points: 45 },
];

// Helpers
function uniqueCategories(posts: Post[]): string[] {
  const set = new Set<string>();
  posts.forEach((p) => {
    const label = p.category.replace("Asked in ", "");
    set.add(label);
  });
  return Array.from(set).sort();
}

function filterPosts(posts: Post[], mode: "all" | "help" | "category", categoryFilter: string): Post[] {
  if (mode === "help") return posts.filter((p) => p.comments.length === 0);
  if (mode === "category" && categoryFilter !== "All")
    return posts.filter((p) => p.category.replace("Asked in ", "") === categoryFilter);
  return posts;
}

function CategoryMenu({ posts, onSelect, onClear }: { posts: Post[]; onSelect: (c: string) => void; onClear: () => void }) {
  const cats = uniqueCategories(posts);
  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-lg border border-orange-200 bg-white shadow-lg p-2 z-50">
      <button 
        onClick={onClear} 
        className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium"
      >
        All categories
      </button>
      <hr className="my-1 border-gray-200" />
      <div className="max-h-48 overflow-y-auto">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CommunityForum() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("General");
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [filterMode, setFilterMode] = useState<"all" | "help" | "category">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const filteredPosts = useMemo(() => filterPosts(posts, filterMode, categoryFilter), [posts, filterMode, categoryFilter]);
  const canSubmit = useMemo(() => {
    const isValid = title.trim() && body.trim();
    console.log('Form validation:', { 
      name: name.trim() || 'You', 
      title: title.trim(), 
      body: body.trim(), 
      canSubmit: isValid 
    });
    return isValid;
  }, [name, title, body]);

  const timeAgo = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const h = Math.floor(diff / 36e5);
    if (h < 1) return "Just now";
    if (h === 1) return "1h ago";
    if (h < 24) return `${h}h ago`;
    const days = Math.floor(h / 24);
    return days === 1 ? "1d ago" : `${days}d ago`;
  };

  const createPost = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', { name: name.trim() || 'You', title: title.trim(), body: body.trim() });
    if (!title.trim() || !body.trim()) {
      console.log('Form validation failed');
      return;
    }
    const p: Post = {
      id: `p${Date.now()}`,
      user: name.trim() || 'You',
      title: title.trim(),
      body: body.trim(),
      created_at: new Date().toISOString(),
      category,
      votes: 0,
      comments: [],
    };
    setPosts((prev) => [p, ...prev]);
    setIsOpen(false);
    setName("");
    setTitle("");
    setBody("");
    console.log('Post created successfully');
  };

  const addReaction = (postId: string) => {
    setPosts((prev) => prev.map((p) => (
      p.id === postId
        ? { ...p, votes: p.votes + 1 }
        : p
    )));
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    setPosts((prev) => prev.map((p) => (
      p.id === postId
        ? {
            ...p,
            comments: [
              ...p.comments,
              {
                id: `c${Date.now()}`,
                author: name || "Anonymous",
                text: text.trim(),
                created_at: new Date().toISOString(),
              },
            ],
          }
        : p
    )));
    setCommentText((prev) => ({ ...prev, [postId]: "" }));
  };

  const header = (
    <div className="text-center mb-8">
      <div className="bg-orange-50 py-8 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-gray-800 mb-4">COMMUNITY FORUM</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to the Aspirant Community: Learn & Share
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600"
        >
          Create Post
        </button>
      </div>
    </div>
  );

  const avatarColors = [
    "bg-orange-500",
    "bg-yellow-500", 
    "bg-red-500",
    "bg-amber-500",
    "bg-orange-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-orange-400",
    "bg-yellow-400",
  ];

  const getAvatarColor = (index: number) => avatarColors[index % avatarColors.length];

  return (
    <div 
      className="w-full bg-white min-h-screen" 
      data-theme="light"
    >
      <div className="max-w-5xl mx-auto relative">
        {/* Enhanced container with shadow and border */}
        <div className="bg-white shadow-lg border border-gray-200 overflow-hidden">
          {header}
        
        {/* Enhanced Filters */}
        <div className="px-6 md:px-8 lg:px-10 py-6 bg-white">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 md:gap-4 relative">
            <button
              onClick={() => { setFilterMode("all"); setCategoryFilter("All"); setShowCategoryMenu(false); }}
              className={`px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 ${filterMode === "all" ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-700 hover:bg-orange-200"}`}
            >
              Conversations
            </button>
            <button
              onClick={() => { setFilterMode("help"); setShowCategoryMenu(false); }}
              className={`px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 ${filterMode === "help" ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-700 hover:bg-orange-200"}`}
            >
              Help others
            </button>
            <div className="relative">
              <button
                onClick={() => setShowCategoryMenu((s) => !s)}
                className={`px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 ${filterMode === "category" ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-700 hover:bg-orange-200"}`}
                aria-haspopup="listbox"
                aria-expanded={showCategoryMenu}
              >
                {filterMode === "category" && categoryFilter !== "All" ? `${categoryFilter}` : "Categories"}
              </button>

              {/* Category menu */}
              {showCategoryMenu && (
                <CategoryMenu
                  posts={posts}
                  onSelect={(cat) => { setCategoryFilter(cat); setFilterMode("category"); setShowCategoryMenu(false); }}
                  onClear={() => { setCategoryFilter("All"); setFilterMode("all"); setShowCategoryMenu(false); }}
                />
              )}
            </div>
        </div>

        <div className="mb-6 text-sm font-semibold text-gray-700 dark:text-gray-300">
          📌 Showing {filteredPosts.length} of {posts.length} posts
        </div>

        <div className="space-y-6">
          {filteredPosts.map((p, idx) => (
            <article key={p.id} className="bg-white rounded-2xl border-2 border-orange-100 overflow-hidden hover:shadow-2xl hover:border-orange-300 transition-all duration-300 transform hover:scale-[1.02]">
              {/* Post Header */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className={`w-11 h-11 ${getAvatarColor(idx)} rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg shadow-md`}>
                    {p.user.charAt(0).toUpperCase()}
                  </div>

                  {/* Meta info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{p.user}</h4>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 dark:bg-slate-700 text-white text-xs font-semibold" style={{color: 'white'}}>
                        {p.category.replace("Asked in ", "")}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{timeAgo(p.created_at)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Title and body */}
                <div className="mt-3 ml-14">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                    {p.body}
                  </p>
                </div>
              </div>

              {/* Reactions bar */}
              <div className="px-5 py-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-t border-orange-100 dark:border-orange-800">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => addReaction(p.id)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 hover:bg-orange-100 border border-orange-200 hover:border-orange-300 text-gray-700 hover:text-orange-600 transition-all font-medium shadow-sm hover:shadow-md"
                  >
                    <span className="text-lg">👍</span>
                    <span>{p.votes}</span>
                  </button>
                  <button 
                    onClick={() => setExpandedPostId(expandedPostId === p.id ? null : p.id)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 hover:bg-yellow-100 border border-yellow-200 hover:border-yellow-300 text-gray-700 hover:text-yellow-600 transition-all font-medium shadow-sm hover:shadow-md"
                  >
                    <span className="text-lg">💬</span>
                    <span>{p.comments.length}</span>
                  </button>
                </div>
              </div>

              {/* Comments section */}
              {expandedPostId === p.id && (
                <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 space-y-4">
                  {/* Existing comments */}
                  {p.comments.length > 0 && (
                    <div className="space-y-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                      {p.comments.map((c) => (
                        <div key={c.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-700 dark:text-gray-300">
                            {c.author.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 dark:text-white text-sm">{c.author}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(c.created_at)}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add comment form */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      addComment(p.id, commentText[p.id] || "");
                    }}
                    className="space-y-2"
                  >
                    <input 
                      type="text"
                      placeholder="Add a comment... (use @ to mention)"
                      value={commentText[p.id] || ""}
                      onChange={(e) => setCommentText((prev) => ({ ...prev, [p.id]: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900"
                    />
                    <button 
                      type="submit"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold text-sm transition-all"
                    >
                      Post
                    </button>
                  </form>
                </div>
              )}
            </article>
          ))}
        </div>
        </div>
      </div>
    </div>

      {/* Create Post Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="create-post-heading">
            <div className="flex items-center justify-between mb-4">
              <h3 id="create-post-heading" className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">Create a new post</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none">✕</button>
            </div>
            <form onSubmit={createPost} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your name (optional)</label>
                  <input autoFocus value={name} onChange={(e)=>setName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900" placeholder="Your name or leave blank for 'You'"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900">
                    <option>General</option>
                    <option>Prelims</option>
                    <option>Mains</option>
                    <option>Optional</option>
                    <option>Interview</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900" placeholder="What's your question or topic?"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Details</label>
                <textarea value={body} onChange={(e)=>setBody(e.target.value)} rows={6} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900" placeholder="Add more details to help others respond"/>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={()=>setIsOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">Cancel</button>
                <button 
                  type="submit" 
                  disabled={!canSubmit} 
                  className={`px-6 py-2 rounded-lg font-semibold shadow-lg transition-all ${
                    canSubmit 
                      ? "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white cursor-pointer" 
                      : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => console.log('Button clicked, canSubmit:', canSubmit)}
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
