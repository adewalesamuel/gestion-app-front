import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { INPlanificationEntity } from '../in-planification.entity';
import { INPlanificationService } from '../services/in-planification.service';
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
  selector: 'app-in-planification-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-planification-list.component.html',
  styleUrl: './in-planification-list.component.css'
})
export class INPlanificationListComponent {

  iNPlanifications = signal<INPlanificationEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'rc_engin_flottant_id': {},
		'in_checklist_id': {},
		'periodicite_jours': {},
		'prochaine_date': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNPlanificationService: INPlanificationService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const iNPlanificationResponse = await this.iNPlanificationService.getAll(
        {page: this.page()}
      );
      const iNPlanificationData = iNPlanificationResponse.data as ResponsePaginate<INPlanificationEntity[]>;

      this.iNPlanifications.set(iNPlanificationData.data);
      this.pageLength.set(iNPlanificationData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in/in-planifications/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/in/in-planifications/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, iNPlanification: INPlanificationEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce iNPlanification')) return;
    this.iNPlanifications.update((iNPlanificationList) => iNPlanificationList.filter(
      iNPlanificationItem => iNPlanificationItem.id != iNPlanification.id
    ));
    await this.iNPlanificationService.destroy(iNPlanification.id);
  }
}
