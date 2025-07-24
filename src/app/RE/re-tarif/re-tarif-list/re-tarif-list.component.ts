import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RETarifEntity } from '../re-tarif.entity';
import { RETarifService } from '../services/re-tarif.service';
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
  selector: 'app-re-tarif-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-tarif-list.component.html',
  styleUrl: './re-tarif-list.component.css'
})
export class RETarifListComponent {

  rETarifs = signal<RETarifEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'service': {},
		'montant': {},
		'devise': {},
		'frequence': {},
		'type_acteur': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rETarifService: RETarifService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rETarifResponse = await this.rETarifService.getAll(
        {page: this.page()}
      );
      const rETarifData = rETarifResponse.data as ResponsePaginate<RETarifEntity[]>;

      this.rETarifs.set(rETarifData.data);
      this.pageLength.set(rETarifData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re-tarifs/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re-tarifs/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rETarif: RETarifEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rETarif')) return;
    this.rETarifs.update((rETarifList) => rETarifList.filter(
      rETarifItem => rETarifItem.id != rETarif.id
    ));
    await this.rETarifService.destroy(rETarif.id);
  }
}