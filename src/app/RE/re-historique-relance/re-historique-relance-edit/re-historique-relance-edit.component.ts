import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { REHistoriqueRelanceFormComponent } from '../forms/re-historique-relance-form.component';
import { REHistoriqueRelanceService } from '../services/re-historique-relance.service';
import { REHistoriqueRelanceEntity } from '../re-historique-relance.entity';
import { RERelanceService } from '../../../RE/re-relance/services/re-relance.service';
import { RERelanceEntity } from '../../../RE/re-relance/re-relance.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-re-historique-relance-edit',
  imports: [
    ErrorMessagesComponent,
    REHistoriqueRelanceFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-historique-relance-edit.component.html',
  styleUrl: './re-historique-relance-edit.component.css'
})
export class REHistoriqueRelanceEditComponent {
  @ViewChild(REHistoriqueRelanceFormComponent) rEHistoriqueRelanceForm!: REHistoriqueRelanceFormComponent;

  id = signal<number>(1);
  rEHistoriqueRelance = signal<REHistoriqueRelanceEntity|null>(null)
  reRelances = signal<RERelanceEntity[]>([]);
	users = signal<UserEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rEHistoriqueRelanceService: REHistoriqueRelanceService,
    protected reRelanceService: RERelanceService,
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
      const rEHistoriqueRelanceResponse = await this.rEHistoriqueRelanceService.getById(this.id())
      const rEHistoriqueRelanceData = rEHistoriqueRelanceResponse.data as REHistoriqueRelanceEntity;

      this.rEHistoriqueRelance.set(rEHistoriqueRelanceData);
      this.rEHistoriqueRelanceForm.fill(rEHistoriqueRelanceData);

      const reRelanceResponse = await this.reRelanceService.getAll({page: ''});
			const reRelanceData = reRelanceResponse.data as RERelanceEntity[];
			this.reRelances.set(reRelanceData);

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
    this.rEHistoriqueRelanceForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rEHistoriqueRelanceForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
