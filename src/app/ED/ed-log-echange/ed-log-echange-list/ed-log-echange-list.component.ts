import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EDLogEchangeEntity } from '../ed-log-echange.entity';
import { EDLogEchangeService } from '../services/ed-log-echange.service';
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
  selector: 'app-ed-log-echange-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-log-echange-list.component.html',
  styleUrl: './ed-log-echange-list.component.css'
})
export class EDLogEchangeListComponent {

  eDLogEchanges = signal<EDLogEchangeEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'ed_api_id': {},
		'user_id': {},
		'date_heure': {},
		'heure': {},
		'type_requete': {},
		'endpoint': {},
		'statut_reponse': {},
		'temps_reponse_ms': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDLogEchangeService: EDLogEchangeService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const eDLogEchangeResponse = await this.eDLogEchangeService.getAll(
        {page: this.page()}
      );
      const eDLogEchangeData = eDLogEchangeResponse.data as ResponsePaginate<EDLogEchangeEntity[]>;

      this.eDLogEchanges.set(eDLogEchangeData.data);
      this.pageLength.set(eDLogEchangeData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/ed-log-echanges/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/ed-log-echanges/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, eDLogEchange: EDLogEchangeEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce eDLogEchange')) return;
    this.eDLogEchanges.update((eDLogEchangeList) => eDLogEchangeList.filter(
      eDLogEchangeItem => eDLogEchangeItem.id != eDLogEchange.id
    ));
    await this.eDLogEchangeService.destroy(eDLogEchange.id);
  }
}