import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private isAuthenticated = true; // Set to true for demonstration purposes

  constructor(private http: HttpClient) {
    // For demonstration purposes, initialize with a mock user
    this.currentUser = {
      id: 'USR-001',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      role: 'Admin',
      phoneNumber: '+1 (555) 000-0000',
      jobTitle: 'System Administrator',
      about: 'I\'m a system administrator managing the admin dashboard.',
      isActive: true,
      createdAt: new Date('2025-01-01'),
      lastLogin: new Date()
    } as User;
  }

  login(email: string, password: string): Observable<User> {
    // In a real app, this would call the API
    // return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password })
    //   .pipe(tap(user => {
    //     this.currentUser = user;
    //     this.isAuthenticated = true;
    //   }));
    
    // For now, we'll use mock data
    return of(this.currentUser!).pipe(
      delay(500),
      tap(() => {
        this.isAuthenticated = true;
      })
    );
  }

  logout(): Observable<boolean> {
    // In a real app, this would call the API
    // return this.http.post<boolean>(`${environment.apiUrl}/auth/logout`, {})
    //   .pipe(tap(() => {
    //     this.currentUser = null;
    //     this.isAuthenticated = false;
    //   }));
    
    // For now, we'll use mock data
    return of(true).pipe(
      delay(500),
      tap(() => {
        this.isAuthenticated = false;
      })
    );
  }

  getCurrentUser(): Observable<User | null> {
    // In a real app, this would call the API
    // return this.http.get<User>(`${environment.apiUrl}/auth/me`);
    
    // For now, we'll use mock data
    return of(this.currentUser).pipe(delay(500));
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
