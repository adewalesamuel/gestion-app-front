import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GUTransactionFormComponent } from '../forms/gu-transaction-form.component';
import { GUTransactionService } from '../services/gu-transaction.service';
import { REModePaiementService } from '../../../RE/re-mode-paiement/services/re-mode-paiement.service';
import { REModePaiementEntity } from '../../../RE/re-mode-paiement/re-mode-paiement.entity';
import { GUDemandeService } from '../../../GU/gu-demande/services/gu-demande.service';
import { GUDemandeEntity } from '../../../GU/gu-demande/gu-demande.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-gu-transaction-create',
  imports: [
    ErrorMessagesComponent,
    GUTransactionFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-transaction-create.component.html',
  styleUrl: './gu-transaction-create.component.css'
})
export class GUTransactionCreateComponent {

  @ViewChild(GUTransactionFormComponent) gUTransactionForm!: GUTransactionFormComponent;

  reModePaiements = signal<REModePaiementEntity[]>([]);
	guDemandes = signal<GUDemandeEntity[]>([]);
	users = signal<UserEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUTransactionService: GUTransactionService,
    protected reModePaiementService: REModePaiementService,
		protected guDemandeService: GUDemandeService,
		protected userService: UserService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
      const reModePaiementResponse = await this.reModePaiementService.getAll({page: ''});
			const reModePaiementData = reModePaiementResponse.data as REModePaiementEntity[];
			this.reModePaiements.set(reModePaiementData);

			const guDemandeResponse = await this.guDemandeService.getAll({page: ''});
			const guDemandeData = guDemandeResponse.data as GUDemandeEntity[];
			this.guDemandes.set(guDemandeData);

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
    this.gUTransactionForm.formGroup.setErrors([]);

    try {
      await this.gUTransactionForm.create();
      this.router.navigate([`/gu/gu-transactions`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
