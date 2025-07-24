import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { REPaiementFormComponent } from '../forms/re-paiement-form.component';
import { REPaiementService } from '../services/re-paiement.service';
import { REPaiementEntity } from '../re-paiement.entity';
import { REOrdreRecetteService } from '../../../RE/re-ordre-recette/services/re-ordre-recette.service';
import { REOrdreRecetteEntity } from '../../../RE/re-ordre-recette/re-ordre-recette.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';
import { REModePaiementService } from '../../../RE/re-mode-paiement/services/re-mode-paiement.service';
import { REModePaiementEntity } from '../../../RE/re-mode-paiement/re-mode-paiement.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-re-paiement-edit',
  imports: [
    ErrorMessagesComponent,
    REPaiementFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-paiement-edit.component.html',
  styleUrl: './re-paiement-edit.component.css'
})
export class REPaiementEditComponent {
  @ViewChild(REPaiementFormComponent) rEPaiementForm!: REPaiementFormComponent;

  id = signal<number>(1);
  rEPaiement = signal<REPaiementEntity|null>(null)
  reOrdreRecettes = signal<REOrdreRecetteEntity[]>([]);
	users = signal<UserEntity[]>([]);
	reModePaiements = signal<REModePaiementEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rEPaiementService: REPaiementService,
    protected reOrdreRecetteService: REOrdreRecetteService,
		protected userService: UserService,
		protected reModePaiementService: REModePaiementService,

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
      const rEPaiementResponse = await this.rEPaiementService.getById(this.id())
      const rEPaiementData = rEPaiementResponse.data as REPaiementEntity;

      this.rEPaiement.set(rEPaiementData);
      this.rEPaiementForm.fill(rEPaiementData);

      const reOrdreRecetteResponse = await this.reOrdreRecetteService.getAll({page: ''});
			const reOrdreRecetteData = reOrdreRecetteResponse.data as REOrdreRecetteEntity[];
			this.reOrdreRecettes.set(reOrdreRecetteData);

			const userResponse = await this.userService.getAll({page: ''});
			const userData = userResponse.data as UserEntity[];
			this.users.set(userData);

			const reModePaiementResponse = await this.reModePaiementService.getAll({page: ''});
			const reModePaiementData = reModePaiementResponse.data as REModePaiementEntity[];
			this.reModePaiements.set(reModePaiementData);


    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.rEPaiementForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rEPaiementForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
