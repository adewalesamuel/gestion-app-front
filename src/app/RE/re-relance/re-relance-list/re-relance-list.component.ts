import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RERelanceEntity } from '../re-relance.entity';
import { RERelanceService } from '../services/re-relance.service';
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
  selector: 'app-re-relance-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-relance-list.component.html',
  styleUrl: './re-relance-list.component.css'
})
export class RERelanceListComponent {

  rERelances = signal<RERelanceEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    're_ordre_recette_id': {},
		'user_id': {},
		'date': {},
		'heure': {},
		'mode': {},
		'statut': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rERelanceService: RERelanceService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rERelanceResponse = await this.rERelanceService.getAll(
        {page: this.page()}
      );
      const rERelanceData = rERelanceResponse.data as ResponsePaginate<RERelanceEntity[]>;

      this.rERelances.set(rERelanceData.data);
      this.pageLength.set(rERelanceData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re-relances/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re-relances/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rERelance: RERelanceEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rERelance')) return;
    this.rERelances.update((rERelanceList) => rERelanceList.filter(
      rERelanceItem => rERelanceItem.id != rERelance.id
    ));
    await this.rERelanceService.destroy(rERelance.id);
  }
}