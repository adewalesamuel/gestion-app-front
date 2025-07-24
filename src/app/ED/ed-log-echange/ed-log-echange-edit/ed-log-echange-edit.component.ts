import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EDLogEchangeFormComponent } from '../forms/ed-log-echange-form.component';
import { EDLogEchangeService } from '../services/ed-log-echange.service';
import { EDLogEchangeEntity } from '../ed-log-echange.entity';
import { EDApiService } from '../../../ED/ed-api/services/ed-api.service';
import { EDApiEntity } from '../../../ED/ed-api/ed-api.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-ed-log-echange-edit',
  imports: [
    ErrorMessagesComponent,
    EDLogEchangeFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-log-echange-edit.component.html',
  styleUrl: './ed-log-echange-edit.component.css'
})
export class EDLogEchangeEditComponent {
  @ViewChild(EDLogEchangeFormComponent) eDLogEchangeForm!: EDLogEchangeFormComponent;

  id = signal<number>(1);
  eDLogEchange = signal<EDLogEchangeEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const eDLogEchangeResponse = await this.eDLogEchangeService.getById(this.id())
      const eDLogEchangeData = eDLogEchangeResponse.data as EDLogEchangeEntity;

      this.eDLogEchange.set(eDLogEchangeData);
      this.eDLogEchangeForm.fill(eDLogEchangeData);

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

    this.isLoading.set(true);
    this.eDLogEchangeForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.eDLogEchangeForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
