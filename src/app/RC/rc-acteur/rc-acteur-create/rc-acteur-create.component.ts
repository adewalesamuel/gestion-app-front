import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCActeurFormComponent } from '../forms/rc-acteur-form.component';
import { RCActeurService } from '../services/rc-acteur.service';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-acteur-create',
  imports: [
    ErrorMessagesComponent,
    RCActeurFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-acteur-create.component.html',
  styleUrl: './rc-acteur-create.component.css'
})
export class RCActeurCreateComponent {

  @ViewChild(RCActeurFormComponent) rCActeurForm!: RCActeurFormComponent;


  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCActeurService: RCActeurService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {

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
    this.rCActeurForm.formGroup.setErrors([]);

    try {
      await this.rCActeurForm.create();
      this.router.navigate([`/rc/rc-acteurs`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
