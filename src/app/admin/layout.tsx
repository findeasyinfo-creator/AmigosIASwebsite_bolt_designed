'use client';

import './admin.css';
import { useEffect } from 'react';

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add admin-panel class to body when admin routes are loaded
  useEffect(() => {
    document.body.classList.add('admin-panel');
    return () => {
      document.body.classList.remove('admin-panel');
    };
  }, []);

  return <>{children}</>;
}
