import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EDPolitiqueAccesEntity } from '../ed-politique-acces.entity';
import { EDPolitiqueAccesService } from '../services/ed-politique-acces.service';
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
  selector: 'app-ed-politique-acces-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-politique-acces-list.component.html',
  styleUrl: './ed-politique-acces-list.component.css'
})
export class EDPolitiqueAccesListComponent {

  eDPolitiqueAccess = signal<EDPolitiqueAccesEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'ed_api_id': {},
		'role_id': {},
		'nom': {},
		'regles': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDPolitiqueAccesService: EDPolitiqueAccesService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const eDPolitiqueAccesResponse = await this.eDPolitiqueAccesService.getAll(
        {page: this.page()}
      );
      const eDPolitiqueAccesData = eDPolitiqueAccesResponse.data as ResponsePaginate<EDPolitiqueAccesEntity[]>;

      this.eDPolitiqueAccess.set(eDPolitiqueAccesData.data);
      this.pageLength.set(eDPolitiqueAccesData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/ed/ed-politique-access/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/ed/ed-politique-access/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, eDPolitiqueAcces: EDPolitiqueAccesEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce eDPolitiqueAcces')) return;
    this.eDPolitiqueAccess.update((eDPolitiqueAccesList) => eDPolitiqueAccesList.filter(
      eDPolitiqueAccesItem => eDPolitiqueAccesItem.id != eDPolitiqueAcces.id
    ));
    await this.eDPolitiqueAccesService.destroy(eDPolitiqueAcces.id);
  }
}
