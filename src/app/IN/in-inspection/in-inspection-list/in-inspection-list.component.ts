import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { INInspectionEntity } from '../in-inspection.entity';
import { INInspectionService } from '../services/in-inspection.service';
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
  selector: 'app-in-inspection-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-inspection-list.component.html',
  styleUrl: './in-inspection-list.component.css'
})
export class INInspectionListComponent {

  iNInspections = signal<INInspectionEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'in_type_controle_id': {},
		'in_equipe_inspection_id': {},
		'rc_engin_flottant_id': {},
		'user_id': {},
		'reference': {},
		'date_planifiee': {},
		'heure': {},
		'date_reelle': {},
		'statut': {},
		'resultat': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNInspectionService: INInspectionService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const iNInspectionResponse = await this.iNInspectionService.getAll(
        {page: this.page()}
      );
      const iNInspectionData = iNInspectionResponse.data as ResponsePaginate<INInspectionEntity[]>;

      this.iNInspections.set(iNInspectionData.data);
      this.pageLength.set(iNInspectionData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in-inspections/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in-inspections/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, iNInspection: INInspectionEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce iNInspection')) return;
    this.iNInspections.update((iNInspectionList) => iNInspectionList.filter(
      iNInspectionItem => iNInspectionItem.id != iNInspection.id
    ));
    await this.iNInspectionService.destroy(iNInspection.id);
  }
}