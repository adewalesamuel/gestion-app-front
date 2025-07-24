import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GUTransactionFormComponent } from '../forms/gu-transaction-form.component';
import { GUTransactionService } from '../services/gu-transaction.service';
import { GUTransactionEntity } from '../gu-transaction.entity';
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
  selector: 'app-gu-transaction-edit',
  imports: [
    ErrorMessagesComponent,
    GUTransactionFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-transaction-edit.component.html',
  styleUrl: './gu-transaction-edit.component.css'
})
export class GUTransactionEditComponent {
  @ViewChild(GUTransactionFormComponent) gUTransactionForm!: GUTransactionFormComponent;

  id = signal<number>(1);
  gUTransaction = signal<GUTransactionEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const gUTransactionResponse = await this.gUTransactionService.getById(this.id())
      const gUTransactionData = gUTransactionResponse.data as GUTransactionEntity;

      this.gUTransaction.set(gUTransactionData);
      this.gUTransactionForm.fill(gUTransactionData);

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

    this.isLoading.set(true);
    this.gUTransactionForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.gUTransactionForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
