'use client';

import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Link as LinkIcon,
  Video,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/services/api';
import { Faculty, CreateFacultyDto } from '@/types/api.types';
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

export default function FacultyAdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <FacultyContent />
        <Toaster />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function FacultyContent() {
  const { toast } = useToast();
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateFacultyDto>({
    name: '',
    designation: '',
    subject: '',
    experience: '',
    qualifications: '',
    achievements: '',
    photo: '',
    videoThumbnail: '',
    videoUrl: '',
    fullBio: '',
    isActive: true,
    order: 0,
    displayOnHome: true,
  });

  const [currentTab, setCurrentTab] = useState('basic');
  const [photoInputMode, setPhotoInputMode] = useState<'url' | 'upload'>('url');
  const [thumbnailInputMode, setThumbnailInputMode] = useState<'url' | 'upload'>('url');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const response = await api.faculty.getAll();
      setFaculty(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch faculty',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (member?: Faculty) => {
    if (member) {
      setEditingFaculty(member);
      setFormData({
        name: member.name,
        designation: member.designation,
        subject: member.subject,
        experience: member.experience,
        qualifications: member.qualifications || '',
        achievements: member.achievements || '',
        photo: member.photo || '',
        videoThumbnail: member.videoThumbnail || '',
        videoUrl: member.videoUrl || '',
        fullBio: member.fullBio || '',
        isActive: member.isActive,
        order: member.order,
        displayOnHome: member.displayOnHome,
      });
    } else {
      setEditingFaculty(null);
      setFormData({
        name: '',
        designation: '',
        subject: '',
        experience: '',
        qualifications: '',
        achievements: '',
        photo: '',
        videoThumbnail: '',
        videoUrl: '',
        fullBio: '',
        isActive: true,
        order: faculty.length,
        displayOnHome: true,
      });
    }
    setOpenDialog(true);
    setCurrentTab('basic');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingFaculty(null);
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
          let width = img.width;
          let height = img.height;
          const maxSize = 800;
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

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setUploadingPhoto(true);

    try {
      const base64 = await compressAndConvertToBase64(file);
      setFormData({ ...formData, photo: base64 });
      toast({
        title: 'Success',
        description: 'Photo uploaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process image',
        variant: 'destructive',
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setUploadingThumbnail(true);

    try {
      const base64 = await compressAndConvertToBase64(file);
      setFormData({ ...formData, videoThumbnail: base64 });
      toast({
        title: 'Success',
        description: 'Thumbnail uploaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process image',
        variant: 'destructive',
      });
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingFaculty) {
        await api.faculty.update(editingFaculty.id, formData);
        toast({
          title: 'Success',
          description: 'Faculty member updated successfully',
        });
      } else {
        await api.faculty.create(formData);
        toast({
          title: 'Success',
          description: 'Faculty member created successfully',
        });
      }
      handleCloseDialog();
      fetchFaculty();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save faculty member',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.faculty.delete(id);
      toast({
        title: 'Success',
        description: 'Faculty member deleted successfully',
      });
      fetchFaculty();
      setDeleteConfirm(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete faculty member',
        variant: 'destructive',
      });
    }
  };

  const columns: ColumnDef<Faculty>[] = [
    {
      accessorKey: 'order',
      header: 'Order',
      cell: ({ row }) => <span className="font-medium">{row.getValue('order')}</span>,
    },
    {
      accessorKey: 'photo',
      header: 'Photo',
      cell: ({ row }) => {
        const photo = row.getValue('photo') as string;
        return (
          <Avatar className="h-10 w-10">
            <AvatarImage src={photo || undefined} alt={row.original.name} />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'designation',
      header: 'Designation',
    },
    {
      accessorKey: 'subject',
      header: 'Subject',
    },
    {
      accessorKey: 'experience',
      header: 'Experience',
    },
    {
      accessorKey: 'videoUrl',
      header: 'Video',
      cell: ({ row }) => {
        const videoUrl = row.getValue('videoUrl') as string;
        return videoUrl ? (
          <Badge className="bg-indigo-600">
            <Video className="mr-1 h-3 w-3" />
            Yes
          </Badge>
        ) : (
          <Badge variant="outline">No</Badge>
        );
      },
    },
    {
      accessorKey: 'displayOnHome',
      header: 'On Home',
      cell: ({ row }) => (
        <Badge variant={row.getValue('displayOnHome') ? 'default' : 'secondary'} className={row.getValue('displayOnHome') ? 'bg-green-600' : ''}>
          {row.getValue('displayOnHome') ? 'Yes' : 'No'}
        </Badge>
      ),
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
          <h1 className="text-4xl font-bold mb-2">Faculty Management</h1>
          <p className="text-gray-600">Manage faculty members and instructors</p>
        </div>
        <Button onClick={() => handleOpenDialog()} size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Add Faculty Member
        </Button>
      </div>

      {/* DataTable */}
      <DataTable columns={columns} data={faculty} loading={loading} />

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-lg -mt-6 -mx-6 mb-4">
            <DialogTitle className="text-2xl">
              {editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}
            </DialogTitle>
            <DialogDescription className="text-indigo-100">
              {editingFaculty
                ? 'Update faculty information'
                : 'Add a new faculty member to your team'}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">👤 Basic Info</TabsTrigger>
              <TabsTrigger value="media">📷 Media</TabsTrigger>
              <TabsTrigger value="bio">📄 Biography</TabsTrigger>
            </TabsList>

            {/* Tab 1: Basic Info */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Dr. Rajesh Kumar"
                  />
                </div>

                <div>
                  <Label htmlFor="designation">Designation *</Label>
                  <Input
                    id="designation"
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                    placeholder="Political Science Expert"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="History & Culture"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Experience *</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    placeholder="15+ Years"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="qualifications">Qualifications</Label>
                  <Input
                    id="qualifications"
                    value={formData.qualifications}
                    onChange={(e) =>
                      setFormData({ ...formData, qualifications: e.target.value })
                    }
                    placeholder="PhD in History, MA History, NET/JRF Qualified"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="achievements">Achievements</Label>
                  <Input
                    id="achievements"
                    value={formData.achievements}
                    onChange={(e) =>
                      setFormData({ ...formData, achievements: e.target.value })
                    }
                    placeholder="Mentored 200+ Toppers, Published 5 Books"
                  />
                </div>

                <div>
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) })
                    }
                  />
                </div>

                <div className="col-span-2 flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="displayOnHome"
                      checked={formData.displayOnHome}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, displayOnHome: checked })
                      }
                    />
                    <Label htmlFor="displayOnHome">Display on Home</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isActive: checked })
                      }
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Media */}
            <TabsContent value="media" className="space-y-6">
              {/* Faculty Photo */}
              <div>
                <Label className="text-base font-semibold">Faculty Photo</Label>
                <div className="flex gap-2 mt-2 mb-3">
                  <Button
                    type="button"
                    variant={photoInputMode === 'upload' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPhotoInputMode('upload')}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                  <Button
                    type="button"
                    variant={photoInputMode === 'url' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPhotoInputMode('url')}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    URL
                  </Button>
                </div>

                {photoInputMode === 'upload' ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                      disabled={uploadingPhoto}
                    />
                    <label htmlFor="photo-upload">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        disabled={uploadingPhoto}
                        asChild
                      >
                        <span>
                          {uploadingPhoto ? 'Processing...' : 'Choose Photo File'}
                        </span>
                      </Button>
                    </label>
                  </div>
                ) : (
                  <Input
                    placeholder="https://... or /assets/photo.jpg"
                    value={formData.photo}
                    onChange={(e) =>
                      setFormData({ ...formData, photo: e.target.value })
                    }
                  />
                )}

                {formData.photo && (
                  <div className="mt-3 flex items-center gap-3">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={formData.photo} alt="Preview" />
                    </Avatar>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setFormData({ ...formData, photo: '' })}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>

              {/* Video Thumbnail */}
              <div>
                <Label className="text-base font-semibold">Video Thumbnail</Label>
                <div className="flex gap-2 mt-2 mb-3">
                  <Button
                    type="button"
                    variant={thumbnailInputMode === 'upload' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setThumbnailInputMode('upload')}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                  <Button
                    type="button"
                    variant={thumbnailInputMode === 'url' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setThumbnailInputMode('url')}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    URL
                  </Button>
                </div>

                {thumbnailInputMode === 'upload' ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                      id="thumbnail-upload"
                      disabled={uploadingThumbnail}
                    />
                    <label htmlFor="thumbnail-upload">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        disabled={uploadingThumbnail}
                        asChild
                      >
                        <span>
                          {uploadingThumbnail
                            ? 'Processing...'
                            : 'Choose Thumbnail File'}
                        </span>
                      </Button>
                    </label>
                  </div>
                ) : (
                  <Input
                    placeholder="https://... or /assets/thumbnail.jpg"
                    value={formData.videoThumbnail}
                    onChange={(e) =>
                      setFormData({ ...formData, videoThumbnail: e.target.value })
                    }
                  />
                )}

                {formData.videoThumbnail && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={formData.videoThumbnail}
                      alt="Thumbnail preview"
                      className="w-32 h-20 object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        setFormData({ ...formData, videoThumbnail: '' })
                      }
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>

              {/* Video URL */}
              <div>
                <Label htmlFor="videoUrl">YouTube Video URL</Label>
                <div className="relative">
                  <Video className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, videoUrl: e.target.value })
                    }
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Paste the full YouTube URL or just the video ID
                </p>
              </div>
            </TabsContent>

            {/* Tab 3: Biography */}
            <TabsContent value="bio" className="space-y-4">
              <div>
                <Label htmlFor="fullBio">Full Biography</Label>
                <Textarea
                  id="fullBio"
                  value={formData.fullBio}
                  onChange={(e) =>
                    setFormData({ ...formData, fullBio: e.target.value })
                  }
                  placeholder="Write a detailed biography about the faculty member, their background, expertise, teaching philosophy, etc..."
                  rows={10}
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be displayed on the faculty detail page
                </p>
              </div>
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
              {editingFaculty ? '✓ Update Faculty' : '+ Add Faculty'}
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
              Are you sure you want to delete this faculty member? This action
              cannot be undone.
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
