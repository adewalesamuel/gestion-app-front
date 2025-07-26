import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserEntity } from '../../../../common-features/user/user.entity';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      email: new FormControl(undefined, []),
      password: new FormControl(undefined, [])
    }
  )

  @Input() handleSubmit!: (e: Event) => void
  @Input() isLoading!: boolean;

  constructor(){}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  fill(user: UserEntity) {
      this.formGroup.setValue({
        email: user.email,
        password: user.password,

      })
    }

    empty() {
      this.formGroup.setValue({
        email: '',
        password: '',

      })
    }

}
