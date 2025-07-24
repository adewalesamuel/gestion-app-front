import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCPaysFormComponent } from '../forms/rc-pays-form.component';
import { RCPaysService } from '../services/rc-pays.service';
import { RCPaysEntity } from '../rc-pays.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-pays-edit',
  imports: [
    ErrorMessagesComponent,
    RCPaysFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-pays-edit.component.html',
  styleUrl: './rc-pays-edit.component.css'
})
export class RCPaysEditComponent {
  @ViewChild(RCPaysFormComponent) rCPaysForm!: RCPaysFormComponent;

  id = signal<number>(1);
  rCPays = signal<RCPaysEntity|null>(null)
  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCPaysService: RCPaysService,
    
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
      const rCPaysResponse = await this.rCPaysService.getById(this.id())
      const rCPaysData = rCPaysResponse.data as RCPaysEntity;

      this.rCPays.set(rCPaysData);
      this.rCPaysForm.fill(rCPaysData);

      
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.rCPaysForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rCPaysForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}