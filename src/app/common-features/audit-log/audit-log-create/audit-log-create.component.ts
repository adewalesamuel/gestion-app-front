import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditLogFormComponent } from '../forms/audit-log-form.component';
import { AuditLogService } from '../services/audit-log.service';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';


import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-audit-log-create',
  imports: [
    ErrorMessagesComponent,
    AuditLogFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './audit-log-create.component.html',
  styleUrl: './audit-log-create.component.css'
})
export class AuditLogCreateComponent {

  @ViewChild(AuditLogFormComponent) auditLogForm!: AuditLogFormComponent;

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
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
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

    this.errorHandler.setErrorMessages([]);
    this.isLoading.set(true);
    this.auditLogForm.formGroup.setErrors([]);

    try {
      await this.auditLogForm.create();
      this.router.navigate([`/settings/audit-logs`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
