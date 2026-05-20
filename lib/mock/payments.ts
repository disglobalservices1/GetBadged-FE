import type { Purchase } from "@/types/payment";

export const mockPurchases: Purchase[] = [
  {
    id: "purchase_exam_1",
    buyerUserId: "user_candidate_1",
    buyerType: "candidate",
    productType: "elr_exam",
    amountCents: 9900,
    currency: "usd",
    status: "paid",
    stripeCheckoutSessionId: "cs_mock_elr_exam_1",
    purchasedAt: "2026-05-18T11:30:00.000Z"
  }
];
