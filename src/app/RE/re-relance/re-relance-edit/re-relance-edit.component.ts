import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RERelanceFormComponent } from '../forms/re-relance-form.component';
import { RERelanceService } from '../services/re-relance.service';
import { RERelanceEntity } from '../re-relance.entity';
import { REOrdreRecetteService } from '../../../RE/re-ordre-recette/services/re-ordre-recette.service';
import { REOrdreRecetteEntity } from '../../../RE/re-ordre-recette/re-ordre-recette.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-re-relance-edit',
  imports: [
    ErrorMessagesComponent,
    RERelanceFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-relance-edit.component.html',
  styleUrl: './re-relance-edit.component.css'
})
export class RERelanceEditComponent {
  @ViewChild(RERelanceFormComponent) rERelanceForm!: RERelanceFormComponent;

  id = signal<number>(1);
  rERelance = signal<RERelanceEntity|null>(null)
  reOrdreRecettes = signal<REOrdreRecetteEntity[]>([]);
	users = signal<UserEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rERelanceService: RERelanceService,
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
      const rERelanceResponse = await this.rERelanceService.getById(this.id())
      const rERelanceData = rERelanceResponse.data as RERelanceEntity;

      this.rERelance.set(rERelanceData);
      this.rERelanceForm.fill(rERelanceData);

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
    this.rERelanceForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rERelanceForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
