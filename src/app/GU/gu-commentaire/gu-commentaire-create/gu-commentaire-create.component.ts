import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GUCommentaireFormComponent } from '../forms/gu-commentaire-form.component';
import { GUCommentaireService } from '../services/gu-commentaire.service';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';
import { GUDemandeService } from '../../../GU/gu-demande/services/gu-demande.service';
import { GUDemandeEntity } from '../../../GU/gu-demande/gu-demande.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-gu-commentaire-create',
  imports: [
    ErrorMessagesComponent,
    GUCommentaireFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-commentaire-create.component.html',
  styleUrl: './gu-commentaire-create.component.css'
})
export class GUCommentaireCreateComponent {

  @ViewChild(GUCommentaireFormComponent) gUCommentaireForm!: GUCommentaireFormComponent;

  users = signal<UserEntity[]>([]);
	guDemandes = signal<GUDemandeEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUCommentaireService: GUCommentaireService,
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
    this.gUCommentaireForm.formGroup.setErrors([]);

    try {
      await this.gUCommentaireForm.create();
      this.router.navigate([`/gu/gu-commentaires`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
