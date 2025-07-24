import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RCHistoriqueProprieteEntity } from '../rc-historique-propriete.entity';
import { RCHistoriqueProprieteService } from '../services/rc-historique-propriete.service';
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
  selector: 'app-rc-historique-propriete-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-historique-propriete-list.component.html',
  styleUrl: './rc-historique-propriete-list.component.css'
})
export class RCHistoriqueProprieteListComponent {

  rCHistoriqueProprietes = signal<RCHistoriqueProprieteEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'rc_acteur_id': {},
		'rc_engin_flottant_id': {},
		'date_debut': {},
		'date_fin': {},
		'type_transaction': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCHistoriqueProprieteService: RCHistoriqueProprieteService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rCHistoriqueProprieteResponse = await this.rCHistoriqueProprieteService.getAll(
        {page: this.page()}
      );
      const rCHistoriqueProprieteData = rCHistoriqueProprieteResponse.data as ResponsePaginate<RCHistoriqueProprieteEntity[]>;

      this.rCHistoriqueProprietes.set(rCHistoriqueProprieteData.data);
      this.pageLength.set(rCHistoriqueProprieteData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc-historique-proprietes/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc-historique-proprietes/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rCHistoriquePropriete: RCHistoriqueProprieteEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rCHistoriquePropriete')) return;
    this.rCHistoriqueProprietes.update((rCHistoriqueProprieteList) => rCHistoriqueProprieteList.filter(
      rCHistoriqueProprieteItem => rCHistoriqueProprieteItem.id != rCHistoriquePropriete.id
    ));
    await this.rCHistoriqueProprieteService.destroy(rCHistoriquePropriete.id);
  }
}