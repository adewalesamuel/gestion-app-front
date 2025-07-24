import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EDLogEchangeFormComponent } from '../forms/ed-log-echange-form.component';
import { EDLogEchangeService } from '../services/ed-log-echange.service';
import { EDApiService } from '../../../ED/ed-api/services/ed-api.service';
import { EDApiEntity } from '../../../ED/ed-api/ed-api.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-ed-log-echange-create',
  imports: [
    ErrorMessagesComponent,
    EDLogEchangeFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-log-echange-create.component.html',
  styleUrl: './ed-log-echange-create.component.css'
})
export class EDLogEchangeCreateComponent {

  @ViewChild(EDLogEchangeFormComponent) eDLogEchangeForm!: EDLogEchangeFormComponent;

  edApis = signal<EDApiEntity[]>([]);
	users = signal<UserEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDLogEchangeService: EDLogEchangeService,
    protected edApiService: EDApiService,
		protected userService: UserService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
      const edApiResponse = await this.edApiService.getAll({page: ''});
			const edApiData = edApiResponse.data as EDApiEntity[];
			this.edApis.set(edApiData);

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
    this.eDLogEchangeForm.formGroup.setErrors([]);

    try {
      await this.eDLogEchangeForm.create();
      this.router.navigate([`/ed-log-echanges`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
