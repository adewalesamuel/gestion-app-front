import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { INInspectionService } from '../services/in-inspection.service';
import { INInspectionEntity } from '../in-inspection.entity';
import { INTypeControleEntity } from '../../../IN/in-type-controle/in-type-controle.entity';
import { INEquipeInspectionEntity } from '../../../IN/in-equipe-inspection/in-equipe-inspection.entity';
import { RCEnginFlottantEntity } from '../../../RC/rc-engin-flottant/rc-engin-flottant.entity';
import { UserEntity } from '../../../common-features/user/user.entity';
import { CONSTS } from '../../../constants';


@Component({
  standalone: true,
  selector: 'app-in-inspection-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './in-inspection-form.component.html',
  styleUrl: './in-inspection-form.component.css'
})
export class INInspectionFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      in_type_controle_id: new FormControl('', []),
			in_equipe_inspection_id: new FormControl('', []),
			rc_engin_flottant_id: new FormControl('', []),
			user_id: new FormControl('', []),
			reference: new FormControl('', []),
			date_planifiee: new FormControl('', []),
			heure: new FormControl('', []),
			date_reelle: new FormControl('', []),
			statut: new FormControl('', []),
			resultat: new FormControl('', []),

    }
  );

  @Input() inTypeControles!: INTypeControleEntity[];
	@Input() inEquipeInspections!: INEquipeInspectionEntity[];
	@Input() rcEnginFlottants!: RCEnginFlottantEntity[];
	@Input() users!: UserEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  readonly INSPECTION_STATUTS = Object.values(CONSTS.FEATURES.INSPECTION_STATUT);
  readonly INSPECTION_RESULTATS = Object.values(CONSTS.FEATURES.INSPECTION_RESULTAT);
  
  constructor(protected iNInspectionService: INInspectionService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      in_type_controle_id: this.formGroup.value.in_type_controle_id,
			in_equipe_inspection_id: this.formGroup.value.in_equipe_inspection_id,
			rc_engin_flottant_id: this.formGroup.value.rc_engin_flottant_id,
			user_id: this.formGroup.value.user_id,
			reference: this.formGroup.value.reference,
			date_planifiee: this.formGroup.value.date_planifiee,
			heure: this.formGroup.value.heure,
			date_reelle: this.formGroup.value.date_reelle,
			statut: this.formGroup.value.statut,
			resultat: this.formGroup.value.resultat,

    }

    return this.iNInspectionService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      in_type_controle_id: this.formGroup.value.in_type_controle_id,
			in_equipe_inspection_id: this.formGroup.value.in_equipe_inspection_id,
			rc_engin_flottant_id: this.formGroup.value.rc_engin_flottant_id,
			user_id: this.formGroup.value.user_id,
			reference: this.formGroup.value.reference,
			date_planifiee: this.formGroup.value.date_planifiee,
			heure: this.formGroup.value.heure,
			date_reelle: this.formGroup.value.date_reelle,
			statut: this.formGroup.value.statut,
			resultat: this.formGroup.value.resultat,

    }

    return this.iNInspectionService.update(id, JSON.stringify(payload)
    )
  }

  fill(iNInspection: INInspectionEntity) {
    this.formGroup.patchValue({
      in_type_controle_id: iNInspection.in_type_controle_id,
			in_equipe_inspection_id: iNInspection.in_equipe_inspection_id,
			rc_engin_flottant_id: iNInspection.rc_engin_flottant_id,
			user_id: iNInspection.user_id,
			reference: iNInspection.reference,
			date_planifiee: iNInspection.date_planifiee,
			heure: iNInspection.heure,
			date_reelle: iNInspection.date_reelle,
			statut: iNInspection.statut,
			resultat: iNInspection.resultat,

    })
  }

  empty() {
    this.formGroup.patchValue({
      in_type_controle_id: '',
			in_equipe_inspection_id: '',
			rc_engin_flottant_id: '',
			user_id: '',
			reference: '',
			date_planifiee: '',
			heure: '',
			date_reelle: '',
			statut: '',
			resultat: '',

    })
  }
}
