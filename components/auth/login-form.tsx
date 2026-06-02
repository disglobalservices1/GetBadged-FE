"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, HelpCircle, ShieldCheck } from "lucide-react";
import { getMockCandidateProfileIdForLogin, getMockLoginRedirect, hasErrors, mockCandidateProfileCookieName, validateLoginForm, type LoginFormState } from "@/features/auth/mock-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { mockSessionRoleCookieName } from "@/lib/auth/mock-session";

const roleOptions = [
  { label: "Candidate (ELR)", value: "candidate" },
  { label: "Candidate (CXO)", value: "candidate_cxo" },
  { label: "Department Admin", value: "department_admin" },
  { label: "Department User", value: "department_user" },
  { label: "GB Admin", value: "gb_admin" }
];

const mockEmailByRole: Record<LoginFormState["role"], string> = {
  candidate: "jordan@example.com",
  candidate_cxo: "avery.cole@example.com",
  department_admin: "admin@westviewpd.gov",
  department_user: "reviewer@westviewpd.gov",
  gb_admin: "admin@getbadged.com"
};

export function LoginForm() {
  const [form, setForm] = useState<LoginFormState>({
    email: "jordan@example.com",
    password: "password123",
    role: "candidate"
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormState, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [showForgotSent, setShowForgotSent] = useState(false);

  function updateField<K extends keyof LoginFormState>(field: K, value: LoginFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  function updateRole(role: LoginFormState["role"]) {
    setForm((current) => ({ ...current, email: mockEmailByRole[role], role }));
    setErrors((current) => ({ ...current, email: undefined, role: undefined }));
    setSubmitError("");
  }

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLoginForm(form);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      setSubmitError("Please fix the highlighted fields before signing in.");
      return;
    }

    persistMockCandidateProfile(form.role);
    persistMockRole(form.role);
    window.location.href = getMockLoginRedirect(form.role);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[color:var(--background)] px-6 py-10">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <CardTitle>Sign in to GetBadged</CardTitle>
              <p className="mt-1 text-sm text-[color:var(--muted)]">One login routes candidates, departments, and GB Admins.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-5">
          <form className="grid gap-4" onSubmit={submitLogin}>
            <Input label="Email" value={form.email} onChange={(event) => updateField("email", event.target.value)} error={errors.email} type="email" autoComplete="email" />
            <Input
              label="Password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              error={errors.password}
              type="password"
              autoComplete="current-password"
            />
            <Select
              label="Mock role"
              value={form.role}
              onChange={(event) => updateRole(event.target.value as LoginFormState["role"])}
              options={roleOptions}
              error={errors.role}
            />
            {submitError ? <p className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-[color:var(--danger)]">{submitError}</p> : null}
            <Button type="submit" iconRight={<ArrowRight size={18} />}>
              Sign in
            </Button>
          </form>

          <div className="grid gap-3 rounded-lg border border-[color:var(--border-muted)] bg-[color:var(--surface-muted)] p-4">
            <button type="button" className="inline-flex items-center gap-2 text-left text-sm font-bold text-[color:var(--blue)]" onClick={() => setShowForgotSent(true)}>
              <HelpCircle className="h-4 w-4" />
              Forgot password?
            </button>
            {showForgotSent ? <p className="text-sm leading-6 text-[color:var(--muted)]">Mock reset email sent. Backend will later send this through Supabase Auth and SendGrid.</p> : null}
          </div>

          <div className="grid gap-2 text-sm">
            <a className="font-bold text-[color:var(--blue)]" href="/auth/signup/candidate">
              Create candidate account
            </a>
            <a className="font-bold text-[color:var(--blue)]" href="/auth/signup/department">
              Register department
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function persistMockCandidateProfile(role: LoginFormState["role"]) {
  const candidateProfileId = getMockCandidateProfileIdForLogin(role);

  if (!candidateProfileId) {
    document.cookie = `${mockCandidateProfileCookieName}=; path=/; max-age=0; SameSite=Lax`;
    return;
  }

  document.cookie = `${mockCandidateProfileCookieName}=${candidateProfileId}; path=/; max-age=2592000; SameSite=Lax`;
}

function persistMockRole(role: LoginFormState["role"]) {
  const normalizedRole = role === "candidate_cxo" ? "candidate" : role;
  document.cookie = `${mockSessionRoleCookieName}=${normalizedRole}; path=/; max-age=2592000; SameSite=Lax`;
}
