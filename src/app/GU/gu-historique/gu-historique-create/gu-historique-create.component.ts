import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GUHistoriqueFormComponent } from '../forms/gu-historique-form.component';
import { GUHistoriqueService } from '../services/gu-historique.service';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';
import { GUDemandeService } from '../../../GU/gu-demande/services/gu-demande.service';
import { GUDemandeEntity } from '../../../GU/gu-demande/gu-demande.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-gu-historique-create',
  imports: [
    ErrorMessagesComponent,
    GUHistoriqueFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-historique-create.component.html',
  styleUrl: './gu-historique-create.component.css'
})
export class GUHistoriqueCreateComponent {

  @ViewChild(GUHistoriqueFormComponent) gUHistoriqueForm!: GUHistoriqueFormComponent;

  users = signal<UserEntity[]>([]);
	guDemandes = signal<GUDemandeEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUHistoriqueService: GUHistoriqueService,
    protected userService: UserService,
		protected guDemandeService: GUDemandeService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
      const userResponse = await this.userService.getAll({page: ''});
			const userData = userResponse.data as UserEntity[];
			this.users.set(userData);

			const guDemandeResponse = await this.guDemandeService.getAll({page: ''});
			const guDemandeData = guDemandeResponse.data as GUDemandeEntity[];
			this.guDemandes.set(guDemandeData);


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
    this.gUHistoriqueForm.formGroup.setErrors([]);

    try {
      await this.gUHistoriqueForm.create();
      this.router.navigate([`/gu/gu-historiques`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
