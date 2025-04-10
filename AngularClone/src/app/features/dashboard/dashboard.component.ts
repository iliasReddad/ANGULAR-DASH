import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { DashboardStats, PerformanceMetric, RecentActivity } from '../../core/models/report.model';
import { ReportService } from '../../core/services/report.service';
import { ReclamationService } from '../../core/services/reclamation.service';
import { Reclamation } from '../../core/models/reclamation.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { PerformanceBarComponent } from '../../shared/components/performance-bar/performance-bar.component';
import { ActivityFeedComponent } from '../../shared/components/activity-feed/activity-feed.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDividerModule,
    MatMenuModule,
    DatePipe,

    // Import shared components
    KpiCardComponent,
    PerformanceBarComponent,
    ActivityFeedComponent
  ]
})
export class DashboardComponent implements OnInit {
  loading = true;
  stats: DashboardStats | null = null;
  performanceMetrics: PerformanceMetric[] = [];
  recentReclamations: Reclamation[] = [];
  recentActivity: RecentActivity[] = [];

  // Data for simple chart visualizations
  reclamationsMonthlyData = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 59 },
    { name: 'Mar', value: 80 },
    { name: 'Apr', value: 81 },
    { name: 'May', value: 56 },
    { name: 'Jun', value: 55 }
  ];

  revenueMonthlyData = [
    { name: 'Jan', value: 12500 },
    { name: 'Feb', value: 19000 },
    { name: 'Mar', value: 13000 },
    { name: 'Apr', value: 22000 },
    { name: 'May', value: 24000 },
    { name: 'Jun', value: 38000 }
  ];

  constructor(
    private reportService: ReportService,
    private reclamationService: ReclamationService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    forkJoin({
      stats: this.reportService.getDashboardStats(),
      performanceMetrics: this.reportService.getPerformanceMetrics(),
      recentReclamations: this.reclamationService.getRecentReclamations(5),
      recentActivity: this.reportService.getRecentActivity()
    }).subscribe(
      data => {
        this.stats = data.stats;
        this.performanceMetrics = data.performanceMetrics;
        this.recentReclamations = data.recentReclamations;
        this.recentActivity = data.recentActivity;
        this.loading = false;
      },
      error => {
        console.error('Error loading dashboard data', error);
        this.loading = false;
      }
    );
  }

  formatChangeIndicator(value: number): string {
    return value >= 0 ? `+${value}%` : `${value}%`;
  }

  getChangeClass(value: number): string {
    return value >= 0 ? 'positive-change' : 'negative-change';
  }
}
