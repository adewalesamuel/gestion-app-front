export interface EDAbonnementEntity {
  id: number,
  ed_api_id: number,
  rc_acteur_id: number,
  nom_client: string,
  token: string,
  date_expiration: string,
  limite_requetes_jour: number,
  created_at: string,
  updated_at: string,
  deleted_at: string
}