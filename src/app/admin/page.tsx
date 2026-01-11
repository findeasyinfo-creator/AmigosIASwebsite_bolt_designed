'use client';

import { useEffect, useState } from 'react';
import {
  ImageIcon,
  GraduationCap,
  Users,
  MessageSquare,
  TrendingUp,
  Plus,
  Newspaper,
  Filter,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/services/api';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  change?: string;
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <DashboardContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const router = useRouter();
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: 'Hero Slides',
      value: 0,
      icon: <ImageIcon className="h-8 w-8" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      change: '+2 this week',
    },
    {
      title: 'Courses',
      value: 6,
      icon: <GraduationCap className="h-8 w-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: 'Coming soon',
    },
    {
      title: 'Faculty Members',
      value: 9,
      icon: <Users className="h-8 w-8" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      change: 'Coming soon',
    },
    {
      title: 'Testimonials',
      value: 12,
      icon: <MessageSquare className="h-8 w-8" />,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: 'Coming soon',
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.heroSlides.getAll();
      const heroCount = response.data.length;

      setStats((prev) =>
        prev.map((stat) =>
          stat.title === 'Hero Slides' ? { ...stat, value: heroCount } : stat
        )
      );
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your website.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <Avatar className={cn('h-14 w-14 mr-4', stat.bgColor)}>
                  <AvatarFallback className={cn(stat.bgColor, stat.color)}>
                    {stat.icon}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-4xl font-bold">{stat.value}</h3>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                {stat.change && (
                  <>
                    {stat.change.includes('+') && (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    )}
                    <span className="text-xs">{stat.change}</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <p className="text-gray-600">Activity tracking coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => router.push('/admin/courses')}
                  variant="outline"
                  className="w-full justify-start gap-2 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300"
                >
                  <Plus className="h-4 w-4" />
                  Add New Course
                </Button>
                <Button
                  onClick={() => router.push('/admin/current-affairs')}
                  variant="outline"
                  className="w-full justify-start gap-2 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                >
                  <Newspaper className="h-4 w-4" />
                  Add Current Affairs
                </Button>
                <Button
                  onClick={() => router.push('/admin/filter-configs')}
                  variant="outline"
                  className="w-full justify-start gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                >
                  <Filter className="h-4 w-4" />
                  Manage Filters
                </Button>
                <Button
                  onClick={() => router.push('/admin/settings')}
                  variant="outline"
                  className="w-full justify-start gap-2 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
                >
                  <Settings className="h-4 w-4" />
                  Site Settings
                </Button>
                <div className="border-t pt-3 mt-2">
                  <Button
                    onClick={() => window.open('/', '_blank')}
                    variant="outline"
                    className="w-full justify-start gap-2 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Website
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
