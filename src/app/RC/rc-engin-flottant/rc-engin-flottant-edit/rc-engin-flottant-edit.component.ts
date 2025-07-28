import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCEnginFlottantFormComponent } from '../forms/rc-engin-flottant-form.component';
import { RCEnginFlottantService } from '../services/rc-engin-flottant.service';
import { RCEnginFlottantEntity } from '../rc-engin-flottant.entity';
import { RCTypeEnginService } from '../../rc-type-engin/services/rc-type-engin.service';
import { RCTypeEnginEntity } from '../../rc-type-engin/rc-type-engin.entity';
import { RCPaysService } from '../../rc-pays/services/rc-pays.service';
import { RCPaysEntity } from '../../rc-pays/rc-pays.entity';
import { RCActeurService } from '../../rc-acteur/services/rc-acteur.service';
import { RCActeurEntity } from '../../rc-acteur/rc-acteur.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-engin-flottant-edit',
  imports: [
    ErrorMessagesComponent,
    RCEnginFlottantFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-engin-flottant-edit.component.html',
  styleUrl: './rc-engin-flottant-edit.component.css'
})
export class RCEnginFlottantEditComponent {
  @ViewChild(RCEnginFlottantFormComponent) rCEnginFlottantForm!: RCEnginFlottantFormComponent;

  id = signal<number>(1);
  rCEnginFlottant = signal<RCEnginFlottantEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const rCEnginFlottantResponse = await this.rCEnginFlottantService.getById(this.id())
      const rCEnginFlottantData = rCEnginFlottantResponse.data as RCEnginFlottantEntity;

      this.rCEnginFlottant.set(rCEnginFlottantData);
      this.rCEnginFlottantForm.fill(rCEnginFlottantData);

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

    this.isLoading.set(true);
    this.rCEnginFlottantForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rCEnginFlottantForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
