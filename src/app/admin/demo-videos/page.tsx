'use client';

import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Pencil, Trash2, Video, Upload, X, Play } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/services/api';
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
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';

interface DemoVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateDemoVideoDto {
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  order?: number;
  isActive?: boolean;
}

export default function DemoVideosAdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <DemoVideosContent />
        <Toaster />
      </AdminLayout>
    </ProtectedRoute>
  );
}

// Image compression utility
const compressImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        const compressed = canvas.toDataURL('image/jpeg', 0.85);
        resolve(compressed);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

function DemoVideosContent() {
  const { toast } = useToast();
  const [demoVideos, setDemoVideos] = useState<DemoVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingVideo, setEditingVideo] = useState<DemoVideo | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<CreateDemoVideoDto>({
    title: '',
    description: '',
    thumbnail: '',
    videoId: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchDemoVideos();
  }, []);

  const fetchDemoVideos = async () => {
    try {
      setLoading(true);
      const response = await api.demoVideos.getAll();
      setDemoVideos(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch demo videos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (video?: DemoVideo) => {
    if (video) {
      setEditingVideo(video);
      setFormData({
        title: video.title,
        description: video.description,
        thumbnail: video.thumbnail,
        videoId: video.videoId,
        order: video.order,
        isActive: video.isActive,
      });
    } else {
      setEditingVideo(null);
      setFormData({
        title: '',
        description: '',
        thumbnail: '',
        videoId: '',
        order: demoVideos.length,
        isActive: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingVideo(null);
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
      setUploading(true);
      const compressed = await compressImage(file);
      setFormData({ ...formData, thumbnail: compressed });
      toast({
        title: 'Success',
        description: 'Thumbnail uploaded and compressed',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to process image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.thumbnail || !formData.videoId) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmitting(true);

      if (editingVideo) {
        await api.demoVideos.update(editingVideo.id, formData);
        toast({
          title: 'Success',
          description: 'Demo video updated successfully',
        });
      } else {
        await api.demoVideos.create(formData);
        toast({
          title: 'Success',
          description: 'Demo video created successfully',
        });
      }

      handleCloseDialog();
      fetchDemoVideos();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save demo video',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.demoVideos.delete(id);
      toast({
        title: 'Success',
        description: 'Demo video deleted successfully',
      });

      setDeleteConfirm(null);
      fetchDemoVideos();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete demo video',
        variant: 'destructive',
      });
    }
  };

  const columns: ColumnDef<DemoVideo>[] = [
    {
      accessorKey: 'thumbnail',
      header: 'Thumbnail',
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Image
            src={row.original.thumbnail}
            alt={row.original.title}
            width={120}
            height={68}
            className="rounded-lg object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="max-w-md">
          <div className="font-semibold text-gray-900">{row.original.title}</div>
          <div className="text-sm text-gray-500 line-clamp-2">{row.original.description}</div>
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
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
        >
          <Play className="w-4 h-4" />
          <span className="text-sm font-mono">{row.original.videoId}</span>
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Demo Videos Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage demo video showcase section
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Demo Video
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={demoVideos}
        loading={loading}
      />

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {editingVideo ? 'Edit Demo Video' : 'Create New Demo Video'}
            </DialogTitle>
            <DialogDescription>
              {editingVideo ? 'Update the demo video details below' : 'Fill in the details to create a new demo video'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title*</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="UPSC Prelims Strategy"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Complete guide to prepare for UPSC Prelims examination..."
                rows={3}
              />
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail Image*</Label>
              <div className="flex items-start gap-4">
                {formData.thumbnail && (
                  <div className="relative">
                    <Image
                      src={formData.thumbnail}
                      alt="Preview"
                      width={200}
                      height={113}
                      className="rounded-lg object-cover border-2 border-gray-200"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                      onClick={() => setFormData({ ...formData, thumbnail: '' })}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a thumbnail image (max 800px width, auto-compressed)
                  </p>
                </div>
              </div>
            </div>

            {/* Video ID */}
            <div className="space-y-2">
              <Label htmlFor="videoId">YouTube Video ID*</Label>
              <Input
                id="videoId"
                value={formData.videoId}
                onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
                placeholder="jfKfPfyJRdk"
              />
              <p className="text-xs text-gray-500">
                Enter the YouTube video ID (e.g., from https://youtube.com/watch?v=<strong>jfKfPfyJRdk</strong>)
              </p>
              {formData.videoId && (
                <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">Video Preview:</p>
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full rounded"
                      src={`https://www.youtube.com/embed/${formData.videoId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Order */}
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                min={0}
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting || uploading}
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700"
            >
              {submitting ? 'Saving...' : editingVideo ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this demo video? This action cannot be undone.
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
