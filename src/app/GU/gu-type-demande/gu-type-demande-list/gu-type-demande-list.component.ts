import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GUTypeDemandeEntity } from '../gu-type-demande.entity';
import { GUTypeDemandeService } from '../services/gu-type-demande.service';
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
  selector: 'app-gu-type-demande-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-type-demande-list.component.html',
  styleUrl: './gu-type-demande-list.component.css'
})
export class GUTypeDemandeListComponent {

  gUTypeDemandes = signal<GUTypeDemandeEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'code': {},
		'libelle': {},
		'delai_traitement_jours': {},
		'cout': {},
		'validite_mois': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUTypeDemandeService: GUTypeDemandeService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const gUTypeDemandeResponse = await this.gUTypeDemandeService.getAll(
        {page: this.page()}
      );
      const gUTypeDemandeData = gUTypeDemandeResponse.data as ResponsePaginate<GUTypeDemandeEntity[]>;

      this.gUTypeDemandes.set(gUTypeDemandeData.data);
      this.pageLength.set(gUTypeDemandeData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu/gu-type-demandes/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu/gu-type-demandes/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, gUTypeDemande: GUTypeDemandeEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce gUTypeDemande')) return;
    this.gUTypeDemandes.update((gUTypeDemandeList) => gUTypeDemandeList.filter(
      gUTypeDemandeItem => gUTypeDemandeItem.id != gUTypeDemande.id
    ));
    await this.gUTypeDemandeService.destroy(gUTypeDemande.id);
  }
}
