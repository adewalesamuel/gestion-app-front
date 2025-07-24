export interface GUTransactionEntity {
  id: number,
  re_mode_paiement_id: number,
  gu_demande_id: number,
  user_id: number,
  reference: string,
  montant: number,
  devise: string,
  date_transaction: string,
  heure: string,
  statut: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}