import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RCPortEntity } from '../rc-port.entity';
import { RCPortService } from '../services/rc-port.service';
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
  selector: 'app-rc-port-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-port-list.component.html',
  styleUrl: './rc-port-list.component.css'
})
export class RCPortListComponent {

  rCPorts = signal<RCPortEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'rc_pays_id': {},
		'nom': {},
		'code': {},
		'capacite_accueil': {},
		'profondeur_max': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCPortService: RCPortService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rCPortResponse = await this.rCPortService.getAll(
        {page: this.page()}
      );
      const rCPortData = rCPortResponse.data as ResponsePaginate<RCPortEntity[]>;

      this.rCPorts.set(rCPortData.data);
      this.pageLength.set(rCPortData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc-ports/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc-ports/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rCPort: RCPortEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rCPort')) return;
    this.rCPorts.update((rCPortList) => rCPortList.filter(
      rCPortItem => rCPortItem.id != rCPort.id
    ));
    await this.rCPortService.destroy(rCPort.id);
  }
}