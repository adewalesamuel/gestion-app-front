import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EDPolitiqueAccesFormComponent } from '../forms/ed-politique-acces-form.component';
import { EDPolitiqueAccesService } from '../services/ed-politique-acces.service';
import { EDApiService } from '../../../ED/ed-api/services/ed-api.service';
import { EDApiEntity } from '../../../ED/ed-api/ed-api.entity';
import { RoleService } from '../../../common-features/role/services/role.service';
import { RoleEntity } from '../../../common-features/role/role.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-ed-politique-acces-create',
  imports: [
    ErrorMessagesComponent,
    EDPolitiqueAccesFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-politique-acces-create.component.html',
  styleUrl: './ed-politique-acces-create.component.css'
})
export class EDPolitiqueAccesCreateComponent {

  @ViewChild(EDPolitiqueAccesFormComponent) eDPolitiqueAccesForm!: EDPolitiqueAccesFormComponent;

  edApis = signal<EDApiEntity[]>([]);
	roles = signal<RoleEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDPolitiqueAccesService: EDPolitiqueAccesService,
    protected edApiService: EDApiService,
		protected roleService: RoleService,

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

			const roleResponse = await this.roleService.getAll({page: ''});
			const roleData = roleResponse.data as RoleEntity[];
			this.roles.set(roleData);


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
    this.eDPolitiqueAccesForm.formGroup.setErrors([]);

    try {
      await this.eDPolitiqueAccesForm.create();
      this.router.navigate([`/ed-politique-access`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
