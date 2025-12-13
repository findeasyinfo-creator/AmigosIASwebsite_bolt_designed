'use client';

import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Link as LinkIcon,
  X,
  Copy,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/services/api';
import { HeroSlide, CreateHeroSlideDto } from '@/types/api.types';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function HeroAdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <HeroContent />
        <Toaster />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function HeroContent() {
  const { toast } = useToast();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateHeroSlideDto>({
    title: '',
    subtitle: '',
    description: '',
    ctaLabel: '',
    ctaHref: '',
    imageUrl: '',
    isActive: true,
    order: 0,
  });

  const [currentTab, setCurrentTab] = useState('content');
  const [imageInputMode, setImageInputMode] = useState<'url' | 'upload'>('url');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const response = await api.heroSlides.getAll();
      setSlides(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch slides',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (slide?: HeroSlide) => {
    if (slide) {
      setEditingSlide(slide);
      setFormData({
        title: slide.title,
        subtitle: slide.subtitle || '',
        description: slide.description || '',
        ctaLabel: slide.ctaLabel || '',
        ctaHref: slide.ctaHref || '',
        imageUrl: slide.imageUrl || '',
        isActive: slide.isActive,
        order: slide.order,
      });
    } else {
      setEditingSlide(null);
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        ctaLabel: '',
        ctaHref: '',
        imageUrl: '',
        isActive: true,
        order: slides.length,
      });
    }
    setOpenDialog(true);
    setCurrentTab('content');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSlide(null);
    setCurrentTab('content');
  };

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
          const maxSize = 1920;
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
          const base64 = canvas.toDataURL('image/jpeg', 0.85);
          resolve(base64);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setUploadingImage(true);

    try {
      const base64 = await compressAndConvertToBase64(file);
      setFormData({ ...formData, imageUrl: base64 });
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process image',
        variant: 'destructive',
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingSlide) {
        await api.heroSlides.update(editingSlide.id, formData);
        toast({
          title: 'Success',
          description: 'Hero slide updated successfully',
        });
      } else {
        await api.heroSlides.create(formData);
        toast({
          title: 'Success',
          description: 'Hero slide created successfully',
        });
      }
      handleCloseDialog();
      fetchSlides();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save slide',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.heroSlides.delete(id);
      toast({
        title: 'Success',
        description: 'Hero slide deleted successfully',
      });
      fetchSlides();
      setDeleteConfirm(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete slide',
        variant: 'destructive',
      });
    }
  };

  const handleDuplicate = async (slide: HeroSlide) => {
    try {
      const duplicateData: CreateHeroSlideDto = {
        title: `${slide.title} (Copy)`,
        subtitle: slide.subtitle || '',
        description: slide.description || '',
        ctaLabel: slide.ctaLabel || '',
        ctaHref: slide.ctaHref || '',
        imageUrl: slide.imageUrl || '',
        isActive: false,
        order: slides.length,
      };
      await api.heroSlides.create(duplicateData);
      toast({
        title: 'Success',
        description: 'Hero slide duplicated successfully',
      });
      fetchSlides();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to duplicate slide',
        variant: 'destructive',
      });
    }
  };

  const columns: ColumnDef<HeroSlide>[] = [
    {
      accessorKey: 'order',
      header: 'Order',
      cell: ({ row }) => <span className="font-medium">{row.getValue('order')}</span>,
    },
    {
      accessorKey: 'imageUrl',
      header: 'Image',
      cell: ({ row }) => {
        const imageUrl = row.getValue('imageUrl') as string;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt={row.original.title}
            className="w-24 h-14 object-cover rounded"
          />
        ) : (
          <div className="w-24 h-14 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">No Image</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => <span className="font-medium">{row.getValue('title')}</span>,
    },
    {
      accessorKey: 'subtitle',
      header: 'Subtitle',
      cell: ({ row }) => {
        const subtitle = row.getValue('subtitle') as string;
        return (
          <span className="text-sm text-gray-600">{subtitle || '—'}</span>
        );
      },
    },
    {
      accessorKey: 'ctaLabel',
      header: 'CTA Button',
      cell: ({ row }) => {
        const ctaLabel = row.getValue('ctaLabel') as string;
        return ctaLabel ? (
          <Badge variant="outline">{ctaLabel}</Badge>
        ) : (
          <span className="text-xs text-gray-500">No CTA</span>
        );
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.getValue('isActive') ? 'default' : 'secondary'} className={row.getValue('isActive') ? 'bg-green-600' : ''}>
          {row.getValue('isActive') ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleOpenDialog(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDuplicate(row.original)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDeleteConfirm(row.original.id)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Hero Slides Management</h1>
          <p className="text-gray-600">Manage homepage hero carousel slides</p>
        </div>
        <Button onClick={() => handleOpenDialog()} size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Add Hero Slide
        </Button>
      </div>

      {/* DataTable */}
      <DataTable columns={columns} data={slides} loading={loading} />

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-lg -mt-6 -mx-6 mb-4">
            <DialogTitle className="text-2xl">
              {editingSlide ? 'Edit Hero Slide' : 'Create New Hero Slide'}
            </DialogTitle>
            <DialogDescription className="text-indigo-100">
              {editingSlide
                ? 'Update slide information'
                : 'Add a new slide to your homepage carousel'}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">📝 Content</TabsTrigger>
              <TabsTrigger value="image">🖼️ Image</TabsTrigger>
              <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
            </TabsList>

            {/* Tab 1: Content */}
            <TabsContent value="content" className="space-y-4">
              <Card className="p-4 bg-gray-50">
                <h3 className="text-lg font-semibold text-indigo-600 mb-4">
                  Main Content
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Slide Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Welcome to Amigos IAS Academy"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={formData.subtitle}
                      onChange={(e) =>
                        setFormData({ ...formData, subtitle: e.target.value })
                      }
                      placeholder="Your Path to Civil Services Success"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Join thousands of successful candidates who achieved their dreams..."
                      rows={4}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gray-50">
                <h3 className="text-lg font-semibold text-indigo-600 mb-4">
                  Call-to-Action Button
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ctaLabel">Button Text</Label>
                    <Input
                      id="ctaLabel"
                      value={formData.ctaLabel}
                      onChange={(e) =>
                        setFormData({ ...formData, ctaLabel: e.target.value })
                      }
                      placeholder="Explore Courses"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Text shown on the button
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="ctaHref">Button Link</Label>
                    <Input
                      id="ctaHref"
                      value={formData.ctaHref}
                      onChange={(e) =>
                        setFormData({ ...formData, ctaHref: e.target.value })
                      }
                      placeholder="/courses"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Where the button links to
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab 2: Image */}
            <TabsContent value="image" className="space-y-4">
              <Card className="p-4 bg-gray-50">
                <h3 className="text-lg font-semibold text-indigo-600 mb-4">
                  Background Image
                </h3>
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    variant={imageInputMode === 'upload' ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => setImageInputMode('upload')}
                    className="flex-1"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <Button
                    type="button"
                    variant={imageInputMode === 'url' ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => setImageInputMode('url')}
                    className="flex-1"
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Use URL
                  </Button>
                </div>

                {imageInputMode === 'upload' ? (
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-600 hover:bg-indigo-50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={uploadingImage}
                    />
                    <label htmlFor="image-upload" className="cursor-pointer block">
                      <Upload className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold mb-2">
                        {uploadingImage
                          ? 'Processing Image...'
                          : 'Click to Choose Image'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        JPG, PNG, WEBP, GIF • Max 5MB • Recommended 1920x1080px
                      </p>
                    </label>
                  </div>
                ) : (
                  <Input
                    placeholder="https://images.pexels.com/... or /assets/hero.jpg"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                  />
                )}

                {formData.imageUrl && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-base font-semibold">
                        Image Preview
                      </Label>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setFormData({ ...formData, imageUrl: '' })}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full max-h-72 object-cover rounded-lg border-2 shadow-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        toast({
                          title: 'Error',
                          description: 'Failed to load image preview',
                          variant: 'destructive',
                        });
                      }}
                    />
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Tab 3: Settings */}
            <TabsContent value="settings" className="space-y-4">
              <Card className="p-4 bg-gray-50">
                <h3 className="text-lg font-semibold text-indigo-600 mb-4">
                  Display Settings
                </h3>
                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) })
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lower numbers appear first in the carousel (0, 1, 2...)
                  </p>
                </div>
              </Card>

              <Card className="p-4 bg-gray-50">
                <h3 className="text-lg font-semibold text-indigo-600 mb-4">
                  Visibility
                </h3>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isActive: checked })
                      }
                    />
                    <div>
                      <Label htmlFor="isActive" className="text-base font-semibold">
                        Active Slide
                      </Label>
                      <p className="text-xs text-gray-500">
                        When enabled, this slide appears in the homepage carousel
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              {editingSlide ? '✓ Update Slide' : '+ Create Slide'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this hero slide? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
