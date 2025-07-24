import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCEnginFlottantFormComponent } from '../forms/rc-engin-flottant-form.component';
import { RCEnginFlottantService } from '../services/rc-engin-flottant.service';
import { RCTypeEnginService } from '../../../RC/rc-type-engin/services/rc-type-engin.service';
import { RCTypeEnginEntity } from '../../../RC/rc-type-engin/rc-type-engin.entity';
import { RCPaysService } from '../../../RC/rc-pays/services/rc-pays.service';
import { RCPaysEntity } from '../../../RC/rc-pays/rc-pays.entity';
import { RCActeurService } from '../../../RC/rc-acteur/services/rc-acteur.service';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-engin-flottant-create',
  imports: [
    ErrorMessagesComponent,
    RCEnginFlottantFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-engin-flottant-create.component.html',
  styleUrl: './rc-engin-flottant-create.component.css'
})
export class RCEnginFlottantCreateComponent {

  @ViewChild(RCEnginFlottantFormComponent) rCEnginFlottantForm!: RCEnginFlottantFormComponent;

  rcTypeEngins = signal<RCTypeEnginEntity[]>([]);
	rcPayss = signal<RCPaysEntity[]>([]);
	rcActeurs = signal<RCActeurEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCEnginFlottantService: RCEnginFlottantService,
    protected rcTypeEnginService: RCTypeEnginService,
		protected rcPaysService: RCPaysService,
		protected rcActeurService: RCActeurService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
      const rcTypeEnginResponse = await this.rcTypeEnginService.getAll({page: ''});
			const rcTypeEnginData = rcTypeEnginResponse.data as RCTypeEnginEntity[];
			this.rcTypeEngins.set(rcTypeEnginData);

			const rcPaysResponse = await this.rcPaysService.getAll({page: ''});
			const rcPaysData = rcPaysResponse.data as RCPaysEntity[];
			this.rcPayss.set(rcPaysData);

			const rcActeurResponse = await this.rcActeurService.getAll({page: ''});
			const rcActeurData = rcActeurResponse.data as RCActeurEntity[];
			this.rcActeurs.set(rcActeurData);


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
    this.rCEnginFlottantForm.formGroup.setErrors([]);

    try {
      await this.rCEnginFlottantForm.create();
      this.router.navigate([`/rc-engin-flottants`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
