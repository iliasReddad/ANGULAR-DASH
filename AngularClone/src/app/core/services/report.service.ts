import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DashboardStats, PerformanceMetric, RecentActivity, Report, ReportCategory } from '../models/report.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private mockReports: Report[] = [
    {
      id: 'REP-001',
      title: 'Monthly Sales Report',
      description: 'Detailed breakdown of sales performance by product, region, and sales representative',
      category: ReportCategory.FINANCIAL,
      date: new Date('2025-04-01')
    },
    {
      id: 'REP-002',
      title: 'Customer Satisfaction Survey',
      description: 'Analysis of customer feedback and satisfaction metrics collected last quarter',
      category: ReportCategory.MARKETING,
      date: new Date('2025-03-25')
    },
    {
      id: 'REP-003',
      title: 'Inventory Status Report',
      description: 'Current inventory levels, restock requirements, and product movement',
      category: ReportCategory.OPERATIONS,
      date: new Date('2025-04-05')
    },
    {
      id: 'REP-004',
      title: 'Marketing Campaign Performance',
      description: 'ROI and performance metrics for all current marketing initiatives',
      category: ReportCategory.MARKETING,
      date: new Date('2025-04-02')
    },
    {
      id: 'REP-005',
      title: 'Financial Statement Q1',
      description: 'Complete quarterly financial statement including profit & loss and cash flow',
      category: ReportCategory.FINANCIAL,
      date: new Date('2025-04-10')
    },
    {
      id: 'REP-006',
      title: 'Staff Performance Review',
      description: 'Department and individual performance metrics for Q1 2025',
      category: ReportCategory.HR,
      date: new Date('2025-03-30')
    }
  ];

  private mockStats: DashboardStats = {
    totalReclamations: {
      value: 246,
      change: 12
    },
    activeUsers: {
      value: 1483,
      change: 8.2
    },
    totalOrders: {
      value: 3782,
      change: 4.5
    },
    revenue: {
      value: 45283,
      change: 19.6
    }
  };

  private mockPerformanceMetrics: PerformanceMetric[] = [
    { name: 'Reclamations Resolved', value: 78 },
    { name: 'User Satisfaction', value: 92 },
    { name: 'Order Processing', value: 85 },
    { name: 'System Performance', value: 96 }
  ];

  private mockRecentActivity: RecentActivity[] = [
    {
      id: '101',
      type: 'reclamation',
      message: 'New reclamation #101 created',
      timestamp: new Date(new Date().getTime() - 3 * 60000),
      user: 'User 1'
    },
    {
      id: '102',
      type: 'reclamation',
      message: 'New reclamation #102 created',
      timestamp: new Date(new Date().getTime() - 7 * 60000),
      user: 'User 2'
    },
    {
      id: '103',
      type: 'reclamation',
      message: 'New reclamation #103 created',
      timestamp: new Date(new Date().getTime() - 12 * 60000),
      user: 'User 3'
    },
    {
      id: '104',
      type: 'reclamation',
      message: 'New reclamation #104 created',
      timestamp: new Date(new Date().getTime() - 18 * 60000),
      user: 'User 4'
    },
    {
      id: '105',
      type: 'reclamation',
      message: 'New reclamation #105 created',
      timestamp: new Date(new Date().getTime() - 25 * 60000),
      user: 'User 5'
    }
  ];

  constructor(private http: HttpClient) {}

  getReports(category?: ReportCategory): Observable<Report[]> {
    // In a real app, this would call the API
    // return this.http.get<Report[]>(`${environment.apiUrl}/reports${category ? '?category=' + category : ''}`);
    
    // For now, we'll use mock data
    let reports = this.mockReports;
    if (category && category !== ReportCategory.ALL) {
      reports = reports.filter(report => report.category === category);
    }
    return of(reports).pipe(delay(500));
  }

  getReportById(id: string): Observable<Report> {
    // In a real app, this would call the API
    // return this.http.get<Report>(`${environment.apiUrl}/reports/${id}`);
    
    // For now, we'll use mock data
    const report = this.mockReports.find(report => report.id === id);
    return of(report!).pipe(delay(500));
  }

  getReportCategories(): Observable<ReportCategory[]> {
    return of(Object.values(ReportCategory)).pipe(delay(500));
  }

  downloadReport(id: string): Observable<boolean> {
    // In a real app, this would call the API to trigger a download
    // return this.http.get<boolean>(`${environment.apiUrl}/reports/${id}/download`);
    
    // For now, we'll simulate a successful download
    return of(true).pipe(delay(1000));
  }

  getDashboardStats(): Observable<DashboardStats> {
    // In a real app, this would call the API
    // return this.http.get<DashboardStats>(`${environment.apiUrl}/dashboard/stats`);
    
    // For now, we'll use mock data
    return of(this.mockStats).pipe(delay(500));
  }

  getPerformanceMetrics(): Observable<PerformanceMetric[]> {
    // In a real app, this would call the API
    // return this.http.get<PerformanceMetric[]>(`${environment.apiUrl}/dashboard/performance`);
    
    // For now, we'll use mock data
    return of(this.mockPerformanceMetrics).pipe(delay(500));
  }

  getRecentActivity(): Observable<RecentActivity[]> {
    // In a real app, this would call the API
    // return this.http.get<RecentActivity[]>(`${environment.apiUrl}/dashboard/activity`);
    
    // For now, we'll use mock data
    return of(this.mockRecentActivity).pipe(delay(500));
  }
}
