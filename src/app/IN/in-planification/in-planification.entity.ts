export interface INPlanificationEntity {
  id: number,
  rc_engin_flottant_id: number,
  in_checklist_id: number,
  periodicite_jours: number,
  prochaine_date: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}