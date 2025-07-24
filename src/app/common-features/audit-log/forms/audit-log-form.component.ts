import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuditLogService } from '../services/audit-log.service';
import { AuditLogEntity } from '../audit-log.entity';
import { UserEntity } from '../../../common-features/user/user.entity';



@Component({
  standalone: true,
  selector: 'app-audit-log-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './audit-log-form.component.html',
  styleUrl: './audit-log-form.component.css'
})
export class AuditLogFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      user_id: new FormControl('', []),
			action: new FormControl('', []),
			entite: new FormControl('', []),
			entite_id: new FormControl('', []),
			ancienne_valeur: new FormControl('', []),
			nouvelle_valeur: new FormControl('', []),
			ip_address: new FormControl('', []),

    }
  );

  @Input() users!: UserEntity[];

	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected auditLogService: AuditLogService) {}

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
			action: this.formGroup.value.action,
			entite: this.formGroup.value.entite,
			entite_id: this.formGroup.value.entite_id,
			ancienne_valeur: this.formGroup.value.ancienne_valeur,
			nouvelle_valeur: this.formGroup.value.nouvelle_valeur,
			ip_address: this.formGroup.value.ip_address,

    }

    return this.auditLogService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      user_id: this.formGroup.value.user_id,
			action: this.formGroup.value.action,
			entite: this.formGroup.value.entite,
			entite_id: this.formGroup.value.entite_id,
			ancienne_valeur: this.formGroup.value.ancienne_valeur,
			nouvelle_valeur: this.formGroup.value.nouvelle_valeur,
			ip_address: this.formGroup.value.ip_address,

    }

    return this.auditLogService.update(id, JSON.stringify(payload)
    )
  }

  fill(auditLog: AuditLogEntity) {
    this.formGroup.patchValue({
      user_id: auditLog.user_id,
			action: auditLog.action,
			entite: auditLog.entite,
			entite_id: auditLog.entite_id,
			ancienne_valeur: auditLog.ancienne_valeur,
			nouvelle_valeur: auditLog.nouvelle_valeur,
			ip_address: auditLog.ip_address,

    })
  }

  empty() {
    this.formGroup.patchValue({
      user_id: '',
			action: '',
			entite: '',
			entite_id: '',
			ancienne_valeur: '',
			nouvelle_valeur: '',
			ip_address: '',

    })
  }
}
