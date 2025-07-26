import { CONSTS } from "./constants";

export type ResponsePaginate<T> = {
  current_page: number,
  data: T,
  last_page: number,
  to: number,
  total: number,
}

export type Response<T> = {
  data: T | ResponsePaginate<T>,
  success: any,
}

export type ResponseError = Partial<{
  status: number,
  messages: Promise<unknown>
}>;

export type NotificationValue = typeof CONSTS.FEATURES.NOTIFICATION_TYPE[keyof typeof CONSTS.FEATURES.NOTIFICATION_TYPE];

export type TypeEnginCategorieValue = typeof CONSTS.FEATURES.TYPE_ENGIN_CATEGORIE[keyof typeof CONSTS.FEATURES.TYPE_ENGIN_CATEGORIE];

export type ActeurTypeValue = typeof CONSTS.FEATURES.ACTEUR_TYPE[keyof typeof CONSTS.FEATURES.ACTEUR_TYPE];

export type CertificatTypeValue = typeof CONSTS.FEATURES.CERTIFICAT_TYPE[keyof typeof CONSTS.FEATURES.CERTIFICAT_TYPE];

export type HistoriqueProprieteTypeTransactionValue = typeof CONSTS.FEATURES.HISTORIQUE_PROPRIETE_TYPE_TRANSACTION[keyof typeof CONSTS.FEATURES.HISTORIQUE_PROPRIETE_TYPE_TRANSACTION];

export type TransactionStatutValue = typeof CONSTS.FEATURES.TRANSACTION_STATUT[keyof typeof CONSTS.FEATURES.TRANSACTION_STATUT];

export type HistoriqueActionValue = typeof CONSTS.FEATURES.HISTORIQUE_ACTION[keyof typeof CONSTS.FEATURES.HISTORIQUE_ACTION];

export type TypeControleGraviteMinValue = typeof CONSTS.FEATURES.TYPE_CONTROLE_GRAVITE_MIN[keyof typeof CONSTS.FEATURES.TYPE_CONTROLE_GRAVITE_MIN];

export type NonConformiteGraviteValue = typeof CONSTS.FEATURES.NON_CONFORMITE_GRAVITE[keyof typeof CONSTS.FEATURES.NON_CONFORMITE_GRAVITE];

export type NonConformiteStatutValue = typeof CONSTS.FEATURES.NON_CONFORMITE_STATUT[keyof typeof CONSTS.FEATURES.NON_CONFORMITE_STATUT];

export type InspectionStatutValue = typeof CONSTS.FEATURES.INSPECTION_STATUT[keyof typeof CONSTS.FEATURES.INSPECTION_STATUT];

export type InspectionResultatValue = typeof CONSTS.FEATURES.INSPECTION_RESULTAT[keyof typeof CONSTS.FEATURES.INSPECTION_RESULTAT];

export type TarifFrequenceValue = typeof CONSTS.FEATURES.TARIF_FREQUENCE[keyof typeof CONSTS.FEATURES.TARIF_FREQUENCE];

export type OrdreRecetteStatutValue = typeof CONSTS.FEATURES.ORDRE_RECETTE_STATUT[keyof typeof CONSTS.FEATURES.ORDRE_RECETTE_STATUT];

export type RelanceModeValue = typeof CONSTS.FEATURES.RELANCE_MODE[keyof typeof CONSTS.FEATURES.RELANCE_MODE];

export type RelanceStatutValue = typeof CONSTS.FEATURES.RELANCE_STATUT[keyof typeof CONSTS.FEATURES.RELANCE_STATUT];

export type HistoriqueRelanceModeValue = typeof CONSTS.FEATURES.HISTORIQUE_RELANCE_MODE[keyof typeof CONSTS.FEATURES.HISTORIQUE_RELANCE_MODE];

export type SchemaDonneesStatutValue = typeof CONSTS.FEATURES.SCHEMA_DONNEES_STATUT[keyof typeof CONSTS.FEATURES.SCHEMA_DONNEES_STATUT];

export type ApiStatutValue = typeof CONSTS.FEATURES.API_STATUT[keyof typeof CONSTS.FEATURES.API_STATUT];

export type LogEchangeTypeRequeteValue = typeof CONSTS.FEATURES.LOG_ECHANGE_TYPE_REQUETE[keyof typeof CONSTS.FEATURES.LOG_ECHANGE_TYPE_REQUETE];
