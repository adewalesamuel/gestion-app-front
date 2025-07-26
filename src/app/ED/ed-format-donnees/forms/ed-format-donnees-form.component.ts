import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EDFormatDonneesService } from '../services/ed-format-donnees.service';
import { EDFormatDonneesEntity } from '../ed-format-donnees.entity';


@Component({
  standalone: true,
  selector: 'app-ed-format-donnees-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './ed-format-donnees-form.component.html',
  styleUrl: './ed-format-donnees-form.component.css'
})
export class EDFormatDonneesFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      nom: new FormControl(undefined, []),
			mime_type: new FormControl(undefined, []),
			schema_xsd_url: new FormControl(undefined, []),
			exemple_url: new FormControl(undefined, []),

    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected eDFormatDonneesService: EDFormatDonneesService) {}

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
			mime_type: this.formGroup.value.mime_type,
			schema_xsd_url: this.formGroup.value.schema_xsd_url,
			exemple_url: this.formGroup.value.exemple_url,

    }

    return this.eDFormatDonneesService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      nom: this.formGroup.value.nom,
			mime_type: this.formGroup.value.mime_type,
			schema_xsd_url: this.formGroup.value.schema_xsd_url,
			exemple_url: this.formGroup.value.exemple_url,

    }

    return this.eDFormatDonneesService.update(id, JSON.stringify(payload)
    )
  }

  fill(eDFormatDonnees: EDFormatDonneesEntity) {
    this.formGroup.patchValue({
      nom: eDFormatDonnees.nom,
			mime_type: eDFormatDonnees.mime_type,
			schema_xsd_url: eDFormatDonnees.schema_xsd_url,
			exemple_url: eDFormatDonnees.exemple_url,

    })
  }

  empty() {
    this.formGroup.patchValue({
      nom: '',
			mime_type: '',
			schema_xsd_url: '',
			exemple_url: '',

    })
  }
}
