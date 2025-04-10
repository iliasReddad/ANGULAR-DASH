import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Reclamation, ReclamationPriority, ReclamationStatus, ReclamationType } from '../../../core/models/reclamation.model';
import { ReclamationService } from '../../../core/services/reclamation.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-reclamations-list',
  templateUrl: './reclamations-list.component.html',
  styleUrls: ['./reclamations-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    DatePipe
  ]
})
export class ReclamationsListComponent implements OnInit {
  dataSource = new MatTableDataSource<Reclamation>([]);
  displayedColumns: string[] = ['id', 'title', 'type', 'status', 'priority', 'submittedBy', 'createdAt', 'actions'];
  loading = true;
  
  statusFilter = new FormControl('');
  typeFilter = new FormControl('');
  priorityFilter = new FormControl('');
  
  reclamationStatusOptions = Object.values(ReclamationStatus);
  reclamationTypeOptions = Object.values(ReclamationType);
  reclamationPriorityOptions = Object.values(ReclamationPriority);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
    
    // Set up filters
    this.statusFilter.valueChanges.subscribe(() => this.applyFilters());
    this.typeFilter.valueChanges.subscribe(() => this.applyFilters());
    this.priorityFilter.valueChanges.subscribe(() => this.applyFilters());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadReclamations(): void {
    this.loading = true;
    this.reclamationService.getReclamations().subscribe(
      reclamations => {
        this.dataSource.data = reclamations;
        this.loading = false;
      },
      error => {
        console.error('Error loading reclamations', error);
        this.loading = false;
      }
    );
  }

  applyFilters(): void {
    this.dataSource.filterPredicate = (data: Reclamation, filter: string) => {
      const status = this.statusFilter.value;
      const type = this.typeFilter.value;
      const priority = this.priorityFilter.value;
      
      return (!status || data.status === status) &&
             (!type || data.type === type) &&
             (!priority || data.priority === priority);
    };
    
    this.dataSource.filter = 'trigger';
  }

  applySearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilters(): void {
    this.statusFilter.setValue('');
    this.typeFilter.setValue('');
    this.priorityFilter.setValue('');
    this.dataSource.filter = '';
  }

  viewReclamation(id: string): void {
    this.router.navigate(['/reclamations', id]);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case ReclamationStatus.PENDING:
        return 'status-pending';
      case ReclamationStatus.IN_PROGRESS:
        return 'status-in-progress';
      case ReclamationStatus.RESOLVED:
        return 'status-resolved';
      case ReclamationStatus.REJECTED:
        return 'status-rejected';
      default:
        return '';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case ReclamationPriority.HIGH:
        return 'priority-high';
      case ReclamationPriority.MEDIUM:
        return 'priority-medium';
      case ReclamationPriority.LOW:
        return 'priority-low';
      default:
        return '';
    }
  }
}
