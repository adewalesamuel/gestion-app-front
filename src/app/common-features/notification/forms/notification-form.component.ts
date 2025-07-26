import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { NotificationEntity } from '../notification.entity';
import { UserEntity } from '../../../common-features/user/user.entity';
import { CONSTS } from '../../../constants';



@Component({
  standalone: true,
  selector: 'app-notification-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './notification-form.component.html',
  styleUrl: './notification-form.component.css'
})
export class NotificationFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      user_id: new FormControl('', []),
			titre: new FormControl(undefined, []),
			message: new FormControl(undefined, []),
			lu: new FormControl(undefined, []),
			type: new FormControl(undefined, []),
			entite_type: new FormControl(undefined, []),
			entite_id: new FormControl('', []),

    }
  );

  @Input() users!: UserEntity[];

	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  readonly NOTIFICATION_TYPES = Object.values(CONSTS.FEATURES.NOTIFICATION_TYPE)

  constructor(protected notificationService: NotificationService) {}

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
			titre: this.formGroup.value.titre,
			message: this.formGroup.value.message,
			lu: this.formGroup.value.lu,
			type: this.formGroup.value.type,
			entite_type: this.formGroup.value.entite_type,
			entite_id: this.formGroup.value.entite_id,

    }

    return this.notificationService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      user_id: this.formGroup.value.user_id,
			titre: this.formGroup.value.titre,
			message: this.formGroup.value.message,
			lu: this.formGroup.value.lu,
			type: this.formGroup.value.type,
			entite_type: this.formGroup.value.entite_type,
			entite_id: this.formGroup.value.entite_id,

    }

    return this.notificationService.update(id, JSON.stringify(payload)
    )
  }

  fill(notification: NotificationEntity) {
    this.formGroup.patchValue({
      user_id: notification.user_id,
			titre: notification.titre,
			message: notification.message,
			lu: notification.lu,
			type: notification.type,
			entite_type: notification.entite_type,
			entite_id: notification.entite_id,

    })
  }

  empty() {
    this.formGroup.patchValue({
      user_id: '',
			titre: '',
			message: '',
			lu: '',
			type: '',
			entite_type: '',
			entite_id: '',

    })
  }
}
