import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserRole } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: false
})
export class UsersComponent implements OnInit {
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['fullName', 'email', 'role', 'isActive', 'createdAt', 'actions'];
  loading = false;
  
  // Filter options
  roleOptions = Object.values(UserRole);
  
  // Selected filters
  selectedRole: UserRole | '' = '';
  selectedStatus: boolean | null = null;
  searchQuery = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    // Apply search query
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();

    // Apply role and status filters
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const searchMatch = !filter || 
        data.fullName.toLowerCase().includes(filter) || 
        data.email.toLowerCase().includes(filter);
      
      const roleMatch = !this.selectedRole || data.role === this.selectedRole;
      const statusMatch = this.selectedStatus === null || data.isActive === this.selectedStatus;
      
      return searchMatch && roleMatch && statusMatch;
    };
    
    // Trigger filter update
    this.dataSource.filter = this.dataSource.filter;
  }

  onSearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  onRoleFilterChange() {
    this.applyFilters();
  }

  onStatusFilterChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedRole = '';
    this.selectedStatus = null;
    this.applyFilters();
  }

  getRoleClass(role: UserRole): string {
    switch(role) {
      case UserRole.ADMIN:
        return 'role-admin';
      case UserRole.MANAGER:
        return 'role-manager';
      case UserRole.AGENT:
        return 'role-agent';
      case UserRole.CUSTOMER:
        return 'role-customer';
      default:
        return '';
    }
  }

  getStatusClass(isActive: boolean): string {
    return isActive ? 'status-active' : 'status-inactive';
  }
}
