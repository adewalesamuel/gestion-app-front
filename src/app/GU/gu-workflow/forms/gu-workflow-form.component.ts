import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GUWorkflowService } from '../services/gu-workflow.service';
import { GUWorkflowEntity } from '../gu-workflow.entity';
import { RoleEntity } from '../../../common-features/role/role.entity';
import { GUTypeDemandeEntity } from '../../../GU/gu-type-demande/gu-type-demande.entity';


@Component({
  standalone: true,
  selector: 'app-gu-workflow-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './gu-workflow-form.component.html',
  styleUrl: './gu-workflow-form.component.css'
})
export class GUWorkflowFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      etape: new FormControl('', []),
			ordre: new FormControl('', []),
			role_id: new FormControl('', []),
			gu_type_demande_id: new FormControl('', []),

    }
  );

  @Input() roles!: RoleEntity[];
	@Input() guTypeDemandes!: GUTypeDemandeEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected gUWorkflowService: GUWorkflowService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      etape: this.formGroup.value.etape,
			ordre: this.formGroup.value.ordre,
			role_id: this.formGroup.value.role_id,
			gu_type_demande_id: this.formGroup.value.gu_type_demande_id,

    }

    return this.gUWorkflowService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      etape: this.formGroup.value.etape,
			ordre: this.formGroup.value.ordre,
			role_id: this.formGroup.value.role_id,
			gu_type_demande_id: this.formGroup.value.gu_type_demande_id,

    }

    return this.gUWorkflowService.update(id, JSON.stringify(payload)
    )
  }

  fill(gUWorkflow: GUWorkflowEntity) {
    this.formGroup.patchValue({
      etape: gUWorkflow.etape,
			ordre: gUWorkflow.ordre,
			role_id: gUWorkflow.role_id,
			gu_type_demande_id: gUWorkflow.gu_type_demande_id,

    })
  }

  empty() {
    this.formGroup.patchValue({
      etape: '',
			ordre: '',
			role_id: '',
			gu_type_demande_id: '',

    })
  }
}
