import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { INEquipeInspectionService } from '../services/in-equipe-inspection.service';
import { INEquipeInspectionEntity } from '../in-equipe-inspection.entity';
import { UserEntity } from '../../../common-features/user/user.entity';


@Component({
  standalone: true,
  selector: 'app-in-equipe-inspection-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './in-equipe-inspection-form.component.html',
  styleUrl: './in-equipe-inspection-form.component.css'
})
export class INEquipeInspectionFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      user_id: new FormControl('', []),
			nom: new FormControl('', []),
			membres: new FormControl('', []),

    }
  );

  @Input() users!: UserEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected iNEquipeInspectionService: INEquipeInspectionService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      user_id: this.formGroup.value.user_id,
			nom: this.formGroup.value.nom,
			membres: this.formGroup.value.membres,

    }

    return this.iNEquipeInspectionService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      user_id: this.formGroup.value.user_id,
			nom: this.formGroup.value.nom,
			membres: this.formGroup.value.membres,

    }

    return this.iNEquipeInspectionService.update(id, JSON.stringify(payload)
    )
  }

  fill(iNEquipeInspection: INEquipeInspectionEntity) {
    this.formGroup.patchValue({
      user_id: iNEquipeInspection.user_id,
			nom: iNEquipeInspection.nom,
			membres: iNEquipeInspection.membres,

    })
  }

  empty() {
    this.formGroup.patchValue({
      user_id: '',
			nom: '',
			membres: '',

    })
  }
}
