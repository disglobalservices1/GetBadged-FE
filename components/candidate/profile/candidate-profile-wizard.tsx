import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, Lock, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { WorkflowProgressPanel } from "@/components/common/workflow-progress-panel";
import { WorkflowSidebar } from "@/components/common/workflow-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Radio } from "@/components/ui/radio";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { Textarea } from "@/components/ui/textarea";
import { candidateProfileSteps, getCandidateProfileWizard, getStepHref } from "@/features/candidate/profile/profile-wizard";
import type { CandidateProfileStepKey } from "@/types/candidate";

type CandidateProfileWizardProps = {
  stepKey?: string;
};

export function CandidateProfileWizard({ stepKey }: CandidateProfileWizardProps) {
  const wizard = getCandidateProfileWizard(stepKey);
  const candidate = wizard.candidate;
  const sidebarSteps = wizard.statuses.map((status) => ({
    label: status.label,
    icon: candidateProfileSteps.find((step) => step.stepKey === status.stepKey)?.icon ?? ShieldCheck,
    status: status.status
  }));

  return (
    <div className="min-h-[calc(100vh-7rem)] overflow-hidden rounded-lg border border-[color:var(--border-muted)] bg-white">
      <header className="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-[color:var(--border-muted)] px-6 py-4">
        <div>
          <p className="text-xs font-bold uppercase text-[color:var(--blue)]">Candidate Application</p>
          <h1 className="text-xl font-bold uppercase text-[color:var(--navy)]">{wizard.activeStep.label}</h1>
          <p className="text-sm font-medium text-slate-600">{candidate.track} | New Recruit</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-[color:var(--blue)]" />
            {wizard.lastSavedLabel}
          </div>
          <Button href="/candidate" variant="secondary">
            Save & Exit
          </Button>
          <Button href={wizard.nextStep ? getStepHref(wizard.nextStep.stepKey) : "/candidate/profile/review_submit"} iconRight={<ArrowRight size={18} />}>
            Continue
          </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[280px_1fr_320px]">
        <WorkflowSidebar steps={sidebarSteps} />
        <main className="min-w-0 bg-white px-6 py-8">
          <div className="mx-auto grid max-w-3xl gap-6">
            <section className="grid gap-2 border-b border-[color:var(--border-muted)] pb-5">
              <h2 className="text-2xl font-bold uppercase text-[color:var(--blue-deep)]">
                {wizard.activeIndex + 1}. {wizard.activeStep.label}
              </h2>
              <p className="text-sm leading-6 text-[color:var(--muted)]">{getStepDescription(wizard.activeStepKey)}</p>
            </section>

            <StepContent stepKey={wizard.activeStepKey} />

            <div className="flex items-center justify-between border-t border-[color:var(--border-muted)] pt-5">
              {wizard.previousStep ? (
                <Button href={getStepHref(wizard.previousStep.stepKey)} variant="secondary" iconLeft={<ArrowLeft size={18} />}>
                  Previous
                </Button>
              ) : (
                <Button href="/candidate" variant="secondary" iconLeft={<ArrowLeft size={18} />}>
                  Back to dashboard
                </Button>
              )}
              <Button href={wizard.nextStep ? getStepHref(wizard.nextStep.stepKey) : "/candidate"} iconRight={<ArrowRight size={18} />}>
                {wizard.nextStep ? "Continue" : "Finish"}
              </Button>
            </div>
          </div>
        </main>
        <WorkflowProgressPanel percent={wizard.percent}>
          <div className="grid gap-3">
            {wizard.statuses.map((status) => (
              <a key={status.stepKey} href={getStepHref(status.stepKey)} className="grid gap-1 border-b border-[color:var(--border-muted)] py-3 last:border-0">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[color:var(--navy)]">{status.label}</span>
                  {status.status === "locked" ? <Lock className="h-4 w-4 text-slate-400" /> : <StatusChip label={status.status.replace("_", " ")} tone={getStatusTone(status.status)} />}
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {status.completedFields}/{status.totalFields} fields
                </span>
              </a>
            ))}
          </div>
          <Card>
            <CardContent className="grid gap-3 px-5 pb-5 pt-8">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-[color:var(--blue)]" />
                <h3 className="font-bold text-[color:var(--navy)]">Need help?</h3>
              </div>
              <p className="text-sm leading-6 text-[color:var(--muted)]">All progress is saved automatically. You can leave and return to this profile wizard anytime.</p>
            </CardContent>
          </Card>
        </WorkflowProgressPanel>
      </div>
    </div>
  );
}

function StepContent({ stepKey }: { stepKey: CandidateProfileStepKey }) {
  switch (stepKey) {
    case "contact_information":
      return <ContactStep />;
    case "personal_information":
      return <PersonalStep />;
    case "education_preferences":
      return <EducationStep />;
    case "training_experience":
      return <TrainingStep />;
    case "background":
      return <BackgroundStep />;
    case "certifications_credentials":
      return <CredentialsStep />;
    case "essay_responses":
      return <EssayStep />;
    case "attachments":
      return <AttachmentsStep />;
    case "review_submit":
      return <ReviewStep />;
    default:
      return <ContactStep />;
  }
}

function ContactStep() {
  return (
    <div className="grid gap-6">
      <FieldSection title="Personal details">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="First Name" placeholder="Jordan" defaultValue="Jordan" />
          <Input label="Last Name" placeholder="Smith" defaultValue="Smith" />
        </div>
      </FieldSection>
      <FieldSection title="Address">
        <Input label="Street Name/Street Number" defaultValue="123 Main Street" />
        <div className="grid gap-4 md:grid-cols-3">
          <Input label="City" defaultValue="Boston" />
          <Input label="State" defaultValue="MA" />
          <Input label="ZIP Code" defaultValue="02108" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Phone" defaultValue="(617) 555-1234" />
          <Input label="Email" type="email" defaultValue="jordan@example.com" />
        </div>
      </FieldSection>
    </div>
  );
}

function PersonalStep() {
  return (
    <FieldSection title="Personal information">
      <div className="grid gap-5 md:grid-cols-2">
        <RadioGroup label="Gender" options={["Male", "Female", "Other"]} name="gender" defaultValue="Male" />
        <Select label="Ethnicity" defaultValue="White | Non-Hispanic" options={[{ label: "White | Non-Hispanic", value: "White | Non-Hispanic" }, { label: "Prefer not to say", value: "Prefer not to say" }]} />
        <Select label="Highest level of education" defaultValue="Bachelor's Degree" options={[{ label: "Bachelor's Degree", value: "Bachelor's Degree" }, { label: "Associate Degree", value: "Associate Degree" }, { label: "High School Diploma", value: "High School Diploma" }]} />
        <RadioGroup label="Are you fluent in a language other than English?" options={["Yes", "No"]} name="multilingual" defaultValue="Yes" />
        <Input label="If yes, please list language(s)" defaultValue="Spanish" />
        <Input label="Last 4 digits of your Social Security Number" defaultValue="1234" />
      </div>
    </FieldSection>
  );
}

function EducationStep() {
  return (
    <FieldSection title="Education & preferences">
      <div className="grid gap-5">
        <Select label="Highest level of education" defaultValue="Bachelor's Degree" options={[{ label: "Bachelor's Degree", value: "Bachelor's Degree" }, { label: "Associate Degree", value: "Associate Degree" }, { label: "High School Diploma", value: "High School Diploma" }]} />
        <RadioGroup label="If you apply but do not meet residency requirements, are you willing to relocate?" options={["Yes", "No"]} name="relocate" defaultValue="Yes" />
        <div className="grid gap-3">
          <p className="text-sm font-semibold text-slate-700">Desired Hiring Agencies</p>
          <div className="grid gap-3 md:grid-cols-2">
            {["Municipal Police Departments", "Campus Police Departments", "Department of Corrections", "Sheriffs", "Security", "Hospitals", "Other Public Safety"].map((item) => (
              <Checkbox key={item} label={item} defaultChecked={["Municipal Police Departments", "Department of Corrections", "Sheriffs", "Other Public Safety"].includes(item)} />
            ))}
          </div>
        </div>
      </div>
    </FieldSection>
  );
}

function TrainingStep() {
  return (
    <FieldSection title="Training & experience">
      <div className="grid gap-5">
        <RadioGroup label="Have you participated in volunteer/community service engagement?" options={["Yes", "No"]} name="volunteer" defaultValue="Yes" />
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Where?" defaultValue="Local Food Bank" />
          <Input label="When? (Year)" defaultValue="2021 - Present" />
        </div>
        <RadioGroup label="Have you taken the MA Civil Service exam?" options={["Yes, I passed.", "No"]} name="civil_service" defaultValue="Yes, I passed." />
        <RadioGroup label="Do you have prior public-safety experience?" options={["Yes", "No"]} name="prior_experience" defaultValue="Yes" />
        <Input label="Role(s) / Agency" defaultValue="Security Officer, ABC Hospital" />
      </div>
    </FieldSection>
  );
}

function BackgroundStep() {
  return (
    <FieldSection title="Background">
      <div className="grid gap-5 md:grid-cols-2">
        <RadioGroup label="Are you a U.S. Citizen?" options={["Yes", "No"]} name="citizen" defaultValue="Yes" />
        <RadioGroup label="Do you possess a valid Driver's License?" options={["Yes", "No"]} name="license" defaultValue="Yes" />
        <RadioGroup label="Have you served in the military?" options={["Yes", "No"]} name="military" defaultValue="Yes" />
        <RadioGroup label="Are you a qualified veteran?" options={["Yes", "No"]} name="veteran" defaultValue="Yes" />
        <Select label="LTC eligibility" defaultValue="eligible" options={[{ label: "Eligible", value: "eligible" }, { label: "Restrictions may apply", value: "restrictions_may_apply" }]} />
        <Textarea label="Additional skills" defaultValue="Community-oriented and detail-focused." />
      </div>
    </FieldSection>
  );
}

function CredentialsStep() {
  return (
    <FieldSection title="Certifications & credentials">
      <div className="grid gap-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Checkbox label="CPR Certified" defaultChecked />
          <Checkbox label="EMT" defaultChecked />
          <Checkbox label="LTC" defaultChecked />
        </div>
        <RadioGroup label="Completed a Full-Time Academy?" options={["Yes", "No"]} name="academy" defaultValue="Yes" />
        <Select label="Academy Type" defaultValue="Full-Time MPTC Academy" options={[{ label: "Full-Time MPTC Academy", value: "Full-Time MPTC Academy" }, { label: "Bridge Academy", value: "Bridge Academy" }, { label: "Other", value: "Other" }]} />
        <Input label="Academy year" defaultValue="2024" />
      </div>
    </FieldSection>
  );
}

function EssayStep() {
  return (
    <FieldSection title="Essay responses">
      <Textarea label="Why are you interested in public safety?" placeholder="Write your response..." />
      <Textarea label="Describe a time you served your community." placeholder="Write your response..." />
      <Textarea label="What makes you a strong candidate?" placeholder="Write your response..." />
    </FieldSection>
  );
}

function AttachmentsStep() {
  return (
    <FieldSection title="Attachments">
      <div className="grid gap-4 md:grid-cols-2">
        {["Resume", "College Transcript", "CPR Certificate", "EMT / Paramedic Certificate", "DD-214", "Other Supporting Document"].map((item) => (
          <div key={item} className="rounded-md border border-dashed border-[color:var(--border)] p-4">
            <p className="font-bold text-[color:var(--navy)]">{item}</p>
            <p className="mt-1 text-sm text-[color:var(--muted)]">PDF upload shell. Upload behavior lands in TG-A6.</p>
          </div>
        ))}
      </div>
    </FieldSection>
  );
}

function ReviewStep() {
  return (
    <FieldSection title="Review & submit">
      <div className="grid gap-4">
        <p className="text-sm leading-6 text-[color:var(--muted)]">Review each profile section before submitting. In the MVP, submission will lock the current version for department application views and preserve later edits in change history.</p>
        <Checkbox label="I confirm this candidate profile information is accurate and ready for review." />
        <Button href="/candidate">Submit mock profile</Button>
      </div>
    </FieldSection>
  );
}

function FieldSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4">
      <h3 className="text-lg font-bold text-[color:var(--navy)]">{title}</h3>
      {children}
    </section>
  );
}

function RadioGroup({ label, options, name, defaultValue }: { label: string; options: string[]; name: string; defaultValue?: string }) {
  return (
    <div className="grid gap-3">
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <div className="flex flex-wrap gap-6">
        {options.map((option) => (
          <Radio key={option} label={option} name={name} defaultChecked={option === defaultValue} />
        ))}
      </div>
    </div>
  );
}

function getStepDescription(stepKey: CandidateProfileStepKey) {
  const descriptions: Record<CandidateProfileStepKey, string> = {
    contact_information: "Enter your contact details. All required fields save automatically as you move through the profile.",
    personal_information: "Provide demographic and eligibility details used in candidate applications.",
    education_preferences: "Tell departments about your education, languages, relocation preference, and desired agency types.",
    training_experience: "Capture public-safety training, academy, exam, volunteer, and experience information.",
    background: "Provide background, citizenship, license, veteran, and eligibility information.",
    certifications_credentials: "List credentials and academy completion details that support your track.",
    essay_responses: "Draft written responses departments may review as part of an application.",
    attachments: "Prepare supporting document categories. Upload handling is completed in the documents task group.",
    review_submit: "Review the full profile and submit the mock profile version."
  };

  return descriptions[stepKey];
}

function getStatusTone(status: string) {
  if (status === "complete") {
    return "success";
  }

  if (status === "in_progress") {
    return "navy";
  }

  if (status === "locked") {
    return "warning";
  }

  return "muted";
}
