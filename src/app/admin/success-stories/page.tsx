'use client';

import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Pencil, Trash2, Upload, Link as LinkIcon, Video } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/services/api';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

interface SuccessStory {
  id: string;
  name: string;
  rank: string;
  year: string;
  image: string | null;
  videoId: string;
  journey: string;
  attempt: string;
  story: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateSuccessStoryDto {
  name: string;
  rank: string;
  year: string;
  image?: string;
  videoId: string;
  journey: string;
  attempt: string;
  story: string;
  order?: number;
  isActive?: boolean;
}

export default function SuccessStoriesAdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <SuccessStoriesContent />
        <Toaster />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function SuccessStoriesContent() {
  const { toast } = useToast();
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentTab, setCurrentTab] = useState('basic');
  const [imageInputMode, setImageInputMode] = useState<'url' | 'upload'>('url');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState<CreateSuccessStoryDto>({
    name: '',
    rank: '',
    year: '',
    image: '',
    videoId: '',
    journey: '',
    attempt: '',
    story: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchSuccessStories();
  }, []);

  const fetchSuccessStories = async () => {
    try {
      setLoading(true);
      const response = await api.successStories.getAll();
      setSuccessStories(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch success stories',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (story?: SuccessStory) => {
    if (story) {
      setEditingStory(story);
      setFormData({
        name: story.name,
        rank: story.rank,
        year: story.year,
        image: story.image || '',
        videoId: story.videoId,
        journey: story.journey,
        attempt: story.attempt,
        story: story.story,
        order: story.order,
        isActive: story.isActive,
      });
    } else {
      setEditingStory(null);
      setFormData({
        name: '',
        rank: '',
        year: '',
        image: '',
        videoId: '',
        journey: '',
        attempt: '',
        story: '',
        order: successStories.length,
        isActive: true,
      });
    }
    setOpenDialog(true);
    setCurrentTab('basic');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStory(null);
    setCurrentTab('basic');
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
          const MAX_WIDTH = 800;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
          resolve(compressedBase64);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please upload an image file',
        variant: 'destructive',
      });
      return;
    }

    try {
      setUploadingImage(true);
      const base64 = await compressAndConvertToBase64(file);
      setFormData({ ...formData, image: base64 });
      toast({
        title: 'Success',
        description: 'Image uploaded and compressed',
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
      setSubmitting(true);

      if (editingStory) {
        await api.successStories.update(editingStory.id, formData);
        toast({
          title: 'Success',
          description: 'Success story updated successfully',
        });
      } else {
        await api.successStories.create(formData);
        toast({
          title: 'Success',
          description: 'Success story created successfully',
        });
      }

      handleCloseDialog();
      fetchSuccessStories();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save success story',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.successStories.delete(id);
      toast({
        title: 'Success',
        description: 'Success story deleted successfully',
      });

      setDeleteConfirm(null);
      fetchSuccessStories();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete success story',
        variant: 'destructive',
      });
    }
  };

  const columns: ColumnDef<SuccessStory>[] = [
    {
      accessorKey: 'image',
      header: 'Photo',
      cell: ({ row }) => (
        <Avatar className="w-10 h-10">
          <AvatarImage src={row.original.image || ''} alt={row.original.name} />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div>
          <div className="font-semibold">{row.original.name}</div>
          <div className="text-sm text-gray-500">{row.original.rank} • {row.original.year}</div>
        </div>
      ),
    },
    {
      accessorKey: 'journey',
      header: 'Journey',
      cell: ({ row }) => (
        <div className="text-sm">
          <div>{row.original.journey}</div>
          <div className="text-gray-500">{row.original.attempt} attempt</div>
        </div>
      ),
    },
    {
      accessorKey: 'videoId',
      header: 'Video',
      cell: ({ row }) => (
        <a
          href={`https://youtube.com/watch?v=${row.original.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700"
        >
          <Video className="w-4 h-4" />
          <span className="text-xs">Watch</span>
        </a>
      ),
    },
    {
      accessorKey: 'order',
      header: 'Order',
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.order}</Badge>
      ),
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant={row.original.isActive ? 'default' : 'secondary'}
          className={row.original.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500'}
        >
          {row.original.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleOpenDialog(row.original)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDeleteConfirm(row.original.id)}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Success Stories
          </h1>
          <p className="text-gray-600 mt-1">
            Manage student success stories with videos
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Success Story
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={successStories}
        loading={loading}
      />

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {editingStory ? 'Edit Success Story' : 'Create New Success Story'}
            </DialogTitle>
            <DialogDescription>
              {editingStory ? 'Update the success story details below' : 'Fill in the details to create a new success story'}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="story">Story</TabsTrigger>
            </TabsList>

            {/* Tab 1: Basic Info */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rank">Rank *</Label>
                  <Input
                    id="rank"
                    placeholder="e.g., AIR 45"
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    placeholder="e.g., 2023"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attempt">Attempt *</Label>
                  <Input
                    id="attempt"
                    placeholder="e.g., 1st, 2nd"
                    value={formData.attempt}
                    onChange={(e) => setFormData({ ...formData, attempt: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="journey">Journey *</Label>
                <Input
                  id="journey"
                  placeholder="e.g., 18 Months"
                  value={formData.journey}
                  onChange={(e) => setFormData({ ...formData, journey: e.target.value })}
                />
              </div>
            </TabsContent>

            {/* Tab 2: Media */}
            <TabsContent value="media" className="space-y-4">
              <div className="space-y-2">
                <Label>Profile Image</Label>
                <div className="flex gap-2 mb-2">
                  <Button
                    type="button"
                    variant={imageInputMode === 'url' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setImageInputMode('url')}
                  >
                    <LinkIcon className="w-3 h-3 mr-1" />
                    URL
                  </Button>
                  <Button
                    type="button"
                    variant={imageInputMode === 'upload' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setImageInputMode('upload')}
                  >
                    <Upload className="w-3 h-3 mr-1" />
                    Upload
                  </Button>
                </div>

                {imageInputMode === 'url' ? (
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                ) : (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                )}

                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoId">YouTube Video ID *</Label>
                <Input
                  id="videoId"
                  placeholder="e.g., jfKfPfyJRdk"
                  value={formData.videoId}
                  onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
                />
                <p className="text-xs text-gray-500">
                  Enter the YouTube video ID (the part after v= in the URL)
                </p>
                {formData.videoId && (
                  <div className="mt-2 aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${formData.videoId}`}
                      className="w-full h-full rounded-lg border"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Tab 3: Story */}
            <TabsContent value="story" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="story">Success Story *</Label>
                <Textarea
                  id="story"
                  placeholder="Describe their journey to success..."
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  min="0"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Active</Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting || !formData.name || !formData.rank || !formData.videoId}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              {submitting ? 'Saving...' : editingStory ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this success story? This action cannot be undone.
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
