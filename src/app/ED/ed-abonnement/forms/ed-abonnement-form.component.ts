import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EDAbonnementService } from '../services/ed-abonnement.service';
import { EDAbonnementEntity } from '../ed-abonnement.entity';
import { EDApiEntity } from '../../../ED/ed-api/ed-api.entity';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';


@Component({
  standalone: true,
  selector: 'app-ed-abonnement-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './ed-abonnement-form.component.html',
  styleUrl: './ed-abonnement-form.component.css'
})
export class EDAbonnementFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      ed_api_id: new FormControl('', []),
			rc_acteur_id: new FormControl('', []),
			nom_client: new FormControl('', []),
			token: new FormControl('', []),
			date_expiration: new FormControl('', []),
			limite_requetes_jour: new FormControl('', []),

    }
  );

  @Input() edApis!: EDApiEntity[];
	@Input() rcActeurs!: RCActeurEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected eDAbonnementService: EDAbonnementService) {}

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
			rc_acteur_id: this.formGroup.value.rc_acteur_id,
			nom_client: this.formGroup.value.nom_client,
			token: this.formGroup.value.token,
			date_expiration: this.formGroup.value.date_expiration,
			limite_requetes_jour: this.formGroup.value.limite_requetes_jour,

    }

    return this.eDAbonnementService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      ed_api_id: this.formGroup.value.ed_api_id,
			rc_acteur_id: this.formGroup.value.rc_acteur_id,
			nom_client: this.formGroup.value.nom_client,
			token: this.formGroup.value.token,
			date_expiration: this.formGroup.value.date_expiration,
			limite_requetes_jour: this.formGroup.value.limite_requetes_jour,

    }

    return this.eDAbonnementService.update(id, JSON.stringify(payload)
    )
  }

  fill(eDAbonnement: EDAbonnementEntity) {
    this.formGroup.patchValue({
      ed_api_id: eDAbonnement.ed_api_id,
			rc_acteur_id: eDAbonnement.rc_acteur_id,
			nom_client: eDAbonnement.nom_client,
			token: eDAbonnement.token,
			date_expiration: eDAbonnement.date_expiration,
			limite_requetes_jour: eDAbonnement.limite_requetes_jour,

    })
  }

  empty() {
    this.formGroup.patchValue({
      ed_api_id: '',
			rc_acteur_id: '',
			nom_client: '',
			token: '',
			date_expiration: '',
			limite_requetes_jour: '',

    })
  }
}
