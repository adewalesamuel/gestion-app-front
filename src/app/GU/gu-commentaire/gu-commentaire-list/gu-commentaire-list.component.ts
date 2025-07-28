import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GUCommentaireEntity } from '../gu-commentaire.entity';
import { GUCommentaireService } from '../services/gu-commentaire.service';
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
  selector: 'app-gu-commentaire-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-commentaire-list.component.html',
  styleUrl: './gu-commentaire-list.component.css'
})
export class GUCommentaireListComponent {

  gUCommentaires = signal<GUCommentaireEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'contenu': {},
		'date': {},
		'heure': {},
		'user_id': {},
		'gu_demande_id': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUCommentaireService: GUCommentaireService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const gUCommentaireResponse = await this.gUCommentaireService.getAll(
        {page: this.page()}
      );
      const gUCommentaireData = gUCommentaireResponse.data as ResponsePaginate<GUCommentaireEntity[]>;

      this.gUCommentaires.set(gUCommentaireData.data);
      this.pageLength.set(gUCommentaireData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu/gu-commentaires/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu/gu-commentaires/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, gUCommentaire: GUCommentaireEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce gUCommentaire')) return;
    this.gUCommentaires.update((gUCommentaireList) => gUCommentaireList.filter(
      gUCommentaireItem => gUCommentaireItem.id != gUCommentaire.id
    ));
    await this.gUCommentaireService.destroy(gUCommentaire.id);
  }
}
