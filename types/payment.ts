export type Purchase = {
  id: string;
  buyerUserId: string;
  buyerType: "candidate" | "department";
  productType: "elr_exam" | "candidate_membership" | "token_pack" | "department_upfront" | "department_membership" | "badge_credit_pack" | "study_guide";
  amountCents: number;
  currency: "usd";
  status: "pending" | "paid" | "failed" | "refunded" | "cancelled";
  stripeCheckoutSessionId?: string;
  purchasedAt?: string;
};
