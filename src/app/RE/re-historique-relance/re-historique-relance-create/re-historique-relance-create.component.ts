import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { REHistoriqueRelanceFormComponent } from '../forms/re-historique-relance-form.component';
import { REHistoriqueRelanceService } from '../services/re-historique-relance.service';
import { RERelanceService } from '../../../RE/re-relance/services/re-relance.service';
import { RERelanceEntity } from '../../../RE/re-relance/re-relance.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-re-historique-relance-create',
  imports: [
    ErrorMessagesComponent,
    REHistoriqueRelanceFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-historique-relance-create.component.html',
  styleUrl: './re-historique-relance-create.component.css'
})
export class REHistoriqueRelanceCreateComponent {

  @ViewChild(REHistoriqueRelanceFormComponent) rEHistoriqueRelanceForm!: REHistoriqueRelanceFormComponent;

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
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
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

    this.errorHandler.setErrorMessages([]);
    this.isLoading.set(true);
    this.rEHistoriqueRelanceForm.formGroup.setErrors([]);

    try {
      await this.rEHistoriqueRelanceForm.create();
      this.router.navigate([`/re-historique-relances`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
