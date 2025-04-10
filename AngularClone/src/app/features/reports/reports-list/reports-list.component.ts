import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Report, ReportCategory } from '../../../core/models/report.model';
import { ReportService } from '../../../core/services/report.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSelectModule
  ]
})
export class ReportsListComponent implements OnInit {
  reports: Report[] = [];
  filteredReports: Report[] = [];
  selectedCategory: ReportCategory = ReportCategory.ALL;
  reportCategories = Object.values(ReportCategory);
  loading = true;
  selectedTimePeriod = 'Last Month';
  timePeriods = ['Last Week', 'Last Month', 'Last Quarter', 'Last Year'];

  constructor(
    private reportService: ReportService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    this.reportService.getReports().subscribe(
      (reports) => {
        this.reports = reports;
        this.filterReportsByCategory(this.selectedCategory);
        this.loading = false;
      },
      (error) => {
        console.error('Error loading reports', error);
        this.snackBar.open('Error loading reports', 'Close', { duration: 3000 });
        this.loading = false;
      }
    );
  }

  filterReportsByCategory(category: ReportCategory): void {
    this.selectedCategory = category;
    if (category === ReportCategory.ALL) {
      this.filteredReports = [...this.reports];
    } else {
      this.filteredReports = this.reports.filter(report => report.category === category);
    }
  }

  downloadReport(report: Report): void {
    this.loading = true;
    this.reportService.downloadReport(report.id).subscribe(
      (success) => {
        if (success) {
          this.snackBar.open(`Report "${report.title}" downloaded successfully`, 'Close', { duration: 3000 });
        } else {
          this.snackBar.open('Error downloading report', 'Close', { duration: 3000 });
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error downloading report', error);
        this.snackBar.open('Error downloading report', 'Close', { duration: 3000 });
        this.loading = false;
      }
    );
  }

  viewReport(report: Report): void {
    // In a real app, this would open the report in a viewer
    this.snackBar.open(`Viewing report: ${report.title}`, 'Close', { duration: 3000 });
  }

  setTimePeriod(period: string): void {
    this.selectedTimePeriod = period;
    // In a real app, this would trigger a reload of reports based on the selected time period
    this.snackBar.open(`Time period set to ${period}`, 'Close', { duration: 2000 });
  }
}
