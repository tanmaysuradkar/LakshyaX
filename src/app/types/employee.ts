export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Remote' | 'On Leave';
  avatar?: string;
} 