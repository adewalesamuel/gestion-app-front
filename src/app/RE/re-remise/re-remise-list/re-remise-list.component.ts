import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RERemiseEntity } from '../re-remise.entity';
import { RERemiseService } from '../services/re-remise.service';
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
  selector: 'app-re-remise-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-remise-list.component.html',
  styleUrl: './re-remise-list.component.css'
})
export class RERemiseListComponent {

  rERemises = signal<RERemiseEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    're_ordre_recette_id': {},
		'user_id': {},
		'montant': {},
		'pourcentage': {},
		'raison': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rERemiseService: RERemiseService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rERemiseResponse = await this.rERemiseService.getAll(
        {page: this.page()}
      );
      const rERemiseData = rERemiseResponse.data as ResponsePaginate<RERemiseEntity[]>;

      this.rERemises.set(rERemiseData.data);
      this.pageLength.set(rERemiseData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re/re-remises/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re/re-remises/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rERemise: RERemiseEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rERemise')) return;
    this.rERemises.update((rERemiseList) => rERemiseList.filter(
      rERemiseItem => rERemiseItem.id != rERemise.id
    ));
    await this.rERemiseService.destroy(rERemise.id);
  }
}
