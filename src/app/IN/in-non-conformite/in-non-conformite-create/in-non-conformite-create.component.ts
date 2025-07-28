import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INNonConformiteFormComponent } from '../forms/in-non-conformite-form.component';
import { INNonConformiteService } from '../services/in-non-conformite.service';
import { INInspectionService } from '../../../IN/in-inspection/services/in-inspection.service';
import { INInspectionEntity } from '../../../IN/in-inspection/in-inspection.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-in-non-conformite-create',
  imports: [
    ErrorMessagesComponent,
    INNonConformiteFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-non-conformite-create.component.html',
  styleUrl: './in-non-conformite-create.component.css'
})
export class INNonConformiteCreateComponent {

  @ViewChild(INNonConformiteFormComponent) iNNonConformiteForm!: INNonConformiteFormComponent;

  inInspections = signal<INInspectionEntity[]>([]);
	users = signal<UserEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNNonConformiteService: INNonConformiteService,
    protected inInspectionService: INInspectionService,
		protected userService: UserService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
      const inInspectionResponse = await this.inInspectionService.getAll({page: ''});
			const inInspectionData = inInspectionResponse.data as INInspectionEntity[];
			this.inInspections.set(inInspectionData);

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
    this.iNNonConformiteForm.formGroup.setErrors([]);

    try {
      await this.iNNonConformiteForm.create();
      this.router.navigate([`/in/in-non-conformites`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
