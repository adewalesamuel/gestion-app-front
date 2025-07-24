import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { INChecklistService } from '../services/in-checklist.service';
import { INChecklistEntity } from '../in-checklist.entity';
import { RCTypeEnginEntity } from '../../../RC/rc-type-engin/rc-type-engin.entity';


@Component({
  standalone: true,
  selector: 'app-in-checklist-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './in-checklist-form.component.html',
  styleUrl: './in-checklist-form.component.css'
})
export class INChecklistFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      rc_type_engin_id: new FormControl('', []),
			nom: new FormControl('', []),
			version: new FormControl('', []),
			items: new FormControl('', []),

    }
  );

  @Input() rcTypeEngins!: RCTypeEnginEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected iNChecklistService: INChecklistService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      rc_type_engin_id: this.formGroup.value.rc_type_engin_id,
			nom: this.formGroup.value.nom,
			version: this.formGroup.value.version,
			items: this.formGroup.value.items,

    }

    return this.iNChecklistService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      rc_type_engin_id: this.formGroup.value.rc_type_engin_id,
			nom: this.formGroup.value.nom,
			version: this.formGroup.value.version,
			items: this.formGroup.value.items,

    }

    return this.iNChecklistService.update(id, JSON.stringify(payload)
    )
  }

  fill(iNChecklist: INChecklistEntity) {
    this.formGroup.patchValue({
      rc_type_engin_id: iNChecklist.rc_type_engin_id,
			nom: iNChecklist.nom,
			version: iNChecklist.version,
			items: iNChecklist.items,

    })
  }

  empty() {
    this.formGroup.patchValue({
      rc_type_engin_id: '',
			nom: '',
			version: '',
			items: '',

    })
  }
}
