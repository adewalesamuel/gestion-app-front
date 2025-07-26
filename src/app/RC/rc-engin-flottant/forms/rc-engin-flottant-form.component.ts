import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RCEnginFlottantService } from '../services/rc-engin-flottant.service';
import { RCEnginFlottantEntity } from '../rc-engin-flottant.entity';
import { RCTypeEnginEntity } from '../../../RC/rc-type-engin/rc-type-engin.entity';
import { RCPaysEntity } from '../../../RC/rc-pays/rc-pays.entity';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';


@Component({
  standalone: true,
  selector: 'app-rc-engin-flottant-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './rc-engin-flottant-form.component.html',
  styleUrl: './rc-engin-flottant-form.component.css'
})
export class RCEnginFlottantFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      rc_type_engin_id: new FormControl('', []),
			rc_pays_id: new FormControl('', []),
			rc_acteur_id: new FormControl('', []),
			nom: new FormControl(undefined, []),
			immatriculation: new FormControl(undefined, []),
			tonnage_brut: new FormControl(undefined, []),
			longueur: new FormControl(undefined, []),
			annee_construction: new FormControl(undefined, []),
			capacite_passagers: new FormControl(undefined, []),
			capacite_fret: new FormControl(undefined, []),

    }
  );

  @Input() rcTypeEngins!: RCTypeEnginEntity[];
	@Input() rcPayss!: RCPaysEntity[];
	@Input() rcActeurs!: RCActeurEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected rCEnginFlottantService: RCEnginFlottantService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      rc_type_engin_id: this.formGroup.value.rc_type_engin_id,
			rc_pays_id: this.formGroup.value.rc_pays_id,
			rc_acteur_id: this.formGroup.value.rc_acteur_id,
			nom: this.formGroup.value.nom,
			immatriculation: this.formGroup.value.immatriculation,
			tonnage_brut: this.formGroup.value.tonnage_brut,
			longueur: this.formGroup.value.longueur,
			annee_construction: this.formGroup.value.annee_construction,
			capacite_passagers: this.formGroup.value.capacite_passagers,
			capacite_fret: this.formGroup.value.capacite_fret,

    }

    return this.rCEnginFlottantService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      rc_type_engin_id: this.formGroup.value.rc_type_engin_id,
			rc_pays_id: this.formGroup.value.rc_pays_id,
			rc_acteur_id: this.formGroup.value.rc_acteur_id,
			nom: this.formGroup.value.nom,
			immatriculation: this.formGroup.value.immatriculation,
			tonnage_brut: this.formGroup.value.tonnage_brut,
			longueur: this.formGroup.value.longueur,
			annee_construction: this.formGroup.value.annee_construction,
			capacite_passagers: this.formGroup.value.capacite_passagers,
			capacite_fret: this.formGroup.value.capacite_fret,

    }

    return this.rCEnginFlottantService.update(id, JSON.stringify(payload)
    )
  }

  fill(rCEnginFlottant: RCEnginFlottantEntity) {
    this.formGroup.patchValue({
      rc_type_engin_id: rCEnginFlottant.rc_type_engin_id,
			rc_pays_id: rCEnginFlottant.rc_pays_id,
			rc_acteur_id: rCEnginFlottant.rc_acteur_id,
			nom: rCEnginFlottant.nom,
			immatriculation: rCEnginFlottant.immatriculation,
			tonnage_brut: rCEnginFlottant.tonnage_brut,
			longueur: rCEnginFlottant.longueur,
			annee_construction: rCEnginFlottant.annee_construction,
			capacite_passagers: rCEnginFlottant.capacite_passagers,
			capacite_fret: rCEnginFlottant.capacite_fret,

    })
  }

  empty() {
    this.formGroup.patchValue({
      rc_type_engin_id: '',
			rc_pays_id: '',
			rc_acteur_id: '',
			nom: '',
			immatriculation: '',
			tonnage_brut: '',
			longueur: '',
			annee_construction: '',
			capacite_passagers: '',
			capacite_fret: '',

    })
  }
}
