import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { REModePaiementEntity } from '../re-mode-paiement.entity';
import { REModePaiementService } from '../services/re-mode-paiement.service';
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
  selector: 'app-re-mode-paiement-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-mode-paiement-list.component.html',
  styleUrl: './re-mode-paiement-list.component.css'
})
export class REModePaiementListComponent {

  rEModePaiements = signal<REModePaiementEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'code': {},
		'libelle': {},
		'frais_pourcentage': {},
		'delai_jours': {},
		'actif': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rEModePaiementService: REModePaiementService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rEModePaiementResponse = await this.rEModePaiementService.getAll(
        {page: this.page()}
      );
      const rEModePaiementData = rEModePaiementResponse.data as ResponsePaginate<REModePaiementEntity[]>;

      this.rEModePaiements.set(rEModePaiementData.data);
      this.pageLength.set(rEModePaiementData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re/re-mode-paiements/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/re/re-mode-paiements/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rEModePaiement: REModePaiementEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rEModePaiement')) return;
    this.rEModePaiements.update((rEModePaiementList) => rEModePaiementList.filter(
      rEModePaiementItem => rEModePaiementItem.id != rEModePaiement.id
    ));
    await this.rEModePaiementService.destroy(rEModePaiement.id);
  }
}
