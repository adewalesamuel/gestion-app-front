import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { INResultatItemEntity } from '../in-resultat-item.entity';
import { INResultatItemService } from '../services/in-resultat-item.service';
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
  selector: 'app-in-resultat-item-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-resultat-item-list.component.html',
  styleUrl: './in-resultat-item-list.component.css'
})
export class INResultatItemListComponent {

  iNResultatItems = signal<INResultatItemEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'in_inspection_id': {},
		'conforme': {},
		'observations': {},
		'checklist_item_code': {},
		'photo_url': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNResultatItemService: INResultatItemService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const iNResultatItemResponse = await this.iNResultatItemService.getAll(
        {page: this.page()}
      );
      const iNResultatItemData = iNResultatItemResponse.data as ResponsePaginate<INResultatItemEntity[]>;

      this.iNResultatItems.set(iNResultatItemData.data);
      this.pageLength.set(iNResultatItemData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in-resultat-items/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in-resultat-items/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, iNResultatItem: INResultatItemEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce iNResultatItem')) return;
    this.iNResultatItems.update((iNResultatItemList) => iNResultatItemList.filter(
      iNResultatItemItem => iNResultatItemItem.id != iNResultatItem.id
    ));
    await this.iNResultatItemService.destroy(iNResultatItem.id);
  }
}