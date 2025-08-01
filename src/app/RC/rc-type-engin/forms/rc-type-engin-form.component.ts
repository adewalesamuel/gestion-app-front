import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RCTypeEnginService } from '../services/rc-type-engin.service';
import { RCTypeEnginEntity } from '../rc-type-engin.entity';
import { CONSTS } from '../../../constants';


@Component({
  standalone: true,
  selector: 'app-rc-type-engin-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './rc-type-engin-form.component.html',
  styleUrl: './rc-type-engin-form.component.css'
})
export class RCTypeEnginFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      code: new FormControl(undefined, []),
			libelle: new FormControl(undefined, []),
			categorie: new FormControl(undefined, []),
			tonnage_min: new FormControl(undefined, []),
			tonnage_max: new FormControl(undefined, []),

    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  readonly TYPE_ENGIN_CATEGORIES = Object.values(CONSTS.FEATURES.TYPE_ENGIN_CATEGORIE);

  constructor(protected rCTypeEnginService: RCTypeEnginService) {}

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
			categorie: this.formGroup.value.categorie,
			tonnage_min: this.formGroup.value.tonnage_min,
			tonnage_max: this.formGroup.value.tonnage_max,

    }

    return this.rCTypeEnginService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      code: this.formGroup.value.code,
			libelle: this.formGroup.value.libelle,
			categorie: this.formGroup.value.categorie,
			tonnage_min: this.formGroup.value.tonnage_min,
			tonnage_max: this.formGroup.value.tonnage_max,

    }

    return this.rCTypeEnginService.update(id, JSON.stringify(payload)
    )
  }

  fill(rCTypeEngin: RCTypeEnginEntity) {
    this.formGroup.patchValue({
      code: rCTypeEngin.code,
			libelle: rCTypeEngin.libelle,
			categorie: rCTypeEngin.categorie,
			tonnage_min: rCTypeEngin.tonnage_min,
			tonnage_max: rCTypeEngin.tonnage_max,

    })
  }

  empty() {
    this.formGroup.patchValue({
      code: '',
			libelle: '',
			categorie: '',
			tonnage_min: '',
			tonnage_max: '',

    })
  }
}
