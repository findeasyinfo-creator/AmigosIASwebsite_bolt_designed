'use client';

import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Pencil, Trash2, Trophy, Users, GraduationCap, Star } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

interface Stat {
  id: string;
  icon: 'trophy' | 'users' | 'graduation' | 'star';
  number: string;
  label: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateStatDto {
  icon: 'trophy' | 'users' | 'graduation' | 'star';
  number: string;
  label: string;
  order?: number;
  isActive?: boolean;
}

export default function StatsAdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <StatsContent />
        <Toaster />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function StatsContent() {
  const { toast } = useToast();
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreateStatDto>({
    icon: 'trophy',
    number: '',
    label: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.stats.getAll();
      setStats(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch stats',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (stat?: Stat) => {
    if (stat) {
      setEditingStat(stat);
      setFormData({
        icon: stat.icon,
        number: stat.number,
        label: stat.label,
        order: stat.order,
        isActive: stat.isActive,
      });
    } else {
      setEditingStat(null);
      setFormData({
        icon: 'trophy',
        number: '',
        label: '',
        order: stats.length,
        isActive: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStat(null);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      if (editingStat) {
        // Update existing stat
        await api.stats.update(editingStat.id, formData);
        toast({
          title: 'Success',
          description: 'Stat updated successfully',
        });
      } else {
        // Create new stat
        await api.stats.create(formData);
        toast({
          title: 'Success',
          description: 'Stat created successfully',
        });
      }

      handleCloseDialog();
      fetchStats();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save stat',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.stats.delete(id);
      toast({
        title: 'Success',
        description: 'Stat deleted successfully',
      });

      setDeleteConfirm(null);
      fetchStats();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete stat',
        variant: 'destructive',
      });
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      trophy: Trophy,
      users: Users,
      graduation: GraduationCap,
      star: Star,
    };
    const IconComponent = iconMap[iconName] || Trophy;
    return <IconComponent className="w-5 h-5" />;
  };

  const columns: ColumnDef<Stat>[] = [
    {
      accessorKey: 'icon',
      header: 'Icon',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {getIconComponent(row.original.icon)}
          <span className="text-sm text-gray-600 capitalize">{row.original.icon}</span>
        </div>
      ),
    },
    {
      accessorKey: 'number',
      header: 'Number',
      cell: ({ row }) => (
        <span className="font-semibold text-indigo-600">{row.original.number}</span>
      ),
    },
    {
      accessorKey: 'label',
      header: 'Label',
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">{row.original.label}</span>
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
            Stats Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage homepage statistics
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Stat
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={stats}
        loading={loading}
      />

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {editingStat ? 'Edit Stat' : 'Create New Stat'}
            </DialogTitle>
            <DialogDescription>
              {editingStat ? 'Update the stat details below' : 'Fill in the details to create a new stat'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Icon Select */}
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select
                value={formData.icon}
                onValueChange={(value: any) => setFormData({ ...formData, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trophy">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      <span>Trophy</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="users">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Users</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="graduation">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>Graduation</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="star">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span>Star</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number Input */}
            <div className="space-y-2">
              <Label htmlFor="number">Number</Label>
              <Input
                id="number"
                placeholder="e.g., 200+, 4,000+, 10+"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              />
            </div>

            {/* Label Input */}
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                placeholder="e.g., Selections, Students"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              />
            </div>

            {/* Order Input */}
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

            {/* Active Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="isActive">Active</Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting || !formData.number || !formData.label}
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700"
            >
              {submitting ? 'Saving...' : editingStat ? 'Update' : 'Create'}
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
              Are you sure you want to delete this stat? This action cannot be undone.
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
