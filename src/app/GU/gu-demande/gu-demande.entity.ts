export interface GUDemandeEntity {
  id: number,
  gu_type_demande_id: number,
  gu_statut_demande_id: number,
  rc_acteur_id: number,
  rc_engin_flottant_id: number,
  reference: string,
  date_depot: string,
  heure: string,
  date_traitement: string,
  date_expiration: string,
  fichiers_joints: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}