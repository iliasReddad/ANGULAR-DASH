import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatProgressBarModule]
})
export class KpiCardComponent implements OnInit {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() change: number = 0;
  @Input() prefix: string = '';
  @Input() suffix: string = '';
  @Input() decimals: number = 0;

  constructor() {}

  ngOnInit(): void {}

  formatValue(): string {
    let formattedValue = this.value.toLocaleString('en-US', {
      minimumFractionDigits: this.decimals,
      maximumFractionDigits: this.decimals
    });
    
    return `${this.prefix}${formattedValue}${this.suffix}`;
  }

  formatChange(): string {
    return this.change >= 0 ? `+${this.change}%` : `${this.change}%`;
  }

  getChangeClass(): string {
    return this.change >= 0 ? 'positive-change' : 'negative-change';
  }
}
