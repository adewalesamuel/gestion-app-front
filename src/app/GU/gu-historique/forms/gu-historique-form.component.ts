import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GUHistoriqueService } from '../services/gu-historique.service';
import { GUHistoriqueEntity } from '../gu-historique.entity';
import { UserEntity } from '../../../common-features/user/user.entity';
import { GUDemandeEntity } from '../../../GU/gu-demande/gu-demande.entity';


@Component({
  standalone: true,
  selector: 'app-gu-historique-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './gu-historique-form.component.html',
  styleUrl: './gu-historique-form.component.css'
})
export class GUHistoriqueFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      user_id: new FormControl('', []),
			gu_demande_id: new FormControl('', []),
			action: new FormControl('', []),
			details: new FormControl('', []),
			date: new FormControl('', []),
			heure: new FormControl('', []),

    }
  );

  @Input() users!: UserEntity[];
	@Input() guDemandes!: GUDemandeEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected gUHistoriqueService: GUHistoriqueService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      user_id: this.formGroup.value.user_id,
			gu_demande_id: this.formGroup.value.gu_demande_id,
			action: this.formGroup.value.action,
			details: this.formGroup.value.details,
			date: this.formGroup.value.date,
			heure: this.formGroup.value.heure,

    }

    return this.gUHistoriqueService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      user_id: this.formGroup.value.user_id,
			gu_demande_id: this.formGroup.value.gu_demande_id,
			action: this.formGroup.value.action,
			details: this.formGroup.value.details,
			date: this.formGroup.value.date,
			heure: this.formGroup.value.heure,

    }

    return this.gUHistoriqueService.update(id, JSON.stringify(payload)
    )
  }

  fill(gUHistorique: GUHistoriqueEntity) {
    this.formGroup.patchValue({
      user_id: gUHistorique.user_id,
			gu_demande_id: gUHistorique.gu_demande_id,
			action: gUHistorique.action,
			details: gUHistorique.details,
			date: gUHistorique.date,
			heure: gUHistorique.heure,

    })
  }

  empty() {
    this.formGroup.patchValue({
      user_id: '',
			gu_demande_id: '',
			action: '',
			details: '',
			date: '',
			heure: '',

    })
  }
}
