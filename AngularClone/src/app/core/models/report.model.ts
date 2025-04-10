export interface Report {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  date: Date;
  fileUrl?: string;
}

export enum ReportCategory {
  ALL = 'All Reports',
  FINANCIAL = 'Financial',
  OPERATIONS = 'Operations',
  MARKETING = 'Marketing',
  HR = 'HR'
}

export interface DashboardStats {
  totalReclamations: {
    value: number;
    change: number;
  };
  activeUsers: {
    value: number;
    change: number;
  };
  totalOrders: {
    value: number;
    change: number;
  };
  revenue: {
    value: number;
    change: number;
  };
}

export interface PerformanceMetric {
  name: string;
  value: number;
}

export interface RecentActivity {
  id: string;
  type: string;
  message: string;
  timestamp: Date;
  user: string;
}
