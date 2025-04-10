import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatDividerModule,
    MatToolbarModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  
  currentUser: User | null = null;
  currentPage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });

    this.setCurrentPage(this.router.url);
    this.router.events.subscribe(() => {
      this.setCurrentPage(this.router.url);
    });
  }

  setCurrentPage(url: string): void {
    if (url.includes('/dashboard')) {
      this.currentPage = 'Dashboard';
    } else if (url.includes('/reclamations')) {
      this.currentPage = 'Reclamations';
    } else if (url.includes('/users')) {
      this.currentPage = 'Users';
    } else if (url.includes('/orders')) {
      this.currentPage = 'Orders';
    } else if (url.includes('/reports')) {
      this.currentPage = 'Reports';
    } else if (url.includes('/profile')) {
      this.currentPage = 'Profile';
    }
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
  
  goBack(): void {
    this.router.navigate(['..']);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      // In a real app, this would navigate to the login page
      console.log('User logged out');
    });
  }
}
