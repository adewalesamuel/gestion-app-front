import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { REOrdreRecetteService } from '../services/re-ordre-recette.service';
import { REOrdreRecetteEntity } from '../re-ordre-recette.entity';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';


@Component({
  standalone: true,
  selector: 'app-re-ordre-recette-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './re-ordre-recette-form.component.html',
  styleUrl: './re-ordre-recette-form.component.css'
})
export class REOrdreRecetteFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      rc_acteur_id: new FormControl('', []),
			reference: new FormControl('', []),
			montant: new FormControl('', []),
			devise: new FormControl('', []),
			date_emission: new FormControl('', []),
			date_echeance: new FormControl('', []),
			statut: new FormControl('', []),
			service_concerne: new FormControl('', []),

    }
  );

  @Input() rcActeurs!: RCActeurEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected rEOrdreRecetteService: REOrdreRecetteService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      rc_acteur_id: this.formGroup.value.rc_acteur_id,
			reference: this.formGroup.value.reference,
			montant: this.formGroup.value.montant,
			devise: this.formGroup.value.devise,
			date_emission: this.formGroup.value.date_emission,
			date_echeance: this.formGroup.value.date_echeance,
			statut: this.formGroup.value.statut,
			service_concerne: this.formGroup.value.service_concerne,

    }

    return this.rEOrdreRecetteService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      rc_acteur_id: this.formGroup.value.rc_acteur_id,
			reference: this.formGroup.value.reference,
			montant: this.formGroup.value.montant,
			devise: this.formGroup.value.devise,
			date_emission: this.formGroup.value.date_emission,
			date_echeance: this.formGroup.value.date_echeance,
			statut: this.formGroup.value.statut,
			service_concerne: this.formGroup.value.service_concerne,

    }

    return this.rEOrdreRecetteService.update(id, JSON.stringify(payload)
    )
  }

  fill(rEOrdreRecette: REOrdreRecetteEntity) {
    this.formGroup.patchValue({
      rc_acteur_id: rEOrdreRecette.rc_acteur_id,
			reference: rEOrdreRecette.reference,
			montant: rEOrdreRecette.montant,
			devise: rEOrdreRecette.devise,
			date_emission: rEOrdreRecette.date_emission,
			date_echeance: rEOrdreRecette.date_echeance,
			statut: rEOrdreRecette.statut,
			service_concerne: rEOrdreRecette.service_concerne,

    })
  }

  empty() {
    this.formGroup.patchValue({
      rc_acteur_id: '',
			reference: '',
			montant: '',
			devise: '',
			date_emission: '',
			date_echeance: '',
			statut: '',
			service_concerne: '',

    })
  }
}
