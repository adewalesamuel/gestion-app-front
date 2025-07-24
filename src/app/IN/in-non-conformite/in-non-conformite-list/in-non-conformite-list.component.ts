import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { INNonConformiteEntity } from '../in-non-conformite.entity';
import { INNonConformiteService } from '../services/in-non-conformite.service';
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
  selector: 'app-in-non-conformite-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-non-conformite-list.component.html',
  styleUrl: './in-non-conformite-list.component.css'
})
export class INNonConformiteListComponent {

  iNNonConformites = signal<INNonConformiteEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'in_inspection_id': {},
		'user_id': {},
		'description': {},
		'gravite': {},
		'date_decouverte': {},
		'heure': {},
		'date_resolution': {},
		'statut': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNNonConformiteService: INNonConformiteService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const iNNonConformiteResponse = await this.iNNonConformiteService.getAll(
        {page: this.page()}
      );
      const iNNonConformiteData = iNNonConformiteResponse.data as ResponsePaginate<INNonConformiteEntity[]>;

      this.iNNonConformites.set(iNNonConformiteData.data);
      this.pageLength.set(iNNonConformiteData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in-non-conformites/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in-non-conformites/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, iNNonConformite: INNonConformiteEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce iNNonConformite')) return;
    this.iNNonConformites.update((iNNonConformiteList) => iNNonConformiteList.filter(
      iNNonConformiteItem => iNNonConformiteItem.id != iNNonConformite.id
    ));
    await this.iNNonConformiteService.destroy(iNNonConformite.id);
  }
}