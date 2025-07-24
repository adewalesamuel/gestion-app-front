import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { REHistoriqueRelanceEntity } from '../re-historique-relance.entity';
import { REHistoriqueRelanceService } from '../services/re-historique-relance.service';
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
  selector: 'app-re-historique-relance-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-historique-relance-list.component.html',
  styleUrl: './re-historique-relance-list.component.css'
})
export class REHistoriqueRelanceListComponent {

  rEHistoriqueRelances = signal<REHistoriqueRelanceEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    're_relance_id': {},
		'user_id': {},
		'date': {},
		'heure': {},
		'mode': {},
		'contenu': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rEHistoriqueRelanceService: REHistoriqueRelanceService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rEHistoriqueRelanceResponse = await this.rEHistoriqueRelanceService.getAll(
        {page: this.page()}
      );
      const rEHistoriqueRelanceData = rEHistoriqueRelanceResponse.data as ResponsePaginate<REHistoriqueRelanceEntity[]>;

      this.rEHistoriqueRelances.set(rEHistoriqueRelanceData.data);
      this.pageLength.set(rEHistoriqueRelanceData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re-historique-relances/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re-historique-relances/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rEHistoriqueRelance: REHistoriqueRelanceEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rEHistoriqueRelance')) return;
    this.rEHistoriqueRelances.update((rEHistoriqueRelanceList) => rEHistoriqueRelanceList.filter(
      rEHistoriqueRelanceItem => rEHistoriqueRelanceItem.id != rEHistoriqueRelance.id
    ));
    await this.rEHistoriqueRelanceService.destroy(rEHistoriqueRelance.id);
  }
}