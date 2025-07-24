import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCPortFormComponent } from '../forms/rc-port-form.component';
import { RCPortService } from '../services/rc-port.service';
import { RCPortEntity } from '../rc-port.entity';
import { RCPaysService } from '../../../RC/rc-pays/services/rc-pays.service';
import { RCPaysEntity } from '../../../RC/rc-pays/rc-pays.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-port-edit',
  imports: [
    ErrorMessagesComponent,
    RCPortFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-port-edit.component.html',
  styleUrl: './rc-port-edit.component.css'
})
export class RCPortEditComponent {
  @ViewChild(RCPortFormComponent) rCPortForm!: RCPortFormComponent;

  id = signal<number>(1);
  rCPort = signal<RCPortEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const rCPortResponse = await this.rCPortService.getById(this.id())
      const rCPortData = rCPortResponse.data as RCPortEntity;

      this.rCPort.set(rCPortData);
      this.rCPortForm.fill(rCPortData);

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

    this.isLoading.set(true);
    this.rCPortForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rCPortForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
