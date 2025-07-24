import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { INPlanificationService } from '../services/in-planification.service';
import { INPlanificationEntity } from '../in-planification.entity';
import { RCEnginFlottantEntity } from '../../../RC/rc-engin-flottant/rc-engin-flottant.entity';
import { INChecklistEntity } from '../../../IN/in-checklist/in-checklist.entity';


@Component({
  standalone: true,
  selector: 'app-in-planification-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './in-planification-form.component.html',
  styleUrl: './in-planification-form.component.css'
})
export class INPlanificationFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      rc_engin_flottant_id: new FormControl('', []),
			in_checklist_id: new FormControl('', []),
			periodicite_jours: new FormControl('', []),
			prochaine_date: new FormControl('', []),

    }
  );

  @Input() rcEnginFlottants!: RCEnginFlottantEntity[];
	@Input() inChecklists!: INChecklistEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected iNPlanificationService: INPlanificationService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      rc_engin_flottant_id: this.formGroup.value.rc_engin_flottant_id,
			in_checklist_id: this.formGroup.value.in_checklist_id,
			periodicite_jours: this.formGroup.value.periodicite_jours,
			prochaine_date: this.formGroup.value.prochaine_date,

    }

    return this.iNPlanificationService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      rc_engin_flottant_id: this.formGroup.value.rc_engin_flottant_id,
			in_checklist_id: this.formGroup.value.in_checklist_id,
			periodicite_jours: this.formGroup.value.periodicite_jours,
			prochaine_date: this.formGroup.value.prochaine_date,

    }

    return this.iNPlanificationService.update(id, JSON.stringify(payload)
    )
  }

  fill(iNPlanification: INPlanificationEntity) {
    this.formGroup.patchValue({
      rc_engin_flottant_id: iNPlanification.rc_engin_flottant_id,
			in_checklist_id: iNPlanification.in_checklist_id,
			periodicite_jours: iNPlanification.periodicite_jours,
			prochaine_date: iNPlanification.prochaine_date,

    })
  }

  empty() {
    this.formGroup.patchValue({
      rc_engin_flottant_id: '',
			in_checklist_id: '',
			periodicite_jours: '',
			prochaine_date: '',

    })
  }
}
