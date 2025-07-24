import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RCActeurService } from '../services/rc-acteur.service';
import { RCActeurEntity } from '../rc-acteur.entity';


@Component({
  standalone: true,
  selector: 'app-rc-acteur-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './rc-acteur-form.component.html',
  styleUrl: './rc-acteur-form.component.css'
})
export class RCActeurFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      type: new FormControl('', []),
			nom: new FormControl('', []),
			prenom: new FormControl('', []),
			raison_sociale: new FormControl('', []),
			registre_commerce: new FormControl('', []),
			email: new FormControl('', []),
			adresse: new FormControl('', []),
			telephone: new FormControl('', []),
			secteur_activite: new FormControl('', []),
			pays_origine: new FormControl('', []),
			
    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected rCActeurService: RCActeurService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      type: this.formGroup.value.type,
			nom: this.formGroup.value.nom,
			prenom: this.formGroup.value.prenom,
			raison_sociale: this.formGroup.value.raison_sociale,
			registre_commerce: this.formGroup.value.registre_commerce,
			email: this.formGroup.value.email,
			adresse: this.formGroup.value.adresse,
			telephone: this.formGroup.value.telephone,
			secteur_activite: this.formGroup.value.secteur_activite,
			pays_origine: this.formGroup.value.pays_origine,
			
    }

    return this.rCActeurService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      type: this.formGroup.value.type,
			nom: this.formGroup.value.nom,
			prenom: this.formGroup.value.prenom,
			raison_sociale: this.formGroup.value.raison_sociale,
			registre_commerce: this.formGroup.value.registre_commerce,
			email: this.formGroup.value.email,
			adresse: this.formGroup.value.adresse,
			telephone: this.formGroup.value.telephone,
			secteur_activite: this.formGroup.value.secteur_activite,
			pays_origine: this.formGroup.value.pays_origine,
			
    }

    return this.rCActeurService.update(id, JSON.stringify(payload)
    )
  }

  fill(rCActeur: RCActeurEntity) {
    this.formGroup.patchValue({
      type: rCActeur.type,
			nom: rCActeur.nom,
			prenom: rCActeur.prenom,
			raison_sociale: rCActeur.raison_sociale,
			registre_commerce: rCActeur.registre_commerce,
			email: rCActeur.email,
			adresse: rCActeur.adresse,
			telephone: rCActeur.telephone,
			secteur_activite: rCActeur.secteur_activite,
			pays_origine: rCActeur.pays_origine,
			
    })
  }

  empty() {
    this.formGroup.patchValue({
      type: '',
			nom: '',
			prenom: '',
			raison_sociale: '',
			registre_commerce: '',
			email: '',
			adresse: '',
			telephone: '',
			secteur_activite: '',
			pays_origine: '',
			
    })
  }
}