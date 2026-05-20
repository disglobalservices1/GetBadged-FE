import { redirect } from "next/navigation";
import { getCandidateProfileWizard, getStepHref } from "@/features/candidate/profile/profile-wizard";

export default function CandidateProfileIndexPage() {
  const wizard = getCandidateProfileWizard();

  redirect(getStepHref(wizard.activeStepKey));
}
