import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GUStatutDemandeEntity } from '../gu-statut-demande.entity';
import { GUStatutDemandeService } from '../services/gu-statut-demande.service';
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
  selector: 'app-gu-statut-demande-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-statut-demande-list.component.html',
  styleUrl: './gu-statut-demande-list.component.css'
})
export class GUStatutDemandeListComponent {

  gUStatutDemandes = signal<GUStatutDemandeEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'code': {},
		'libelle': {},
		'couleur_hex': {},
		'ordre': {},
		'notifiable': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUStatutDemandeService: GUStatutDemandeService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const gUStatutDemandeResponse = await this.gUStatutDemandeService.getAll(
        {page: this.page()}
      );
      const gUStatutDemandeData = gUStatutDemandeResponse.data as ResponsePaginate<GUStatutDemandeEntity[]>;

      this.gUStatutDemandes.set(gUStatutDemandeData.data);
      this.pageLength.set(gUStatutDemandeData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu-statut-demandes/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu-statut-demandes/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, gUStatutDemande: GUStatutDemandeEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce gUStatutDemande')) return;
    this.gUStatutDemandes.update((gUStatutDemandeList) => gUStatutDemandeList.filter(
      gUStatutDemandeItem => gUStatutDemandeItem.id != gUStatutDemande.id
    ));
    await this.gUStatutDemandeService.destroy(gUStatutDemande.id);
  }
}