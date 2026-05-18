export type TokenLedgerEntry = {
  id: string;
  candidateProfileId: string;
  eventType: "exam_purchase_grant" | "membership_renewal_grant" | "top_up_purchase" | "direct_apply" | "badge_accept" | "upgrade_void";
  delta: number;
  balanceAfter: number;
  relatedApplicationId?: string;
  relatedPurchaseId?: string;
  createdAt: string;
  note?: string;
};

export const mockTokenLedgerEntries: TokenLedgerEntry[] = [
  {
    id: "token_ledger_seed",
    candidateProfileId: "candidate_1",
    eventType: "exam_purchase_grant",
    delta: 5,
    balanceAfter: 5,
    createdAt: "2026-05-15T08:00:00.000Z",
    note: "Mock starting token grant."
  },
  {
    id: "token_ledger_1",
    candidateProfileId: "candidate_1",
    eventType: "direct_apply",
    delta: -1,
    balanceAfter: 4,
    relatedApplicationId: "application_1",
    createdAt: "2026-05-17T10:15:00.000Z",
    note: "Direct application token use."
  }
];
