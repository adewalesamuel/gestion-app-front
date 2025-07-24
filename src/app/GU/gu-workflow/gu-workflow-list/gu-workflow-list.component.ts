import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GUWorkflowEntity } from '../gu-workflow.entity';
import { GUWorkflowService } from '../services/gu-workflow.service';
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
  selector: 'app-gu-workflow-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-workflow-list.component.html',
  styleUrl: './gu-workflow-list.component.css'
})
export class GUWorkflowListComponent {

  gUWorkflows = signal<GUWorkflowEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'etape': {},
		'ordre': {},
		'role_id': {},
		'gu_type_demande_id': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUWorkflowService: GUWorkflowService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const gUWorkflowResponse = await this.gUWorkflowService.getAll(
        {page: this.page()}
      );
      const gUWorkflowData = gUWorkflowResponse.data as ResponsePaginate<GUWorkflowEntity[]>;

      this.gUWorkflows.set(gUWorkflowData.data);
      this.pageLength.set(gUWorkflowData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu-workflows/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/gu-workflows/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, gUWorkflow: GUWorkflowEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce gUWorkflow')) return;
    this.gUWorkflows.update((gUWorkflowList) => gUWorkflowList.filter(
      gUWorkflowItem => gUWorkflowItem.id != gUWorkflow.id
    ));
    await this.gUWorkflowService.destroy(gUWorkflow.id);
  }
}