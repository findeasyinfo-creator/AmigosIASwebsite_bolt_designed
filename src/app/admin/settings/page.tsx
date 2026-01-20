'use client';

import { useEffect, useState } from 'react';
import { Save, Settings as SettingsIcon, Building2, Share2, ScrollText, Megaphone, Layout, BookOpen, Users2, Upload, X } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  // Additional settings
  aboutPageFont: string;
  coursesQrCode: string | null;

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
    aboutPageFont: 'Playfair Display',
    coursesQrCode: '',
  });

  const [uploadingQr, setUploadingQr] = useState(false);

  const compressAndConvertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxSize = 500;
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = (height / width) * maxSize;
              width = maxSize;
            } else {
              width = (width / height) * maxSize;
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const base64 = canvas.toDataURL('image/png', 0.9);
          resolve(base64);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  const handleQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select a valid image file',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image size must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setUploadingQr(true);

    try {
      const base64 = await compressAndConvertToBase64(file);
      setFormData({ ...formData, coursesQrCode: base64 });
      toast({
        title: 'Success',
        description: 'QR Code uploaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process image',
        variant: 'destructive',
      });
    } finally {
      setUploadingQr(false);
    }
  };

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
        aboutPageFont: response.data.aboutPageFont || 'Playfair Display',
        coursesQrCode: response.data.coursesQrCode || '',
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
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Site Settings</h1>
        <p className="text-gray-600">
          Manage your website content and configuration
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 h-auto p-1 bg-gray-100 rounded-lg">
            <TabsTrigger value="general" className="flex items-center gap-2 py-2.5 data-[state=active]:bg-white">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="homepage" className="flex items-center gap-2 py-2.5 data-[state=active]:bg-white">
              <Layout className="w-4 h-4" />
              <span className="hidden sm:inline">Homepage</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2 py-2.5 data-[state=active]:bg-white">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2 py-2.5 data-[state=active]:bg-white">
              <Users2 className="w-4 h-4" />
              <span className="hidden sm:inline">About Us</span>
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  Brand & Contact
                </CardTitle>
                <CardDescription>
                  Basic information displayed in the footer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="brandDescription">Brand Description *</Label>
                  <Textarea
                    id="brandDescription"
                    value={formData.brandDescription}
                    onChange={(e) => setFormData({ ...formData, brandDescription: e.target.value })}
                    placeholder="Your trusted partner in UPSC preparation..."
                    rows={2}
                    required
                  />
                  <p className="text-xs text-gray-500">Shown in the website footer</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
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
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 123 456 7890"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Share2 className="w-5 h-5 text-indigo-600" />
                  Social Media
                </CardTitle>
                <CardDescription>
                  Links to your social media profiles (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebookUrl">Facebook</Label>
                    <Input
                      id="facebookUrl"
                      type="url"
                      value={formData.facebookUrl}
                      onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagramUrl">Instagram</Label>
                    <Input
                      id="instagramUrl"
                      type="url"
                      value={formData.instagramUrl}
                      onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                      placeholder="https://instagram.com/yourprofile"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtubeUrl">YouTube</Label>
                    <Input
                      id="youtubeUrl"
                      type="url"
                      value={formData.youtubeUrl}
                      onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                      placeholder="https://youtube.com/yourchannel"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitterUrl">Twitter</Label>
                    <Input
                      id="twitterUrl"
                      type="url"
                      value={formData.twitterUrl}
                      onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ScrollText className="w-5 h-5 text-indigo-600" />
                  Legal Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
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
          </TabsContent>

          {/* Homepage Tab */}
          <TabsContent value="homepage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Megaphone className="w-5 h-5 text-indigo-600" />
                  Announcement Banner
                </CardTitle>
                <CardDescription>
                  Scrolling text at the top of the homepage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="space-y-0.5">
                    <Label htmlFor="marqueeActive" className="font-medium">Show Banner</Label>
                    <p className="text-sm text-gray-600">Display the announcement on homepage</p>
                  </div>
                  <Switch
                    id="marqueeActive"
                    checked={formData.marqueeActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, marqueeActive: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marqueeText">Banner Text</Label>
                  <Textarea
                    id="marqueeText"
                    value={formData.marqueeText}
                    onChange={(e) => setFormData({ ...formData, marqueeText: e.target.value })}
                    placeholder="📢 Formulating Offers | Free Demo Classes Invitation This Week 🎉"
                    rows={2}
                    disabled={!formData.marqueeActive}
                    className="disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500">
                    Tip: Use emojis and separators (|) for visual appeal
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layout className="w-5 h-5 text-indigo-600" />
                  Section Descriptions
                </CardTitle>
                <CardDescription>
                  Text shown below each section heading on homepage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coursesSectionDesc">Courses Section</Label>
                  <Input
                    id="coursesSectionDesc"
                    value={formData.coursesSectionDesc}
                    onChange={(e) => setFormData({ ...formData, coursesSectionDesc: e.target.value })}
                    placeholder="Choose from our carefully designed courses..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facultySectionDesc">Faculty Section</Label>
                  <Input
                    id="facultySectionDesc"
                    value={formData.facultySectionDesc}
                    onChange={(e) => setFormData({ ...formData, facultySectionDesc: e.target.value })}
                    placeholder="Our experienced educators bring decades of expertise..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonialsSectionDesc">Testimonials Section</Label>
                  <Input
                    id="testimonialsSectionDesc"
                    value={formData.testimonialsSectionDesc}
                    onChange={(e) => setFormData({ ...formData, testimonialsSectionDesc: e.target.value })}
                    placeholder="Hear from our successful students..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demoSectionDesc">Demo Videos Section</Label>
                  <Input
                    id="demoSectionDesc"
                    value={formData.demoSectionDesc}
                    onChange={(e) => setFormData({ ...formData, demoSectionDesc: e.target.value })}
                    placeholder="Watch our free demo classes..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentAffairsSectionDesc">Current Affairs Section</Label>
                  <Input
                    id="currentAffairsSectionDesc"
                    value={formData.currentAffairsSectionDesc}
                    onChange={(e) => setFormData({ ...formData, currentAffairsSectionDesc: e.target.value })}
                    placeholder="Stay updated with comprehensive current affairs coverage..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <SettingsIcon className="w-5 h-5 text-indigo-600" />
                  Payment Settings
                </CardTitle>
                <CardDescription>
                  Global payment QR code for all courses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Label>Upload QR Code Image</Label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleQrUpload}
                        className="hidden"
                        disabled={uploadingQr}
                      />
                      <div className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        <Upload className="w-4 h-4" />
                        {uploadingQr ? 'Uploading...' : 'Browse & Upload'}
                      </div>
                    </label>
                    {formData.coursesQrCode && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData({ ...formData, coursesQrCode: '' })}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    This QR code will be displayed on all course payment sections. Leave empty to use individual course QR codes.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="coursesQrCode">Or Enter QR Code URL</Label>
                  <Input
                    id="coursesQrCode"
                    value={formData.coursesQrCode}
                    onChange={(e) => setFormData({ ...formData, coursesQrCode: e.target.value })}
                    placeholder="https://... or paste base64 image data"
                  />
                </div>

                {formData.coursesQrCode && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium mb-2">QR Code Preview:</p>
                    <div className="bg-white p-3 rounded-lg inline-block border">
                      <img 
                        src={formData.coursesQrCode} 
                        alt="Payment QR Preview" 
                        className="w-48 h-48 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Resources Page
                </CardTitle>
                <CardDescription>
                  Descriptions for each tab on the Resources page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studyMaterialsDesc">Study Materials Tab</Label>
                  <Textarea
                    id="studyMaterialsDesc"
                    value={formData.studyMaterialsDesc}
                    onChange={(e) => setFormData({ ...formData, studyMaterialsDesc: e.target.value })}
                    placeholder="Access our curated collection of subject-wise notes..."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="strategyArticlesDesc">Strategy Articles Tab</Label>
                  <Textarea
                    id="strategyArticlesDesc"
                    value={formData.strategyArticlesDesc}
                    onChange={(e) => setFormData({ ...formData, strategyArticlesDesc: e.target.value })}
                    placeholder="Expert insights and proven strategies..."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facultyColumnsDesc">Faculty Columns Tab</Label>
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
          </TabsContent>

          {/* About Us Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About Page Settings</CardTitle>
                <CardDescription>
                  Typography and styling for the About Us page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aboutPageFont">Font Family</Label>
                  <select
                    id="aboutPageFont"
                    value={formData.aboutPageFont}
                    onChange={(e) => setFormData({ ...formData, aboutPageFont: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="Playfair Display">Playfair Display (Classic Serif)</option>
                    <option value="Cormorant Garamond">Cormorant Garamond (Elegant)</option>
                    <option value="Montserrat">Montserrat (Modern Sans)</option>
                    <option value="Inter">Inter (Clean Sans)</option>
                  </select>
                  <p className="text-xs text-gray-500">Font used for headings on the About page</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chairman Information</CardTitle>
                <CardDescription>
                  Displayed on the About Us page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chairmanName">Name</Label>
                    <Input
                      id="chairmanName"
                      value={formData.chairmanName}
                      onChange={(e) => setFormData({ ...formData, chairmanName: e.target.value })}
                      placeholder="Dr. John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chairmanImage">Image URL</Label>
                    <Input
                      id="chairmanImage"
                      value={formData.chairmanImage}
                      onChange={(e) => setFormData({ ...formData, chairmanImage: e.target.value })}
                      placeholder="https://... or /images/chairman.jpg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chairmanMessage">Message</Label>
                  <Textarea
                    id="chairmanMessage"
                    value={formData.chairmanMessage}
                    onChange={(e) => setFormData({ ...formData, chairmanMessage: e.target.value })}
                    placeholder="Welcome message from the Chairman..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chief Advisor Information</CardTitle>
                <CardDescription>
                  Displayed on the About Us page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chiefAdvisorName">Name</Label>
                    <Input
                      id="chiefAdvisorName"
                      value={formData.chiefAdvisorName}
                      onChange={(e) => setFormData({ ...formData, chiefAdvisorName: e.target.value })}
                      placeholder="Prof. Jane Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chiefAdvisorImage">Image URL</Label>
                    <Input
                      id="chiefAdvisorImage"
                      value={formData.chiefAdvisorImage}
                      onChange={(e) => setFormData({ ...formData, chiefAdvisorImage: e.target.value })}
                      placeholder="https://... or /images/advisor.jpg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chiefAdvisorMessage">Message</Label>
                  <Textarea
                    id="chiefAdvisorMessage"
                    value={formData.chiefAdvisorMessage}
                    onChange={(e) => setFormData({ ...formData, chiefAdvisorMessage: e.target.value })}
                    placeholder="Message from the Chief Advisor..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button - Always visible */}
        <div className="sticky bottom-0 bg-white border-t mt-6 -mx-6 px-6 py-4 flex items-center justify-between">
          {settings && (
            <p className="text-sm text-gray-500">
              Last saved: {new Date(settings.updatedAt).toLocaleString()}
            </p>
          )}
          <Button
            type="submit"
            disabled={submitting}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {submitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
