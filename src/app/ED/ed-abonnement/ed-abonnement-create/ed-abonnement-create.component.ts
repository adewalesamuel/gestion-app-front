import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EDAbonnementFormComponent } from '../forms/ed-abonnement-form.component';
import { EDAbonnementService } from '../services/ed-abonnement.service';
import { EDApiService } from '../../../ED/ed-api/services/ed-api.service';
import { EDApiEntity } from '../../../ED/ed-api/ed-api.entity';
import { RCActeurService } from '../../../RC/rc-acteur/services/rc-acteur.service';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-ed-abonnement-create',
  imports: [
    ErrorMessagesComponent,
    EDAbonnementFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-abonnement-create.component.html',
  styleUrl: './ed-abonnement-create.component.css'
})
export class EDAbonnementCreateComponent {

  @ViewChild(EDAbonnementFormComponent) eDAbonnementForm!: EDAbonnementFormComponent;

  edApis = signal<EDApiEntity[]>([]);
	rcActeurs = signal<RCActeurEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDAbonnementService: EDAbonnementService,
    protected edApiService: EDApiService,
		protected rcActeurService: RCActeurService,

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

			const rcActeurResponse = await this.rcActeurService.getAll({page: ''});
			const rcActeurData = rcActeurResponse.data as RCActeurEntity[];
			this.rcActeurs.set(rcActeurData);


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
    this.eDAbonnementForm.formGroup.setErrors([]);

    try {
      await this.eDAbonnementForm.create();
      this.router.navigate([`/ed/ed-abonnements`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
