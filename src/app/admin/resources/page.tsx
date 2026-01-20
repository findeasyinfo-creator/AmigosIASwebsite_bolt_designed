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
  FileText,
  Download,
} from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

type ResourceCategory = 'STUDY_MATERIAL' | 'NCERT' | 'PYQ' | 'NOTES' | 'OTHER';

interface Resource {
  id: string;
  title: string;
  category: ResourceCategory;
  subject: string;
  description?: string;
  fileUrl?: string;
  fileSize?: string;
  pages?: string;
  year?: string;
  classLevel?: string;
  stage?: string;
  thumbnail?: string;
  order: number;
  isActive: boolean;
  displayOnHome: boolean;
  createdAt: string;
  updatedAt: string;
}

const RESOURCE_CATEGORIES: { value: ResourceCategory; label: string }[] = [
  { value: 'STUDY_MATERIAL', label: 'Study Materials' },
  { value: 'NCERT', label: 'NCERTs' },
  { value: 'PYQ', label: 'Previous Year Papers' },
  { value: 'NOTES', label: 'Notes' },
  { value: 'OTHER', label: 'Other' },
];

const SUBJECTS = [
  'Polity',
  'History',
  'Geography',
  'Economics',
  'Science',
  'Environment',
  'Ethics',
  'International Relations',
  'Art & Culture',
  'Society',
  'Security',
  'General Studies',
];

const STAGES = ['Prelims', 'Mains'];

const CLASS_LEVELS = [
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

export default function ResourcesAdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <ResourcesContent />
        <Toaster />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function ResourcesContent() {
  const { toast } = useToast();
  const [items, setItems] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Resource | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'STUDY_MATERIAL' as ResourceCategory,
    subject: '',
    description: '',
    fileUrl: '',
    fileSize: '',
    pages: '',
    year: '',
    classLevel: '',
    stage: '',
    thumbnail: '',
    order: 0,
    isActive: true,
    displayOnHome: false,
  });

  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.resources.getAll();
      const itemsArray = response.data.items || response.data || [];
      setItems(itemsArray);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch resources',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item?: Resource) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        category: item.category,
        subject: item.subject,
        description: item.description || '',
        fileUrl: item.fileUrl || '',
        fileSize: item.fileSize || '',
        pages: item.pages || '',
        year: item.year || '',
        classLevel: item.classLevel || '',
        stage: item.stage || '',
        thumbnail: item.thumbnail || '',
        order: item.order,
        isActive: item.isActive,
        displayOnHome: item.displayOnHome || false,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        category: 'STUDY_MATERIAL',
        subject: '',
        description: '',
        fileUrl: '',
        fileSize: '',
        pages: '',
        year: '',
        classLevel: '',
        stage: '',
        thumbnail: '',
        order: 0,
        isActive: true,
        displayOnHome: false,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
  };

  const compressImage = async (file: File): Promise<string> => {
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

          const base64 = canvas.toDataURL('image/jpeg', 0.85);
          resolve(base64);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingFile(true);
      const base64 = await compressImage(file);
      setFormData((prev) => ({ ...prev, thumbnail: base64 }));
      toast({
        title: 'Success',
        description: 'Thumbnail uploaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload thumbnail',
        variant: 'destructive',
      });
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        title: formData.title,
        category: formData.category,
        subject: formData.subject,
        description: formData.description || undefined,
        fileUrl: formData.fileUrl || undefined,
        fileSize: formData.fileSize || undefined,
        pages: formData.pages || undefined,
        year: formData.year || undefined,
        classLevel: formData.classLevel || undefined,
        stage: formData.stage || undefined,
        thumbnail: formData.thumbnail || undefined,
        order: formData.order,
        isActive: formData.isActive,
        displayOnHome: formData.displayOnHome,
      };

      if (editingItem) {
        await api.resources.update(editingItem.id, data);
        toast({
          title: 'Success',
          description: 'Resource updated successfully',
        });
      } else {
        await api.resources.create(data);
        toast({
          title: 'Success',
          description: 'Resource created successfully',
        });
      }

      handleCloseDialog();
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save resource',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.resources.delete(id);
      toast({
        title: 'Success',
        description: 'Resource deleted successfully',
      });
      setDeleteConfirm(null);
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete resource',
        variant: 'destructive',
      });
    }
  };

  const getCategoryLabel = (category: ResourceCategory) => {
    return RESOURCE_CATEGORIES.find((c) => c.value === category)?.label || category;
  };

  const columns: ColumnDef<Resource>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="max-w-md">
          <div className="font-medium">{row.original.title}</div>
          <div className="text-xs text-gray-500">
            {row.original.subject} {row.original.pages && `• ${row.original.pages}`}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {getCategoryLabel(row.original.category)}
        </Badge>
      ),
    },
    {
      accessorKey: 'subject',
      header: 'Subject',
    },
    {
      accessorKey: 'year',
      header: 'Year/Class',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.year || row.original.classLevel || '-'}
        </span>
      ),
    },
    {
      accessorKey: 'displayOnHome',
      header: 'Homepage',
      cell: ({ row }) => (
        <Badge
          variant={row.getValue('displayOnHome') ? 'default' : 'secondary'}
          className={row.getValue('displayOnHome') ? 'bg-cyan-600' : ''}
        >
          {row.getValue('displayOnHome') ? 'Featured' : 'Not Featured'}
        </Badge>
      ),
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant={row.original.isActive ? 'default' : 'secondary'}
          className={row.original.isActive ? 'bg-green-500 hover:bg-green-600' : ''}
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-gray-500">Manage study materials, NCERTs, previous year papers, and notes</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={items} loading={loading} />
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Resource' : 'Add Resource'}
            </DialogTitle>
            <DialogDescription>
              {editingItem
                ? 'Update the resource details'
                : 'Create a new downloadable resource'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Indian Polity Complete Notes"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: ResourceCategory) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {RESOURCE_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      setFormData({ ...formData, subject: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={2}
                  placeholder="Brief description of the resource..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fileUrl">File URL / Download Link</Label>
                  <Input
                    id="fileUrl"
                    value={formData.fileUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, fileUrl: e.target.value })
                    }
                    placeholder="https://example.com/file.pdf"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fileSize">File Size</Label>
                  <Input
                    id="fileSize"
                    value={formData.fileSize}
                    onChange={(e) =>
                      setFormData({ ...formData, fileSize: e.target.value })
                    }
                    placeholder="2.5 MB"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pages">Pages</Label>
                  <Input
                    id="pages"
                    value={formData.pages}
                    onChange={(e) =>
                      setFormData({ ...formData, pages: e.target.value })
                    }
                    placeholder="250 pages"
                  />
                </div>

                {formData.category === 'PYQ' && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        value={formData.year}
                        onChange={(e) =>
                          setFormData({ ...formData, year: e.target.value })
                        }
                        placeholder="2024"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="stage">Stage</Label>
                      <Select
                        value={formData.stage}
                        onValueChange={(value) =>
                          setFormData({ ...formData, stage: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {STAGES.map((stage) => (
                            <SelectItem key={stage} value={stage}>
                              {stage}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {formData.category === 'NCERT' && (
                  <div className="grid gap-2 col-span-2">
                    <Label htmlFor="classLevel">Class Level</Label>
                    <Select
                      value={formData.classLevel}
                      onValueChange={(value) =>
                        setFormData({ ...formData, classLevel: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {CLASS_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Thumbnail Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  disabled={uploadingFile}
                />
                {uploadingFile && (
                  <p className="text-sm text-gray-500">Uploading...</p>
                )}
                {formData.thumbnail && (
                  <div className="mt-2 relative inline-block">
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail Preview"
                      className="h-24 object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => setFormData({ ...formData, thumbnail: '' })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
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

              <div className="flex items-center space-x-2">
                <Switch
                  id="displayOnHome"
                  checked={formData.displayOnHome}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, displayOnHome: checked })
                  }
                />
                <Label htmlFor="displayOnHome">Display on Homepage</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this resource? This action cannot be
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
