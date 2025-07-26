import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { REHistoriqueRelanceService } from '../services/re-historique-relance.service';
import { REHistoriqueRelanceEntity } from '../re-historique-relance.entity';
import { RERelanceEntity } from '../../../RE/re-relance/re-relance.entity';
import { UserEntity } from '../../../common-features/user/user.entity';
import { CONSTS } from '../../../constants';


@Component({
  standalone: true,
  selector: 'app-re-historique-relance-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './re-historique-relance-form.component.html',
  styleUrl: './re-historique-relance-form.component.css'
})
export class REHistoriqueRelanceFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      re_relance_id: new FormControl('', []),
			user_id: new FormControl('', []),
			date: new FormControl('', []),
			heure: new FormControl('', []),
			mode: new FormControl('', []),
			contenu: new FormControl('', []),

    }
  );

  @Input() reRelances!: RERelanceEntity[];
	@Input() users!: UserEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  readonly HISTORIQUE_RELANCE_MODES = Object.values(CONSTS.FEATURES.HISTORIQUE_RELANCE_MODE);

  constructor(protected rEHistoriqueRelanceService: REHistoriqueRelanceService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      re_relance_id: this.formGroup.value.re_relance_id,
			user_id: this.formGroup.value.user_id,
			date: this.formGroup.value.date,
			heure: this.formGroup.value.heure,
			mode: this.formGroup.value.mode,
			contenu: this.formGroup.value.contenu,

    }

    return this.rEHistoriqueRelanceService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      re_relance_id: this.formGroup.value.re_relance_id,
			user_id: this.formGroup.value.user_id,
			date: this.formGroup.value.date,
			heure: this.formGroup.value.heure,
			mode: this.formGroup.value.mode,
			contenu: this.formGroup.value.contenu,

    }

    return this.rEHistoriqueRelanceService.update(id, JSON.stringify(payload)
    )
  }

  fill(rEHistoriqueRelance: REHistoriqueRelanceEntity) {
    this.formGroup.patchValue({
      re_relance_id: rEHistoriqueRelance.re_relance_id,
			user_id: rEHistoriqueRelance.user_id,
			date: rEHistoriqueRelance.date,
			heure: rEHistoriqueRelance.heure,
			mode: rEHistoriqueRelance.mode,
			contenu: rEHistoriqueRelance.contenu,

    })
  }

  empty() {
    this.formGroup.patchValue({
      re_relance_id: '',
			user_id: '',
			date: '',
			heure: '',
			mode: '',
			contenu: '',

    })
  }
}
