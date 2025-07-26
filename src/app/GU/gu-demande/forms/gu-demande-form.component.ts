import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GUDemandeService } from '../services/gu-demande.service';
import { GUDemandeEntity } from '../gu-demande.entity';
import { GUTypeDemandeEntity } from '../../../GU/gu-type-demande/gu-type-demande.entity';
import { GUStatutDemandeEntity } from '../../../GU/gu-statut-demande/gu-statut-demande.entity';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';
import { RCEnginFlottantEntity } from '../../../RC/rc-engin-flottant/rc-engin-flottant.entity';


@Component({
  standalone: true,
  selector: 'app-gu-demande-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './gu-demande-form.component.html',
  styleUrl: './gu-demande-form.component.css'
})
export class GUDemandeFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      gu_type_demande_id: new FormControl('', []),
			gu_statut_demande_id: new FormControl('', []),
			rc_acteur_id: new FormControl('', []),
			rc_engin_flottant_id: new FormControl('', []),
			reference: new FormControl(undefined, []),
			date_depot: new FormControl(undefined, []),
			heure: new FormControl(undefined, []),
			date_traitement: new FormControl(undefined, []),
			date_expiration: new FormControl(undefined, []),
			fichiers_joints: new FormControl(undefined, []),

    }
  );

  @Input() guTypeDemandes!: GUTypeDemandeEntity[];
	@Input() guStatutDemandes!: GUStatutDemandeEntity[];
	@Input() rcActeurs!: RCActeurEntity[];
	@Input() rcEnginFlottants!: RCEnginFlottantEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected gUDemandeService: GUDemandeService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      gu_type_demande_id: this.formGroup.value.gu_type_demande_id,
			gu_statut_demande_id: this.formGroup.value.gu_statut_demande_id,
			rc_acteur_id: this.formGroup.value.rc_acteur_id,
			rc_engin_flottant_id: this.formGroup.value.rc_engin_flottant_id,
			reference: this.formGroup.value.reference,
			date_depot: this.formGroup.value.date_depot,
			heure: this.formGroup.value.heure,
			date_traitement: this.formGroup.value.date_traitement,
			date_expiration: this.formGroup.value.date_expiration,
			fichiers_joints: this.formGroup.value.fichiers_joints,

    }

    return this.gUDemandeService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      gu_type_demande_id: this.formGroup.value.gu_type_demande_id,
			gu_statut_demande_id: this.formGroup.value.gu_statut_demande_id,
			rc_acteur_id: this.formGroup.value.rc_acteur_id,
			rc_engin_flottant_id: this.formGroup.value.rc_engin_flottant_id,
			reference: this.formGroup.value.reference,
			date_depot: this.formGroup.value.date_depot,
			heure: this.formGroup.value.heure,
			date_traitement: this.formGroup.value.date_traitement,
			date_expiration: this.formGroup.value.date_expiration,
			fichiers_joints: this.formGroup.value.fichiers_joints,

    }

    return this.gUDemandeService.update(id, JSON.stringify(payload)
    )
  }

  fill(gUDemande: GUDemandeEntity) {
    this.formGroup.patchValue({
      gu_type_demande_id: gUDemande.gu_type_demande_id,
			gu_statut_demande_id: gUDemande.gu_statut_demande_id,
			rc_acteur_id: gUDemande.rc_acteur_id,
			rc_engin_flottant_id: gUDemande.rc_engin_flottant_id,
			reference: gUDemande.reference,
			date_depot: gUDemande.date_depot,
			heure: gUDemande.heure,
			date_traitement: gUDemande.date_traitement,
			date_expiration: gUDemande.date_expiration,
			fichiers_joints: gUDemande.fichiers_joints,

    })
  }

  empty() {
    this.formGroup.patchValue({
      gu_type_demande_id: '',
			gu_statut_demande_id: '',
			rc_acteur_id: '',
			rc_engin_flottant_id: '',
			reference: '',
			date_depot: '',
			heure: '',
			date_traitement: '',
			date_expiration: '',
			fichiers_joints: '',

    })
  }
}
