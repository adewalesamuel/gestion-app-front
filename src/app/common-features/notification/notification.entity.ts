export interface NotificationEntity {
  id: number,
  user_id: number,
  titre: string,
  message: string,
  lu: boolean,
  type: string,
  entite_type: string,
  entite_id: number,
  created_at: string,
  updated_at: string,
  deleted_at: string
}