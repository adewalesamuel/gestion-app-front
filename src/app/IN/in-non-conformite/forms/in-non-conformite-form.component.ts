import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { INNonConformiteService } from '../services/in-non-conformite.service';
import { INNonConformiteEntity } from '../in-non-conformite.entity';
import { INInspectionEntity } from '../../../IN/in-inspection/in-inspection.entity';
import { UserEntity } from '../../../common-features/user/user.entity';
import { CONSTS } from '../../../constants';


@Component({
  standalone: true,
  selector: 'app-in-non-conformite-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './in-non-conformite-form.component.html',
  styleUrl: './in-non-conformite-form.component.css'
})
export class INNonConformiteFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      in_inspection_id: new FormControl('', []),
			user_id: new FormControl('', []),
			description: new FormControl(undefined, []),
			gravite: new FormControl(undefined, []),
			date_decouverte: new FormControl(undefined, []),
			heure: new FormControl(undefined, []),
			date_resolution: new FormControl(undefined, []),
			statut: new FormControl(undefined, []),

    }
  );

  @Input() inInspections!: INInspectionEntity[];
	@Input() users!: UserEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  readonly NON_CONFORMITE_GRAVITES = Object.values(CONSTS.FEATURES.NON_CONFORMITE_GRAVITE);
  readonly NON_CONFORMITE_STATUTS = Object.values(CONSTS.FEATURES.NON_CONFORMITE_STATUT);

  constructor(protected iNNonConformiteService: INNonConformiteService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      in_inspection_id: this.formGroup.value.in_inspection_id,
			user_id: this.formGroup.value.user_id,
			description: this.formGroup.value.description,
			gravite: this.formGroup.value.gravite,
			date_decouverte: this.formGroup.value.date_decouverte,
			heure: this.formGroup.value.heure,
			date_resolution: this.formGroup.value.date_resolution,
			statut: this.formGroup.value.statut,

    }

    return this.iNNonConformiteService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      in_inspection_id: this.formGroup.value.in_inspection_id,
			user_id: this.formGroup.value.user_id,
			description: this.formGroup.value.description,
			gravite: this.formGroup.value.gravite,
			date_decouverte: this.formGroup.value.date_decouverte,
			heure: this.formGroup.value.heure,
			date_resolution: this.formGroup.value.date_resolution,
			statut: this.formGroup.value.statut,

    }

    return this.iNNonConformiteService.update(id, JSON.stringify(payload)
    )
  }

  fill(iNNonConformite: INNonConformiteEntity) {
    this.formGroup.patchValue({
      in_inspection_id: iNNonConformite.in_inspection_id,
			user_id: iNNonConformite.user_id,
			description: iNNonConformite.description,
			gravite: iNNonConformite.gravite,
			date_decouverte: iNNonConformite.date_decouverte,
			heure: iNNonConformite.heure,
			date_resolution: iNNonConformite.date_resolution,
			statut: iNNonConformite.statut,

    })
  }

  empty() {
    this.formGroup.patchValue({
      in_inspection_id: '',
			user_id: '',
			description: '',
			gravite: '',
			date_decouverte: '',
			heure: '',
			date_resolution: '',
			statut: '',

    })
  }
}
