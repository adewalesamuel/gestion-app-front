import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EDPolitiqueAccesService } from '../services/ed-politique-acces.service';
import { EDPolitiqueAccesEntity } from '../ed-politique-acces.entity';
import { EDApiEntity } from '../../../ED/ed-api/ed-api.entity';
import { RoleEntity } from '../../../common-features/role/role.entity';


@Component({
  standalone: true,
  selector: 'app-ed-politique-acces-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './ed-politique-acces-form.component.html',
  styleUrl: './ed-politique-acces-form.component.css'
})
export class EDPolitiqueAccesFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      ed_api_id: new FormControl('', []),
			role_id: new FormControl('', []),
			nom: new FormControl('', []),
			regles: new FormControl('', []),

    }
  );

  @Input() edApis!: EDApiEntity[];
	@Input() roles!: RoleEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected eDPolitiqueAccesService: EDPolitiqueAccesService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      ed_api_id: this.formGroup.value.ed_api_id,
			role_id: this.formGroup.value.role_id,
			nom: this.formGroup.value.nom,
			regles: this.formGroup.value.regles,

    }

    return this.eDPolitiqueAccesService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      ed_api_id: this.formGroup.value.ed_api_id,
			role_id: this.formGroup.value.role_id,
			nom: this.formGroup.value.nom,
			regles: this.formGroup.value.regles,

    }

    return this.eDPolitiqueAccesService.update(id, JSON.stringify(payload)
    )
  }

  fill(eDPolitiqueAcces: EDPolitiqueAccesEntity) {
    this.formGroup.patchValue({
      ed_api_id: eDPolitiqueAcces.ed_api_id,
			role_id: eDPolitiqueAcces.role_id,
			nom: eDPolitiqueAcces.nom,
			regles: eDPolitiqueAcces.regles,

    })
  }

  empty() {
    this.formGroup.patchValue({
      ed_api_id: '',
			role_id: '',
			nom: '',
			regles: '',

    })
  }
}
