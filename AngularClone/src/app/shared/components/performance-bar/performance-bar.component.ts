import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-performance-bar',
  templateUrl: './performance-bar.component.html',
  styleUrls: ['./performance-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressBarModule]
})
export class PerformanceBarComponent implements OnInit {
  @Input() label: string = '';
  @Input() value: number = 0;
  @Input() maxValue: number = 100;
  @Input() showPercentage: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  getProgressBarValue(): number {
    return (this.value / this.maxValue) * 100;
  }

  getProgressBarColor(): string {
    const normalizedValue = this.getProgressBarValue();
    
    if (normalizedValue >= 90) {
      return 'primary'; // Blue/Purple
    } else if (normalizedValue >= 75) {
      return 'accent'; // Teal/Green
    } else if (normalizedValue >= 50) {
      return 'warn'; // Orange/Yellow
    } else {
      return 'warn'; // Red
    }
  }
}
