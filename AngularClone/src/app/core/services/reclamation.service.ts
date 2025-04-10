import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Reclamation, ReclamationPriority, ReclamationStatus, ReclamationType } from '../models/reclamation.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private mockData: Reclamation[] = [
    {
      id: 'REC-1000',
      title: 'Reclamation about product',
      type: ReclamationType.PRODUCT,
      status: ReclamationStatus.IN_PROGRESS,
      priority: ReclamationPriority.HIGH,
      submittedBy: 'User 1',
      createdAt: new Date('2025-03-28'),
      description: 'Customer reported an issue with the product quality.'
    },
    {
      id: 'REC-1001',
      title: 'Reclamation about service',
      type: ReclamationType.SERVICE,
      status: ReclamationStatus.PENDING,
      priority: ReclamationPriority.LOW,
      submittedBy: 'User 2',
      createdAt: new Date('2025-03-17'),
      description: 'Customer complained about the service quality.'
    },
    {
      id: 'REC-1002',
      title: 'Reclamation about other',
      type: ReclamationType.OTHER,
      status: ReclamationStatus.RESOLVED,
      priority: ReclamationPriority.HIGH,
      submittedBy: 'User 3',
      createdAt: new Date('2025-03-21'),
      resolvedAt: new Date('2025-03-25'),
      description: 'General complaint from customer.'
    },
    {
      id: 'REC-1003',
      title: 'Reclamation about billing',
      type: ReclamationType.BILLING,
      status: ReclamationStatus.PENDING,
      priority: ReclamationPriority.MEDIUM,
      submittedBy: 'User 4',
      createdAt: new Date('2025-03-24'),
      description: 'Customer has an issue with their billing.'
    },
    {
      id: 'REC-1004',
      title: 'Reclamation about product',
      type: ReclamationType.PRODUCT,
      status: ReclamationStatus.REJECTED,
      priority: ReclamationPriority.MEDIUM,
      submittedBy: 'User 5',
      createdAt: new Date('2025-04-10'),
      description: 'Product issue that was determined to be user error.'
    },
    {
      id: 'REC-1005',
      title: 'Reclamation about shipping',
      type: ReclamationType.SHIPPING,
      status: ReclamationStatus.RESOLVED,
      priority: ReclamationPriority.LOW,
      submittedBy: 'User 6',
      createdAt: new Date('2025-03-13'),
      resolvedAt: new Date('2025-03-15'),
      description: 'Shipment arrived damaged.'
    }
  ];

  constructor(private http: HttpClient) {}

  getReclamations(): Observable<Reclamation[]> {
    // In a real app, this would call the API
    // return this.http.get<Reclamation[]>(`${environment.apiUrl}/reclamations`);
    
    // For now, we'll use mock data
    return of(this.mockData).pipe(delay(500));
  }

  getReclamationById(id: string): Observable<Reclamation> {
    // In a real app, this would call the API
    // return this.http.get<Reclamation>(`${environment.apiUrl}/reclamations/${id}`);
    
    // For now, we'll use mock data
    return of(this.mockData.find(reclamation => reclamation.id === id)!).pipe(delay(500));
  }

  createReclamation(reclamation: Partial<Reclamation>): Observable<Reclamation> {
    // In a real app, this would call the API
    // return this.http.post<Reclamation>(`${environment.apiUrl}/reclamations`, reclamation);
    
    // For now, we'll use mock data
    const newReclamation: Reclamation = {
      id: `REC-${1000 + this.mockData.length}`,
      title: reclamation.title || 'New Reclamation',
      type: reclamation.type || ReclamationType.OTHER,
      status: ReclamationStatus.PENDING,
      priority: reclamation.priority || ReclamationPriority.MEDIUM,
      submittedBy: reclamation.submittedBy || 'Current User',
      createdAt: new Date(),
      description: reclamation.description || ''
    };
    
    this.mockData.push(newReclamation);
    return of(newReclamation).pipe(delay(500));
  }

  updateReclamation(id: string, changes: Partial<Reclamation>): Observable<Reclamation> {
    // In a real app, this would call the API
    // return this.http.put<Reclamation>(`${environment.apiUrl}/reclamations/${id}`, changes);
    
    // For now, we'll use mock data
    const index = this.mockData.findIndex(reclamation => reclamation.id === id);
    if (index !== -1) {
      this.mockData[index] = { ...this.mockData[index], ...changes, updatedAt: new Date() };
      return of(this.mockData[index]).pipe(delay(500));
    }
    throw new Error('Reclamation not found');
  }

  deleteReclamation(id: string): Observable<boolean> {
    // In a real app, this would call the API
    // return this.http.delete<boolean>(`${environment.apiUrl}/reclamations/${id}`);
    
    // For now, we'll use mock data
    const index = this.mockData.findIndex(reclamation => reclamation.id === id);
    if (index !== -1) {
      this.mockData.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }

  getRecentReclamations(count: number = 5): Observable<Reclamation[]> {
    // In a real app, this would call the API
    // return this.http.get<Reclamation[]>(`${environment.apiUrl}/reclamations/recent?count=${count}`);
    
    // For now, we'll use mock data
    return of(this.mockData
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, count)
    ).pipe(delay(500));
  }

  getReclamationCountByStatus(): Observable<Map<ReclamationStatus, number>> {
    // In a real app, this would call the API
    // return this.http.get<Map<ReclamationStatus, number>>(`${environment.apiUrl}/reclamations/stats/status`);
    
    // For now, we'll use mock data
    const statusCount = new Map<ReclamationStatus, number>();
    
    Object.values(ReclamationStatus).forEach(status => {
      statusCount.set(status, this.mockData.filter(r => r.status === status).length);
    });
    
    return of(statusCount).pipe(delay(500));
  }
}
