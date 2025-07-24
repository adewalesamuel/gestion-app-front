import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCTypeEnginFormComponent } from '../forms/rc-type-engin-form.component';
import { RCTypeEnginService } from '../services/rc-type-engin.service';
import { RCTypeEnginEntity } from '../rc-type-engin.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-type-engin-edit',
  imports: [
    ErrorMessagesComponent,
    RCTypeEnginFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-type-engin-edit.component.html',
  styleUrl: './rc-type-engin-edit.component.css'
})
export class RCTypeEnginEditComponent {
  @ViewChild(RCTypeEnginFormComponent) rCTypeEnginForm!: RCTypeEnginFormComponent;

  id = signal<number>(1);
  rCTypeEngin = signal<RCTypeEnginEntity|null>(null)
  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCTypeEnginService: RCTypeEnginService,
    
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
      const rCTypeEnginResponse = await this.rCTypeEnginService.getById(this.id())
      const rCTypeEnginData = rCTypeEnginResponse.data as RCTypeEnginEntity;

      this.rCTypeEngin.set(rCTypeEnginData);
      this.rCTypeEnginForm.fill(rCTypeEnginData);

      
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.rCTypeEnginForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rCTypeEnginForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}