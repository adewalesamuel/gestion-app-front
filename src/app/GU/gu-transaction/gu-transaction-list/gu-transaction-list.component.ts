import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GUTransactionEntity } from '../gu-transaction.entity';
import { GUTransactionService } from '../services/gu-transaction.service';
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
  selector: 'app-gu-transaction-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-transaction-list.component.html',
  styleUrl: './gu-transaction-list.component.css'
})
export class GUTransactionListComponent {

  gUTransactions = signal<GUTransactionEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    're_mode_paiement_id': {},
		'gu_demande_id': {},
		'user_id': {},
		'reference': {},
		'montant': {},
		'devise': {},
		'date_transaction': {},
		'heure': {},
		'statut': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUTransactionService: GUTransactionService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const gUTransactionResponse = await this.gUTransactionService.getAll(
        {page: this.page()}
      );
      const gUTransactionData = gUTransactionResponse.data as ResponsePaginate<GUTransactionEntity[]>;

      this.gUTransactions.set(gUTransactionData.data);
      this.pageLength.set(gUTransactionData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu/gu-transactions/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu/gu-transactions/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, gUTransaction: GUTransactionEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce gUTransaction')) return;
    this.gUTransactions.update((gUTransactionList) => gUTransactionList.filter(
      gUTransactionItem => gUTransactionItem.id != gUTransaction.id
    ));
    await this.gUTransactionService.destroy(gUTransaction.id);
  }
}
