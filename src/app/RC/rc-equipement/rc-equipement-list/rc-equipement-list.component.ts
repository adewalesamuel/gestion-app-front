import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RCEquipementEntity } from '../rc-equipement.entity';
import { RCEquipementService } from '../services/rc-equipement.service';
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
  selector: 'app-rc-equipement-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-equipement-list.component.html',
  styleUrl: './rc-equipement-list.component.css'
})
export class RCEquipementListComponent {

  rCEquipements = signal<RCEquipementEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'rc_engin_flottant_id': {},
		'nom': {},
		'type': {},
		'numero_serie': {},
		'date_installation': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCEquipementService: RCEquipementService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rCEquipementResponse = await this.rCEquipementService.getAll(
        {page: this.page()}
      );
      const rCEquipementData = rCEquipementResponse.data as ResponsePaginate<RCEquipementEntity[]>;

      this.rCEquipements.set(rCEquipementData.data);
      this.pageLength.set(rCEquipementData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc/rc-equipements/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc/rc-equipements/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rCEquipement: RCEquipementEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rCEquipement')) return;
    this.rCEquipements.update((rCEquipementList) => rCEquipementList.filter(
      rCEquipementItem => rCEquipementItem.id != rCEquipement.id
    ));
    await this.rCEquipementService.destroy(rCEquipement.id);
  }
}
