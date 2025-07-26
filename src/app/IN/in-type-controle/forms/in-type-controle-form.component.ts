import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { INTypeControleService } from '../services/in-type-controle.service';
import { INTypeControleEntity } from '../in-type-controle.entity';
import { CONSTS } from '../../../constants';


@Component({
  standalone: true,
  selector: 'app-in-type-controle-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './in-type-controle-form.component.html',
  styleUrl: './in-type-controle-form.component.css'
})
export class INTypeControleFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      code: new FormControl(undefined, []),
			libelle: new FormControl(undefined, []),
			norme_reference: new FormControl(undefined, []),
			frequence_mois: new FormControl(undefined, []),
			gravite_min: new FormControl(undefined, []),

    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  readonly TYPE_CONTROLE_GRAVITE_MINS = Object.values(CONSTS.FEATURES.TYPE_CONTROLE_GRAVITE_MIN);

  constructor(protected iNTypeControleService: INTypeControleService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      code: this.formGroup.value.code,
			libelle: this.formGroup.value.libelle,
			norme_reference: this.formGroup.value.norme_reference,
			frequence_mois: this.formGroup.value.frequence_mois,
			gravite_min: this.formGroup.value.gravite_min,

    }

    return this.iNTypeControleService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      code: this.formGroup.value.code,
			libelle: this.formGroup.value.libelle,
			norme_reference: this.formGroup.value.norme_reference,
			frequence_mois: this.formGroup.value.frequence_mois,
			gravite_min: this.formGroup.value.gravite_min,

    }

    return this.iNTypeControleService.update(id, JSON.stringify(payload)
    )
  }

  fill(iNTypeControle: INTypeControleEntity) {
    this.formGroup.patchValue({
      code: iNTypeControle.code,
			libelle: iNTypeControle.libelle,
			norme_reference: iNTypeControle.norme_reference,
			frequence_mois: iNTypeControle.frequence_mois,
			gravite_min: iNTypeControle.gravite_min,

    })
  }

  empty() {
    this.formGroup.patchValue({
      code: '',
			libelle: '',
			norme_reference: '',
			frequence_mois: '',
			gravite_min: '',

    })
  }
}
