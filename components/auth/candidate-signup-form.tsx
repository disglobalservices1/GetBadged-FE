"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { getCandidateSignupRedirect, hasErrors, validateCandidateSignupForm, type CandidateSignupFormState } from "@/features/auth/mock-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type CandidateSignupFormProps = {
  jobId?: string;
};

export function CandidateSignupForm({ jobId }: CandidateSignupFormProps) {
  const [form, setForm] = useState<CandidateSignupFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CandidateSignupFormState, string>>>({});
  const [submitError, setSubmitError] = useState("");

  function updateField<K extends keyof CandidateSignupFormState>(field: K, value: CandidateSignupFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCandidateSignupForm(form);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      setSubmitError("Please fix the highlighted fields before creating the account.");
      return;
    }

    window.location.href = getCandidateSignupRedirect(jobId);
  }

  return (
    <main className="mx-auto grid min-h-screen max-w-5xl items-center px-6 py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Create candidate account</CardTitle>
                <p className="mt-1 text-sm text-[color:var(--muted)]">Free accounts can build a profile first and purchase exam/membership later.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={submitSignup}>
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="First name *" value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} error={errors.firstName} />
                <Input label="Last name *" value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} error={errors.lastName} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Email *" value={form.email} onChange={(event) => updateField("email", event.target.value)} error={errors.email} type="email" />
                <Input
                  label="Phone *"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  error={errors.phone}
                  placeholder="(617) 555-1234"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  format="phone"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Password *" value={form.password} onChange={(event) => updateField("password", event.target.value)} error={errors.password} type="password" />
                <Input
                  label="Confirm password *"
                  value={form.confirmPassword}
                  onChange={(event) => updateField("confirmPassword", event.target.value)}
                  error={errors.confirmPassword}
                  type="password"
                />
              </div>
              <Checkbox
                label="I agree to create a GetBadged candidate account and understand that Apply, Badge Pool, and Badge Request actions remain blocked until membership and requirements are complete."
                checked={form.acceptedTerms}
                onChange={(event) => updateField("acceptedTerms", event.target.checked)}
                error={errors.acceptedTerms}
              />
              {submitError ? <p className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-[color:var(--danger)]">{submitError}</p> : null}
              <Button type="submit" iconRight={<ArrowRight size={18} />}>
                Create free account
              </Button>
            </form>
          </CardContent>
        </Card>

        <aside className="grid content-start gap-4">
          <Card>
            <CardContent className="grid gap-3 px-5 pb-5 pt-8">
              <h2 className="text-lg font-bold text-[color:var(--navy)]">Free account access</h2>
              <p className="text-sm leading-6 text-[color:var(--muted)]">
                Candidates land in a limited dashboard immediately. They can start profile setup, but applying and Badge Pool visibility stay blocked until eligibility and purchase requirements are met.
              </p>
            </CardContent>
          </Card>
          {jobId ? (
            <Card>
              <CardContent className="grid gap-3 px-5 pb-5 pt-8">
                <h2 className="text-lg font-bold text-[color:var(--navy)]">Job handoff saved</h2>
                <p className="text-sm leading-6 text-[color:var(--muted)]">After signup, the mock flow keeps job id `{jobId}` for the later candidate apply workflow.</p>
              </CardContent>
            </Card>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
