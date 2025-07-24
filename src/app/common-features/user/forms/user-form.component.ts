import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../user.entity';
import { RoleEntity } from '../../../common-features/role/role.entity';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';


@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      role_id: new FormControl('', []),
			rc_acteur_id: new FormControl('', []),
			profil_img_url: new FormControl('', []),
			nom: new FormControl('', []),
			email: new FormControl('', []),
			password: new FormControl('', []),
			last_login_date: new FormControl('', []),
			last_login_heure: new FormControl('', []),

    }
  );

  @Input() roles!: RoleEntity[];
	@Input() rcActeurs!: RCActeurEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected userService: UserService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      role_id: this.formGroup.value.role_id,
			rc_acteur_id: this.formGroup.value.rc_acteur_id,
			profil_img_url: this.formGroup.value.profil_img_url,
			nom: this.formGroup.value.nom,
			email: this.formGroup.value.email,
			password: this.formGroup.value.password,
			last_login_date: this.formGroup.value.last_login_date,
			last_login_heure: this.formGroup.value.last_login_heure,

    }

    return this.userService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      role_id: this.formGroup.value.role_id,
			rc_acteur_id: this.formGroup.value.rc_acteur_id,
			profil_img_url: this.formGroup.value.profil_img_url,
			nom: this.formGroup.value.nom,
			email: this.formGroup.value.email,
			password: this.formGroup.value.password,
			last_login_date: this.formGroup.value.last_login_date,
			last_login_heure: this.formGroup.value.last_login_heure,

    }

    return this.userService.update(id, JSON.stringify(payload)
    )
  }

  fill(user: UserEntity) {
    this.formGroup.patchValue({
      role_id: user.role_id,
			rc_acteur_id: user.rc_acteur_id,
			profil_img_url: user.profil_img_url,
			nom: user.nom,
			email: user.email,
			password: user.password,
			last_login_date: user.last_login_date,
			last_login_heure: user.last_login_heure,

    })
  }

  empty() {
    this.formGroup.patchValue({
      role_id: '',
			rc_acteur_id: '',
			profil_img_url: '',
			nom: '',
			email: '',
			password: '',
			last_login_date: '',
			last_login_heure: '',

    })
  }
}
