import { Component, OnInit } from '@angular/core';
import { Report, ReportCategory, ReportFormat } from 'src/app/core/models/report.model';
import { ReportService } from 'src/app/core/services/report.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: false
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  filteredReports: Report[] = [];
  categories = Object.values(ReportCategory);
  selectedCategory: ReportCategory = ReportCategory.ALL;
  loading = false;
  timeFrames = ['Last Week', 'Last Month', 'Last Quarter', 'Last Year', 'Custom'];
  selectedTimeFrame = 'Last Month';

  constructor(
    private reportService: ReportService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    this.reportService.getReportsByCategory(this.selectedCategory).subscribe({
      next: (reports) => {
        this.reports = reports;
        this.filteredReports = reports;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading reports', error);
        this.loading = false;
        this.snackBar.open('Failed to load reports', 'Dismiss', { duration: 3000 });
      }
    });
  }

  filterByCategory(category: ReportCategory): void {
    this.selectedCategory = category;
    this.loadReports();
  }

  downloadReport(report: Report, format: ReportFormat): void {
    this.loading = true;
    this.reportService.downloadReport(report.id, format).subscribe({
      next: (response) => {
        // In a real application, this would trigger a download
        // For this demo, we'll just show a success message
        this.snackBar.open(`Downloaded ${report.title} as ${format}`, 'Success', { duration: 3000 });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error downloading report', error);
        this.loading = false;
        this.snackBar.open('Failed to download report', 'Dismiss', { duration: 3000 });
      }
    });
  }

  onTimeFrameChange(event: any): void {
    this.selectedTimeFrame = event.value;
    // In a real application, this would trigger a reload of reports for the selected time frame
  }

  getReportIcon(category: ReportCategory): string {
    switch(category) {
      case ReportCategory.FINANCIAL:
        return 'attach_money';
      case ReportCategory.OPERATIONS:
        return 'business';
      case ReportCategory.MARKETING:
        return 'trending_up';
      case ReportCategory.HR:
        return 'people';
      default:
        return 'description';
    }
  }
}
