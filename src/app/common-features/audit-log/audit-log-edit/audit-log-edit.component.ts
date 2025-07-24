import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditLogFormComponent } from '../forms/audit-log-form.component';
import { AuditLogService } from '../services/audit-log.service';
import { AuditLogEntity } from '../audit-log.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';


import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-audit-log-edit',
  imports: [
    ErrorMessagesComponent,
    AuditLogFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './audit-log-edit.component.html',
  styleUrl: './audit-log-edit.component.css'
})
export class AuditLogEditComponent {
  @ViewChild(AuditLogFormComponent) auditLogForm!: AuditLogFormComponent;

  id = signal<number>(1);
  auditLog = signal<AuditLogEntity|null>(null)
  users = signal<UserEntity[]>([]);


  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected auditLogService: AuditLogService,
    protected userService: UserService,


  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const auditLogResponse = await this.auditLogService.getById(this.id())
      const auditLogData = auditLogResponse.data as AuditLogEntity;

      this.auditLog.set(auditLogData);
      this.auditLogForm.fill(auditLogData);

      const userResponse = await this.userService.getAll({page: ''});
			const userData = userResponse.data as UserEntity[];
			this.users.set(userData);




    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.auditLogForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.auditLogForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
