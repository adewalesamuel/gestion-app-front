import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { REPaiementEntity } from '../re-paiement.entity';
import { REPaiementService } from '../services/re-paiement.service';
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
  selector: 'app-re-paiement-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-paiement-list.component.html',
  styleUrl: './re-paiement-list.component.css'
})
export class REPaiementListComponent {

  rEPaiements = signal<REPaiementEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    're_ordre_recette_id': {},
		'user_id': {},
		're_mode_paiement_id': {},
		'montant': {},
		'devise': {},
		'date_paiement': {},
		'heure': {},
		'reference_transaction': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rEPaiementService: REPaiementService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rEPaiementResponse = await this.rEPaiementService.getAll(
        {page: this.page()}
      );
      const rEPaiementData = rEPaiementResponse.data as ResponsePaginate<REPaiementEntity[]>;

      this.rEPaiements.set(rEPaiementData.data);
      this.pageLength.set(rEPaiementData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re/re-paiements/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re/re-paiements/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rEPaiement: REPaiementEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rEPaiement')) return;
    this.rEPaiements.update((rEPaiementList) => rEPaiementList.filter(
      rEPaiementItem => rEPaiementItem.id != rEPaiement.id
    ));
    await this.rEPaiementService.destroy(rEPaiement.id);
  }
}
