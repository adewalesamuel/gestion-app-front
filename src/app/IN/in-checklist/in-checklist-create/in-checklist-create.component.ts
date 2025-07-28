import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INChecklistFormComponent } from '../forms/in-checklist-form.component';
import { INChecklistService } from '../services/in-checklist.service';
import { RCTypeEnginService } from '../../../RC/rc-type-engin/services/rc-type-engin.service';
import { RCTypeEnginEntity } from '../../../RC/rc-type-engin/rc-type-engin.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-in-checklist-create',
  imports: [
    ErrorMessagesComponent,
    INChecklistFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-checklist-create.component.html',
  styleUrl: './in-checklist-create.component.css'
})
export class INChecklistCreateComponent {

  @ViewChild(INChecklistFormComponent) iNChecklistForm!: INChecklistFormComponent;

  rcTypeEngins = signal<RCTypeEnginEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNChecklistService: INChecklistService,
    protected rcTypeEnginService: RCTypeEnginService,

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
    this.iNChecklistForm.formGroup.setErrors([]);

    try {
      await this.iNChecklistForm.create();
      this.router.navigate([`/in/in-checklists`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
