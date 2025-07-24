import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GUCommentaireFormComponent } from '../forms/gu-commentaire-form.component';
import { GUCommentaireService } from '../services/gu-commentaire.service';
import { GUCommentaireEntity } from '../gu-commentaire.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';
import { GUDemandeService } from '../../../GU/gu-demande/services/gu-demande.service';
import { GUDemandeEntity } from '../../../GU/gu-demande/gu-demande.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-gu-commentaire-edit',
  imports: [
    ErrorMessagesComponent,
    GUCommentaireFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-commentaire-edit.component.html',
  styleUrl: './gu-commentaire-edit.component.css'
})
export class GUCommentaireEditComponent {
  @ViewChild(GUCommentaireFormComponent) gUCommentaireForm!: GUCommentaireFormComponent;

  id = signal<number>(1);
  gUCommentaire = signal<GUCommentaireEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const gUCommentaireResponse = await this.gUCommentaireService.getById(this.id())
      const gUCommentaireData = gUCommentaireResponse.data as GUCommentaireEntity;

      this.gUCommentaire.set(gUCommentaireData);
      this.gUCommentaireForm.fill(gUCommentaireData);

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

    this.isLoading.set(true);
    this.gUCommentaireForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.gUCommentaireForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
