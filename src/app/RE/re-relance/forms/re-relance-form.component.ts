import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RERelanceService } from '../services/re-relance.service';
import { RERelanceEntity } from '../re-relance.entity';
import { REOrdreRecetteEntity } from '../../../RE/re-ordre-recette/re-ordre-recette.entity';
import { UserEntity } from '../../../common-features/user/user.entity';
import { CONSTS } from '../../../constants';


@Component({
  standalone: true,
  selector: 'app-re-relance-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './re-relance-form.component.html',
  styleUrl: './re-relance-form.component.css'
})
export class RERelanceFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      re_ordre_recette_id: new FormControl('', []),
			user_id: new FormControl('', []),
			date: new FormControl('', []),
			heure: new FormControl('', []),
			mode: new FormControl('', []),
			statut: new FormControl('', []),

    }
  );

  @Input() reOrdreRecettes!: REOrdreRecetteEntity[];
	@Input() users!: UserEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  readonly RELANCE_MODES = Object.values(CONSTS.FEATURES.RELANCE_MODE);
  readonly RELANCE_STATUTS = Object.values(CONSTS.FEATURES.RELANCE_STATUT);
  
  constructor(protected rERelanceService: RERelanceService) {}

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
			date: this.formGroup.value.date,
			heure: this.formGroup.value.heure,
			mode: this.formGroup.value.mode,
			statut: this.formGroup.value.statut,

    }

    return this.rERelanceService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      re_ordre_recette_id: this.formGroup.value.re_ordre_recette_id,
			user_id: this.formGroup.value.user_id,
			date: this.formGroup.value.date,
			heure: this.formGroup.value.heure,
			mode: this.formGroup.value.mode,
			statut: this.formGroup.value.statut,

    }

    return this.rERelanceService.update(id, JSON.stringify(payload)
    )
  }

  fill(rERelance: RERelanceEntity) {
    this.formGroup.patchValue({
      re_ordre_recette_id: rERelance.re_ordre_recette_id,
			user_id: rERelance.user_id,
			date: rERelance.date,
			heure: rERelance.heure,
			mode: rERelance.mode,
			statut: rERelance.statut,

    })
  }

  empty() {
    this.formGroup.patchValue({
      re_ordre_recette_id: '',
			user_id: '',
			date: '',
			heure: '',
			mode: '',
			statut: '',

    })
  }
}
