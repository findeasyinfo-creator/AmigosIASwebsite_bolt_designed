'use client';

import { useEffect, useState, useMemo } from 'react';
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
import { Course, CreateCourseDto } from '@/types/api.types';
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

const defaultCategories = [
  { value: 'foundation', label: 'Foundation' },
  { value: 'prelims', label: 'Prelims' },
  { value: 'mains', label: 'Mains' },
  { value: 'interview', label: 'Interview' },
  { value: 'optional', label: 'Optional Subjects' },
  { value: 'weekend', label: 'Weekend Courses' },
];

export default function CoursesAdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <CoursesContent />
        <Toaster />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function CoursesContent() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateCourseDto>({
    title: '',
    category: 'foundation',
    duration: '',
    fees: '',
    startDate: '',
    icon: '',
    description: '',
    fullDescription: '',
    features: [],
    isOnline: false,
    isOffline: true,
    isActive: true,
    order: 0,
    displayOnHome: false,
    bankAccountName: '',
    bankAccountNumber: '',
    bankIFSC: '',
    bankName: '',
    bankBranch: '',
    upiId: '',
  });

  const [currentTab, setCurrentTab] = useState('basic');
  const [imageInputMode, setImageInputMode] = useState<'url' | 'upload'>('url');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  // Get all unique categories from existing courses + default categories
  const allCategories = useMemo(() => {
    const courseCategories = courses.map(c => c.category);
    const uniqueCategories = new Set([
      ...defaultCategories.map(c => c.value),
      ...courseCategories
    ]);
    return Array.from(uniqueCategories).map(cat => {
      const defaultCat = defaultCategories.find(c => c.value === cat);
      return {
        value: cat,
        label: defaultCat?.label || cat.charAt(0).toUpperCase() + cat.slice(1)
      };
    });
  }, [courses]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.courses.getAll();
      setCourses(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch courses',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        category: course.category,
        duration: course.duration,
        fees: course.fees,
        startDate: course.startDate || '',
        icon: course.icon || '',
        description: course.description,
        fullDescription: course.fullDescription || '',
        features: course.features || [],
        isOnline: course.isOnline,
        isOffline: course.isOffline,
        isActive: course.isActive,
        order: course.order,
        displayOnHome: course.displayOnHome || false,
        bankAccountName: course.bankAccountName || '',
        bankAccountNumber: course.bankAccountNumber || '',
        bankIFSC: course.bankIFSC || '',
        bankName: course.bankName || '',
        bankBranch: course.bankBranch || '',
        upiId: course.upiId || '',
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: '',
        category: 'foundation',
        duration: '',
        fees: '',
        startDate: '',
        icon: '',
        description: '',
        fullDescription: '',
        features: [],
        isOnline: false,
        isOffline: true,
        isActive: true,
        order: courses.length,
        displayOnHome: false,
        bankAccountName: '',
        bankAccountNumber: '',
        bankIFSC: '',
        bankName: '',
        bankBranch: '',
        upiId: '',
      });
    }
    setOpenDialog(true);
    setCurrentTab('basic');
    setShowCustomCategory(false);
    setCustomCategory('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCourse(null);
    setShowCustomCategory(false);
    setCustomCategory('');
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
      setFormData({ ...formData, icon: base64 });
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

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...(formData.features || [])];
    updatedFeatures.splice(index, 1);
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleSubmit = async () => {
    // Validate 4-course homepage limit (must match backend validation)
    if (formData.displayOnHome && formData.isActive) {
      const featuredCount = courses.filter(
        c => c.displayOnHome && c.isActive && c.id !== editingCourse?.id
      ).length;
      if (featuredCount >= 4) {
        toast({
          title: 'Error',
          description: 'Maximum 4 active courses can be featured on homepage. Please deselect another course first.',
          variant: 'destructive',
        });
        return;
      }
    }

    try {
      console.log('Submitting course:', { editingCourse: editingCourse?.id, formData });

      if (editingCourse) {
        await api.courses.update(editingCourse.id, formData);
        toast({
          title: 'Success',
          description: 'Course updated successfully',
        });
      } else {
        await api.courses.create(formData);
        toast({
          title: 'Success',
          description: 'Course created successfully',
        });
      }
      handleCloseDialog();
      fetchCourses();
    } catch (error: any) {
      console.error('Failed to save course:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || error.message || 'Failed to save course',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.courses.delete(id);
      toast({
        title: 'Success',
        description: 'Course deleted successfully',
      });
      fetchCourses();
      setDeleteConfirm(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete course',
        variant: 'destructive',
      });
    }
  };

  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: 'order',
      header: 'Order',
      cell: ({ row }) => <span className="font-medium">{row.getValue('order')}</span>,
    },
    {
      accessorKey: 'icon',
      header: 'Icon',
      cell: ({ row }) => {
        const icon = row.getValue('icon') as string;
        return icon ? (
          <img
            src={icon}
            alt={row.original.title}
            className="h-10 w-10 object-contain rounded"
          />
        ) : null;
      },
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => <span className="font-medium">{row.getValue('title')}</span>,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.getValue('category')}
        </Badge>
      ),
    },
    {
      accessorKey: 'duration',
      header: 'Duration',
    },
    {
      accessorKey: 'fees',
      header: 'Fees',
    },
    {
      id: 'mode',
      header: 'Mode',
      cell: ({ row }) => (
        <div className="flex gap-1">
          {row.original.isOnline && (
            <Badge variant="default" className="bg-indigo-600">
              Online
            </Badge>
          )}
          {row.original.isOffline && (
            <Badge variant="secondary">Offline</Badge>
          )}
        </div>
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
          <h1 className="text-4xl font-bold mb-2">Courses Management</h1>
          <p className="text-gray-600">
            Manage all courses and programs offered by the academy
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Add Course
        </Button>
      </div>

      {/* DataTable */}
      <DataTable columns={columns} data={courses} loading={loading} />

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-lg -mt-6 -mx-6 mb-4">
            <DialogTitle className="text-2xl">
              {editingCourse ? 'Edit Course' : 'Create New Course'}
            </DialogTitle>
            <DialogDescription className="text-indigo-100">
              {editingCourse
                ? 'Update course information'
                : 'Add a new course to your academy'}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">📚 Basic Info</TabsTrigger>
              <TabsTrigger value="details">📝 Details</TabsTrigger>
              <TabsTrigger value="payment">💳 Payment</TabsTrigger>
            </TabsList>

            {/* Tab 1: Basic Info */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Foundation Course for UPSC"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  {showCustomCategory ? (
                    <div className="flex gap-2">
                      <Input
                        id="customCategory"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                        placeholder="e.g., crash-course"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          if (customCategory.trim()) {
                            setFormData({ ...formData, category: customCategory.trim() });
                            setShowCustomCategory(false);
                            setCustomCategory('');
                          }
                        }}
                      >
                        Add
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowCustomCategory(false);
                          setCustomCategory('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Select
                        value={formData.category}
                        onValueChange={(value) => {
                          if (value === '__custom__') {
                            setShowCustomCategory(true);
                          } else {
                            setFormData({ ...formData, category: value });
                          }
                        }}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {allCategories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                          <SelectItem value="__custom__" className="text-cyan-600 font-medium">
                            + Add New Category
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="e.g., 12 Months"
                  />
                </div>

                <div>
                  <Label htmlFor="fees">Fees *</Label>
                  <Input
                    id="fees"
                    value={formData.fees}
                    onChange={(e) =>
                      setFormData({ ...formData, fees: e.target.value })
                    }
                    placeholder="e.g., ₹80,000"
                  />
                </div>

                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    placeholder="e.g., January 2026"
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
                      id="isOnline"
                      checked={formData.isOnline}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isOnline: checked })
                      }
                    />
                    <Label htmlFor="isOnline">Online</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isOffline"
                      checked={formData.isOffline}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isOffline: checked })
                      }
                    />
                    <Label htmlFor="isOffline">Offline</Label>
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
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="displayOnHome"
                      checked={formData.displayOnHome}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, displayOnHome: checked })
                      }
                    />
                    <Label htmlFor="displayOnHome" className="flex items-center gap-1">
                      Display on Homepage
                      <span className="text-xs text-gray-500">(Max 4)</span>
                    </Label>
                  </div>
                </div>

                {/* Icon Upload */}
                <div className="col-span-2">
                  <Label>Course Icon</Label>
                  <div className="flex gap-2 mt-2 mb-3">
                    <Button
                      type="button"
                      variant={imageInputMode === 'upload' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setImageInputMode('upload')}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                    <Button
                      type="button"
                      variant={imageInputMode === 'url' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setImageInputMode('url')}
                    >
                      <LinkIcon className="mr-2 h-4 w-4" />
                      URL
                    </Button>
                  </div>

                  {imageInputMode === 'upload' ? (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="icon-upload"
                        disabled={uploadingImage}
                      />
                      <label htmlFor="icon-upload">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          disabled={uploadingImage}
                          asChild
                        >
                          <span>
                            {uploadingImage ? 'Processing...' : 'Choose Icon File'}
                          </span>
                        </Button>
                      </label>
                    </div>
                  ) : (
                    <Input
                      placeholder="https://... or /assets/icon.png"
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                    />
                  )}

                  {formData.icon && (
                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={formData.icon}
                        alt="Preview"
                        className="h-16 w-16 object-contain border rounded p-2"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setFormData({ ...formData, icon: '' })}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Details */}
            <TabsContent value="details" className="space-y-4">
              <div>
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief course overview for cards..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea
                  id="fullDescription"
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, fullDescription: e.target.value })
                  }
                  placeholder="Detailed course information for course page..."
                  rows={5}
                />
              </div>

              {/* Features */}
              <div>
                <Label>Course Features</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Add a feature..."
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                  />
                  <Button type="button" onClick={handleAddFeature}>
                    Add
                  </Button>
                </div>
                <div className="mt-3 space-y-2">
                  {formData.features?.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm">• {feature}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFeature(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: Payment Info */}
            <TabsContent value="payment" className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Bank details for course payment (optional)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankAccountName">Account Name</Label>
                  <Input
                    id="bankAccountName"
                    value={formData.bankAccountName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankAccountName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="bankAccountNumber">Account Number</Label>
                  <Input
                    id="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankAccountNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="bankIFSC">IFSC Code</Label>
                  <Input
                    id="bankIFSC"
                    value={formData.bankIFSC}
                    onChange={(e) =>
                      setFormData({ ...formData, bankIFSC: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) =>
                      setFormData({ ...formData, bankName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="bankBranch">Branch</Label>
                  <Input
                    id="bankBranch"
                    value={formData.bankBranch}
                    onChange={(e) =>
                      setFormData({ ...formData, bankBranch: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={formData.upiId}
                    onChange={(e) =>
                      setFormData({ ...formData, upiId: e.target.value })
                    }
                  />
                </div>
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
              {editingCourse ? '✓ Update Course' : '+ Create Course'}
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
              Are you sure you want to delete this course? This action cannot be
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
