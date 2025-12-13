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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

interface CurrentAffair {
  id: string;
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  title: string;
  date: string;
  subject: string;
  paper: string;
  summary: string;
  fullContent: string;
  topics: string[];
  imageUrl?: string;
  issue?: string;
  order: number;
  isActive: boolean;
}

interface FilterOptions {
  types: string[];
  subjects: string[];
  papers: string[];
}

export default function CurrentAffairsAdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <CurrentAffairsContent />
        <Toaster />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function CurrentAffairsContent() {
  const { toast } = useToast();
  const [items, setItems] = useState<CurrentAffair[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    types: [],
    subjects: [],
    papers: [],
  });
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<CurrentAffair | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    type: 'DAILY' as 'DAILY' | 'WEEKLY' | 'MONTHLY',
    title: '',
    date: '',
    subject: '',
    paper: '',
    summary: '',
    fullContent: '',
    topics: '',
    imageUrl: '',
    issue: '',
    order: 0,
    isActive: true,
  });

  const [currentTab, setCurrentTab] = useState('basic');
  const [imageInputMode, setImageInputMode] = useState<'url' | 'upload'>('url');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [customSubject, setCustomSubject] = useState(false);
  const [customPaper, setCustomPaper] = useState(false);

  useEffect(() => {
    fetchItems();
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/current-affairs/filters`
      );
      const data = await response.json();
      setFilterOptions(data.data);
    } catch (error: any) {
      console.error('Failed to fetch filter options:', error);
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.currentAffairs.getAll();
      const itemsArray = response.data.items || response.data || [];
      setItems(itemsArray);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch current affairs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item?: CurrentAffair) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        type: item.type,
        title: item.title,
        date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
        subject: item.subject,
        paper: item.paper,
        summary: item.summary,
        fullContent: item.fullContent,
        topics: item.topics.join(', '),
        imageUrl: item.imageUrl || '',
        issue: item.issue || '',
        order: item.order,
        isActive: item.isActive,
      });
      // Check if subject/paper are custom (not in the filter options)
      setCustomSubject(!filterOptions.subjects.includes(item.subject));
      setCustomPaper(!filterOptions.papers.includes(item.paper));
    } else {
      setEditingItem(null);
      setFormData({
        type: 'DAILY',
        title: '',
        date: '',
        subject: '',
        paper: '',
        summary: '',
        fullContent: '',
        topics: '',
        imageUrl: '',
        issue: '',
        order: 0,
        isActive: true,
      });
      setCustomSubject(false);
      setCustomPaper(false);
    }
    setOpenDialog(true);
    setCurrentTab('basic');
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const base64 = await compressImage(file);
      setFormData((prev) => ({ ...prev, imageUrl: base64 }));
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const topicsArray = formData.topics
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const data = {
        type: formData.type,
        title: formData.title,
        date: new Date(formData.date).toISOString(),
        subject: formData.subject,
        paper: formData.paper,
        summary: formData.summary,
        fullContent: formData.fullContent,
        topics: topicsArray,
        imageUrl: formData.imageUrl || undefined,
        issue: formData.type === 'MONTHLY' ? formData.issue : undefined,
        order: formData.order,
        isActive: formData.isActive,
      };

      if (editingItem) {
        await api.currentAffairs.update(editingItem.id, data);
        toast({
          title: 'Success',
          description: 'Current affair updated successfully',
        });
      } else {
        await api.currentAffairs.create(data);
        toast({
          title: 'Success',
          description: 'Current affair created successfully',
        });
      }

      handleCloseDialog();
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save current affair',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.currentAffairs.delete(id);
      toast({
        title: 'Success',
        description: 'Current affair deleted successfully',
      });
      setDeleteConfirm(null);
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete current affair',
        variant: 'destructive',
      });
    }
  };

  const columns: ColumnDef<CurrentAffair>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="max-w-md">
          <div className="font-medium">{row.original.title}</div>
          <div className="text-xs text-gray-500">
            {new Date(row.original.date).toLocaleDateString()}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.type.toLowerCase()}
        </Badge>
      ),
    },
    {
      accessorKey: 'subject',
      header: 'Subject',
    },
    {
      accessorKey: 'paper',
      header: 'Paper',
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
          <h1 className="text-3xl font-bold">Current Affairs</h1>
          <p className="text-gray-500">Manage daily, weekly, and monthly current affairs</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Current Affair
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={items} loading={loading} />
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Current Affair' : 'Add Current Affair'}
            </DialogTitle>
            <DialogDescription>
              {editingItem
                ? 'Update the current affair details'
                : 'Create a new current affair entry'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.types.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0) + type.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject *</Label>
                      {customSubject ? (
                        <div className="flex gap-2">
                          <Input
                            id="subject"
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({ ...formData, subject: e.target.value })
                            }
                            placeholder="Enter custom subject"
                            required
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setCustomSubject(false);
                              setFormData({ ...formData, subject: '' });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Select
                            value={formData.subject}
                            onValueChange={(value) => {
                              if (value === '__custom__') {
                                setCustomSubject(true);
                                setFormData({ ...formData, subject: '' });
                              } else {
                                setFormData({ ...formData, subject: value });
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              {filterOptions.subjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                  {subject}
                                </SelectItem>
                              ))}
                              <SelectItem value="__custom__">
                                <span className="text-blue-600 font-medium">+ Add Custom Subject</span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="paper">Paper *</Label>
                      {customPaper ? (
                        <div className="flex gap-2">
                          <Input
                            id="paper"
                            value={formData.paper}
                            onChange={(e) =>
                              setFormData({ ...formData, paper: e.target.value })
                            }
                            placeholder="Enter custom paper"
                            required
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setCustomPaper(false);
                              setFormData({ ...formData, paper: '' });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Select
                            value={formData.paper}
                            onValueChange={(value) => {
                              if (value === '__custom__') {
                                setCustomPaper(true);
                                setFormData({ ...formData, paper: '' });
                              } else {
                                setFormData({ ...formData, paper: value });
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select paper" />
                            </SelectTrigger>
                            <SelectContent>
                              {filterOptions.papers.map((paper) => (
                                <SelectItem key={paper} value={paper}>
                                  {paper}
                                </SelectItem>
                              ))}
                              <SelectItem value="__custom__">
                                <span className="text-blue-600 font-medium">+ Add Custom Paper</span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>

                  {formData.type === 'MONTHLY' && (
                    <div className="grid gap-2">
                      <Label htmlFor="issue">Issue (e.g., "November 2025")</Label>
                      <Input
                        id="issue"
                        value={formData.issue}
                        onChange={(e) =>
                          setFormData({ ...formData, issue: e.target.value })
                        }
                        placeholder="November 2025"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="summary">Summary *</Label>
                    <Textarea
                      id="summary"
                      value={formData.summary}
                      onChange={(e) =>
                        setFormData({ ...formData, summary: e.target.value })
                      }
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="fullContent">Full Content *</Label>
                    <Textarea
                      id="fullContent"
                      value={formData.fullContent}
                      onChange={(e) =>
                        setFormData({ ...formData, fullContent: e.target.value })
                      }
                      rows={6}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="topics">Topics (comma-separated) *</Label>
                    <Input
                      id="topics"
                      value={formData.topics}
                      onChange={(e) =>
                        setFormData({ ...formData, topics: e.target.value })
                      }
                      placeholder="Diplomacy, Trade, Defense"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Image</Label>
                    <Tabs
                      value={imageInputMode}
                      onValueChange={(v: any) => setImageInputMode(v)}
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="url">
                          <LinkIcon className="mr-2 h-4 w-4" />
                          URL
                        </TabsTrigger>
                        <TabsTrigger value="upload">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="url">
                        <Input
                          placeholder="https://example.com/image.jpg"
                          value={formData.imageUrl}
                          onChange={(e) =>
                            setFormData({ ...formData, imageUrl: e.target.value })
                          }
                        />
                      </TabsContent>
                      <TabsContent value="upload">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                        />
                        {uploadingImage && (
                          <p className="text-sm text-gray-500 mt-2">
                            Uploading and compressing...
                          </p>
                        )}
                      </TabsContent>
                    </Tabs>
                    {formData.imageUrl && (
                      <div className="mt-2">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="max-w-full h-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="grid gap-4">
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
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
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
              Are you sure you want to delete this current affair? This action cannot be
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
