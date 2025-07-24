import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EDSchemaDonneesService } from '../services/ed-schema-donnees.service';
import { EDSchemaDonneesEntity } from '../ed-schema-donnees.entity';


@Component({
  standalone: true,
  selector: 'app-ed-schema-donnees-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './ed-schema-donnees-form.component.html',
  styleUrl: './ed-schema-donnees-form.component.css'
})
export class EDSchemaDonneesFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      nom: new FormControl('', []),
			version: new FormControl('', []),
			schema_json: new FormControl('', []),
			statut: new FormControl('', []),
			
    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected eDSchemaDonneesService: EDSchemaDonneesService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      nom: this.formGroup.value.nom,
			version: this.formGroup.value.version,
			schema_json: this.formGroup.value.schema_json,
			statut: this.formGroup.value.statut,
			
    }

    return this.eDSchemaDonneesService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      nom: this.formGroup.value.nom,
			version: this.formGroup.value.version,
			schema_json: this.formGroup.value.schema_json,
			statut: this.formGroup.value.statut,
			
    }

    return this.eDSchemaDonneesService.update(id, JSON.stringify(payload)
    )
  }

  fill(eDSchemaDonnees: EDSchemaDonneesEntity) {
    this.formGroup.patchValue({
      nom: eDSchemaDonnees.nom,
			version: eDSchemaDonnees.version,
			schema_json: eDSchemaDonnees.schema_json,
			statut: eDSchemaDonnees.statut,
			
    })
  }

  empty() {
    this.formGroup.patchValue({
      nom: '',
			version: '',
			schema_json: '',
			statut: '',
			
    })
  }
}