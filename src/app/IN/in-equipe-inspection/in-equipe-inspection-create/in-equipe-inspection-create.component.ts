import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INEquipeInspectionFormComponent } from '../forms/in-equipe-inspection-form.component';
import { INEquipeInspectionService } from '../services/in-equipe-inspection.service';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-in-equipe-inspection-create',
  imports: [
    ErrorMessagesComponent,
    INEquipeInspectionFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-equipe-inspection-create.component.html',
  styleUrl: './in-equipe-inspection-create.component.css'
})
export class INEquipeInspectionCreateComponent {

  @ViewChild(INEquipeInspectionFormComponent) iNEquipeInspectionForm!: INEquipeInspectionFormComponent;

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
    this.iNEquipeInspectionForm.formGroup.setErrors([]);

    try {
      await this.iNEquipeInspectionForm.create();
      this.router.navigate([`/in/in-equipe-inspections`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
