import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { REModePaiementService } from '../services/re-mode-paiement.service';
import { REModePaiementEntity } from '../re-mode-paiement.entity';


@Component({
  standalone: true,
  selector: 'app-re-mode-paiement-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './re-mode-paiement-form.component.html',
  styleUrl: './re-mode-paiement-form.component.css'
})
export class REModePaiementFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      code: new FormControl(undefined, []),
			libelle: new FormControl(undefined, []),
			frais_pourcentage: new FormControl(undefined, []),
			delai_jours: new FormControl(undefined, []),
			actif: new FormControl(undefined, []),

    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected rEModePaiementService: REModePaiementService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      code: this.formGroup.value.code,
			libelle: this.formGroup.value.libelle,
			frais_pourcentage: this.formGroup.value.frais_pourcentage,
			delai_jours: this.formGroup.value.delai_jours,
			actif: this.formGroup.value.actif,

    }

    return this.rEModePaiementService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      code: this.formGroup.value.code,
			libelle: this.formGroup.value.libelle,
			frais_pourcentage: this.formGroup.value.frais_pourcentage,
			delai_jours: this.formGroup.value.delai_jours,
			actif: this.formGroup.value.actif,

    }

    return this.rEModePaiementService.update(id, JSON.stringify(payload)
    )
  }

  fill(rEModePaiement: REModePaiementEntity) {
    this.formGroup.patchValue({
      code: rEModePaiement.code,
			libelle: rEModePaiement.libelle,
			frais_pourcentage: rEModePaiement.frais_pourcentage,
			delai_jours: rEModePaiement.delai_jours,
			actif: rEModePaiement.actif,

    })
  }

  empty() {
    this.formGroup.patchValue({
      code: '',
			libelle: '',
			frais_pourcentage: '',
			delai_jours: '',
			actif: '',

    })
  }
}
