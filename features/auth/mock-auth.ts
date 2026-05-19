import { getDashboardHrefForRole } from "@/lib/auth/mock-session";
import type { UserRole } from "@/types/auth";

export type LoginFormState = {
  email: string;
  password: string;
  role: UserRole;
};

export type CandidateSignupFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

export type FieldErrors<T extends Record<string, unknown>> = Partial<Record<keyof T, string>>;

export function getMockLoginRedirect(role: UserRole) {
  return getDashboardHrefForRole(role);
}

export function getCandidateSignupRedirect(jobId?: string | null) {
  if (jobId) {
    return `/candidate?signup=success&accountStatus=free&jobId=${encodeURIComponent(jobId)}`;
  }

  return "/candidate?signup=success&accountStatus=free";
}

export function validateLoginForm(form: LoginFormState): FieldErrors<LoginFormState> {
  const errors: FieldErrors<LoginFormState> = {};

  if (!isEmail(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

export function validateCandidateSignupForm(form: CandidateSignupFormState): FieldErrors<CandidateSignupFormState> {
  const errors: FieldErrors<CandidateSignupFormState> = {};

  if (!form.firstName.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }

  if (!isEmail(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (form.phone.replace(/\D/g, "").length !== 10) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!isValidPassword(form.password)) {
    errors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Passwords must match.";
  }

  if (!form.acceptedTerms) {
    errors.acceptedTerms = "You must accept the terms to create an account.";
  }

  return errors;
}

export function hasErrors<T extends Record<string, unknown>>(errors: FieldErrors<T>) {
  return Object.keys(errors).length > 0;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPassword(value: string) {
  return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);
}
