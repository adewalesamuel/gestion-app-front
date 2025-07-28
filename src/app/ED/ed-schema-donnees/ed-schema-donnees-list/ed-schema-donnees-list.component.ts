import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EDSchemaDonneesEntity } from '../ed-schema-donnees.entity';
import { EDSchemaDonneesService } from '../services/ed-schema-donnees.service';
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
  selector: 'app-ed-schema-donnees-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-schema-donnees-list.component.html',
  styleUrl: './ed-schema-donnees-list.component.css'
})
export class EDSchemaDonneesListComponent {

  eDSchemaDonneess = signal<EDSchemaDonneesEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'nom': {},
		'version': {},
		'schema_json': {},
		'statut': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDSchemaDonneesService: EDSchemaDonneesService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const eDSchemaDonneesResponse = await this.eDSchemaDonneesService.getAll(
        {page: this.page()}
      );
      const eDSchemaDonneesData = eDSchemaDonneesResponse.data as ResponsePaginate<EDSchemaDonneesEntity[]>;

      this.eDSchemaDonneess.set(eDSchemaDonneesData.data);
      this.pageLength.set(eDSchemaDonneesData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/ed/ed-schema-donneess/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/ed/ed-schema-donneess/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, eDSchemaDonnees: EDSchemaDonneesEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce eDSchemaDonnees')) return;
    this.eDSchemaDonneess.update((eDSchemaDonneesList) => eDSchemaDonneesList.filter(
      eDSchemaDonneesItem => eDSchemaDonneesItem.id != eDSchemaDonnees.id
    ));
    await this.eDSchemaDonneesService.destroy(eDSchemaDonnees.id);
  }
}
