export interface AuditLogEntity {
  id: number,
  user_id: number,
  action: string,
  entite: string,
  entite_id: number,
  ancienne_valeur: string,
  nouvelle_valeur: string,
  ip_address: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}