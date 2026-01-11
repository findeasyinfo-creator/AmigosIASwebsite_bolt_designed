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
import { Switch } from '@/components/ui/switch';
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

  // Marquee settings
  marqueeText: string;
  marqueeActive: boolean;

  // Homepage section descriptions
  coursesSectionDesc: string | null;
  facultySectionDesc: string | null;
  testimonialsSectionDesc: string | null;
  demoSectionDesc: string | null;
  currentAffairsSectionDesc: string | null;

  // Resources page tab descriptions
  studyMaterialsDesc: string | null;
  strategyArticlesDesc: string | null;
  facultyColumnsDesc: string | null;

  // About Us page content
  chairmanName: string | null;
  chairmanImage: string | null;
  chairmanMessage: string | null;
  chiefAdvisorName: string | null;
  chiefAdvisorImage: string | null;
  chiefAdvisorMessage: string | null;

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
    marqueeText: '',
    marqueeActive: true,
    coursesSectionDesc: '',
    facultySectionDesc: '',
    testimonialsSectionDesc: '',
    demoSectionDesc: '',
    currentAffairsSectionDesc: '',
    studyMaterialsDesc: '',
    strategyArticlesDesc: '',
    facultyColumnsDesc: '',
    chairmanName: '',
    chairmanImage: '',
    chairmanMessage: '',
    chiefAdvisorName: '',
    chiefAdvisorImage: '',
    chiefAdvisorMessage: '',
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
        marqueeText: response.data.marqueeText || '',
        marqueeActive: response.data.marqueeActive ?? true,
        coursesSectionDesc: response.data.coursesSectionDesc || '',
        facultySectionDesc: response.data.facultySectionDesc || '',
        testimonialsSectionDesc: response.data.testimonialsSectionDesc || '',
        demoSectionDesc: response.data.demoSectionDesc || '',
        currentAffairsSectionDesc: response.data.currentAffairsSectionDesc || '',
        studyMaterialsDesc: response.data.studyMaterialsDesc || '',
        strategyArticlesDesc: response.data.strategyArticlesDesc || '',
        facultyColumnsDesc: response.data.facultyColumnsDesc || '',
        chairmanName: response.data.chairmanName || '',
        chairmanImage: response.data.chairmanImage || '',
        chairmanMessage: response.data.chairmanMessage || '',
        chiefAdvisorName: response.data.chiefAdvisorName || '',
        chiefAdvisorImage: response.data.chiefAdvisorImage || '',
        chiefAdvisorMessage: response.data.chiefAdvisorMessage || '',
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

        {/* Marquee Section */}
        <Card>
          <CardHeader>
            <CardTitle>Marquee Announcement</CardTitle>
            <CardDescription>
              Scrolling announcement text displayed at the top of the homepage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marqueeActive">Enable Marquee</Label>
                <p className="text-sm text-gray-500">Show the announcement banner on homepage</p>
              </div>
              <Switch
                id="marqueeActive"
                checked={formData.marqueeActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, marqueeActive: checked })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="marqueeText">Marquee Text</Label>
              <Textarea
                id="marqueeText"
                value={formData.marqueeText}
                onChange={(e) => setFormData({ ...formData, marqueeText: e.target.value })}
                placeholder="📢 Formulating Offers | Free Demo Classes Invitation This Week 🎉"
                rows={3}
                disabled={!formData.marqueeActive}
              />
              <p className="text-sm text-gray-500">
                Use emojis and separators (|) for visual appeal
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Homepage Section Descriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Homepage Section Descriptions</CardTitle>
            <CardDescription>
              Text displayed below each section heading on the homepage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coursesSectionDesc">Courses Section Description</Label>
              <Textarea
                id="coursesSectionDesc"
                value={formData.coursesSectionDesc}
                onChange={(e) => setFormData({ ...formData, coursesSectionDesc: e.target.value })}
                placeholder="Choose from our carefully designed courses..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facultySectionDesc">Faculty Section Description</Label>
              <Textarea
                id="facultySectionDesc"
                value={formData.facultySectionDesc}
                onChange={(e) => setFormData({ ...formData, facultySectionDesc: e.target.value })}
                placeholder="Our experienced educators bring decades of expertise..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonialsSectionDesc">Testimonials Section Description</Label>
              <Textarea
                id="testimonialsSectionDesc"
                value={formData.testimonialsSectionDesc}
                onChange={(e) => setFormData({ ...formData, testimonialsSectionDesc: e.target.value })}
                placeholder="Hear from our successful students..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demoSectionDesc">Demo Videos Section Description</Label>
              <Textarea
                id="demoSectionDesc"
                value={formData.demoSectionDesc}
                onChange={(e) => setFormData({ ...formData, demoSectionDesc: e.target.value })}
                placeholder="Watch our free demo classes..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentAffairsSectionDesc">Current Affairs Section Description</Label>
              <Textarea
                id="currentAffairsSectionDesc"
                value={formData.currentAffairsSectionDesc}
                onChange={(e) => setFormData({ ...formData, currentAffairsSectionDesc: e.target.value })}
                placeholder="Stay updated with comprehensive current affairs coverage..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Resources Page Tab Descriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Resources Page Tab Descriptions</CardTitle>
            <CardDescription>
              Text displayed at the top of each tab in the Resources page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studyMaterialsDesc">Study Materials Tab Description</Label>
              <Textarea
                id="studyMaterialsDesc"
                value={formData.studyMaterialsDesc}
                onChange={(e) => setFormData({ ...formData, studyMaterialsDesc: e.target.value })}
                placeholder="Access our curated collection of subject-wise notes..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="strategyArticlesDesc">Strategy Articles Tab Description</Label>
              <Textarea
                id="strategyArticlesDesc"
                value={formData.strategyArticlesDesc}
                onChange={(e) => setFormData({ ...formData, strategyArticlesDesc: e.target.value })}
                placeholder="Expert insights and proven strategies..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facultyColumnsDesc">Faculty Columns Tab Description</Label>
              <Textarea
                id="facultyColumnsDesc"
                value={formData.facultyColumnsDesc}
                onChange={(e) => setFormData({ ...formData, facultyColumnsDesc: e.target.value })}
                placeholder="Read insightful columns from our expert faculty..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* About Us Page Content */}
        <Card>
          <CardHeader>
            <CardTitle>About Us Page Leadership Content</CardTitle>
            <CardDescription>
              Chairman and Chief Advisor information displayed on the About Us page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Chairman Information</h3>
              <div className="space-y-2">
                <Label htmlFor="chairmanName">Chairman Name</Label>
                <Input
                  id="chairmanName"
                  value={formData.chairmanName}
                  onChange={(e) => setFormData({ ...formData, chairmanName: e.target.value })}
                  placeholder="Dr. John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chairmanImage">Chairman Image URL</Label>
                <Input
                  id="chairmanImage"
                  value={formData.chairmanImage}
                  onChange={(e) => setFormData({ ...formData, chairmanImage: e.target.value })}
                  placeholder="https://... or base64 image"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chairmanMessage">Chairman Message</Label>
                <Textarea
                  id="chairmanMessage"
                  value={formData.chairmanMessage}
                  onChange={(e) => setFormData({ ...formData, chairmanMessage: e.target.value })}
                  placeholder="Welcome message from the Chairman..."
                  rows={4}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Chief Advisor Information</h3>
              <div className="space-y-2">
                <Label htmlFor="chiefAdvisorName">Chief Advisor Name</Label>
                <Input
                  id="chiefAdvisorName"
                  value={formData.chiefAdvisorName}
                  onChange={(e) => setFormData({ ...formData, chiefAdvisorName: e.target.value })}
                  placeholder="Prof. Jane Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chiefAdvisorImage">Chief Advisor Image URL</Label>
                <Input
                  id="chiefAdvisorImage"
                  value={formData.chiefAdvisorImage}
                  onChange={(e) => setFormData({ ...formData, chiefAdvisorImage: e.target.value })}
                  placeholder="https://... or base64 image"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chiefAdvisorMessage">Chief Advisor Message</Label>
                <Textarea
                  id="chiefAdvisorMessage"
                  value={formData.chiefAdvisorMessage}
                  onChange={(e) => setFormData({ ...formData, chiefAdvisorMessage: e.target.value })}
                  placeholder="Message from the Chief Advisor..."
                  rows={4}
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
