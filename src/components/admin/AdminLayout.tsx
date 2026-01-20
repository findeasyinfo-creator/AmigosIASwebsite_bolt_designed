'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Menu,
  ImageIcon,
  GraduationCap,
  Users,
  MessageSquare,
  Newspaper,
  Settings,
  LogOut,
  Home,
  TrendingUp,
  Trophy,
  Sparkles,
  Video,
  Filter,
  ChevronDown,
  FileText,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  text: string;
  icon: ReactNode;
  path: string;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    label: '',
    items: [
      { text: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/admin' },
    ],
  },
  {
    label: 'Homepage',
    items: [
      { text: 'Hero Slides', icon: <ImageIcon className="w-5 h-5" />, path: '/admin/hero' },
      { text: 'Stats', icon: <TrendingUp className="w-5 h-5" />, path: '/admin/stats' },
      { text: 'Features', icon: <Sparkles className="w-5 h-5" />, path: '/admin/features' },
      { text: 'Demo Videos', icon: <Video className="w-5 h-5" />, path: '/admin/demo-videos' },
    ],
  },
  {
    label: 'Content',
    items: [
      { text: 'Courses', icon: <GraduationCap className="w-5 h-5" />, path: '/admin/courses' },
      { text: 'Faculty', icon: <Users className="w-5 h-5" />, path: '/admin/faculty' },
      { text: 'Testimonials', icon: <MessageSquare className="w-5 h-5" />, path: '/admin/testimonials' },
      { text: 'Success Stories', icon: <Trophy className="w-5 h-5" />, path: '/admin/success-stories' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { text: 'Blog Posts', icon: <FileText className="w-5 h-5" />, path: '/admin/blog-posts' },
      { text: 'Study Materials', icon: <BookOpen className="w-5 h-5" />, path: '/admin/resources' },
    ],
  },
  {
    label: 'Current Affairs',
    items: [
      { text: 'Manage Articles', icon: <Newspaper className="w-5 h-5" />, path: '/admin/current-affairs' },
      { text: 'Filter Options', icon: <Filter className="w-5 h-5" />, path: '/admin/filters' },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { text: 'Site Settings', icon: <Settings className="w-5 h-5" />, path: '/admin/settings' },
    ],
  },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add('admin-panel');
    return () => {
      document.body.classList.remove('admin-panel');
    };
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const getPageTitle = () => {
    const paths = pathname.split('/').filter(Boolean);
    if (paths.length <= 1) return 'Dashboard';
    const lastPath = paths[paths.length - 1];
    return lastPath.charAt(0).toUpperCase() + lastPath.slice(1).replace(/-/g, ' ');
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white">
      {/* Logo/Brand */}
      <div className="flex items-center gap-3 border-b px-5 py-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-900">Amigos IAS</h2>
          <p className="text-xs text-blue-600">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} className={group.label ? 'mt-4 first:mt-0' : ''}>
            {group.label && (
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group.label}
              </div>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <button
                    key={item.text}
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <span className={cn(
                      'flex-shrink-0',
                      isActive ? 'text-white' : 'text-gray-500'
                    )}>
                      {item.icon}
                    </span>
                    <span className="flex-1 text-left">{item.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <Separator />

      {/* View Website Button */}
      <div className="p-3">
        <button
          onClick={() => window.open('/', '_blank')}
          className="flex w-full items-center gap-3 rounded-lg bg-gray-100 px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200"
        >
          <Home className="h-5 w-5 text-gray-500" />
          <span>View Website</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-60 md:flex-col border-r bg-white">
        <SidebarContent />
      </aside>

      {/* Mobile Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-60">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:pl-60">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-4 md:px-6">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right side - User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name || 'Admin'}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@amigosias.com'}</p>
              </div>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 mt-1"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
