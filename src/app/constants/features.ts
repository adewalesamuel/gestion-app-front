export const FEATURES = {
  NOTIFICATION_TYPE: {
    ALERTE: "alerte",
    INFO: "info",
    URGENCE: "urgence",
  },
  TYPE_ENGIN_CATEGORIE: {
    NAVIGATION: "navigation",
    PECHE: "peche",
    COMMERCE: "commerce",
    PLAISANCE: "plaisance",
    SERVICE: "service",
  },
  ACTEUR_TYPE: {
    MORALE: "morale",
    PHYSIQUE: "physique",
  },
  CERTIFICAT_TYPE: {
    SECURITE: "securite",
    POLLUTION: "pollution",
    NAVIRE: "navire",
    AUTRE: "autre",
  },
  HISTORIQUE_PROPRIETE_TYPE_TRANSACTION: {
    ACHAT: "achat",
    VENTE: "vente",
    DON: "don",
    HERITAGE: "heritage",
  },
  TRANSACTION_STATUT: {
    INITIEE: "initiee",
    COMPLETEE: "completee",
    ECHOUEE: "echouee",
    REMBOURSEE: "remboursee",
  },
  HISTORIQUE_ACTION: {
    CREATION: "creation",
    MODIFICATION: "modification",
    VALIDATION: "validation",
    REJET: "rejet",
  },
  TYPE_CONTROLE_GRAVITE_MIN: {
    MINEURE: "mineure",
    MAJEURE: "majeure",
    CRITIQUE: "critique",
  },
  NON_CONFORMITE_GRAVITE: {
    MINEURE: "mineure",
    MAJEURE: "majeure",
    CRITIQUE: "critique",
  },
  NON_CONFORMITE_STATUT: {
    OUVERTE: "ouverte",
    EN_COURS: "en_cours",
    RESOLUE: "resolue",
    FERMEE: "fermee",
  },
  INSPECTION_STATUT: {
    PLANIFIEE: "planifiee",
    REALISEE: "realisee",
    ANNULEE: "annulee",
    REPORTEE: "reportee",
  },
  INSPECTION_RESULTAT: {
    CONFORME: "conforme",
    NON_CONFORME: "non_conforme",
    AVEC_RESERVES: "avec_reserves",
  },
  TARIF_FREQUENCE: {
    UNIQUE: "unique",
    ANNUELLE: "annuelle",
    MENSUELLE: "mensuelle",
    PONCTUELLE: "ponctuelle",
  },
  ORDRE_RECETTE_STATUT: {
    EMIS: "emis",
    PAYE: "paye",
    PARTIEL: "partiel",
    EN_RETARD: "en_retard",
    ANNULE: "annule",
  },
  RELANCE_MODE: {
    EMAIL: "email",
    COURRIER: "courrier",
    SMS: "sms",
    APPELLE: "appelle",
  },
  RELANCE_STATUT: {
    ENVOYEE: "envoyee",
    RECUE: "recue",
    OUVERTE: "ouverte",
  },
  HISTORIQUE_RELANCE_MODE: {
    EMAIL: "email",
    COURRIER: "courrier",
    SMS: "sms",
    APPELLE: "appelle",
  },
  SCHEMA_DONNEES_STATUT: {
    BROUILLON: "brouillon",
    VALIDE: "valide",
    DEPRECIE: "deprecie",
  },
  API_STATUT: {
    ACTIF: "actif",
    INACTIF: "inactif",
    MAINTENANCE: "maintenance",
  },
  LOG_ECHANGE_TYPE_REQUETE: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
  }
} as const;
