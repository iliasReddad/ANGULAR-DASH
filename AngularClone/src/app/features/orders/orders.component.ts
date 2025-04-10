import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order, OrderStatus } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: false
})
export class OrdersComponent implements OnInit {
  dataSource = new MatTableDataSource<Order>();
  displayedColumns: string[] = ['id', 'customerName', 'status', 'totalAmount', 'createdAt', 'actions'];
  loading = false;
  
  // Filter options
  statusOptions = Object.values(OrderStatus);
  
  // Selected filters
  selectedStatus: OrderStatus | '' = '';
  searchQuery = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.dataSource.data = orders;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    // Apply search query
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();

    // Apply status filter
    this.dataSource.filterPredicate = (data: Order, filter: string) => {
      const searchMatch = !filter || 
        data.id.toLowerCase().includes(filter) || 
        data.customerName.toLowerCase().includes(filter);
      
      const statusMatch = !this.selectedStatus || data.status === this.selectedStatus;
      
      return searchMatch && statusMatch;
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

  clearFilters() {
    this.searchQuery = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  getStatusClass(status: OrderStatus): string {
    switch(status) {
      case OrderStatus.PENDING:
        return 'status-pending';
      case OrderStatus.PROCESSING:
        return 'status-in-progress';
      case OrderStatus.SHIPPED:
        return 'status-in-progress';
      case OrderStatus.DELIVERED:
        return 'status-resolved';
      case OrderStatus.CANCELLED:
        return 'status-rejected';
      case OrderStatus.RETURNED:
        return 'status-rejected';
      default:
        return '';
    }
  }

  // Update order status to next logical step
  updateOrderStatus(order: Order): void {
    let newStatus: OrderStatus = order.status;
    
    switch(order.status) {
      case OrderStatus.PENDING:
        newStatus = OrderStatus.PROCESSING;
        break;
      case OrderStatus.PROCESSING:
        newStatus = OrderStatus.SHIPPED;
        break;
      case OrderStatus.SHIPPED:
        newStatus = OrderStatus.DELIVERED;
        break;
    }
    
    if (newStatus !== order.status) {
      this.loading = true;
      this.orderService.updateOrderStatus(order.id, newStatus).subscribe({
        next: () => {
          this.loadOrders();
        },
        error: (error) => {
          console.error('Error updating order status', error);
          this.loading = false;
        }
      });
    }
  }
}
