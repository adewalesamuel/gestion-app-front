import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationFormComponent } from '../forms/notification-form.component';
import { NotificationService } from '../services/notification.service';
import { NotificationEntity } from '../notification.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';


import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-notification-edit',
  imports: [
    ErrorMessagesComponent,
    NotificationFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './notification-edit.component.html',
  styleUrl: './notification-edit.component.css'
})
export class NotificationEditComponent {
  @ViewChild(NotificationFormComponent) notificationForm!: NotificationFormComponent;

  id = signal<number>(1);
  notification = signal<NotificationEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const notificationResponse = await this.notificationService.getById(this.id())
      const notificationData = notificationResponse.data as NotificationEntity;

      this.notification.set(notificationData);
      this.notificationForm.fill(notificationData);

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
    this.notificationForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.notificationForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
