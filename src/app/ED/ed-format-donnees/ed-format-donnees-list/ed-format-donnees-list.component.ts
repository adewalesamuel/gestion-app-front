import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EDFormatDonneesEntity } from '../ed-format-donnees.entity';
import { EDFormatDonneesService } from '../services/ed-format-donnees.service';
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
  selector: 'app-ed-format-donnees-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-format-donnees-list.component.html',
  styleUrl: './ed-format-donnees-list.component.css'
})
export class EDFormatDonneesListComponent {

  eDFormatDonneess = signal<EDFormatDonneesEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'nom': {},
		'mime_type': {},
		'schema_xsd_url': {},
		'exemple_url': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDFormatDonneesService: EDFormatDonneesService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const eDFormatDonneesResponse = await this.eDFormatDonneesService.getAll(
        {page: this.page()}
      );
      const eDFormatDonneesData = eDFormatDonneesResponse.data as ResponsePaginate<EDFormatDonneesEntity[]>;

      this.eDFormatDonneess.set(eDFormatDonneesData.data);
      this.pageLength.set(eDFormatDonneesData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/ed/ed-format-donneess/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/ed/ed-format-donneess/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, eDFormatDonnees: EDFormatDonneesEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce eDFormatDonnees')) return;
    this.eDFormatDonneess.update((eDFormatDonneesList) => eDFormatDonneesList.filter(
      eDFormatDonneesItem => eDFormatDonneesItem.id != eDFormatDonnees.id
    ));
    await this.eDFormatDonneesService.destroy(eDFormatDonnees.id);
  }
}
