import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GUTypeDemandeService } from '../services/gu-type-demande.service';
import { GUTypeDemandeEntity } from '../gu-type-demande.entity';


@Component({
  standalone: true,
  selector: 'app-gu-type-demande-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './gu-type-demande-form.component.html',
  styleUrl: './gu-type-demande-form.component.css'
})
export class GUTypeDemandeFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      code: new FormControl(undefined, []),
			libelle: new FormControl(undefined, []),
			delai_traitement_jours: new FormControl(undefined, []),
			cout: new FormControl(undefined, []),
			validite_mois: new FormControl(undefined, []),

    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected gUTypeDemandeService: GUTypeDemandeService) {}

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
			delai_traitement_jours: this.formGroup.value.delai_traitement_jours,
			cout: this.formGroup.value.cout,
			validite_mois: this.formGroup.value.validite_mois,

    }

    return this.gUTypeDemandeService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      code: this.formGroup.value.code,
			libelle: this.formGroup.value.libelle,
			delai_traitement_jours: this.formGroup.value.delai_traitement_jours,
			cout: this.formGroup.value.cout,
			validite_mois: this.formGroup.value.validite_mois,

    }

    return this.gUTypeDemandeService.update(id, JSON.stringify(payload)
    )
  }

  fill(gUTypeDemande: GUTypeDemandeEntity) {
    this.formGroup.patchValue({
      code: gUTypeDemande.code,
			libelle: gUTypeDemande.libelle,
			delai_traitement_jours: gUTypeDemande.delai_traitement_jours,
			cout: gUTypeDemande.cout,
			validite_mois: gUTypeDemande.validite_mois,

    })
  }

  empty() {
    this.formGroup.patchValue({
      code: '',
			libelle: '',
			delai_traitement_jours: '',
			cout: '',
			validite_mois: '',

    })
  }
}
