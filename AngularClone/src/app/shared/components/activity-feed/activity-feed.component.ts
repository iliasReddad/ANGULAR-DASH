import { Component, Input, OnInit } from '@angular/core';
import { RecentActivity } from '../../../core/models/report.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class ActivityFeedComponent implements OnInit {
  @Input() activities: RecentActivity[] = [];

  constructor() {}

  ngOnInit(): void {}

  getActivityIcon(type: string): string {
    switch (type) {
      case 'reclamation':
        return 'assignment_return';
      case 'order':
        return 'shopping_cart';
      case 'user':
        return 'person';
      case 'system':
        return 'settings';
      default:
        return 'notifications';
    }
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    
    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}
