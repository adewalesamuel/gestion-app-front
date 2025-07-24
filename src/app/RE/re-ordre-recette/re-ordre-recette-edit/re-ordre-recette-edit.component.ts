import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { REOrdreRecetteFormComponent } from '../forms/re-ordre-recette-form.component';
import { REOrdreRecetteService } from '../services/re-ordre-recette.service';
import { REOrdreRecetteEntity } from '../re-ordre-recette.entity';
import { RCActeurService } from '../../../RC/rc-acteur/services/rc-acteur.service';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-re-ordre-recette-edit',
  imports: [
    ErrorMessagesComponent,
    REOrdreRecetteFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-ordre-recette-edit.component.html',
  styleUrl: './re-ordre-recette-edit.component.css'
})
export class REOrdreRecetteEditComponent {
  @ViewChild(REOrdreRecetteFormComponent) rEOrdreRecetteForm!: REOrdreRecetteFormComponent;

  id = signal<number>(1);
  rEOrdreRecette = signal<REOrdreRecetteEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const rEOrdreRecetteResponse = await this.rEOrdreRecetteService.getById(this.id())
      const rEOrdreRecetteData = rEOrdreRecetteResponse.data as REOrdreRecetteEntity;

      this.rEOrdreRecette.set(rEOrdreRecetteData);
      this.rEOrdreRecetteForm.fill(rEOrdreRecetteData);

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
    this.rEOrdreRecetteForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rEOrdreRecetteForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
