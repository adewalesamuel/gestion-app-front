import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EDAbonnementFormComponent } from '../forms/ed-abonnement-form.component';
import { EDAbonnementService } from '../services/ed-abonnement.service';
import { EDAbonnementEntity } from '../ed-abonnement.entity';
import { EDApiService } from '../../../ED/ed-api/services/ed-api.service';
import { EDApiEntity } from '../../../ED/ed-api/ed-api.entity';
import { RCActeurService } from '../../../RC/rc-acteur/services/rc-acteur.service';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-ed-abonnement-edit',
  imports: [
    ErrorMessagesComponent,
    EDAbonnementFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-abonnement-edit.component.html',
  styleUrl: './ed-abonnement-edit.component.css'
})
export class EDAbonnementEditComponent {
  @ViewChild(EDAbonnementFormComponent) eDAbonnementForm!: EDAbonnementFormComponent;

  id = signal<number>(1);
  eDAbonnement = signal<EDAbonnementEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const eDAbonnementResponse = await this.eDAbonnementService.getById(this.id())
      const eDAbonnementData = eDAbonnementResponse.data as EDAbonnementEntity;

      this.eDAbonnement.set(eDAbonnementData);
      this.eDAbonnementForm.fill(eDAbonnementData);

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

    this.isLoading.set(true);
    this.eDAbonnementForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.eDAbonnementForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
