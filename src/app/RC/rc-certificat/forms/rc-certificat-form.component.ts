import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RCCertificatService } from '../services/rc-certificat.service';
import { RCCertificatEntity } from '../rc-certificat.entity';
import { RCEnginFlottantEntity } from '../../rc-engin-flottant/rc-engin-flottant.entity';
import { CONSTS } from '../../../constants';


@Component({
  standalone: true,
  selector: 'app-rc-certificat-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './rc-certificat-form.component.html',
  styleUrl: './rc-certificat-form.component.css'
})
export class RCCertificatFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      rc_engin_flottant_id: new FormControl('', []),
			type: new FormControl(undefined, []),
			numero: new FormControl(undefined, []),
			date_emission: new FormControl(undefined, []),
			date_expiration: new FormControl(undefined, []),
			organisme_emetteur: new FormControl(undefined, []),

    }
  );

  @Input() rcEnginFlottants!: RCEnginFlottantEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  readonly CERTIFICAT_TYPES = Object.values(CONSTS.FEATURES.CERTIFICAT_TYPE);

  constructor(protected rCCertificatService: RCCertificatService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      rc_engin_flottant_id: this.formGroup.value.rc_engin_flottant_id,
			type: this.formGroup.value.type,
			numero: this.formGroup.value.numero,
			date_emission: this.formGroup.value.date_emission,
			date_expiration: this.formGroup.value.date_expiration,
			organisme_emetteur: this.formGroup.value.organisme_emetteur,

    }

    return this.rCCertificatService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      rc_engin_flottant_id: this.formGroup.value.rc_engin_flottant_id,
			type: this.formGroup.value.type,
			numero: this.formGroup.value.numero,
			date_emission: this.formGroup.value.date_emission,
			date_expiration: this.formGroup.value.date_expiration,
			organisme_emetteur: this.formGroup.value.organisme_emetteur,

    }

    return this.rCCertificatService.update(id, JSON.stringify(payload)
    )
  }

  fill(rCCertificat: RCCertificatEntity) {
    this.formGroup.patchValue({
      rc_engin_flottant_id: rCCertificat.rc_engin_flottant_id,
			type: rCCertificat.type,
			numero: rCCertificat.numero,
			date_emission: rCCertificat.date_emission,
			date_expiration: rCCertificat.date_expiration,
			organisme_emetteur: rCCertificat.organisme_emetteur,

    })
  }

  empty() {
    this.formGroup.patchValue({
      rc_engin_flottant_id: '',
			type: '',
			numero: '',
			date_emission: '',
			date_expiration: '',
			organisme_emetteur: '',

    })
  }
}
