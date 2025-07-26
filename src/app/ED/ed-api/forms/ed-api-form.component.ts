import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EDApiService } from '../services/ed-api.service';
import { EDApiEntity } from '../ed-api.entity';
import { CONSTS } from '../../../constants';


@Component({
  standalone: true,
  selector: 'app-ed-api-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './ed-api-form.component.html',
  styleUrl: './ed-api-form.component.css'
})
export class EDApiFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      nom: new FormControl('', []),
			description: new FormControl('', []),
			url_base: new FormControl('', []),
			statut: new FormControl('', []),
			documentation_url: new FormControl('', []),

    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  readonly API_STATUTS = Object.values(CONSTS.FEATURES.API_STATUT);

  constructor(protected eDApiService: EDApiService) {}

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
			description: this.formGroup.value.description,
			url_base: this.formGroup.value.url_base,
			statut: this.formGroup.value.statut,
			documentation_url: this.formGroup.value.documentation_url,

    }

    return this.eDApiService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      nom: this.formGroup.value.nom,
			description: this.formGroup.value.description,
			url_base: this.formGroup.value.url_base,
			statut: this.formGroup.value.statut,
			documentation_url: this.formGroup.value.documentation_url,

    }

    return this.eDApiService.update(id, JSON.stringify(payload)
    )
  }

  fill(eDApi: EDApiEntity) {
    this.formGroup.patchValue({
      nom: eDApi.nom,
			description: eDApi.description,
			url_base: eDApi.url_base,
			statut: eDApi.statut,
			documentation_url: eDApi.documentation_url,

    })
  }

  empty() {
    this.formGroup.patchValue({
      nom: '',
			description: '',
			url_base: '',
			statut: '',
			documentation_url: '',

    })
  }
}
