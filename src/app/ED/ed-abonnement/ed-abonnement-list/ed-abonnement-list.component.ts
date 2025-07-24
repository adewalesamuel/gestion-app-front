import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EDAbonnementEntity } from '../ed-abonnement.entity';
import { EDAbonnementService } from '../services/ed-abonnement.service';
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
  selector: 'app-ed-abonnement-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-abonnement-list.component.html',
  styleUrl: './ed-abonnement-list.component.css'
})
export class EDAbonnementListComponent {

  eDAbonnements = signal<EDAbonnementEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'ed_api_id': {},
		'rc_acteur_id': {},
		'nom_client': {},
		'token': {},
		'date_expiration': {},
		'limite_requetes_jour': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDAbonnementService: EDAbonnementService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const eDAbonnementResponse = await this.eDAbonnementService.getAll(
        {page: this.page()}
      );
      const eDAbonnementData = eDAbonnementResponse.data as ResponsePaginate<EDAbonnementEntity[]>;

      this.eDAbonnements.set(eDAbonnementData.data);
      this.pageLength.set(eDAbonnementData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/ed-abonnements/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/ed-abonnements/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, eDAbonnement: EDAbonnementEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce eDAbonnement')) return;
    this.eDAbonnements.update((eDAbonnementList) => eDAbonnementList.filter(
      eDAbonnementItem => eDAbonnementItem.id != eDAbonnement.id
    ));
    await this.eDAbonnementService.destroy(eDAbonnement.id);
  }
}