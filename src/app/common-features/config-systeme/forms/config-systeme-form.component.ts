import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigSystemeService } from '../services/config-systeme.service';
import { ConfigSystemeEntity } from '../config-systeme.entity';


@Component({
  standalone: true,
  selector: 'app-config-systeme-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './config-systeme-form.component.html',
  styleUrl: './config-systeme-form.component.css'
})
export class ConfigSystemeFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      parametre: new FormControl('', []),
			valeur: new FormControl('', []),
			module: new FormControl('', []),
			editable: new FormControl('', []),
			
    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected configSystemeService: ConfigSystemeService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      parametre: this.formGroup.value.parametre,
			valeur: this.formGroup.value.valeur,
			module: this.formGroup.value.module,
			editable: this.formGroup.value.editable,
			
    }

    return this.configSystemeService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      parametre: this.formGroup.value.parametre,
			valeur: this.formGroup.value.valeur,
			module: this.formGroup.value.module,
			editable: this.formGroup.value.editable,
			
    }

    return this.configSystemeService.update(id, JSON.stringify(payload)
    )
  }

  fill(configSysteme: ConfigSystemeEntity) {
    this.formGroup.patchValue({
      parametre: configSysteme.parametre,
			valeur: configSysteme.valeur,
			module: configSysteme.module,
			editable: configSysteme.editable,
			
    })
  }

  empty() {
    this.formGroup.patchValue({
      parametre: '',
			valeur: '',
			module: '',
			editable: '',
			
    })
  }
}