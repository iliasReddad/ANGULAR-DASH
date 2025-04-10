import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class SidebarComponent implements OnInit {
  currentUser: User | null = null;
  
  navigationItems = [
    { 
      title: 'Dashboard', 
      route: '/dashboard', 
      icon: 'dashboard' 
    },
    { 
      title: 'Reclamations', 
      route: '/reclamations', 
      icon: 'assignment_return' 
    },
    { 
      title: 'Users', 
      route: '/users', 
      icon: 'people' 
    },
    { 
      title: 'Orders', 
      route: '/orders', 
      icon: 'shopping_cart' 
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
