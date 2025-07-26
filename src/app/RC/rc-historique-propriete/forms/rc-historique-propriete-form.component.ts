import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RCHistoriqueProprieteService } from '../services/rc-historique-propriete.service';
import { RCHistoriqueProprieteEntity } from '../rc-historique-propriete.entity';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';
import { RCEnginFlottantEntity } from '../../../RC/rc-engin-flottant/rc-engin-flottant.entity';
import { CONSTS } from '../../../constants';


@Component({
  standalone: true,
  selector: 'app-rc-historique-propriete-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './rc-historique-propriete-form.component.html',
  styleUrl: './rc-historique-propriete-form.component.css'
})
export class RCHistoriqueProprieteFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      rc_acteur_id: new FormControl('', []),
			rc_engin_flottant_id: new FormControl('', []),
			date_debut: new FormControl(undefined, []),
			date_fin: new FormControl(undefined, []),
			type_transaction: new FormControl(undefined, []),

    }
  );

  @Input() rcActeurs!: RCActeurEntity[];
	@Input() rcEnginFlottants!: RCEnginFlottantEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  readonly HISTORIQUE_PROPRIETE_TYPE_TRANSACTIONS = Object.values(CONSTS.FEATURES.HISTORIQUE_PROPRIETE_TYPE_TRANSACTION)

  constructor(protected rCHistoriqueProprieteService: RCHistoriqueProprieteService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      rc_acteur_id: this.formGroup.value.rc_acteur_id,
			rc_engin_flottant_id: this.formGroup.value.rc_engin_flottant_id,
			date_debut: this.formGroup.value.date_debut,
			date_fin: this.formGroup.value.date_fin,
			type_transaction: this.formGroup.value.type_transaction,

    }

    return this.rCHistoriqueProprieteService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      rc_acteur_id: this.formGroup.value.rc_acteur_id,
			rc_engin_flottant_id: this.formGroup.value.rc_engin_flottant_id,
			date_debut: this.formGroup.value.date_debut,
			date_fin: this.formGroup.value.date_fin,
			type_transaction: this.formGroup.value.type_transaction,

    }

    return this.rCHistoriqueProprieteService.update(id, JSON.stringify(payload)
    )
  }

  fill(rCHistoriquePropriete: RCHistoriqueProprieteEntity) {
    this.formGroup.patchValue({
      rc_acteur_id: rCHistoriquePropriete.rc_acteur_id,
			rc_engin_flottant_id: rCHistoriquePropriete.rc_engin_flottant_id,
			date_debut: rCHistoriquePropriete.date_debut,
			date_fin: rCHistoriquePropriete.date_fin,
			type_transaction: rCHistoriquePropriete.type_transaction,

    })
  }

  empty() {
    this.formGroup.patchValue({
      rc_acteur_id: '',
			rc_engin_flottant_id: '',
			date_debut: '',
			date_fin: '',
			type_transaction: '',

    })
  }
}
