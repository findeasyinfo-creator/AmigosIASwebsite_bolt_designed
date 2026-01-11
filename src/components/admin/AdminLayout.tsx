'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Menu,
  ImageIcon,
  GraduationCap,
  Users,
  MessageSquare,
  FileText,
  Newspaper,
  Settings,
  LogOut,
  Home,
  ChevronRight,
  TrendingUp,
  Trophy,
  Sparkles,
  Video,
  Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SIDEBAR_WIDTH = 260;

interface MenuItem {
  text: string;
  icon: ReactNode;
  path: string;
  badge?: 'New' | 'Soon';
}

const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/admin' },
  { text: 'Hero Slides', icon: <ImageIcon className="w-5 h-5" />, path: '/admin/hero' },
  { text: 'Stats', icon: <TrendingUp className="w-5 h-5" />, path: '/admin/stats' },
  { text: 'Features', icon: <Sparkles className="w-5 h-5" />, path: '/admin/features' },
  { text: 'Demo Videos', icon: <Video className="w-5 h-5" />, path: '/admin/demo-videos' },
  { text: 'Courses', icon: <GraduationCap className="w-5 h-5" />, path: '/admin/courses' },
  { text: 'Faculty', icon: <Users className="w-5 h-5" />, path: '/admin/faculty' },
  { text: 'Success Stories', icon: <Trophy className="w-5 h-5" />, path: '/admin/success-stories' },
  { text: 'Testimonials', icon: <MessageSquare className="w-5 h-5" />, path: '/admin/testimonials' },
  { text: 'Blog Posts', icon: <FileText className="w-5 h-5" />, path: '/admin/blog', badge: 'Soon' },
  { text: 'Current Affairs', icon: <Newspaper className="w-5 h-5" />, path: '/admin/current-affairs' },
  { text: 'Filter Configs', icon: <Filter className="w-5 h-5" />, path: '/admin/filters' },
  { text: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/admin/settings' },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Add admin-panel class to body
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

  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    return paths.map((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
      return { label, href };
    });
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo/Brand */}
      <div className="flex items-center gap-3 border-b bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 p-5">
        <Avatar className="h-10 w-10 border-2 border-white">
          <AvatarFallback className="bg-white text-indigo-600 font-bold text-lg">
            A
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-sm font-bold leading-tight text-white">Amigos IAS</h2>
          <p className="text-xs text-white/90">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const isDisabled = item.badge === 'Soon';

          return (
            <button
              key={item.text}
              onClick={() => !isDisabled && handleNavigation(item.path)}
              disabled={isDisabled}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : isDisabled
                  ? 'text-gray-400 cursor-not-allowed opacity-60'
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
              {item.badge && (
                <Badge
                  variant={item.badge === 'New' ? 'default' : 'secondary'}
                  className={cn(
                    'text-xs px-2 py-0.5',
                    item.badge === 'New' && 'bg-green-500 hover:bg-green-600',
                    item.badge === 'Soon' && 'bg-amber-500 hover:bg-amber-600'
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
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
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col border-r bg-white">
        <SidebarContent />
      </aside>

      {/* Mobile Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Breadcrumbs */}
          <div className="flex flex-1 items-center gap-2 text-sm">
            {getBreadcrumbs().map((crumb, index) => (
              <div key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
                <button
                  onClick={() => handleNavigation(crumb.href)}
                  className={cn(
                    'hover:text-indigo-600 transition-colors',
                    index === getBreadcrumbs().length - 1
                      ? 'font-semibold text-gray-900'
                      : 'text-gray-500'
                  )}
                >
                  {crumb.label}
                </button>
              </div>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {user?.name || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500">{user?.role || 'ADMIN'}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full border-2 border-indigo-600"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-indigo-600 text-white text-sm font-semibold">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white">
                  <div>
                    <p className="font-semibold">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-white/90">{user?.email || 'admin@amigosias.com'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
