import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GUTransactionService } from '../services/gu-transaction.service';
import { GUTransactionEntity } from '../gu-transaction.entity';
import { REModePaiementEntity } from '../../../RE/re-mode-paiement/re-mode-paiement.entity';
import { GUDemandeEntity } from '../../../GU/gu-demande/gu-demande.entity';
import { UserEntity } from '../../../common-features/user/user.entity';


@Component({
  standalone: true,
  selector: 'app-gu-transaction-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './gu-transaction-form.component.html',
  styleUrl: './gu-transaction-form.component.css'
})
export class GUTransactionFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      re_mode_paiement_id: new FormControl('', []),
			gu_demande_id: new FormControl('', []),
			user_id: new FormControl('', []),
			reference: new FormControl('', []),
			montant: new FormControl('', []),
			devise: new FormControl('', []),
			date_transaction: new FormControl('', []),
			heure: new FormControl('', []),
			statut: new FormControl('', []),

    }
  );

  @Input() reModePaiements!: REModePaiementEntity[];
	@Input() guDemandes!: GUDemandeEntity[];
	@Input() users!: UserEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected gUTransactionService: GUTransactionService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      re_mode_paiement_id: this.formGroup.value.re_mode_paiement_id,
			gu_demande_id: this.formGroup.value.gu_demande_id,
			user_id: this.formGroup.value.user_id,
			reference: this.formGroup.value.reference,
			montant: this.formGroup.value.montant,
			devise: this.formGroup.value.devise,
			date_transaction: this.formGroup.value.date_transaction,
			heure: this.formGroup.value.heure,
			statut: this.formGroup.value.statut,

    }

    return this.gUTransactionService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      re_mode_paiement_id: this.formGroup.value.re_mode_paiement_id,
			gu_demande_id: this.formGroup.value.gu_demande_id,
			user_id: this.formGroup.value.user_id,
			reference: this.formGroup.value.reference,
			montant: this.formGroup.value.montant,
			devise: this.formGroup.value.devise,
			date_transaction: this.formGroup.value.date_transaction,
			heure: this.formGroup.value.heure,
			statut: this.formGroup.value.statut,

    }

    return this.gUTransactionService.update(id, JSON.stringify(payload)
    )
  }

  fill(gUTransaction: GUTransactionEntity) {
    this.formGroup.patchValue({
      re_mode_paiement_id: gUTransaction.re_mode_paiement_id,
			gu_demande_id: gUTransaction.gu_demande_id,
			user_id: gUTransaction.user_id,
			reference: gUTransaction.reference,
			montant: gUTransaction.montant,
			devise: gUTransaction.devise,
			date_transaction: gUTransaction.date_transaction,
			heure: gUTransaction.heure,
			statut: gUTransaction.statut,

    })
  }

  empty() {
    this.formGroup.patchValue({
      re_mode_paiement_id: '',
			gu_demande_id: '',
			user_id: '',
			reference: '',
			montant: '',
			devise: '',
			date_transaction: '',
			heure: '',
			statut: '',

    })
  }
}
