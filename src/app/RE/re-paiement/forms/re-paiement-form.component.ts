import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { REPaiementService } from '../services/re-paiement.service';
import { REPaiementEntity } from '../re-paiement.entity';
import { REOrdreRecetteEntity } from '../../../RE/re-ordre-recette/re-ordre-recette.entity';
import { UserEntity } from '../../../common-features/user/user.entity';
import { REModePaiementEntity } from '../../../RE/re-mode-paiement/re-mode-paiement.entity';


@Component({
  standalone: true,
  selector: 'app-re-paiement-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './re-paiement-form.component.html',
  styleUrl: './re-paiement-form.component.css'
})
export class REPaiementFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      re_ordre_recette_id: new FormControl('', []),
			user_id: new FormControl('', []),
			re_mode_paiement_id: new FormControl('', []),
			montant: new FormControl('', []),
			devise: new FormControl('', []),
			date_paiement: new FormControl('', []),
			heure: new FormControl('', []),
			reference_transaction: new FormControl('', []),

    }
  );

  @Input() reOrdreRecettes!: REOrdreRecetteEntity[];
	@Input() users!: UserEntity[];
	@Input() reModePaiements!: REModePaiementEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected rEPaiementService: REPaiementService) {}

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
			re_mode_paiement_id: this.formGroup.value.re_mode_paiement_id,
			montant: this.formGroup.value.montant,
			devise: this.formGroup.value.devise,
			date_paiement: this.formGroup.value.date_paiement,
			heure: this.formGroup.value.heure,
			reference_transaction: this.formGroup.value.reference_transaction,

    }

    return this.rEPaiementService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      re_ordre_recette_id: this.formGroup.value.re_ordre_recette_id,
			user_id: this.formGroup.value.user_id,
			re_mode_paiement_id: this.formGroup.value.re_mode_paiement_id,
			montant: this.formGroup.value.montant,
			devise: this.formGroup.value.devise,
			date_paiement: this.formGroup.value.date_paiement,
			heure: this.formGroup.value.heure,
			reference_transaction: this.formGroup.value.reference_transaction,

    }

    return this.rEPaiementService.update(id, JSON.stringify(payload)
    )
  }

  fill(rEPaiement: REPaiementEntity) {
    this.formGroup.patchValue({
      re_ordre_recette_id: rEPaiement.re_ordre_recette_id,
			user_id: rEPaiement.user_id,
			re_mode_paiement_id: rEPaiement.re_mode_paiement_id,
			montant: rEPaiement.montant,
			devise: rEPaiement.devise,
			date_paiement: rEPaiement.date_paiement,
			heure: rEPaiement.heure,
			reference_transaction: rEPaiement.reference_transaction,

    })
  }

  empty() {
    this.formGroup.patchValue({
      re_ordre_recette_id: '',
			user_id: '',
			re_mode_paiement_id: '',
			montant: '',
			devise: '',
			date_paiement: '',
			heure: '',
			reference_transaction: '',

    })
  }
}
