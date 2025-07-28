import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RERemiseFormComponent } from '../forms/re-remise-form.component';
import { RERemiseService } from '../services/re-remise.service';
import { REOrdreRecetteService } from '../../../RE/re-ordre-recette/services/re-ordre-recette.service';
import { REOrdreRecetteEntity } from '../../../RE/re-ordre-recette/re-ordre-recette.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-re-remise-create',
  imports: [
    ErrorMessagesComponent,
    RERemiseFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-remise-create.component.html',
  styleUrl: './re-remise-create.component.css'
})
export class RERemiseCreateComponent {

  @ViewChild(RERemiseFormComponent) rERemiseForm!: RERemiseFormComponent;

  reOrdreRecettes = signal<REOrdreRecetteEntity[]>([]);
	users = signal<UserEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rERemiseService: RERemiseService,
    protected reOrdreRecetteService: REOrdreRecetteService,
		protected userService: UserService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
      const reOrdreRecetteResponse = await this.reOrdreRecetteService.getAll({page: ''});
			const reOrdreRecetteData = reOrdreRecetteResponse.data as REOrdreRecetteEntity[];
			this.reOrdreRecettes.set(reOrdreRecetteData);

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
    this.rERemiseForm.formGroup.setErrors([]);

    try {
      await this.rERemiseForm.create();
      this.router.navigate([`/re/re-remises`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
