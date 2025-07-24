import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RCPaysService } from '../services/rc-pays.service';
import { RCPaysEntity } from '../rc-pays.entity';


@Component({
  standalone: true,
  selector: 'app-rc-pays-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './rc-pays-form.component.html',
  styleUrl: './rc-pays-form.component.css'
})
export class RCPaysFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      nom: new FormControl('', []),
			code_iso: new FormControl('', []),
			indicatif: new FormControl('', []),
			pavillon_url: new FormControl('', []),
			
    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected rCPaysService: RCPaysService) {}

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
			code_iso: this.formGroup.value.code_iso,
			indicatif: this.formGroup.value.indicatif,
			pavillon_url: this.formGroup.value.pavillon_url,
			
    }

    return this.rCPaysService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      nom: this.formGroup.value.nom,
			code_iso: this.formGroup.value.code_iso,
			indicatif: this.formGroup.value.indicatif,
			pavillon_url: this.formGroup.value.pavillon_url,
			
    }

    return this.rCPaysService.update(id, JSON.stringify(payload)
    )
  }

  fill(rCPays: RCPaysEntity) {
    this.formGroup.patchValue({
      nom: rCPays.nom,
			code_iso: rCPays.code_iso,
			indicatif: rCPays.indicatif,
			pavillon_url: rCPays.pavillon_url,
			
    })
  }

  empty() {
    this.formGroup.patchValue({
      nom: '',
			code_iso: '',
			indicatif: '',
			pavillon_url: '',
			
    })
  }
}