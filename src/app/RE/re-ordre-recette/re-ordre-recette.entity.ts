export interface REOrdreRecetteEntity {
  id: number,
  rc_acteur_id: number,
  reference: string,
  montant: number,
  devise: string,
  date_emission: string,
  date_echeance: string,
  statut: string,
  service_concerne: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}