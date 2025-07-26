import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EDLogEchangeService } from '../services/ed-log-echange.service';
import { EDLogEchangeEntity } from '../ed-log-echange.entity';
import { EDApiEntity } from '../../../ED/ed-api/ed-api.entity';
import { UserEntity } from '../../../common-features/user/user.entity';
import { CONSTS } from '../../../constants';


@Component({
  standalone: true,
  selector: 'app-ed-log-echange-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './ed-log-echange-form.component.html',
  styleUrl: './ed-log-echange-form.component.css'
})
export class EDLogEchangeFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      ed_api_id: new FormControl('', []),
			user_id: new FormControl('', []),
			date_heure: new FormControl('', []),
			heure: new FormControl('', []),
			type_requete: new FormControl('', []),
			endpoint: new FormControl('', []),
			statut_reponse: new FormControl('', []),
			temps_reponse_ms: new FormControl('', []),

    }
  );

  @Input() edApis!: EDApiEntity[];
	@Input() users!: UserEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  readonly LOG_ECHANGE_TYPE_REQUETES = Object.values(CONSTS.FEATURES.LOG_ECHANGE_TYPE_REQUETE);

  constructor(protected eDLogEchangeService: EDLogEchangeService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      ed_api_id: this.formGroup.value.ed_api_id,
			user_id: this.formGroup.value.user_id,
			date_heure: this.formGroup.value.date_heure,
			heure: this.formGroup.value.heure,
			type_requete: this.formGroup.value.type_requete,
			endpoint: this.formGroup.value.endpoint,
			statut_reponse: this.formGroup.value.statut_reponse,
			temps_reponse_ms: this.formGroup.value.temps_reponse_ms,

    }

    return this.eDLogEchangeService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      ed_api_id: this.formGroup.value.ed_api_id,
			user_id: this.formGroup.value.user_id,
			date_heure: this.formGroup.value.date_heure,
			heure: this.formGroup.value.heure,
			type_requete: this.formGroup.value.type_requete,
			endpoint: this.formGroup.value.endpoint,
			statut_reponse: this.formGroup.value.statut_reponse,
			temps_reponse_ms: this.formGroup.value.temps_reponse_ms,

    }

    return this.eDLogEchangeService.update(id, JSON.stringify(payload)
    )
  }

  fill(eDLogEchange: EDLogEchangeEntity) {
    this.formGroup.patchValue({
      ed_api_id: eDLogEchange.ed_api_id,
			user_id: eDLogEchange.user_id,
			date_heure: eDLogEchange.date_heure,
			heure: eDLogEchange.heure,
			type_requete: eDLogEchange.type_requete,
			endpoint: eDLogEchange.endpoint,
			statut_reponse: eDLogEchange.statut_reponse,
			temps_reponse_ms: eDLogEchange.temps_reponse_ms,

    })
  }

  empty() {
    this.formGroup.patchValue({
      ed_api_id: '',
			user_id: '',
			date_heure: '',
			heure: '',
			type_requete: '',
			endpoint: '',
			statut_reponse: '',
			temps_reponse_ms: '',

    })
  }
}
