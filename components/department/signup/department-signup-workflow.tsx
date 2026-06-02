"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, ClipboardCheck, CreditCard, Mail, Send, ShieldCheck, UserRound } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { WorkflowProgressPanel } from "@/components/common/workflow-progress-panel";
import { WorkflowSidebar } from "@/components/common/workflow-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { Textarea } from "@/components/ui/textarea";
import { getDepartmentSignupViewModel } from "@/features/department/signup/get-department-signup-view-model";

const signupStepDefinitions = [
  { label: "Department details", icon: Building2 },
  { label: "Admin contact", icon: UserRound },
  { label: "Requested plan", icon: CreditCard },
  { label: "Submit for review", icon: Send }
];

const phonePattern = String.raw`(?:\+1[\s.-]?)?(?:\([2-9]\d{2}\)|[2-9]\d{2})[\s.-]?[2-9]\d{2}[\s.-]?\d{4}`;
const lastSignupStepIndex = signupStepDefinitions.length - 1;

export function DepartmentSignupWorkflow() {
  const viewModel = getDepartmentSignupViewModel();
  const formRef = useRef<HTMLFormElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedState, setSelectedState] = useState("MA");
  const cityOptions = useMemo(() => viewModel.cityOptionsByState[selectedState] ?? [], [selectedState, viewModel.cityOptionsByState]);
  const [selectedCity, setSelectedCity] = useState(cityOptions[0]?.value ?? "");
  const signupSteps = signupStepDefinitions.map((step, index) => ({
    ...step,
    status: index < currentStep ? ("complete" as const) : index === currentStep ? ("in_progress" as const) : ("not_started" as const)
  }));
  const progressPercent = Math.round((currentStep / signupStepDefinitions.length) * 100);
  const nextStepLabel = signupStepDefinitions[currentStep + 1]?.label.toLowerCase();

  function validateCurrentStep() {
    const currentPanel = formRef.current?.querySelector<HTMLElement>(`[data-signup-step="${currentStep}"]`);
    const fields = Array.from(currentPanel?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea") ?? []);
    const invalidField = fields.find((field) => !field.checkValidity());

    if (invalidField) {
      invalidField.reportValidity();
      invalidField.focus();
      return false;
    }

    return true;
  }

  function goToNextStep() {
    if (!validateCurrentStep()) {
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, lastSignupStepIndex));
  }

  function goToPreviousStep() {
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  return (
    <main className="min-h-screen bg-[color:var(--background)]">
      <header className="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-[color:var(--border-muted)] bg-white px-6 py-4">
        <Logo />
        <div className="min-w-0 flex-1 md:px-6">
          <p className="text-xs font-bold uppercase text-[color:var(--blue)]">Department Registration</p>
          <h1 className="text-xl font-bold uppercase text-[color:var(--navy)]">Create your agency workspace</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/auth/login" variant="secondary">
            Sign in
          </Button>
          <Button
            form="department-registration-form"
            type={currentStep === lastSignupStepIndex ? "submit" : "button"}
            onClick={currentStep === lastSignupStepIndex ? undefined : goToNextStep}
            iconRight={<ArrowRight className="h-4 w-4" />}
          >
            {currentStep === lastSignupStepIndex ? "Submit for approval" : "Continue"}
          </Button>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-[280px_minmax(0,1fr)_320px]">
        <WorkflowSidebar steps={signupSteps} />

        <section className="min-w-0 p-4 sm:p-6">
          <form
            ref={formRef}
            id="department-registration-form"
            action="/department/pending"
            method="get"
            className="mx-auto grid max-w-5xl gap-6 rounded-md border border-[color:var(--border-muted)] bg-white p-5 sm:p-7"
          >
            <div className="border-b border-[color:var(--border-muted)] pb-5">
              <div className="grid justify-start gap-3">
                <StatusChip label="GetBadged review required" tone="navy" />
                <span className="text-sm font-semibold text-slate-600">Massachusetts departments</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[color:var(--navy)]">Department self-registration</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[color:var(--muted)]">
                Submit the primary agency and administrator details GetBadged needs to verify the department account and create an
                approval queue item.
              </p>
            </div>

            <section
              data-signup-step="0"
              className={currentStep === 0 ? "gb-step-panel-motion grid gap-4 pb-6" : "hidden"}
            >
              <div>
                <h3 className="text-base font-bold text-[color:var(--navy)]">Department details</h3>
                <p className="mt-1 text-sm text-[color:var(--muted)]">Use the official agency name and public contact information.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Department name *" name="departmentName" placeholder="Westview Police Department" required />
                <Input label="Department website" name="websiteUrl" placeholder="https://westviewpd.gov" type="url" />
                <Input
                  label="Main phone *"
                  name="mainPhone"
                  placeholder="(617) 555-0101"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  pattern={phonePattern}
                  title="Enter a valid US phone number."
                  format="phone"
                  required
                />
                <Select
                  label="State *"
                  name="state"
                  options={viewModel.stateOptions}
                  value={selectedState}
                  onChange={(event) => {
                    const nextState = event.target.value;
                    setSelectedState(nextState);
                    setSelectedCity(viewModel.cityOptionsByState[nextState]?.[0]?.value ?? "");
                  }}
                  required
                />
                <Select
                  label="City *"
                  name="city"
                  options={cityOptions}
                  value={selectedCity}
                  onChange={(event) => setSelectedCity(event.target.value)}
                  required
                />
                <Input label="ZIP code *" name="zipCode" placeholder="02000" required />
              </div>
            </section>

            <section
              data-signup-step="1"
              className={currentStep === 1 ? "gb-step-panel-motion grid gap-4 pb-6" : "hidden"}
            >
              <div>
                <h3 className="text-base font-bold text-[color:var(--navy)]">Primary administrator</h3>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  This person receives approval updates and becomes the initial Department Admin after activation.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="First name *" name="firstName" placeholder="Avery" required />
                <Input label="Last name *" name="lastName" placeholder="Cole" required />
                <Input label="Work email *" name="email" placeholder="admin@department.gov" type="email" required />
                <Input
                  label="Direct phone"
                  name="phone"
                  placeholder="(617) 555-0199"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  pattern={phonePattern}
                  title="Enter a valid US phone number."
                  format="phone"
                />
              </div>
            </section>

            <section
              data-signup-step="2"
              className={currentStep === 2 ? "gb-step-panel-motion grid gap-4 pb-6" : "hidden"}
            >
              <div>
                <h3 className="text-base font-bold text-[color:var(--navy)]">Requested plan</h3>
                <p className="mt-1 text-sm text-[color:var(--muted)]">Choose the department tier for GetBadged review.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Select label="Requested tier *" name="tier" options={viewModel.tierOptions} required />
              </div>
            </section>

            <section data-signup-step="3" className={currentStep === 3 ? "gb-step-panel-motion grid gap-4" : "hidden"}>
              <div>
                <h3 className="text-base font-bold text-[color:var(--navy)]">Approval context</h3>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  Add anything that helps GetBadged verify your agency and plan needs.
                </p>
              </div>
              <Textarea
                label="Notes for GB Admin"
                placeholder="Include department website context, contact preferences, or requested launch timing."
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border-muted)] pt-5">
                <p className="text-sm font-medium text-[color:var(--muted)]">
                  Submitting creates a pending department record and blocks workspace access until approval.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button type="button" variant="secondary" onClick={goToPreviousStep} iconLeft={<ArrowLeft className="h-4 w-4" />}>
                    Back
                  </Button>
                  <Button type="submit" iconRight={<ArrowRight className="h-4 w-4" />}>
                    Submit mock registration
                  </Button>
                </div>
              </div>
            </section>

            {currentStep < lastSignupStepIndex ? (
              <div
                key={`step-action-${currentStep}`}
                className="gb-step-panel-motion flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border-muted)] pt-5"
              >
                <p className="text-sm font-medium text-[color:var(--muted)]">
                  Continue to {nextStepLabel} to complete the department registration.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {currentStep > 0 ? (
                    <Button type="button" variant="secondary" onClick={goToPreviousStep} iconLeft={<ArrowLeft className="h-4 w-4" />}>
                      Back
                    </Button>
                  ) : null}
                  <Button type="button" onClick={goToNextStep} iconRight={<ArrowRight className="h-4 w-4" />}>
                    Continue to {nextStepLabel}
                  </Button>
                </div>
              </div>
            ) : null}
          </form>
        </section>

        <WorkflowProgressPanel percent={progressPercent}>
          <div className="grid gap-4 rounded-md border border-[color:var(--border-muted)] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[color:var(--navy)]">Approval queue</p>
                <p className="text-sm text-[color:var(--muted)]">{viewModel.approvalQueueCount} pending mock department</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              The submitted registration routes to a pending approval state and creates a GB Admin task.
            </p>
          </div>

          <div className="grid gap-3 rounded-md border border-[color:var(--border-muted)] p-4">
            <h2 className="text-sm font-bold uppercase text-[color:var(--navy)]">What unlocks after approval</h2>
            {["Department Profile", "Job Posts", "Badge Pool", "Applicant Pools"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ShieldCheck className="h-4 w-4 text-[color:var(--success)]" />
                {item}
              </div>
            ))}
          </div>

          <div className="grid gap-2 rounded-md border border-[color:var(--border-muted)] p-4 text-sm text-[color:var(--muted)]">
            <div className="flex items-center gap-2 font-bold text-[color:var(--navy)]">
              <Mail className="h-4 w-4" />
              Need help?
            </div>
            <p>Contact {viewModel.supportEmail} if your agency needs launch support or tier guidance.</p>
          </div>
        </WorkflowProgressPanel>
      </div>
    </main>
  );
}
