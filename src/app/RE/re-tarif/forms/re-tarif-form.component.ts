import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RETarifService } from '../services/re-tarif.service';
import { RETarifEntity } from '../re-tarif.entity';
import { CONSTS } from '../../../constants';


@Component({
  standalone: true,
  selector: 'app-re-tarif-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './re-tarif-form.component.html',
  styleUrl: './re-tarif-form.component.css'
})
export class RETarifFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      service: new FormControl(undefined, []),
			montant: new FormControl(undefined, []),
			devise: new FormControl(undefined, []),
			frequence: new FormControl(undefined, []),
			type_acteur: new FormControl(undefined, []),

    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  readonly TARIF_FREQUENCES = Object.values(CONSTS.FEATURES.TARIF_FREQUENCE);

  constructor(protected RETarifService: RETarifService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      service: this.formGroup.value.service,
			montant: this.formGroup.value.montant,
			devise: this.formGroup.value.devise,
			frequence: this.formGroup.value.frequence,
			type_acteur: this.formGroup.value.type_acteur,

    }

    return this.RETarifService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      service: this.formGroup.value.service,
			montant: this.formGroup.value.montant,
			devise: this.formGroup.value.devise,
			frequence: this.formGroup.value.frequence,
			type_acteur: this.formGroup.value.type_acteur,

    }

    return this.RETarifService.update(id, JSON.stringify(payload)
    )
  }

  fill(rETarif: RETarifEntity) {
    this.formGroup.patchValue({
      service: rETarif.service,
			montant: rETarif.montant,
			devise: rETarif.devise,
			frequence: rETarif.frequence,
			type_acteur: rETarif.type_acteur,

    })
  }

  empty() {
    this.formGroup.patchValue({
      service: '',
			montant: '',
			devise: '',
			frequence: '',
			type_acteur: '',

    })
  }
}
