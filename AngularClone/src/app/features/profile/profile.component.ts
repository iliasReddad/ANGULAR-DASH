import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserProfile } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSnackBarModule
  ]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userProfile: UserProfile | null = null;
  loading = true;
  activeTab = 'general';
  
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern(/^\+?[0-9\s-\(\)]+$/)]],
      jobTitle: [''],
      about: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.loading = true;
    this.userService.getCurrentUserProfile().subscribe(
      profile => {
        this.userProfile = profile;
        this.profileForm.patchValue({
          fullName: profile.fullName,
          email: profile.email,
          phoneNumber: profile.phoneNumber || '',
          jobTitle: profile.jobTitle || '',
          about: profile.about || ''
        });
        this.loading = false;
      },
      error => {
        console.error('Error loading user profile', error);
        this.snackBar.open('Error loading profile', 'Close', { duration: 3000 });
        this.loading = false;
      }
    );
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;
    const formValue = this.profileForm.value;
    
    this.userService.updateUserProfile({
      fullName: formValue.fullName,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      jobTitle: formValue.jobTitle,
      about: formValue.about
    }).subscribe(
      profile => {
        this.userProfile = profile;
        this.loading = false;
        this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
      },
      error => {
        console.error('Error updating profile', error);
        this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
        this.loading = false;
      }
    );
  }

  changeAvatar(): void {
    // In a real app, this would open a file upload dialog
    this.snackBar.open('Avatar change functionality would be implemented here', 'Close', { duration: 3000 });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
