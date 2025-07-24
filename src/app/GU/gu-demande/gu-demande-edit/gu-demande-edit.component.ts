import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GUDemandeFormComponent } from '../forms/gu-demande-form.component';
import { GUDemandeService } from '../services/gu-demande.service';
import { GUDemandeEntity } from '../gu-demande.entity';
import { GUTypeDemandeService } from '../../../GU/gu-type-demande/services/gu-type-demande.service';
import { GUTypeDemandeEntity } from '../../../GU/gu-type-demande/gu-type-demande.entity';
import { GUStatutDemandeService } from '../../../GU/gu-statut-demande/services/gu-statut-demande.service';
import { GUStatutDemandeEntity } from '../../../GU/gu-statut-demande/gu-statut-demande.entity';
import { RCActeurService } from '../../../RC/rc-acteur/services/rc-acteur.service';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';
import { RCEnginFlottantService } from '../../../RC/rc-engin-flottant/services/rc-engin-flottant.service';
import { RCEnginFlottantEntity } from '../../../RC/rc-engin-flottant/rc-engin-flottant.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-gu-demande-edit',
  imports: [
    ErrorMessagesComponent,
    GUDemandeFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-demande-edit.component.html',
  styleUrl: './gu-demande-edit.component.css'
})
export class GUDemandeEditComponent {
  @ViewChild(GUDemandeFormComponent) gUDemandeForm!: GUDemandeFormComponent;

  id = signal<number>(1);
  gUDemande = signal<GUDemandeEntity|null>(null)
  guTypeDemandes = signal<GUTypeDemandeEntity[]>([]);
	guStatutDemandes = signal<GUStatutDemandeEntity[]>([]);
	rcActeurs = signal<RCActeurEntity[]>([]);
	rcEnginFlottants = signal<RCEnginFlottantEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUDemandeService: GUDemandeService,
    protected guTypeDemandeService: GUTypeDemandeService,
		protected guStatutDemandeService: GUStatutDemandeService,
		protected rcActeurService: RCActeurService,
		protected rcEnginFlottantService: RCEnginFlottantService,

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
      const gUDemandeResponse = await this.gUDemandeService.getById(this.id())
      const gUDemandeData = gUDemandeResponse.data as GUDemandeEntity;

      this.gUDemande.set(gUDemandeData);
      this.gUDemandeForm.fill(gUDemandeData);

      const guTypeDemandeResponse = await this.guTypeDemandeService.getAll({page: ''});
			const guTypeDemandeData = guTypeDemandeResponse.data as GUTypeDemandeEntity[];
			this.guTypeDemandes.set(guTypeDemandeData);

			const guStatutDemandeResponse = await this.guStatutDemandeService.getAll({page: ''});
			const guStatutDemandeData = guStatutDemandeResponse.data as GUStatutDemandeEntity[];
			this.guStatutDemandes.set(guStatutDemandeData);

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

    this.isLoading.set(true);
    this.gUDemandeForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.gUDemandeForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
