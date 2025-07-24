import { Routes } from '@angular/router';
import { environment } from './environments/environment';
import { MainLayoutComponent } from './ui/layout/main-layout/main-layout.component';
import { LoginComponent } from './common-features/auth/login/login.component';
import { HomeComponent } from './home/home.component/home.component';

export const routes: Routes = [
  {
    title: 'Login',
    path: 'login',
    component: LoginComponent,
  },
  {
    title: environment.APP_NAME,
    path: '',
    component: MainLayoutComponent,
    children: [
      {
				path: '',
				component: HomeComponent
			},
      {
				title: 'Role',
				path: 'roles',
				loadComponent: () => import('./common-features/role/role-list/role-list.component').then(m => m.RoleListComponent),
			},
			{
				title: 'Role',
				path: 'roles/create',
				loadComponent: () => import('./common-features/role/role-create/role-create.component').then(m => m.RoleCreateComponent),
			},
			{
				title: 'Role',
				path: 'roles/:id/edit',
				loadComponent: () => import('./common-features/role/role-edit/role-edit.component').then(m => m.RoleEditComponent),
			},
			{
				title: 'User',
				path: 'users',
				loadComponent: () => import('./common-features/user/user-list/user-list.component').then(m => m.UserListComponent),
			},
			{
				title: 'User',
				path: 'users/create',
				loadComponent: () => import('./common-features/user/user-create/user-create.component').then(m => m.UserCreateComponent),
			},
			{
				title: 'User',
				path: 'users/:id/edit',
				loadComponent: () => import('./common-features/user/user-edit/user-edit.component').then(m => m.UserEditComponent),
			},
			{
				title: 'Notification',
				path: 'notifications',
				loadComponent: () => import('./common-features/notification/notification-list/notification-list.component').then(m => m.NotificationListComponent),
			},
			{
				title: 'Notification',
				path: 'notifications/create',
				loadComponent: () => import('./common-features/notification/notification-create/notification-create.component').then(m => m.NotificationCreateComponent),
			},
			{
				title: 'Notification',
				path: 'notifications/:id/edit',
				loadComponent: () => import('./common-features/notification/notification-edit/notification-edit.component').then(m => m.NotificationEditComponent),
			},
			{
				title: 'AuditLog',
				path: 'audit-logs',
				loadComponent: () => import('./common-features/audit-log/audit-log-list/audit-log-list.component').then(m => m.AuditLogListComponent),
			},
			{
				title: 'AuditLog',
				path: 'audit-logs/create',
				loadComponent: () => import('./common-features/audit-log/audit-log-create/audit-log-create.component').then(m => m.AuditLogCreateComponent),
			},
			{
				title: 'AuditLog',
				path: 'audit-logs/:id/edit',
				loadComponent: () => import('./common-features/audit-log/audit-log-edit/audit-log-edit.component').then(m => m.AuditLogEditComponent),
			},
			{
				title: 'ConfigSysteme',
				path: 'config-systemes',
				loadComponent: () => import('./common-features/config-systeme/config-systeme-list/config-systeme-list.component').then(m => m.ConfigSystemeListComponent),
			},
			{
				title: 'ConfigSysteme',
				path: 'config-systemes/create',
				loadComponent: () => import('./common-features/config-systeme/config-systeme-create/config-systeme-create.component').then(m => m.ConfigSystemeCreateComponent),
			},
			{
				title: 'ConfigSysteme',
				path: 'config-systemes/:id/edit',
				loadComponent: () => import('./common-features/config-systeme/config-systeme-edit/config-systeme-edit.component').then(m => m.ConfigSystemeEditComponent),
			},
			{
				title: 'RCPays',
				path: 'rc-payss',
				loadComponent: () => import('./RC/rc-pays/rc-pays-list/rc-pays-list.component').then(m => m.RCPaysListComponent),
			},
			{
				title: 'RCPays',
				path: 'rc-payss/create',
				loadComponent: () => import('./RC/rc-pays/rc-pays-create/rc-pays-create.component').then(m => m.RCPaysCreateComponent),
			},
			{
				title: 'RCPays',
				path: 'rc-payss/:id/edit',
				loadComponent: () => import('./RC/rc-pays/rc-pays-edit/rc-pays-edit.component').then(m => m.RCPaysEditComponent),
			},
			{
				title: 'RCTypeEngin',
				path: 'rc-type-engins',
				loadComponent: () => import('./RC/rc-type-engin/rc-type-engin-list/rc-type-engin-list.component').then(m => m.RCTypeEnginListComponent),
			},
			{
				title: 'RCTypeEngin',
				path: 'rc-type-engins/create',
				loadComponent: () => import('./RC/rc-type-engin/rc-type-engin-create/rc-type-engin-create.component').then(m => m.RCTypeEnginCreateComponent),
			},
			{
				title: 'RCTypeEngin',
				path: 'rc-type-engins/:id/edit',
				loadComponent: () => import('./RC/rc-type-engin/rc-type-engin-edit/rc-type-engin-edit.component').then(m => m.RCTypeEnginEditComponent),
			},
			{
				title: 'RCActeur',
				path: 'rc-acteurs',
				loadComponent: () => import('./RC/rc-acteur/rc-acteur-list/rc-acteur-list.component').then(m => m.RCActeurListComponent),
			},
			{
				title: 'RCActeur',
				path: 'rc-acteurs/create',
				loadComponent: () => import('./RC/rc-acteur/rc-acteur-create/rc-acteur-create.component').then(m => m.RCActeurCreateComponent),
			},
			{
				title: 'RCActeur',
				path: 'rc-acteurs/:id/edit',
				loadComponent: () => import('./RC/rc-acteur/rc-acteur-edit/rc-acteur-edit.component').then(m => m.RCActeurEditComponent),
			},
			{
				title: 'RCEquipement',
				path: 'rc-equipements',
				loadComponent: () => import('./RC/rc-equipement/rc-equipement-list/rc-equipement-list.component').then(m => m.RCEquipementListComponent),
			},
			{
				title: 'RCEquipement',
				path: 'rc-equipements/create',
				loadComponent: () => import('./RC/rc-equipement/rc-equipement-create/rc-equipement-create.component').then(m => m.RCEquipementCreateComponent),
			},
			{
				title: 'RCEquipement',
				path: 'rc-equipements/:id/edit',
				loadComponent: () => import('./RC/rc-equipement/rc-equipement-edit/rc-equipement-edit.component').then(m => m.RCEquipementEditComponent),
			},
			{
				title: 'RCPort',
				path: 'rc-ports',
				loadComponent: () => import('./RC/rc-port/rc-port-list/rc-port-list.component').then(m => m.RCPortListComponent),
			},
			{
				title: 'RCPort',
				path: 'rc-ports/create',
				loadComponent: () => import('./RC/rc-port/rc-port-create/rc-port-create.component').then(m => m.RCPortCreateComponent),
			},
			{
				title: 'RCPort',
				path: 'rc-ports/:id/edit',
				loadComponent: () => import('./RC/rc-port/rc-port-edit/rc-port-edit.component').then(m => m.RCPortEditComponent),
			},
			{
				title: 'RCCertificat',
				path: 'rc-certificats',
				loadComponent: () => import('./RC/rc-certificat/rc-certificat-list/rc-certificat-list.component').then(m => m.RCCertificatListComponent),
			},
			{
				title: 'RCCertificat',
				path: 'rc-certificats/create',
				loadComponent: () => import('./RC/rc-certificat/rc-certificat-create/rc-certificat-create.component').then(m => m.RCCertificatCreateComponent),
			},
			{
				title: 'RCCertificat',
				path: 'rc-certificats/:id/edit',
				loadComponent: () => import('./RC/rc-certificat/rc-certificat-edit/rc-certificat-edit.component').then(m => m.RCCertificatEditComponent),
			},
			{
				title: 'RCHistoriquePropriete',
				path: 'rc-historique-proprietes',
				loadComponent: () => import('./RC/rc-historique-propriete/rc-historique-propriete-list/rc-historique-propriete-list.component').then(m => m.RCHistoriqueProprieteListComponent),
			},
			{
				title: 'RCHistoriquePropriete',
				path: 'rc-historique-proprietes/create',
				loadComponent: () => import('./RC/rc-historique-propriete/rc-historique-propriete-create/rc-historique-propriete-create.component').then(m => m.RCHistoriqueProprieteCreateComponent),
			},
			{
				title: 'RCHistoriquePropriete',
				path: 'rc-historique-proprietes/:id/edit',
				loadComponent: () => import('./RC/rc-historique-propriete/rc-historique-propriete-edit/rc-historique-propriete-edit.component').then(m => m.RCHistoriqueProprieteEditComponent),
			},
			{
				title: 'RCEnginFlottant',
				path: 'rc-engin-flottants',
				loadComponent: () => import('./RC/rc-engin-flottant/rc-engin-flottant-list/rc-engin-flottant-list.component').then(m => m.RCEnginFlottantListComponent),
			},
			{
				title: 'RCEnginFlottant',
				path: 'rc-engin-flottants/create',
				loadComponent: () => import('./RC/rc-engin-flottant/rc-engin-flottant-create/rc-engin-flottant-create.component').then(m => m.RCEnginFlottantCreateComponent),
			},
			{
				title: 'RCEnginFlottant',
				path: 'rc-engin-flottants/:id/edit',
				loadComponent: () => import('./RC/rc-engin-flottant/rc-engin-flottant-edit/rc-engin-flottant-edit.component').then(m => m.RCEnginFlottantEditComponent),
			},
			{
				title: 'GUStatutDemande',
				path: 'gu-statut-demandes',
				loadComponent: () => import('./GU/gu-statut-demande/gu-statut-demande-list/gu-statut-demande-list.component').then(m => m.GUStatutDemandeListComponent),
			},
			{
				title: 'GUStatutDemande',
				path: 'gu-statut-demandes/create',
				loadComponent: () => import('./GU/gu-statut-demande/gu-statut-demande-create/gu-statut-demande-create.component').then(m => m.GUStatutDemandeCreateComponent),
			},
			{
				title: 'GUStatutDemande',
				path: 'gu-statut-demandes/:id/edit',
				loadComponent: () => import('./GU/gu-statut-demande/gu-statut-demande-edit/gu-statut-demande-edit.component').then(m => m.GUStatutDemandeEditComponent),
			},
			{
				title: 'GUTypeDemande',
				path: 'gu-type-demandes',
				loadComponent: () => import('./GU/gu-type-demande/gu-type-demande-list/gu-type-demande-list.component').then(m => m.GUTypeDemandeListComponent),
			},
			{
				title: 'GUTypeDemande',
				path: 'gu-type-demandes/create',
				loadComponent: () => import('./GU/gu-type-demande/gu-type-demande-create/gu-type-demande-create.component').then(m => m.GUTypeDemandeCreateComponent),
			},
			{
				title: 'GUTypeDemande',
				path: 'gu-type-demandes/:id/edit',
				loadComponent: () => import('./GU/gu-type-demande/gu-type-demande-edit/gu-type-demande-edit.component').then(m => m.GUTypeDemandeEditComponent),
			},
			{
				title: 'GUTransaction',
				path: 'gu-transactions',
				loadComponent: () => import('./GU/gu-transaction/gu-transaction-list/gu-transaction-list.component').then(m => m.GUTransactionListComponent),
			},
			{
				title: 'GUTransaction',
				path: 'gu-transactions/create',
				loadComponent: () => import('./GU/gu-transaction/gu-transaction-create/gu-transaction-create.component').then(m => m.GUTransactionCreateComponent),
			},
			{
				title: 'GUTransaction',
				path: 'gu-transactions/:id/edit',
				loadComponent: () => import('./GU/gu-transaction/gu-transaction-edit/gu-transaction-edit.component').then(m => m.GUTransactionEditComponent),
			},
			{
				title: 'GUWorkflow',
				path: 'gu-workflows',
				loadComponent: () => import('./GU/gu-workflow/gu-workflow-list/gu-workflow-list.component').then(m => m.GUWorkflowListComponent),
			},
			{
				title: 'GUWorkflow',
				path: 'gu-workflows/create',
				loadComponent: () => import('./GU/gu-workflow/gu-workflow-create/gu-workflow-create.component').then(m => m.GUWorkflowCreateComponent),
			},
			{
				title: 'GUWorkflow',
				path: 'gu-workflows/:id/edit',
				loadComponent: () => import('./GU/gu-workflow/gu-workflow-edit/gu-workflow-edit.component').then(m => m.GUWorkflowEditComponent),
			},
			{
				title: 'GUCommentaire',
				path: 'gu-commentaires',
				loadComponent: () => import('./GU/gu-commentaire/gu-commentaire-list/gu-commentaire-list.component').then(m => m.GUCommentaireListComponent),
			},
			{
				title: 'GUCommentaire',
				path: 'gu-commentaires/create',
				loadComponent: () => import('./GU/gu-commentaire/gu-commentaire-create/gu-commentaire-create.component').then(m => m.GUCommentaireCreateComponent),
			},
			{
				title: 'GUCommentaire',
				path: 'gu-commentaires/:id/edit',
				loadComponent: () => import('./GU/gu-commentaire/gu-commentaire-edit/gu-commentaire-edit.component').then(m => m.GUCommentaireEditComponent),
			},
			{
				title: 'GUHistorique',
				path: 'gu-historiques',
				loadComponent: () => import('./GU/gu-historique/gu-historique-list/gu-historique-list.component').then(m => m.GUHistoriqueListComponent),
			},
			{
				title: 'GUHistorique',
				path: 'gu-historiques/create',
				loadComponent: () => import('./GU/gu-historique/gu-historique-create/gu-historique-create.component').then(m => m.GUHistoriqueCreateComponent),
			},
			{
				title: 'GUHistorique',
				path: 'gu-historiques/:id/edit',
				loadComponent: () => import('./GU/gu-historique/gu-historique-edit/gu-historique-edit.component').then(m => m.GUHistoriqueEditComponent),
			},
			{
				title: 'GUDemande',
				path: 'gu-demandes',
				loadComponent: () => import('./GU/gu-demande/gu-demande-list/gu-demande-list.component').then(m => m.GUDemandeListComponent),
			},
			{
				title: 'GUDemande',
				path: 'gu-demandes/create',
				loadComponent: () => import('./GU/gu-demande/gu-demande-create/gu-demande-create.component').then(m => m.GUDemandeCreateComponent),
			},
			{
				title: 'GUDemande',
				path: 'gu-demandes/:id/edit',
				loadComponent: () => import('./GU/gu-demande/gu-demande-edit/gu-demande-edit.component').then(m => m.GUDemandeEditComponent),
			},
			{
				title: 'INTypeControle',
				path: 'in-type-controles',
				loadComponent: () => import('./IN/in-type-controle/in-type-controle-list/in-type-controle-list.component').then(m => m.INTypeControleListComponent),
			},
			{
				title: 'INTypeControle',
				path: 'in-type-controles/create',
				loadComponent: () => import('./IN/in-type-controle/in-type-controle-create/in-type-controle-create.component').then(m => m.INTypeControleCreateComponent),
			},
			{
				title: 'INTypeControle',
				path: 'in-type-controles/:id/edit',
				loadComponent: () => import('./IN/in-type-controle/in-type-controle-edit/in-type-controle-edit.component').then(m => m.INTypeControleEditComponent),
			},
			{
				title: 'INResultatItem',
				path: 'in-resultat-items',
				loadComponent: () => import('./IN/in-resultat-item/in-resultat-item-list/in-resultat-item-list.component').then(m => m.INResultatItemListComponent),
			},
			{
				title: 'INResultatItem',
				path: 'in-resultat-items/create',
				loadComponent: () => import('./IN/in-resultat-item/in-resultat-item-create/in-resultat-item-create.component').then(m => m.INResultatItemCreateComponent),
			},
			{
				title: 'INResultatItem',
				path: 'in-resultat-items/:id/edit',
				loadComponent: () => import('./IN/in-resultat-item/in-resultat-item-edit/in-resultat-item-edit.component').then(m => m.INResultatItemEditComponent),
			},
			{
				title: 'INChecklist',
				path: 'in-checklists',
				loadComponent: () => import('./IN/in-checklist/in-checklist-list/in-checklist-list.component').then(m => m.INChecklistListComponent),
			},
			{
				title: 'INChecklist',
				path: 'in-checklists/create',
				loadComponent: () => import('./IN/in-checklist/in-checklist-create/in-checklist-create.component').then(m => m.INChecklistCreateComponent),
			},
			{
				title: 'INChecklist',
				path: 'in-checklists/:id/edit',
				loadComponent: () => import('./IN/in-checklist/in-checklist-edit/in-checklist-edit.component').then(m => m.INChecklistEditComponent),
			},
			{
				title: 'INNonConformite',
				path: 'in-non-conformites',
				loadComponent: () => import('./IN/in-non-conformite/in-non-conformite-list/in-non-conformite-list.component').then(m => m.INNonConformiteListComponent),
			},
			{
				title: 'INNonConformite',
				path: 'in-non-conformites/create',
				loadComponent: () => import('./IN/in-non-conformite/in-non-conformite-create/in-non-conformite-create.component').then(m => m.INNonConformiteCreateComponent),
			},
			{
				title: 'INNonConformite',
				path: 'in-non-conformites/:id/edit',
				loadComponent: () => import('./IN/in-non-conformite/in-non-conformite-edit/in-non-conformite-edit.component').then(m => m.INNonConformiteEditComponent),
			},
			{
				title: 'INPlanification',
				path: 'in-planifications',
				loadComponent: () => import('./IN/in-planification/in-planification-list/in-planification-list.component').then(m => m.INPlanificationListComponent),
			},
			{
				title: 'INPlanification',
				path: 'in-planifications/create',
				loadComponent: () => import('./IN/in-planification/in-planification-create/in-planification-create.component').then(m => m.INPlanificationCreateComponent),
			},
			{
				title: 'INPlanification',
				path: 'in-planifications/:id/edit',
				loadComponent: () => import('./IN/in-planification/in-planification-edit/in-planification-edit.component').then(m => m.INPlanificationEditComponent),
			},
			{
				title: 'INEquipeInspection',
				path: 'in-equipe-inspections',
				loadComponent: () => import('./IN/in-equipe-inspection/in-equipe-inspection-list/in-equipe-inspection-list.component').then(m => m.INEquipeInspectionListComponent),
			},
			{
				title: 'INEquipeInspection',
				path: 'in-equipe-inspections/create',
				loadComponent: () => import('./IN/in-equipe-inspection/in-equipe-inspection-create/in-equipe-inspection-create.component').then(m => m.INEquipeInspectionCreateComponent),
			},
			{
				title: 'INEquipeInspection',
				path: 'in-equipe-inspections/:id/edit',
				loadComponent: () => import('./IN/in-equipe-inspection/in-equipe-inspection-edit/in-equipe-inspection-edit.component').then(m => m.INEquipeInspectionEditComponent),
			},
			{
				title: 'INInspection',
				path: 'in-inspections',
				loadComponent: () => import('./IN/in-inspection/in-inspection-list/in-inspection-list.component').then(m => m.INInspectionListComponent),
			},
			{
				title: 'INInspection',
				path: 'in-inspections/create',
				loadComponent: () => import('./IN/in-inspection/in-inspection-create/in-inspection-create.component').then(m => m.INInspectionCreateComponent),
			},
			{
				title: 'INInspection',
				path: 'in-inspections/:id/edit',
				loadComponent: () => import('./IN/in-inspection/in-inspection-edit/in-inspection-edit.component').then(m => m.INInspectionEditComponent),
			},
			{
				title: 'RETarif',
				path: 're-tarifs',
				loadComponent: () => import('./RE/re-tarif/re-tarif-list/re-tarif-list.component').then(m => m.RETarifListComponent),
			},
			{
				title: 'RETarif',
				path: 're-tarifs/create',
				loadComponent: () => import('./RE/re-tarif/re-tarif-create/re-tarif-create.component').then(m => m.RETarifCreateComponent),
			},
			{
				title: 'RETarif',
				path: 're-tarifs/:id/edit',
				loadComponent: () => import('./RE/re-tarif/re-tarif-edit/re-tarif-edit.component').then(m => m.RETarifEditComponent),
			},
			{
				title: 'REModePaiement',
				path: 're-mode-paiements',
				loadComponent: () => import('./RE/re-mode-paiement/re-mode-paiement-list/re-mode-paiement-list.component').then(m => m.REModePaiementListComponent),
			},
			{
				title: 'REModePaiement',
				path: 're-mode-paiements/create',
				loadComponent: () => import('./RE/re-mode-paiement/re-mode-paiement-create/re-mode-paiement-create.component').then(m => m.REModePaiementCreateComponent),
			},
			{
				title: 'REModePaiement',
				path: 're-mode-paiements/:id/edit',
				loadComponent: () => import('./RE/re-mode-paiement/re-mode-paiement-edit/re-mode-paiement-edit.component').then(m => m.REModePaiementEditComponent),
			},
			{
				title: 'REOrdreRecette',
				path: 're-ordre-recettes',
				loadComponent: () => import('./RE/re-ordre-recette/re-ordre-recette-list/re-ordre-recette-list.component').then(m => m.REOrdreRecetteListComponent),
			},
			{
				title: 'REOrdreRecette',
				path: 're-ordre-recettes/create',
				loadComponent: () => import('./RE/re-ordre-recette/re-ordre-recette-create/re-ordre-recette-create.component').then(m => m.REOrdreRecetteCreateComponent),
			},
			{
				title: 'REOrdreRecette',
				path: 're-ordre-recettes/:id/edit',
				loadComponent: () => import('./RE/re-ordre-recette/re-ordre-recette-edit/re-ordre-recette-edit.component').then(m => m.REOrdreRecetteEditComponent),
			},
			{
				title: 'RERelance',
				path: 're-relances',
				loadComponent: () => import('./RE/re-relance/re-relance-list/re-relance-list.component').then(m => m.RERelanceListComponent),
			},
			{
				title: 'RERelance',
				path: 're-relances/create',
				loadComponent: () => import('./RE/re-relance/re-relance-create/re-relance-create.component').then(m => m.RERelanceCreateComponent),
			},
			{
				title: 'RERelance',
				path: 're-relances/:id/edit',
				loadComponent: () => import('./RE/re-relance/re-relance-edit/re-relance-edit.component').then(m => m.RERelanceEditComponent),
			},
			{
				title: 'RERemise',
				path: 're-remises',
				loadComponent: () => import('./RE/re-remise/re-remise-list/re-remise-list.component').then(m => m.RERemiseListComponent),
			},
			{
				title: 'RERemise',
				path: 're-remises/create',
				loadComponent: () => import('./RE/re-remise/re-remise-create/re-remise-create.component').then(m => m.RERemiseCreateComponent),
			},
			{
				title: 'RERemise',
				path: 're-remises/:id/edit',
				loadComponent: () => import('./RE/re-remise/re-remise-edit/re-remise-edit.component').then(m => m.RERemiseEditComponent),
			},
			{
				title: 'REHistoriqueRelance',
				path: 're-historique-relances',
				loadComponent: () => import('./RE/re-historique-relance/re-historique-relance-list/re-historique-relance-list.component').then(m => m.REHistoriqueRelanceListComponent),
			},
			{
				title: 'REHistoriqueRelance',
				path: 're-historique-relances/create',
				loadComponent: () => import('./RE/re-historique-relance/re-historique-relance-create/re-historique-relance-create.component').then(m => m.REHistoriqueRelanceCreateComponent),
			},
			{
				title: 'REHistoriqueRelance',
				path: 're-historique-relances/:id/edit',
				loadComponent: () => import('./RE/re-historique-relance/re-historique-relance-edit/re-historique-relance-edit.component').then(m => m.REHistoriqueRelanceEditComponent),
			},
			{
				title: 'REPaiement',
				path: 're-paiements',
				loadComponent: () => import('./RE/re-paiement/re-paiement-list/re-paiement-list.component').then(m => m.REPaiementListComponent),
			},
			{
				title: 'REPaiement',
				path: 're-paiements/create',
				loadComponent: () => import('./RE/re-paiement/re-paiement-create/re-paiement-create.component').then(m => m.REPaiementCreateComponent),
			},
			{
				title: 'REPaiement',
				path: 're-paiements/:id/edit',
				loadComponent: () => import('./RE/re-paiement/re-paiement-edit/re-paiement-edit.component').then(m => m.REPaiementEditComponent),
			},
			{
				title: 'EDFormatDonnees',
				path: 'ed-format-donneess',
				loadComponent: () => import('./ED/ed-format-donnees/ed-format-donnees-list/ed-format-donnees-list.component').then(m => m.EDFormatDonneesListComponent),
			},
			{
				title: 'EDFormatDonnees',
				path: 'ed-format-donneess/create',
				loadComponent: () => import('./ED/ed-format-donnees/ed-format-donnees-create/ed-format-donnees-create.component').then(m => m.EDFormatDonneesCreateComponent),
			},
			{
				title: 'EDFormatDonnees',
				path: 'ed-format-donneess/:id/edit',
				loadComponent: () => import('./ED/ed-format-donnees/ed-format-donnees-edit/ed-format-donnees-edit.component').then(m => m.EDFormatDonneesEditComponent),
			},
			{
				title: 'EDSchemaDonnees',
				path: 'ed-schema-donneess',
				loadComponent: () => import('./ED/ed-schema-donnees/ed-schema-donnees-list/ed-schema-donnees-list.component').then(m => m.EDSchemaDonneesListComponent),
			},
			{
				title: 'EDSchemaDonnees',
				path: 'ed-schema-donneess/create',
				loadComponent: () => import('./ED/ed-schema-donnees/ed-schema-donnees-create/ed-schema-donnees-create.component').then(m => m.EDSchemaDonneesCreateComponent),
			},
			{
				title: 'EDSchemaDonnees',
				path: 'ed-schema-donneess/:id/edit',
				loadComponent: () => import('./ED/ed-schema-donnees/ed-schema-donnees-edit/ed-schema-donnees-edit.component').then(m => m.EDSchemaDonneesEditComponent),
			},
			{
				title: 'EDApi',
				path: 'ed-apis',
				loadComponent: () => import('./ED/ed-api/ed-api-list/ed-api-list.component').then(m => m.EDApiListComponent),
			},
			{
				title: 'EDApi',
				path: 'ed-apis/create',
				loadComponent: () => import('./ED/ed-api/ed-api-create/ed-api-create.component').then(m => m.EDApiCreateComponent),
			},
			{
				title: 'EDApi',
				path: 'ed-apis/:id/edit',
				loadComponent: () => import('./ED/ed-api/ed-api-edit/ed-api-edit.component').then(m => m.EDApiEditComponent),
			},
			{
				title: 'EDLogEchange',
				path: 'ed-log-echanges',
				loadComponent: () => import('./ED/ed-log-echange/ed-log-echange-list/ed-log-echange-list.component').then(m => m.EDLogEchangeListComponent),
			},
			{
				title: 'EDLogEchange',
				path: 'ed-log-echanges/create',
				loadComponent: () => import('./ED/ed-log-echange/ed-log-echange-create/ed-log-echange-create.component').then(m => m.EDLogEchangeCreateComponent),
			},
			{
				title: 'EDLogEchange',
				path: 'ed-log-echanges/:id/edit',
				loadComponent: () => import('./ED/ed-log-echange/ed-log-echange-edit/ed-log-echange-edit.component').then(m => m.EDLogEchangeEditComponent),
			},
			{
				title: 'EDAbonnement',
				path: 'ed-abonnements',
				loadComponent: () => import('./ED/ed-abonnement/ed-abonnement-list/ed-abonnement-list.component').then(m => m.EDAbonnementListComponent),
			},
			{
				title: 'EDAbonnement',
				path: 'ed-abonnements/create',
				loadComponent: () => import('./ED/ed-abonnement/ed-abonnement-create/ed-abonnement-create.component').then(m => m.EDAbonnementCreateComponent),
			},
			{
				title: 'EDAbonnement',
				path: 'ed-abonnements/:id/edit',
				loadComponent: () => import('./ED/ed-abonnement/ed-abonnement-edit/ed-abonnement-edit.component').then(m => m.EDAbonnementEditComponent),
			},
			{
				title: 'EDPolitiqueAcces',
				path: 'ed-politique-access',
				loadComponent: () => import('./ED/ed-politique-acces/ed-politique-acces-list/ed-politique-acces-list.component').then(m => m.EDPolitiqueAccesListComponent),
			},
			{
				title: 'EDPolitiqueAcces',
				path: 'ed-politique-access/create',
				loadComponent: () => import('./ED/ed-politique-acces/ed-politique-acces-create/ed-politique-acces-create.component').then(m => m.EDPolitiqueAccesCreateComponent),
			},
			{
				title: 'EDPolitiqueAcces',
				path: 'ed-politique-access/:id/edit',
				loadComponent: () => import('./ED/ed-politique-acces/ed-politique-acces-edit/ed-politique-acces-edit.component').then(m => m.EDPolitiqueAccesEditComponent),
			},

    ]
  },
];
