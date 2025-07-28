import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCActeurFormComponent } from '../forms/rc-acteur-form.component';
import { RCActeurService } from '../services/rc-acteur.service';
import { RCActeurEntity } from '../rc-acteur.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-acteur-edit',
  imports: [
    ErrorMessagesComponent,
    RCActeurFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-acteur-edit.component.html',
  styleUrl: './rc-acteur-edit.component.css'
})
export class RCActeurEditComponent {
  @ViewChild(RCActeurFormComponent) rCActeurForm!: RCActeurFormComponent;

  id = signal<number>(1);
  rCActeur = signal<RCActeurEntity|null>(null)

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCActeurService: RCActeurService,

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
      const rCActeurResponse = await this.rCActeurService.getById(this.id())
      const rCActeurData = rCActeurResponse.data as RCActeurEntity;

      this.rCActeur.set(rCActeurData);
      this.rCActeurForm.fill(rCActeurData);


    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.rCActeurForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rCActeurForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
