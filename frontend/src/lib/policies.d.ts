export enum PolicyStatus {
  Active = "ACTIVE",
  Pending = "PENDING",
  Cancelled = "CANCELLED",
  DroppedOut = "DROPPED_OUT",
}

export enum InsuranceType {
  Liability = "LIABILITY",
  Household = "HOUSEHOLD",
  Health = "HEALTH",
}

export interface Customer {
  id: string;

  firstName: string;
  lastName: string;

  dateOfBirth: string;

  profileColor: string;
}
export interface Policy {
  id: string;
  provider: string;

  insuranceType: InsuranceType;
  status: PolicyStatus;

  startDate: string | null;
  endDate: string;

  customer: Customer;

  members: PolicyMember[];
}

export interface PolicyMember {
  customerId: string;
  customer: Customer;
}
