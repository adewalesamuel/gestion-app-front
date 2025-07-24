import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INResultatItemFormComponent } from '../forms/in-resultat-item-form.component';
import { INResultatItemService } from '../services/in-resultat-item.service';
import { INResultatItemEntity } from '../in-resultat-item.entity';
import { INInspectionService } from '../../../IN/in-inspection/services/in-inspection.service';
import { INInspectionEntity } from '../../../IN/in-inspection/in-inspection.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-in-resultat-item-edit',
  imports: [
    ErrorMessagesComponent,
    INResultatItemFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-resultat-item-edit.component.html',
  styleUrl: './in-resultat-item-edit.component.css'
})
export class INResultatItemEditComponent {
  @ViewChild(INResultatItemFormComponent) iNResultatItemForm!: INResultatItemFormComponent;

  id = signal<number>(1);
  iNResultatItem = signal<INResultatItemEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const iNResultatItemResponse = await this.iNResultatItemService.getById(this.id())
      const iNResultatItemData = iNResultatItemResponse.data as INResultatItemEntity;

      this.iNResultatItem.set(iNResultatItemData);
      this.iNResultatItemForm.fill(iNResultatItemData);

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

    this.isLoading.set(true);
    this.iNResultatItemForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.iNResultatItemForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
