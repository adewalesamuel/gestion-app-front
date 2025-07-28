import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RCPaysEntity } from '../rc-pays.entity';
import { RCPaysService } from '../services/rc-pays.service';
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
  selector: 'app-rc-pays-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-pays-list.component.html',
  styleUrl: './rc-pays-list.component.css'
})
export class RCPaysListComponent {

  rCPayss = signal<RCPaysEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'nom': {},
		'code_iso': {},
		'indicatif': {},
		'pavillon_url': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCPaysService: RCPaysService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rCPaysResponse = await this.rCPaysService.getAll(
        {page: this.page()}
      );
      const rCPaysData = rCPaysResponse.data as ResponsePaginate<RCPaysEntity[]>;

      this.rCPayss.set(rCPaysData.data);
      this.pageLength.set(rCPaysData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc/rc-payss/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc/rc-payss/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rCPays: RCPaysEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rCPays')) return;
    this.rCPayss.update((rCPaysList) => rCPaysList.filter(
      rCPaysItem => rCPaysItem.id != rCPays.id
    ));
    await this.rCPaysService.destroy(rCPays.id);
  }
}
