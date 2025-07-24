export interface EDLogEchangeEntity {
  id: number,
  ed_api_id: number,
  user_id: number,
  date_heure: string,
  heure: string,
  type_requete: string,
  endpoint: string,
  statut_reponse: number,
  temps_reponse_ms: number,
  created_at: string,
  updated_at: string,
  deleted_at: string
}