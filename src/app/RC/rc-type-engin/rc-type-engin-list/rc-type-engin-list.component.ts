import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RCTypeEnginEntity } from '../rc-type-engin.entity';
import { RCTypeEnginService } from '../services/rc-type-engin.service';
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
  selector: 'app-rc-type-engin-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-type-engin-list.component.html',
  styleUrl: './rc-type-engin-list.component.css'
})
export class RCTypeEnginListComponent {

  rCTypeEngins = signal<RCTypeEnginEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'code': {},
		'libelle': {},
		'categorie': {},
		'tonnage_min': {},
		'tonnage_max': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCTypeEnginService: RCTypeEnginService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rCTypeEnginResponse = await this.rCTypeEnginService.getAll(
        {page: this.page()}
      );
      const rCTypeEnginData = rCTypeEnginResponse.data as ResponsePaginate<RCTypeEnginEntity[]>;

      this.rCTypeEngins.set(rCTypeEnginData.data);
      this.pageLength.set(rCTypeEnginData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc/rc-type-engins/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc/rc-type-engins/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rCTypeEngin: RCTypeEnginEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rCTypeEngin')) return;
    this.rCTypeEngins.update((rCTypeEnginList) => rCTypeEnginList.filter(
      rCTypeEnginItem => rCTypeEnginItem.id != rCTypeEngin.id
    ));
    await this.rCTypeEnginService.destroy(rCTypeEngin.id);
  }
}
