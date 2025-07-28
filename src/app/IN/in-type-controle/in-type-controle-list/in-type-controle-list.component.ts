import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { INTypeControleEntity } from '../in-type-controle.entity';
import { INTypeControleService } from '../services/in-type-controle.service';
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
  selector: 'app-in-type-controle-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-type-controle-list.component.html',
  styleUrl: './in-type-controle-list.component.css'
})
export class INTypeControleListComponent {

  iNTypeControles = signal<INTypeControleEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'code': {},
		'libelle': {},
		'norme_reference': {},
		'frequence_mois': {},
		'gravite_min': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNTypeControleService: INTypeControleService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const iNTypeControleResponse = await this.iNTypeControleService.getAll(
        {page: this.page()}
      );
      const iNTypeControleData = iNTypeControleResponse.data as ResponsePaginate<INTypeControleEntity[]>;

      this.iNTypeControles.set(iNTypeControleData.data);
      this.pageLength.set(iNTypeControleData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in/in-type-controles/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in/in-type-controles/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, iNTypeControle: INTypeControleEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce iNTypeControle')) return;
    this.iNTypeControles.update((iNTypeControleList) => iNTypeControleList.filter(
      iNTypeControleItem => iNTypeControleItem.id != iNTypeControle.id
    ));
    await this.iNTypeControleService.destroy(iNTypeControle.id);
  }
}
