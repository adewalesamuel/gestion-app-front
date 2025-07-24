import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INResultatItemFormComponent } from '../forms/in-resultat-item-form.component';
import { INResultatItemService } from '../services/in-resultat-item.service';
import { INInspectionService } from '../../../IN/in-inspection/services/in-inspection.service';
import { INInspectionEntity } from '../../../IN/in-inspection/in-inspection.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-in-resultat-item-create',
  imports: [
    ErrorMessagesComponent,
    INResultatItemFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-resultat-item-create.component.html',
  styleUrl: './in-resultat-item-create.component.css'
})
export class INResultatItemCreateComponent {

  @ViewChild(INResultatItemFormComponent) iNResultatItemForm!: INResultatItemFormComponent;

  inInspections = signal<INInspectionEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNResultatItemService: INResultatItemService,
    protected inInspectionService: INInspectionService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
      const inInspectionResponse = await this.inInspectionService.getAll({page: ''});
			const inInspectionData = inInspectionResponse.data as INInspectionEntity[];
			this.inInspections.set(inInspectionData);


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
    this.iNResultatItemForm.formGroup.setErrors([]);

    try {
      await this.iNResultatItemForm.create();
      this.router.navigate([`/in-resultat-items`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
