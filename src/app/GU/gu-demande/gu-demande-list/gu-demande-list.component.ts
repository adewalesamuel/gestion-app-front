import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GUDemandeEntity } from '../gu-demande.entity';
import { GUDemandeService } from '../services/gu-demande.service';
import { CommonModule } from '@angular/common';
import { Utils } from '../../../utils';
import { ResponsePaginate } from '../../../types';
import { TableComponent } from '../../../ui/table/table.component';
import { PaginationComponent } from '../../../ui/pagination/pagination.component';
import { LoaderComponent } from '../../../ui/loader/loader.component';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-gu-demande-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-demande-list.component.html',
  styleUrl: './gu-demande-list.component.css'
})
export class GUDemandeListComponent {

  gUDemandes = signal<GUDemandeEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'gu_type_demande_id': {},
		'gu_statut_demande_id': {},
		'rc_acteur_id': {},
		'rc_engin_flottant_id': {},
		'reference': {},
		'date_depot': {},
		'heure': {},
		'date_traitement': {},
		'date_expiration': {},
		'fichiers_joints': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUDemandeService: GUDemandeService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const gUDemandeResponse = await this.gUDemandeService.getAll(
        {page: this.page()}
      );
      const gUDemandeData = gUDemandeResponse.data as ResponsePaginate<GUDemandeEntity[]>;

      this.gUDemandes.set(gUDemandeData.data);
      this.pageLength.set(gUDemandeData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu/gu-demandes/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu/gu-demandes/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, gUDemande: GUDemandeEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce gUDemande')) return;
    this.gUDemandes.update((gUDemandeList) => gUDemandeList.filter(
      gUDemandeItem => gUDemandeItem.id != gUDemande.id
    ));
    await this.gUDemandeService.destroy(gUDemande.id);
  }
}
