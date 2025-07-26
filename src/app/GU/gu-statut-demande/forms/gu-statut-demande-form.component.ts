import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GUStatutDemandeService } from '../services/gu-statut-demande.service';
import { GUStatutDemandeEntity } from '../gu-statut-demande.entity';


@Component({
  standalone: true,
  selector: 'app-gu-statut-demande-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './gu-statut-demande-form.component.html',
  styleUrl: './gu-statut-demande-form.component.css'
})
export class GUStatutDemandeFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      code: new FormControl(undefined, []),
			libelle: new FormControl(undefined, []),
			couleur_hex: new FormControl(undefined, []),
			ordre: new FormControl(undefined, []),
			notifiable: new FormControl(undefined, []),

    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected gUStatutDemandeService: GUStatutDemandeService) {}

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
			couleur_hex: this.formGroup.value.couleur_hex,
			ordre: this.formGroup.value.ordre,
			notifiable: this.formGroup.value.notifiable,

    }

    return this.gUStatutDemandeService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      code: this.formGroup.value.code,
			libelle: this.formGroup.value.libelle,
			couleur_hex: this.formGroup.value.couleur_hex,
			ordre: this.formGroup.value.ordre,
			notifiable: this.formGroup.value.notifiable,

    }

    return this.gUStatutDemandeService.update(id, JSON.stringify(payload)
    )
  }

  fill(gUStatutDemande: GUStatutDemandeEntity) {
    this.formGroup.patchValue({
      code: gUStatutDemande.code,
			libelle: gUStatutDemande.libelle,
			couleur_hex: gUStatutDemande.couleur_hex,
			ordre: gUStatutDemande.ordre,
			notifiable: gUStatutDemande.notifiable,

    })
  }

  empty() {
    this.formGroup.patchValue({
      code: '',
			libelle: '',
			couleur_hex: '',
			ordre: '',
			notifiable: '',

    })
  }
}
