import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { REOrdreRecetteEntity } from '../re-ordre-recette.entity';
import { REOrdreRecetteService } from '../services/re-ordre-recette.service';
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
  selector: 'app-re-ordre-recette-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-ordre-recette-list.component.html',
  styleUrl: './re-ordre-recette-list.component.css'
})
export class REOrdreRecetteListComponent {

  rEOrdreRecettes = signal<REOrdreRecetteEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'rc_acteur_id': {},
		'reference': {},
		'montant': {},
		'devise': {},
		'date_emission': {},
		'date_echeance': {},
		'statut': {},
		'service_concerne': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rEOrdreRecetteService: REOrdreRecetteService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rEOrdreRecetteResponse = await this.rEOrdreRecetteService.getAll(
        {page: this.page()}
      );
      const rEOrdreRecetteData = rEOrdreRecetteResponse.data as ResponsePaginate<REOrdreRecetteEntity[]>;

      this.rEOrdreRecettes.set(rEOrdreRecetteData.data);
      this.pageLength.set(rEOrdreRecetteData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re/re-ordre-recettes/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re/re-ordre-recettes/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rEOrdreRecette: REOrdreRecetteEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rEOrdreRecette')) return;
    this.rEOrdreRecettes.update((rEOrdreRecetteList) => rEOrdreRecetteList.filter(
      rEOrdreRecetteItem => rEOrdreRecetteItem.id != rEOrdreRecette.id
    ));
    await this.rEOrdreRecetteService.destroy(rEOrdreRecette.id);
  }
}
