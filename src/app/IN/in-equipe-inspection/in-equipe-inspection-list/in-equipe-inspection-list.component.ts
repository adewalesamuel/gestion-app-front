import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { INEquipeInspectionEntity } from '../in-equipe-inspection.entity';
import { INEquipeInspectionService } from '../services/in-equipe-inspection.service';
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
  selector: 'app-in-equipe-inspection-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-equipe-inspection-list.component.html',
  styleUrl: './in-equipe-inspection-list.component.css'
})
export class INEquipeInspectionListComponent {

  iNEquipeInspections = signal<INEquipeInspectionEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'user_id': {},
		'nom': {},
		'membres': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNEquipeInspectionService: INEquipeInspectionService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const iNEquipeInspectionResponse = await this.iNEquipeInspectionService.getAll(
        {page: this.page()}
      );
      const iNEquipeInspectionData = iNEquipeInspectionResponse.data as ResponsePaginate<INEquipeInspectionEntity[]>;

      this.iNEquipeInspections.set(iNEquipeInspectionData.data);
      this.pageLength.set(iNEquipeInspectionData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in/in-equipe-inspections/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in/in-equipe-inspections/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, iNEquipeInspection: INEquipeInspectionEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce iNEquipeInspection')) return;
    this.iNEquipeInspections.update((iNEquipeInspectionList) => iNEquipeInspectionList.filter(
      iNEquipeInspectionItem => iNEquipeInspectionItem.id != iNEquipeInspection.id
    ));
    await this.iNEquipeInspectionService.destroy(iNEquipeInspection.id);
  }
}
