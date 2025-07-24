export interface INInspectionEntity {
  id: number,
  in_type_controle_id: number,
  in_equipe_inspection_id: number,
  rc_engin_flottant_id: number,
  user_id: number,
  reference: string,
  date_planifiee: string,
  heure: string,
  date_reelle: string,
  statut: string,
  resultat: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}