import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RERemiseService } from '../services/re-remise.service';
import { RERemiseEntity } from '../re-remise.entity';
import { REOrdreRecetteEntity } from '../../../RE/re-ordre-recette/re-ordre-recette.entity';
import { UserEntity } from '../../../common-features/user/user.entity';


@Component({
  standalone: true,
  selector: 'app-re-remise-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './re-remise-form.component.html',
  styleUrl: './re-remise-form.component.css'
})
export class RERemiseFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      re_ordre_recette_id: new FormControl('', []),
			user_id: new FormControl('', []),
			montant: new FormControl('', []),
			pourcentage: new FormControl('', []),
			raison: new FormControl('', []),

    }
  );

  @Input() reOrdreRecettes!: REOrdreRecetteEntity[];
	@Input() users!: UserEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected rERemiseService: RERemiseService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      re_ordre_recette_id: this.formGroup.value.re_ordre_recette_id,
			user_id: this.formGroup.value.user_id,
			montant: this.formGroup.value.montant,
			pourcentage: this.formGroup.value.pourcentage,
			raison: this.formGroup.value.raison,

    }

    return this.rERemiseService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      re_ordre_recette_id: this.formGroup.value.re_ordre_recette_id,
			user_id: this.formGroup.value.user_id,
			montant: this.formGroup.value.montant,
			pourcentage: this.formGroup.value.pourcentage,
			raison: this.formGroup.value.raison,

    }

    return this.rERemiseService.update(id, JSON.stringify(payload)
    )
  }

  fill(rERemise: RERemiseEntity) {
    this.formGroup.patchValue({
      re_ordre_recette_id: rERemise.re_ordre_recette_id,
			user_id: rERemise.user_id,
			montant: rERemise.montant,
			pourcentage: rERemise.pourcentage,
			raison: rERemise.raison,

    })
  }

  empty() {
    this.formGroup.patchValue({
      re_ordre_recette_id: '',
			user_id: '',
			montant: '',
			pourcentage: '',
			raison: '',

    })
  }
}
