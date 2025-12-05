// ============================================
// Profile and Settings Types
// ============================================

import {
  UserProfile,
  SystemSettings,
  ActivityLog,
  LoginHistory,
} from "@prisma/client";

// User with profile
export type UserWithProfile = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile | null;
};

// Profile update input
export type ProfileUpdateInput = {
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  profilePicture?: string;
};

// Password change input
export type PasswordChangeInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

// Settings update input
export type SettingsUpdateInput = {
  institutionName?: string;
  institutionLogo?: string;
  institutionAddress?: string;
  institutionPhone?: string;
  institutionEmail?: string;
  currency?: string;
  dateFormat?: string;
  timezone?: string;
  receiptPrefix?: string;
  lateFeePercentage?: number;
  gracePeriodDays?: number;
  reminderDaysBefore?: number;
};

// Activity log types
export type ActivityAction =
  | "LOGIN"
  | "LOGOUT"
  | "PROFILE_UPDATED"
  | "PASSWORD_CHANGED"
  | "SETTINGS_UPDATED"
  | "STUDENT_CREATED"
  | "STUDENT_UPDATED"
  | "STUDENT_DELETED"
  | "PAYMENT_PROCESSED"
  | "FEE_ASSIGNED";

export type CreateActivityLogInput = {
  userId: string;
  action: ActivityAction;
  description: string;
  metadata?: Record<string, unknown>;
};

// Re-export Prisma types
export type { UserProfile, SystemSettings, ActivityLog, LoginHistory };
