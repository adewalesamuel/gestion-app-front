export interface RCEnginFlottantEntity {
  id: number,
  rc_type_engin_id: number,
  rc_pays_id: number,
  rc_acteur_id: number,
  nom: string,
  immatriculation: string,
  tonnage_brut: number,
  longueur: number,
  annee_construction: string,
  capacite_passagers: number,
  capacite_fret: number,
  created_at: string,
  updated_at: string,
  deleted_at: string
}