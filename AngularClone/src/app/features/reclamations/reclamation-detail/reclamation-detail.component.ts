import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Reclamation, ReclamationPriority, ReclamationStatus, ReclamationType } from '../../../core/models/reclamation.model';
import { ReclamationService } from '../../../core/services/reclamation.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-reclamation-detail',
  templateUrl: './reclamation-detail.component.html',
  styleUrls: ['./reclamation-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSnackBarModule,
    DatePipe
  ]
})
export class ReclamationDetailComponent implements OnInit {
  reclamationId: string = '';
  reclamation: Reclamation | null = null;
  loading = true;
  editing = false;
  
  reclamationForm: FormGroup;
  
  reclamationStatusOptions = Object.values(ReclamationStatus);
  reclamationTypeOptions = Object.values(ReclamationType);
  reclamationPriorityOptions = Object.values(ReclamationPriority);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reclamationService: ReclamationService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.reclamationForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      type: ['', [Validators.required]],
      status: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.reclamationId = id;
        this.loadReclamation();
      } else {
        this.router.navigate(['/reclamations']);
      }
    });
  }

  loadReclamation(): void {
    this.loading = true;
    this.reclamationService.getReclamationById(this.reclamationId).subscribe(
      reclamation => {
        this.reclamation = reclamation;
        this.populateForm();
        this.loading = false;
      },
      error => {
        console.error('Error loading reclamation', error);
        this.snackBar.open('Error loading reclamation details', 'Close', { duration: 3000 });
        this.loading = false;
        this.router.navigate(['/reclamations']);
      }
    );
  }

  populateForm(): void {
    if (this.reclamation) {
      this.reclamationForm.patchValue({
        title: this.reclamation.title,
        description: this.reclamation.description || '',
        type: this.reclamation.type,
        status: this.reclamation.status,
        priority: this.reclamation.priority,
        notes: this.reclamation.notes ? this.reclamation.notes.join('\n') : ''
      });
    }
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    if (!this.editing) {
      this.populateForm();
    }
  }

  saveChanges(): void {
    if (this.reclamationForm.invalid) {
      return;
    }

    const formValue = this.reclamationForm.value;
    const notes = formValue.notes ? formValue.notes.split('\n').filter((note: string) => note.trim().length > 0) : [];
    
    const updatedReclamation: Partial<Reclamation> = {
      title: formValue.title,
      description: formValue.description,
      type: formValue.type,
      status: formValue.status,
      priority: formValue.priority,
      notes: notes,
      updatedAt: new Date()
    };

    this.loading = true;
    this.reclamationService.updateReclamation(this.reclamationId, updatedReclamation).subscribe(
      reclamation => {
        this.reclamation = reclamation;
        this.editing = false;
        this.loading = false;
        this.snackBar.open('Reclamation updated successfully', 'Close', { duration: 3000 });
      },
      error => {
        console.error('Error updating reclamation', error);
        this.snackBar.open('Error updating reclamation', 'Close', { duration: 3000 });
        this.loading = false;
      }
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case ReclamationStatus.PENDING:
        return 'status-pending';
      case ReclamationStatus.IN_PROGRESS:
        return 'status-in-progress';
      case ReclamationStatus.RESOLVED:
        return 'status-resolved';
      case ReclamationStatus.REJECTED:
        return 'status-rejected';
      default:
        return '';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case ReclamationPriority.HIGH:
        return 'priority-high';
      case ReclamationPriority.MEDIUM:
        return 'priority-medium';
      case ReclamationPriority.LOW:
        return 'priority-low';
      default:
        return '';
    }
  }

  goBack(): void {
    this.router.navigate(['/reclamations']);
  }
}
