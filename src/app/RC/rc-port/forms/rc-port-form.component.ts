import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RCPortService } from '../services/rc-port.service';
import { RCPortEntity } from '../rc-port.entity';
import { RCPaysEntity } from '../../rc-pays/rc-pays.entity';


@Component({
  standalone: true,
  selector: 'app-rc-port-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './rc-port-form.component.html',
  styleUrl: './rc-port-form.component.css'
})
export class RCPortFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      rc_pays_id: new FormControl('', []),
			nom: new FormControl(undefined, []),
			code: new FormControl(undefined, []),
			capacite_accueil: new FormControl(undefined, []),
			profondeur_max: new FormControl(undefined, []),

    }
  );

  @Input() rcPayss!: RCPaysEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected rCPortService: RCPortService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      rc_pays_id: this.formGroup.value.rc_pays_id,
			nom: this.formGroup.value.nom,
			code: this.formGroup.value.code,
			capacite_accueil: this.formGroup.value.capacite_accueil,
			profondeur_max: this.formGroup.value.profondeur_max,

    }

    return this.rCPortService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      rc_pays_id: this.formGroup.value.rc_pays_id,
			nom: this.formGroup.value.nom,
			code: this.formGroup.value.code,
			capacite_accueil: this.formGroup.value.capacite_accueil,
			profondeur_max: this.formGroup.value.profondeur_max,

    }

    return this.rCPortService.update(id, JSON.stringify(payload)
    )
  }

  fill(rCPort: RCPortEntity) {
    this.formGroup.patchValue({
      rc_pays_id: rCPort.rc_pays_id,
			nom: rCPort.nom,
			code: rCPort.code,
			capacite_accueil: rCPort.capacite_accueil,
			profondeur_max: rCPort.profondeur_max,

    })
  }

  empty() {
    this.formGroup.patchValue({
      rc_pays_id: '',
			nom: '',
			code: '',
			capacite_accueil: '',
			profondeur_max: '',

    })
  }
}
