export interface REPaiementEntity {
  id: number,
  re_ordre_recette_id: number,
  user_id: number,
  re_mode_paiement_id: number,
  montant: number,
  devise: string,
  date_paiement: string,
  heure: string,
  reference_transaction: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}