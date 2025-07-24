import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EDApiEntity } from '../ed-api.entity';
import { EDApiService } from '../services/ed-api.service';
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
  selector: 'app-ed-api-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-api-list.component.html',
  styleUrl: './ed-api-list.component.css'
})
export class EDApiListComponent {

  eDApis = signal<EDApiEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'nom': {},
		'description': {},
		'url_base': {},
		'statut': {},
		'documentation_url': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDApiService: EDApiService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const eDApiResponse = await this.eDApiService.getAll(
        {page: this.page()}
      );
      const eDApiData = eDApiResponse.data as ResponsePaginate<EDApiEntity[]>;

      this.eDApis.set(eDApiData.data);
      this.pageLength.set(eDApiData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/ed-apis/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/ed-apis/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, eDApi: EDApiEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce eDApi')) return;
    this.eDApis.update((eDApiList) => eDApiList.filter(
      eDApiItem => eDApiItem.id != eDApi.id
    ));
    await this.eDApiService.destroy(eDApi.id);
  }
}