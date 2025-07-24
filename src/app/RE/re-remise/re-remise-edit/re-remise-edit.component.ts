import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RERemiseFormComponent } from '../forms/re-remise-form.component';
import { RERemiseService } from '../services/re-remise.service';
import { RERemiseEntity } from '../re-remise.entity';
import { REOrdreRecetteService } from '../../../RE/re-ordre-recette/services/re-ordre-recette.service';
import { REOrdreRecetteEntity } from '../../../RE/re-ordre-recette/re-ordre-recette.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-re-remise-edit',
  imports: [
    ErrorMessagesComponent,
    RERemiseFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-remise-edit.component.html',
  styleUrl: './re-remise-edit.component.css'
})
export class RERemiseEditComponent {
  @ViewChild(RERemiseFormComponent) rERemiseForm!: RERemiseFormComponent;

  id = signal<number>(1);
  rERemise = signal<RERemiseEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const rERemiseResponse = await this.rERemiseService.getById(this.id())
      const rERemiseData = rERemiseResponse.data as RERemiseEntity;

      this.rERemise.set(rERemiseData);
      this.rERemiseForm.fill(rERemiseData);

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

    this.isLoading.set(true);
    this.rERemiseForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rERemiseForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
