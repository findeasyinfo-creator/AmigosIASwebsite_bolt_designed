'use client';

import { useEffect, useState } from 'react';
import { Save, Settings as SettingsIcon } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

interface SiteSettings {
  id: string;
  brandDescription: string;
  address: string;
  phone: string;
  email: string;
  facebookUrl: string | null;
  twitterUrl: string | null;
  youtubeUrl: string | null;
  instagramUrl: string | null;
  privacyPolicyUrl: string | null;
  termsServiceUrl: string | null;
  updatedAt: string;
}

export default function SettingsAdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <SettingsContent />
        <Toaster />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function SettingsContent() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  const [formData, setFormData] = useState({
    brandDescription: '',
    address: '',
    phone: '',
    email: '',
    facebookUrl: '',
    twitterUrl: '',
    youtubeUrl: '',
    instagramUrl: '',
    privacyPolicyUrl: '',
    termsServiceUrl: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.settings.get();
      setSettings(response.data);
      setFormData({
        brandDescription: response.data.brandDescription,
        address: response.data.address,
        phone: response.data.phone,
        email: response.data.email,
        facebookUrl: response.data.facebookUrl || '',
        twitterUrl: response.data.twitterUrl || '',
        youtubeUrl: response.data.youtubeUrl || '',
        instagramUrl: response.data.instagramUrl || '',
        privacyPolicyUrl: response.data.privacyPolicyUrl || '',
        termsServiceUrl: response.data.termsServiceUrl || '',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.brandDescription || !formData.address || !formData.phone || !formData.email) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmitting(true);
      await api.settings.update(formData);
      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      });
      fetchSettings();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update settings',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading settings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Site Settings
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your site-wide settings and contact information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              Brand Information
            </CardTitle>
            <CardDescription>
              Displayed in the footer and across the site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brandDescription">Brand Description*</Label>
              <Textarea
                id="brandDescription"
                value={formData.brandDescription}
                onChange={(e) => setFormData({ ...formData, brandDescription: e.target.value })}
                placeholder="Your trusted partner in UPSC preparation..."
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Primary contact details displayed in footer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address*</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main Street, City, State 110001"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone*</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 123 456 7890"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@amigosias.com"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Section */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>
              Optional social media profile URLs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook URL</Label>
                <Input
                  id="facebookUrl"
                  type="url"
                  value={formData.facebookUrl}
                  onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterUrl">Twitter URL</Label>
                <Input
                  id="twitterUrl"
                  type="url"
                  value={formData.twitterUrl}
                  onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube URL</Label>
                <Input
                  id="youtubeUrl"
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/yourchannel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram URL</Label>
                <Input
                  id="instagramUrl"
                  type="url"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Section */}
        <Card>
          <CardHeader>
            <CardTitle>Legal Pages</CardTitle>
            <CardDescription>
              Links to privacy policy and terms of service
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="privacyPolicyUrl">Privacy Policy URL</Label>
                <Input
                  id="privacyPolicyUrl"
                  value={formData.privacyPolicyUrl}
                  onChange={(e) => setFormData({ ...formData, privacyPolicyUrl: e.target.value })}
                  placeholder="/privacy-policy"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="termsServiceUrl">Terms of Service URL</Label>
                <Input
                  id="termsServiceUrl"
                  value={formData.termsServiceUrl}
                  onChange={(e) => setFormData({ ...formData, termsServiceUrl: e.target.value })}
                  placeholder="/terms-of-service"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={submitting}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {submitting ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>

        {settings && (
          <p className="text-sm text-gray-500 text-center">
            Last updated: {new Date(settings.updatedAt).toLocaleString()}
          </p>
        )}
      </form>
    </div>
  );
}
