import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCPortFormComponent } from '../forms/rc-port-form.component';
import { RCPortService } from '../services/rc-port.service';
import { RCPaysService } from '../../../RC/rc-pays/services/rc-pays.service';
import { RCPaysEntity } from '../../../RC/rc-pays/rc-pays.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-port-create',
  imports: [
    ErrorMessagesComponent,
    RCPortFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-port-create.component.html',
  styleUrl: './rc-port-create.component.css'
})
export class RCPortCreateComponent {

  @ViewChild(RCPortFormComponent) rCPortForm!: RCPortFormComponent;

  rcPayss = signal<RCPaysEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCPortService: RCPortService,
    protected rcPaysService: RCPaysService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
      const rcPaysResponse = await this.rcPaysService.getAll({page: ''});
			const rcPaysData = rcPaysResponse.data as RCPaysEntity[];
			this.rcPayss.set(rcPaysData);


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
    this.rCPortForm.formGroup.setErrors([]);

    try {
      await this.rCPortForm.create();
      this.router.navigate([`/rc-ports`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
