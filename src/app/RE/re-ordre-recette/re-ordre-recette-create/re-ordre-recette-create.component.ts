import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { REOrdreRecetteFormComponent } from '../forms/re-ordre-recette-form.component';
import { REOrdreRecetteService } from '../services/re-ordre-recette.service';
import { RCActeurService } from '../../../RC/rc-acteur/services/rc-acteur.service';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-re-ordre-recette-create',
  imports: [
    ErrorMessagesComponent,
    REOrdreRecetteFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-ordre-recette-create.component.html',
  styleUrl: './re-ordre-recette-create.component.css'
})
export class REOrdreRecetteCreateComponent {

  @ViewChild(REOrdreRecetteFormComponent) rEOrdreRecetteForm!: REOrdreRecetteFormComponent;

  rcActeurs = signal<RCActeurEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rEOrdreRecetteService: REOrdreRecetteService,
    protected rcActeurService: RCActeurService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
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
    this.rEOrdreRecetteForm.formGroup.setErrors([]);

    try {
      await this.rEOrdreRecetteForm.create();
      this.router.navigate([`/re-ordre-recettes`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
