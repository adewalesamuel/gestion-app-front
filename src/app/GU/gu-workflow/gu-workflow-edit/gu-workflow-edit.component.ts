import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GUWorkflowFormComponent } from '../forms/gu-workflow-form.component';
import { GUWorkflowService } from '../services/gu-workflow.service';
import { GUWorkflowEntity } from '../gu-workflow.entity';
import { RoleService } from '../../../common-features/role/services/role.service';
import { RoleEntity } from '../../../common-features/role/role.entity';
import { GUTypeDemandeService } from '../../../GU/gu-type-demande/services/gu-type-demande.service';
import { GUTypeDemandeEntity } from '../../../GU/gu-type-demande/gu-type-demande.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-gu-workflow-edit',
  imports: [
    ErrorMessagesComponent,
    GUWorkflowFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-workflow-edit.component.html',
  styleUrl: './gu-workflow-edit.component.css'
})
export class GUWorkflowEditComponent {
  @ViewChild(GUWorkflowFormComponent) gUWorkflowForm!: GUWorkflowFormComponent;

  id = signal<number>(1);
  gUWorkflow = signal<GUWorkflowEntity|null>(null)
  roles = signal<RoleEntity[]>([]);
	guTypeDemandes = signal<GUTypeDemandeEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUWorkflowService: GUWorkflowService,
    protected roleService: RoleService,
		protected guTypeDemandeService: GUTypeDemandeService,

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
      const gUWorkflowResponse = await this.gUWorkflowService.getById(this.id())
      const gUWorkflowData = gUWorkflowResponse.data as GUWorkflowEntity;

      this.gUWorkflow.set(gUWorkflowData);
      this.gUWorkflowForm.fill(gUWorkflowData);

      const roleResponse = await this.roleService.getAll({page: ''});
			const roleData = roleResponse.data as RoleEntity[];
			this.roles.set(roleData);

			const guTypeDemandeResponse = await this.guTypeDemandeService.getAll({page: ''});
			const guTypeDemandeData = guTypeDemandeResponse.data as GUTypeDemandeEntity[];
			this.guTypeDemandes.set(guTypeDemandeData);


    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.gUWorkflowForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.gUWorkflowForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
