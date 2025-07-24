export interface REModePaiementEntity {
  id: number,
  code: string,
  libelle: string,
  frais_pourcentage: number,
  delai_jours: number,
  actif: boolean,
  created_at: string,
  updated_at: string,
  deleted_at: string
}