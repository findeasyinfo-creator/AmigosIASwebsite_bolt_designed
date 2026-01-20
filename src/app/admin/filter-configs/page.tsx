'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { DataTable } from '@/components/admin/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import api from '@/services/api';

type FilterType = 'SUBJECT' | 'PAPER';

interface FilterConfig {
  id: string;
  filterType: FilterType;
  value: string;
  label: string;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function FilterConfigsPage() {
  const [filterConfigs, setFilterConfigs] = useState<FilterConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    filterType: 'SUBJECT' as FilterType,
    value: '',
    label: '',
    isVisible: true,
    order: 0,
  });

  const columns: ColumnDef<FilterConfig>[] = [
    {
      accessorKey: 'filterType',
      header: 'Type',
      cell: ({ row }) => (
        <Badge
          variant={row.original.filterType === 'SUBJECT' ? 'default' : 'secondary'}
          className={row.original.filterType === 'SUBJECT'
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-purple-500 hover:bg-purple-600 text-white'}
        >
          {row.original.filterType}
        </Badge>
      ),
    },
    {
      accessorKey: 'value',
      header: 'Value',
    },
    {
      accessorKey: 'label',
      header: 'Label',
    },
    {
      accessorKey: 'isVisible',
      header: 'Visible',
      cell: ({ row }) => (
        <Badge
          variant={row.original.isVisible ? 'default' : 'secondary'}
          className={row.original.isVisible ? 'bg-green-500 hover:bg-green-600' : ''}
        >
          {row.original.isVisible ? 'Yes' : 'No'}
        </Badge>
      ),
    },
    {
      accessorKey: 'order',
      header: 'Order',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(row.original)}
            className="hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
            className="hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchFilterConfigs();
  }, []);

  const fetchFilterConfigs = async () => {
    try {
      setLoading(true);
      const response = await api.filterConfigs.getAll();
      setFilterConfigs(response.data);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to fetch filter configurations',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      filterType: 'SUBJECT',
      value: '',
      label: '',
      isVisible: true,
      order: 0,
    });
    setDialogOpen(true);
  };

  const handleEdit = (filterConfig: FilterConfig) => {
    setEditingId(filterConfig.id);
    setFormData({
      filterType: filterConfig.filterType,
      value: filterConfig.value,
      label: filterConfig.label,
      isVisible: filterConfig.isVisible,
      order: filterConfig.order,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this filter configuration?')) return;

    try {
      await api.filterConfigs.delete(id);
      toast({
        title: 'Success',
        description: 'Filter configuration deleted successfully',
      });
      fetchFilterConfigs();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete filter configuration',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.filterConfigs.update(editingId, formData);
        toast({
          title: 'Success',
          description: 'Filter configuration updated successfully',
        });
      } else {
        await api.filterConfigs.create(formData);
        toast({
          title: 'Success',
          description: 'Filter configuration created successfully',
        });
      }
      setDialogOpen(false);
      fetchFilterConfigs();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save filter configuration',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Filter Configurations</h1>
          <p className="text-gray-600 mt-1">
            Manage which filters are visible on the Current Affairs page
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Filter
        </Button>
      </div>

      <DataTable columns={columns} data={filterConfigs} loading={loading} />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 -m-6 mb-0 p-6 rounded-t-lg">
            <DialogTitle className="text-white text-xl">
              {editingId ? 'Edit Filter Configuration' : 'Add Filter Configuration'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div>
              <Label htmlFor="filterType">Filter Type *</Label>
              <Select
                value={formData.filterType}
                onValueChange={(value) =>
                  setFormData({ ...formData, filterType: value as FilterType })
                }
                disabled={!!editingId}
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
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="e.g., Polity, GS-I"
                required
                disabled={!!editingId}
              />
              <p className="text-xs text-gray-500 mt-1">
                This value will be used for filtering (cannot be changed after creation)
              </p>
            </div>

            <div>
              <Label htmlFor="label">Display Label *</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g., Polity, GS-I"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                This label will be shown to users on the frontend
              </p>
            </div>

            <div>
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Lower numbers appear first in the filter dropdown
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isVisible"
                checked={formData.isVisible}
                onCheckedChange={(checked) => setFormData({ ...formData, isVisible: checked })}
              />
              <Label htmlFor="isVisible" className="cursor-pointer">
                Visible on frontend
              </Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700"
              >
                {editingId ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
