'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/services/api';
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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FilterConfig {
  id: string;
  filterType: 'SUBJECT' | 'PAPER';
  value: string;
  label: string;
  isVisible: boolean;
  order: number;
}

export default function FiltersAdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <FiltersContent />
        <Toaster />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function FiltersContent() {
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingFilter, setEditingFilter] = useState<FilterConfig | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'SUBJECT' | 'PAPER'>('SUBJECT');

  const [formData, setFormData] = useState({
    filterType: 'SUBJECT' as 'SUBJECT' | 'PAPER',
    value: '',
    label: '',
    isVisible: true,
    order: 0,
  });

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      setLoading(true);
      const response = await api.filterConfigs.getAll();
      if (response.success) {
        setFilters(response.data || []);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch filters',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (filter?: FilterConfig) => {
    if (filter) {
      setEditingFilter(filter);
      setFormData({
        filterType: filter.filterType,
        value: filter.value,
        label: filter.label,
        isVisible: filter.isVisible,
        order: filter.order,
      });
    } else {
      setEditingFilter(null);
      const currentTypeFilters = filters.filter(f => f.filterType === activeTab);
      setFormData({
        filterType: activeTab,
        value: '',
        label: '',
        isVisible: true,
        order: currentTypeFilters.length,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingFilter(null);
  };

  const handleSubmit = async () => {
    if (!formData.value.trim() || !formData.label.trim()) {
      toast({
        title: 'Error',
        description: 'Value and Label are required',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingFilter) {
        await api.filterConfigs.update(editingFilter.id, formData);
        toast({
          title: 'Success',
          description: 'Filter updated successfully',
        });
      } else {
        await api.filterConfigs.create(formData);
        toast({
          title: 'Success',
          description: 'Filter created successfully',
        });
      }
      handleCloseDialog();
      fetchFilters();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save filter',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.filterConfigs.delete(id);
      toast({
        title: 'Success',
        description: 'Filter deleted successfully',
      });
      fetchFilters();
      setDeleteConfirm(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete filter',
        variant: 'destructive',
      });
    }
  };

  const toggleVisibility = async (filter: FilterConfig) => {
    try {
      await api.filterConfigs.update(filter.id, {
        ...filter,
        isVisible: !filter.isVisible,
      });
      toast({
        title: 'Success',
        description: `Filter ${filter.isVisible ? 'hidden' : 'shown'} successfully`,
      });
      fetchFilters();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update visibility',
        variant: 'destructive',
      });
    }
  };

  const subjectFilters = filters.filter(f => f.filterType === 'SUBJECT').sort((a, b) => a.order - b.order);
  const paperFilters = filters.filter(f => f.filterType === 'PAPER').sort((a, b) => a.order - b.order);

  const FilterList = ({ items, type }: { items: FilterConfig[]; type: string }) => (
    <div className="space-y-2">
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No {type.toLowerCase()} filters configured</p>
      ) : (
        items.map((filter) => (
          <div
            key={filter.id}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              filter.isVisible
                ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                : 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{filter.label}</p>
                <p className="text-sm text-gray-500">Value: {filter.value}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={filter.isVisible ? 'default' : 'secondary'} className={filter.isVisible ? 'bg-green-600' : ''}>
                {filter.isVisible ? 'Visible' : 'Hidden'}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleVisibility(filter)}
                title={filter.isVisible ? 'Hide filter' : 'Show filter'}
              >
                {filter.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleOpenDialog(filter)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleteConfirm(filter.id)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Filter Configuration</h1>
          <p className="text-gray-600">
            Manage which Subject and Paper filters appear on the Current Affairs page
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'SUBJECT' | 'PAPER')}>
        <TabsList className="mb-6">
          <TabsTrigger value="SUBJECT">Subjects ({subjectFilters.length})</TabsTrigger>
          <TabsTrigger value="PAPER">Papers ({paperFilters.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="SUBJECT">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Subject Filters</CardTitle>
                <CardDescription>
                  Subjects shown in the Current Affairs filter dropdown
                </CardDescription>
              </div>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Subject
              </Button>
            </CardHeader>
            <CardContent>
              <FilterList items={subjectFilters} type="Subject" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="PAPER">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Paper Filters</CardTitle>
                <CardDescription>
                  UPSC Papers shown in the Current Affairs filter dropdown
                </CardDescription>
              </div>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Paper
              </Button>
            </CardHeader>
            <CardContent>
              <FilterList items={paperFilters} type="Paper" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingFilter ? 'Edit Filter' : 'Add Filter'}
            </DialogTitle>
            <DialogDescription>
              {editingFilter
                ? 'Update the filter configuration'
                : 'Add a new filter option'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="filterType">Filter Type</Label>
              <Select
                value={formData.filterType}
                onValueChange={(value: 'SUBJECT' | 'PAPER') =>
                  setFormData({ ...formData, filterType: value })
                }
                disabled={!!editingFilter}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUBJECT">Subject</SelectItem>
                  <SelectItem value="PAPER">Paper</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="value">Value *</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                placeholder="e.g., Polity or GS-I"
              />
              <p className="text-xs text-gray-500 mt-1">
                This is the internal value used for filtering
              </p>
            </div>

            <div>
              <Label htmlFor="label">Display Label *</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                placeholder="e.g., Polity or GS Paper I"
              />
              <p className="text-xs text-gray-500 mt-1">
                This is shown to users in the dropdown
              </p>
            </div>

            <div>
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
                id="isVisible"
                checked={formData.isVisible}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isVisible: checked })
                }
              />
              <Label htmlFor="isVisible">Visible in dropdown</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingFilter ? 'Update' : 'Create'}
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
              Are you sure you want to delete this filter? This action cannot be undone.
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
