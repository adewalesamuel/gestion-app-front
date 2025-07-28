import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationFormComponent } from '../forms/notification-form.component';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';


import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-notification-create',
  imports: [
    ErrorMessagesComponent,
    NotificationFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './notification-create.component.html',
  styleUrl: './notification-create.component.css'
})
export class NotificationCreateComponent {

  @ViewChild(NotificationFormComponent) notificationForm!: NotificationFormComponent;

  users = signal<UserEntity[]>([]);


  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected notificationService: NotificationService,
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
    this.notificationForm.formGroup.setErrors([]);

    try {
      await this.notificationForm.create();
      this.router.navigate([`/settings/notifications`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
