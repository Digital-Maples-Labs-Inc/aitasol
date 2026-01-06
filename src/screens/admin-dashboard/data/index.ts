/**
 * Dashboard Data
 * Mock data and data fetching utilities for the admin dashboard
 */

export interface DashboardStats {
  totalPages: number;
  totalBlogs: number;
  activeTheme: number;
  totalUsers: number;
}

export interface RecentActivity {
  id: string;
  type: 'page' | 'blog' | 'theme' | 'user';
  action: string;
  timestamp: Date;
}

export const mockDashboardStats: DashboardStats = {
  totalPages: 12,
  totalBlogs: 24,
  activeTheme: 1,
  totalUsers: 5,
};

export const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'page',
    action: 'Page updated',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    type: 'blog',
    action: 'Blog post published',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '3',
    type: 'theme',
    action: 'Theme customized',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
];

