export interface Reclamation {
  id: string;
  title: string;
  type: ReclamationType;
  status: ReclamationStatus;
  priority: ReclamationPriority;
  submittedBy: string;
  createdAt: Date;
  description?: string;
  notes?: string[];
  assignedTo?: string;
  updatedAt?: Date;
  resolvedAt?: Date;
}

export enum ReclamationType {
  PRODUCT = 'Product',
  SERVICE = 'Service',
  BILLING = 'Billing',
  SHIPPING = 'Shipping',
  OTHER = 'Other'
}

export enum ReclamationStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In-Progress',
  RESOLVED = 'Resolved',
  REJECTED = 'Rejected'
}

export enum ReclamationPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}
