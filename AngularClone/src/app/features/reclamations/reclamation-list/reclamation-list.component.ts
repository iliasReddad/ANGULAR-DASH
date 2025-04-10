import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reclamation, ReclamationPriority, ReclamationStatus, ReclamationType } from 'src/app/core/models/reclamation.model';
import { ReclamationService } from 'src/app/core/services/reclamation.service';

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.scss'],
  standalone: false
})
export class ReclamationListComponent implements OnInit {
  dataSource = new MatTableDataSource<Reclamation>();
  displayedColumns: string[] = ['id', 'title', 'type', 'status', 'priority', 'submittedBy', 'createdAt', 'actions'];
  loading = false;
  
  // Filter options
  statusOptions = Object.values(ReclamationStatus);
  typeOptions = Object.values(ReclamationType);
  priorityOptions = Object.values(ReclamationPriority);
  
  // Selected filters
  selectedStatus: ReclamationStatus | '' = '';
  selectedType: ReclamationType | '' = '';
  selectedPriority: ReclamationPriority | '' = '';
  searchQuery = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.loadReclamations();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadReclamations() {
    this.loading = true;
    this.reclamationService.getReclamations().subscribe({
      next: (reclamations) => {
        this.dataSource.data = reclamations;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading reclamations', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    // Apply search query
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();

    // Apply status, type, and priority filters
    this.dataSource.filterPredicate = (data: Reclamation, filter: string) => {
      const searchMatch = !filter || 
        data.id.toLowerCase().includes(filter) || 
        data.title.toLowerCase().includes(filter) || 
        data.submittedBy.toLowerCase().includes(filter);
      
      const statusMatch = !this.selectedStatus || data.status === this.selectedStatus;
      const typeMatch = !this.selectedType || data.type === this.selectedType;
      const priorityMatch = !this.selectedPriority || data.priority === this.selectedPriority;
      
      return searchMatch && statusMatch && typeMatch && priorityMatch;
    };
    
    // Trigger filter update
    this.dataSource.filter = this.dataSource.filter;
  }

  onSearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  onStatusFilterChange() {
    this.applyFilters();
  }

  onTypeFilterChange() {
    this.applyFilters();
  }

  onPriorityFilterChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedStatus = '';
    this.selectedType = '';
    this.selectedPriority = '';
    this.applyFilters();
  }

  getStatusClass(status: ReclamationStatus): string {
    switch(status) {
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

  getPriorityClass(priority: ReclamationPriority): string {
    switch(priority) {
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
