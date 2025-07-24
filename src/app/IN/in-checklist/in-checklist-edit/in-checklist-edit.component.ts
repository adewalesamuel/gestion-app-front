import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INChecklistFormComponent } from '../forms/in-checklist-form.component';
import { INChecklistService } from '../services/in-checklist.service';
import { INChecklistEntity } from '../in-checklist.entity';
import { RCTypeEnginService } from '../../../RC/rc-type-engin/services/rc-type-engin.service';
import { RCTypeEnginEntity } from '../../../RC/rc-type-engin/rc-type-engin.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-in-checklist-edit',
  imports: [
    ErrorMessagesComponent,
    INChecklistFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-checklist-edit.component.html',
  styleUrl: './in-checklist-edit.component.css'
})
export class INChecklistEditComponent {
  @ViewChild(INChecklistFormComponent) iNChecklistForm!: INChecklistFormComponent;

  id = signal<number>(1);
  iNChecklist = signal<INChecklistEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const iNChecklistResponse = await this.iNChecklistService.getById(this.id())
      const iNChecklistData = iNChecklistResponse.data as INChecklistEntity;

      this.iNChecklist.set(iNChecklistData);
      this.iNChecklistForm.fill(iNChecklistData);

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

    this.isLoading.set(true);
    this.iNChecklistForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.iNChecklistForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
