import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { INChecklistEntity } from '../in-checklist.entity';
import { INChecklistService } from '../services/in-checklist.service';
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
  selector: 'app-in-checklist-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-checklist-list.component.html',
  styleUrl: './in-checklist-list.component.css'
})
export class INChecklistListComponent {

  iNChecklists = signal<INChecklistEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'rc_type_engin_id': {},
		'nom': {},
		'version': {},
		'items': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNChecklistService: INChecklistService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const iNChecklistResponse = await this.iNChecklistService.getAll(
        {page: this.page()}
      );
      const iNChecklistData = iNChecklistResponse.data as ResponsePaginate<INChecklistEntity[]>;

      this.iNChecklists.set(iNChecklistData.data);
      this.pageLength.set(iNChecklistData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in/in-checklists/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in/in-checklists/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, iNChecklist: INChecklistEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce iNChecklist')) return;
    this.iNChecklists.update((iNChecklistList) => iNChecklistList.filter(
      iNChecklistItem => iNChecklistItem.id != iNChecklist.id
    ));
    await this.iNChecklistService.destroy(iNChecklist.id);
  }
}
