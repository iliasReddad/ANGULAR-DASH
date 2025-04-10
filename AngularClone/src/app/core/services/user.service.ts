import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, UserProfile, UserRole } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockUsers: User[] = [
    {
      id: 'USR-001',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      role: UserRole.ADMIN,
      phoneNumber: '+1 (555) 000-0000',
      jobTitle: 'System Administrator',
      about: 'I\'m a system administrator managing the admin dashboard.',
      isActive: true,
      createdAt: new Date('2025-01-01'),
      lastLogin: new Date('2025-04-15')
    },
    {
      id: 'USR-002',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      role: UserRole.MANAGER,
      phoneNumber: '+1 (555) 123-4567',
      jobTitle: 'Customer Support Manager',
      isActive: true,
      createdAt: new Date('2025-01-15')
    },
    {
      id: 'USR-003',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      role: UserRole.AGENT,
      phoneNumber: '+1 (555) 765-4321',
      jobTitle: 'Support Agent',
      isActive: true,
      createdAt: new Date('2025-02-01')
    },
    {
      id: 'USR-004',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@example.com',
      role: UserRole.CUSTOMER,
      isActive: true,
      createdAt: new Date('2025-03-10')
    },
    {
      id: 'USR-005',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.b@example.com',
      role: UserRole.CUSTOMER,
      isActive: false,
      createdAt: new Date('2025-03-15')
    }
  ];

  private mockProfile: UserProfile = {
    fullName: 'Admin User',
    email: 'admin@example.com',
    phoneNumber: '+1 (555) 000-0000',
    jobTitle: 'System Administrator',
    about: 'I\'m a system administrator managing the admin dashboard.'
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // In a real app, this would call the API
    // return this.http.get<User[]>(`${environment.apiUrl}/users`);
    
    // For now, we'll use mock data
    return of(this.mockUsers).pipe(delay(500));
  }

  getUserById(id: string): Observable<User> {
    // In a real app, this would call the API
    // return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    
    // For now, we'll use mock data
    const user = this.mockUsers.find(user => user.id === id);
    return of(user!).pipe(delay(500));
  }

  getCurrentUserProfile(): Observable<UserProfile> {
    // In a real app, this would call the API
    // return this.http.get<UserProfile>(`${environment.apiUrl}/users/profile`);
    
    // For now, we'll use mock data
    return of(this.mockProfile).pipe(delay(500));
  }

  updateUserProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    // In a real app, this would call the API
    // return this.http.put<UserProfile>(`${environment.apiUrl}/users/profile`, profile);
    
    // For now, we'll use mock data
    this.mockProfile = { ...this.mockProfile, ...profile };
    return of(this.mockProfile).pipe(delay(500));
  }

  getActiveUsersCount(): Observable<number> {
    // In a real app, this would call the API
    // return this.http.get<number>(`${environment.apiUrl}/users/count/active`);
    
    // For now, we'll use mock data
    return of(this.mockUsers.filter(user => user.isActive).length).pipe(delay(500));
  }
}
