import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuditLogEntity } from '../audit-log.entity';
import { AuditLogService } from '../services/audit-log.service';
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
  selector: 'app-audit-log-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './audit-log-list.component.html',
  styleUrl: './audit-log-list.component.css'
})
export class AuditLogListComponent {

  auditLogs = signal<AuditLogEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'user_id': {},
		'action': {},
		'entite': {},
		'entite_id': {},
		'ancienne_valeur': {},
		'nouvelle_valeur': {},
		'ip_address': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected auditLogService: AuditLogService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const auditLogResponse = await this.auditLogService.getAll(
        {page: this.page()}
      );
      const auditLogData = auditLogResponse.data as ResponsePaginate<AuditLogEntity[]>;

      this.auditLogs.set(auditLogData.data);
      this.pageLength.set(auditLogData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/settings/audit-logs/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/settings/audit-logs/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, auditLog: AuditLogEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce auditLog')) return;
    this.auditLogs.update((auditLogList) => auditLogList.filter(
      auditLogItem => auditLogItem.id != auditLog.id
    ));
    await this.auditLogService.destroy(auditLog.id);
  }
}
