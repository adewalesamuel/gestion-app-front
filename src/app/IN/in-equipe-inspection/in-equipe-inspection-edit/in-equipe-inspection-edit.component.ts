import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INEquipeInspectionFormComponent } from '../forms/in-equipe-inspection-form.component';
import { INEquipeInspectionService } from '../services/in-equipe-inspection.service';
import { INEquipeInspectionEntity } from '../in-equipe-inspection.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-in-equipe-inspection-edit',
  imports: [
    ErrorMessagesComponent,
    INEquipeInspectionFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-equipe-inspection-edit.component.html',
  styleUrl: './in-equipe-inspection-edit.component.css'
})
export class INEquipeInspectionEditComponent {
  @ViewChild(INEquipeInspectionFormComponent) iNEquipeInspectionForm!: INEquipeInspectionFormComponent;

  id = signal<number>(1);
  iNEquipeInspection = signal<INEquipeInspectionEntity|null>(null)
  users = signal<UserEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNEquipeInspectionService: INEquipeInspectionService,
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
      const iNEquipeInspectionResponse = await this.iNEquipeInspectionService.getById(this.id())
      const iNEquipeInspectionData = iNEquipeInspectionResponse.data as INEquipeInspectionEntity;

      this.iNEquipeInspection.set(iNEquipeInspectionData);
      this.iNEquipeInspectionForm.fill(iNEquipeInspectionData);

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
    this.iNEquipeInspectionForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.iNEquipeInspectionForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
