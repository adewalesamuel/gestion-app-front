export interface UserEntity {
  id: number,
  role_id: number,
  rc_acteur_id: number,
  profil_img_url: string,
  nom: string,
  email: string,
  password: string,
  last_login_date: string,
  last_login_heure: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}
