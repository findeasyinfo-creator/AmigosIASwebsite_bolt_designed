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

type BlogCategory = 'STRATEGY' | 'FACULTY_COLUMN' | 'NEWS_ANALYSIS' | 'EXAM_TIPS' | 'STUDY_GUIDE';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  author: string;
  authorImage?: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  readTime?: string;
  publishedAt?: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  displayOnHome: boolean;
  createdAt: string;
  updatedAt: string;
}

const BLOG_CATEGORIES: { value: BlogCategory; label: string }[] = [
  { value: 'STRATEGY', label: 'Strategy Articles' },
  { value: 'FACULTY_COLUMN', label: 'Faculty Columns' },
  { value: 'NEWS_ANALYSIS', label: 'News Analysis' },
  { value: 'EXAM_TIPS', label: 'Exam Tips' },
  { value: 'STUDY_GUIDE', label: 'Study Guides' },
];

export default function BlogPostsAdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <BlogPostsContent />
        <Toaster />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function BlogPostsContent() {
  const { toast } = useToast();
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'STRATEGY' as BlogCategory,
    author: '',
    authorImage: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: '',
    readTime: '',
    publishedAt: '',
    order: 0,
    isActive: true,
    isFeatured: false,
    displayOnHome: false,
  });

  const [currentTab, setCurrentTab] = useState('basic');
  const [imageInputMode, setImageInputMode] = useState<'url' | 'upload'>('url');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.blogPosts.getAll();
      const itemsArray = response.data.items || response.data || [];
      setItems(itemsArray);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch blog posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item?: BlogPost) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        slug: item.slug,
        category: item.category,
        author: item.author,
        authorImage: item.authorImage || '',
        excerpt: item.excerpt,
        content: item.content,
        coverImage: item.coverImage || '',
        tags: item.tags.join(', '),
        readTime: item.readTime || '',
        publishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString().split('T')[0] : '',
        order: item.order,
        isActive: item.isActive,
        isFeatured: item.isFeatured,
        displayOnHome: item.displayOnHome,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        slug: '',
        category: 'STRATEGY',
        author: '',
        authorImage: '',
        excerpt: '',
        content: '',
        coverImage: '',
        tags: '',
        readTime: '',
        publishedAt: new Date().toISOString().split('T')[0],
        order: 0,
        isActive: true,
        isFeatured: false,
        displayOnHome: false,
      });
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
          const MAX_WIDTH = 1200;
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'coverImage' | 'authorImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const base64 = await compressImage(file);
      setFormData((prev) => ({ ...prev, [field]: base64 }));
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
      const tagsArray = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const data = {
        title: formData.title,
        slug: formData.slug || undefined,
        category: formData.category,
        author: formData.author,
        authorImage: formData.authorImage || undefined,
        excerpt: formData.excerpt,
        content: formData.content,
        coverImage: formData.coverImage || undefined,
        tags: tagsArray,
        readTime: formData.readTime || undefined,
        publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : undefined,
        order: formData.order,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
      };

      if (editingItem) {
        await api.blogPosts.update(editingItem.id, data);
        toast({
          title: 'Success',
          description: 'Blog post updated successfully',
        });
      } else {
        await api.blogPosts.create(data);
        toast({
          title: 'Success',
          description: 'Blog post created successfully',
        });
      }

      handleCloseDialog();
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save blog post',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.blogPosts.delete(id);
      toast({
        title: 'Success',
        description: 'Blog post deleted successfully',
      });
      setDeleteConfirm(null);
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete blog post',
        variant: 'destructive',
      });
    }
  };

  const getCategoryLabel = (category: BlogCategory) => {
    return BLOG_CATEGORIES.find((c) => c.value === category)?.label || category;
  };

  const columns: ColumnDef<BlogPost>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="max-w-md">
          <div className="font-medium">{row.original.title}</div>
          <div className="text-xs text-gray-500">
            by {row.original.author} {row.original.readTime && `• ${row.original.readTime}`}
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
      accessorKey: 'publishedAt',
      header: 'Published',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.publishedAt
            ? new Date(row.original.publishedAt).toLocaleDateString()
            : 'Not published'}
        </span>
      ),
    },
    {
      accessorKey: 'isFeatured',
      header: 'Featured',
      cell: ({ row }) => (
        <Badge
          variant={row.original.isFeatured ? 'default' : 'secondary'}
          className={row.original.isFeatured ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
        >
          {row.original.isFeatured ? 'Featured' : 'Normal'}
        </Badge>
      ),
    },
    {
      accessorKey: 'displayOnHome',
      header: 'Homepage',
      cell: ({ row }) => (
        <Badge
          variant={row.original.displayOnHome ? 'default' : 'secondary'}
          className={row.original.displayOnHome ? 'bg-cyan-600' : ''}
        >
          {row.original.displayOnHome ? 'Homepage' : 'Not on Homepage'}
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
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-gray-500">Manage strategy articles, faculty columns, and other blog content</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Blog Post
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={items} loading={loading} />
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Blog Post' : 'Add Blog Post'}
            </DialogTitle>
            <DialogDescription>
              {editingItem
                ? 'Update the blog post details'
                : 'Create a new blog post'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="How to Prepare for UPSC Prelims"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="slug">URL Slug (auto-generated if empty)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      placeholder="how-to-prepare-for-upsc-prelims"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value: BlogCategory) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {BLOG_CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="readTime">Read Time</Label>
                      <Input
                        id="readTime"
                        value={formData.readTime}
                        onChange={(e) =>
                          setFormData({ ...formData, readTime: e.target.value })
                        }
                        placeholder="8 min"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="author">Author *</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) =>
                          setFormData({ ...formData, author: e.target.value })
                        }
                        placeholder="Dr. Rajesh Kumar"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="publishedAt">Publish Date</Label>
                      <Input
                        id="publishedAt"
                        type="date"
                        value={formData.publishedAt}
                        onChange={(e) =>
                          setFormData({ ...formData, publishedAt: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      placeholder="UPSC, Prelims, Strategy, Tips"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="excerpt">Excerpt (Summary) *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData({ ...formData, excerpt: e.target.value })
                      }
                      rows={3}
                      placeholder="A brief summary of the article..."
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="content">Full Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      rows={15}
                      placeholder="Write your article content here... (Markdown supported)"
                      required
                    />
                    <p className="text-xs text-gray-500">You can use Markdown formatting</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Cover Image</Label>
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
                          value={formData.coverImage}
                          onChange={(e) =>
                            setFormData({ ...formData, coverImage: e.target.value })
                          }
                        />
                      </TabsContent>
                      <TabsContent value="upload">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'coverImage')}
                          disabled={uploadingImage}
                        />
                        {uploadingImage && (
                          <p className="text-sm text-gray-500 mt-2">
                            Uploading and compressing...
                          </p>
                        )}
                      </TabsContent>
                    </Tabs>
                    {formData.coverImage && (
                      <div className="mt-2 relative">
                        <img
                          src={formData.coverImage}
                          alt="Cover Preview"
                          className="max-w-full h-48 object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => setFormData({ ...formData, coverImage: '' })}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label>Author Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'authorImage')}
                      disabled={uploadingImage}
                    />
                    {formData.authorImage && (
                      <div className="mt-2 relative inline-block">
                        <img
                          src={formData.authorImage}
                          alt="Author Preview"
                          className="w-20 h-20 object-cover rounded-full"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={() => setFormData({ ...formData, authorImage: '' })}
                        >
                          <X className="h-3 w-3" />
                        </Button>
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
                    <p className="text-xs text-gray-500">Lower numbers appear first</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isActive: checked })
                      }
                    />
                    <Label htmlFor="isActive">Active (visible on website)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isFeatured: checked })
                      }
                    />
                    <Label htmlFor="isFeatured">Featured (highlighted on homepage)</Label>
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
              Are you sure you want to delete this blog post? This action cannot be
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
