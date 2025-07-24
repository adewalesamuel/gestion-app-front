import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { INResultatItemService } from '../services/in-resultat-item.service';
import { INResultatItemEntity } from '../in-resultat-item.entity';
import { INInspectionEntity } from '../../../IN/in-inspection/in-inspection.entity';


@Component({
  standalone: true,
  selector: 'app-in-resultat-item-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './in-resultat-item-form.component.html',
  styleUrl: './in-resultat-item-form.component.css'
})
export class INResultatItemFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      in_inspection_id: new FormControl('', []),
			conforme: new FormControl('', []),
			observations: new FormControl('', []),
			checklist_item_code: new FormControl('', []),
			photo_url: new FormControl('', []),

    }
  );

  @Input() inInspections!: INInspectionEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected iNResultatItemService: INResultatItemService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      in_inspection_id: this.formGroup.value.in_inspection_id,
			conforme: this.formGroup.value.conforme,
			observations: this.formGroup.value.observations,
			checklist_item_code: this.formGroup.value.checklist_item_code,
			photo_url: this.formGroup.value.photo_url,

    }

    return this.iNResultatItemService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      in_inspection_id: this.formGroup.value.in_inspection_id,
			conforme: this.formGroup.value.conforme,
			observations: this.formGroup.value.observations,
			checklist_item_code: this.formGroup.value.checklist_item_code,
			photo_url: this.formGroup.value.photo_url,

    }

    return this.iNResultatItemService.update(id, JSON.stringify(payload)
    )
  }

  fill(iNResultatItem: INResultatItemEntity) {
    this.formGroup.patchValue({
      in_inspection_id: iNResultatItem.in_inspection_id,
			conforme: iNResultatItem.conforme,
			observations: iNResultatItem.observations,
			checklist_item_code: iNResultatItem.checklist_item_code,
			photo_url: iNResultatItem.photo_url,

    })
  }

  empty() {
    this.formGroup.patchValue({
      in_inspection_id: '',
			conforme: '',
			observations: '',
			checklist_item_code: '',
			photo_url: '',

    })
  }
}
