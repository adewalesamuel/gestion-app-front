import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INNonConformiteFormComponent } from '../forms/in-non-conformite-form.component';
import { INNonConformiteService } from '../services/in-non-conformite.service';
import { INNonConformiteEntity } from '../in-non-conformite.entity';
import { INInspectionService } from '../../../IN/in-inspection/services/in-inspection.service';
import { INInspectionEntity } from '../../../IN/in-inspection/in-inspection.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-in-non-conformite-edit',
  imports: [
    ErrorMessagesComponent,
    INNonConformiteFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-non-conformite-edit.component.html',
  styleUrl: './in-non-conformite-edit.component.css'
})
export class INNonConformiteEditComponent {
  @ViewChild(INNonConformiteFormComponent) iNNonConformiteForm!: INNonConformiteFormComponent;

  id = signal<number>(1);
  iNNonConformite = signal<INNonConformiteEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const iNNonConformiteResponse = await this.iNNonConformiteService.getById(this.id())
      const iNNonConformiteData = iNNonConformiteResponse.data as INNonConformiteEntity;

      this.iNNonConformite.set(iNNonConformiteData);
      this.iNNonConformiteForm.fill(iNNonConformiteData);

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

    this.isLoading.set(true);
    this.iNNonConformiteForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.iNNonConformiteForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
