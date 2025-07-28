import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCHistoriqueProprieteFormComponent } from '../forms/rc-historique-propriete-form.component';
import { RCHistoriqueProprieteService } from '../services/rc-historique-propriete.service';
import { RCActeurService } from '../../rc-acteur/services/rc-acteur.service';
import { RCActeurEntity } from '../../rc-acteur/rc-acteur.entity';
import { RCEnginFlottantService } from '../../rc-engin-flottant/services/rc-engin-flottant.service';
import { RCEnginFlottantEntity } from '../../rc-engin-flottant/rc-engin-flottant.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-historique-propriete-create',
  imports: [
    ErrorMessagesComponent,
    RCHistoriqueProprieteFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-historique-propriete-create.component.html',
  styleUrl: './rc-historique-propriete-create.component.css'
})
export class RCHistoriqueProprieteCreateComponent {

  @ViewChild(RCHistoriqueProprieteFormComponent) rCHistoriqueProprieteForm!: RCHistoriqueProprieteFormComponent;

  rcActeurs = signal<RCActeurEntity[]>([]);
	rcEnginFlottants = signal<RCEnginFlottantEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCHistoriqueProprieteService: RCHistoriqueProprieteService,
    protected rcActeurService: RCActeurService,
		protected rcEnginFlottantService: RCEnginFlottantService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
      const rcActeurResponse = await this.rcActeurService.getAll({page: ''});
			const rcActeurData = rcActeurResponse.data as RCActeurEntity[];
			this.rcActeurs.set(rcActeurData);

			const rcEnginFlottantResponse = await this.rcEnginFlottantService.getAll({page: ''});
			const rcEnginFlottantData = rcEnginFlottantResponse.data as RCEnginFlottantEntity[];
			this.rcEnginFlottants.set(rcEnginFlottantData);


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
    this.rCHistoriqueProprieteForm.formGroup.setErrors([]);

    try {
      await this.rCHistoriqueProprieteForm.create();
      this.router.navigate([`/rc/rc-historique-proprietes`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
