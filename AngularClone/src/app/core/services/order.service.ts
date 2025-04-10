import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Order, OrderStatus } from '../models/order.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private mockOrders: Order[] = [
    {
      id: 'ORD-001',
      customerId: 'USR-004',
      customerName: 'Sarah Johnson',
      orderDate: new Date('2025-04-10'),
      status: OrderStatus.DELIVERED,
      totalAmount: 125.99,
      items: [
        {
          id: 'ITEM-001',
          productId: 'PROD-001',
          productName: 'Wireless Headphones',
          quantity: 1,
          unitPrice: 89.99,
          totalPrice: 89.99
        },
        {
          id: 'ITEM-002',
          productId: 'PROD-002',
          productName: 'Phone Case',
          quantity: 2,
          unitPrice: 18.00,
          totalPrice: 36.00
        }
      ]
    },
    {
      id: 'ORD-002',
      customerId: 'USR-005',
      customerName: 'Michael Brown',
      orderDate: new Date('2025-04-12'),
      status: OrderStatus.SHIPPED,
      totalAmount: 249.99,
      items: [
        {
          id: 'ITEM-003',
          productId: 'PROD-003',
          productName: 'Smart Watch',
          quantity: 1,
          unitPrice: 249.99,
          totalPrice: 249.99
        }
      ]
    },
    {
      id: 'ORD-003',
      customerId: 'USR-004',
      customerName: 'Sarah Johnson',
      orderDate: new Date('2025-04-13'),
      status: OrderStatus.PROCESSING,
      totalAmount: 75.50,
      items: [
        {
          id: 'ITEM-004',
          productId: 'PROD-004',
          productName: 'Bluetooth Speaker',
          quantity: 1,
          unitPrice: 75.50,
          totalPrice: 75.50
        }
      ]
    },
    {
      id: 'ORD-004',
      customerId: 'USR-006',
      customerName: 'David Miller',
      orderDate: new Date('2025-04-14'),
      status: OrderStatus.PENDING,
      totalAmount: 420.97,
      items: [
        {
          id: 'ITEM-005',
          productId: 'PROD-005',
          productName: 'Laptop Bag',
          quantity: 1,
          unitPrice: 45.99,
          totalPrice: 45.99
        },
        {
          id: 'ITEM-006',
          productId: 'PROD-006',
          productName: 'External Hard Drive',
          quantity: 1,
          unitPrice: 89.99,
          totalPrice: 89.99
        },
        {
          id: 'ITEM-007',
          productId: 'PROD-007',
          productName: 'Wireless Mouse',
          quantity: 1,
          unitPrice: 24.99,
          totalPrice: 24.99
        },
        {
          id: 'ITEM-008',
          productId: 'PROD-008',
          productName: 'Monitor',
          quantity: 1,
          unitPrice: 259.99,
          totalPrice: 259.99
        }
      ]
    }
  ];

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    // In a real app, this would call the API
    // return this.http.get<Order[]>(`${environment.apiUrl}/orders`);
    
    // For now, we'll use mock data
    return of(this.mockOrders).pipe(delay(500));
  }

  getOrderById(id: string): Observable<Order> {
    // In a real app, this would call the API
    // return this.http.get<Order>(`${environment.apiUrl}/orders/${id}`);
    
    // For now, we'll use mock data
    const order = this.mockOrders.find(order => order.id === id);
    return of(order!).pipe(delay(500));
  }

  getOrdersByCustomerId(customerId: string): Observable<Order[]> {
    // In a real app, this would call the API
    // return this.http.get<Order[]>(`${environment.apiUrl}/orders/customer/${customerId}`);
    
    // For now, we'll use mock data
    const orders = this.mockOrders.filter(order => order.customerId === customerId);
    return of(orders).pipe(delay(500));
  }

  getTotalOrdersCount(): Observable<number> {
    // In a real app, this would call the API
    // return this.http.get<number>(`${environment.apiUrl}/orders/count`);
    
    // For now, we'll use mock data
    return of(this.mockOrders.length).pipe(delay(500));
  }

  getTotalRevenue(): Observable<number> {
    // In a real app, this would call the API
    // return this.http.get<number>(`${environment.apiUrl}/orders/revenue`);
    
    // For now, we'll use mock data
    const totalRevenue = this.mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    return of(totalRevenue).pipe(delay(500));
  }
}
