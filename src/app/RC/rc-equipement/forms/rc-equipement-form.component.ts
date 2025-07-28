import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RCEquipementService } from '../services/rc-equipement.service';
import { RCEquipementEntity } from '../rc-equipement.entity';
import { RCEnginFlottantEntity } from '../../rc-engin-flottant/rc-engin-flottant.entity';


@Component({
  standalone: true,
  selector: 'app-rc-equipement-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './rc-equipement-form.component.html',
  styleUrl: './rc-equipement-form.component.css'
})
export class RCEquipementFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      rc_engin_flottant_id: new FormControl('', []),
			nom: new FormControl(undefined, []),
			type: new FormControl(undefined, []),
			numero_serie: new FormControl(undefined, []),
			date_installation: new FormControl(undefined, []),

    }
  );

  @Input() rcEnginFlottants!: RCEnginFlottantEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected rCEquipementService: RCEquipementService) {}

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
			nom: this.formGroup.value.nom,
			type: this.formGroup.value.type,
			numero_serie: this.formGroup.value.numero_serie,
			date_installation: this.formGroup.value.date_installation,

    }

    return this.rCEquipementService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      rc_engin_flottant_id: this.formGroup.value.rc_engin_flottant_id,
			nom: this.formGroup.value.nom,
			type: this.formGroup.value.type,
			numero_serie: this.formGroup.value.numero_serie,
			date_installation: this.formGroup.value.date_installation,

    }

    return this.rCEquipementService.update(id, JSON.stringify(payload)
    )
  }

  fill(rCEquipement: RCEquipementEntity) {
    this.formGroup.patchValue({
      rc_engin_flottant_id: rCEquipement.rc_engin_flottant_id,
			nom: rCEquipement.nom,
			type: rCEquipement.type,
			numero_serie: rCEquipement.numero_serie,
			date_installation: rCEquipement.date_installation,

    })
  }

  empty() {
    this.formGroup.patchValue({
      rc_engin_flottant_id: '',
			nom: '',
			type: '',
			numero_serie: '',
			date_installation: '',

    })
  }
}
