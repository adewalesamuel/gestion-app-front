import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GUHistoriqueEntity } from '../gu-historique.entity';
import { GUHistoriqueService } from '../services/gu-historique.service';
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
  selector: 'app-gu-historique-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-historique-list.component.html',
  styleUrl: './gu-historique-list.component.css'
})
export class GUHistoriqueListComponent {

  gUHistoriques = signal<GUHistoriqueEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'user_id': {},
		'gu_demande_id': {},
		'action': {},
		'details': {},
		'date': {},
		'heure': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUHistoriqueService: GUHistoriqueService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const gUHistoriqueResponse = await this.gUHistoriqueService.getAll(
        {page: this.page()}
      );
      const gUHistoriqueData = gUHistoriqueResponse.data as ResponsePaginate<GUHistoriqueEntity[]>;

      this.gUHistoriques.set(gUHistoriqueData.data);
      this.pageLength.set(gUHistoriqueData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu/gu-historiques/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu/gu-historiques/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, gUHistorique: GUHistoriqueEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce gUHistorique')) return;
    this.gUHistoriques.update((gUHistoriqueList) => gUHistoriqueList.filter(
      gUHistoriqueItem => gUHistoriqueItem.id != gUHistorique.id
    ));
    await this.gUHistoriqueService.destroy(gUHistorique.id);
  }
}
