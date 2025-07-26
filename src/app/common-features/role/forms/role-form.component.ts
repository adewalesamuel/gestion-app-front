import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoleService } from '../services/role.service';
import { RoleEntity } from '../role.entity';


@Component({
  standalone: true,
  selector: 'app-role-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.css'
})
export class RoleFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      name: new FormControl(undefined, []),
			description: new FormControl(undefined, []),
			permissions: new FormControl(undefined, []),

    }
  );

  @Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected roleService: RoleService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      name: this.formGroup.value.name,
			description: this.formGroup.value.description,
			permissions: this.formGroup.value.permissions,

    }

    return this.roleService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      name: this.formGroup.value.name,
			description: this.formGroup.value.description,
			permissions: this.formGroup.value.permissions,

    }

    return this.roleService.update(id, JSON.stringify(payload)
    )
  }

  fill(role: RoleEntity) {
    this.formGroup.patchValue({
      name: role.name,
			description: role.description,
			permissions: role.permissions,

    })
  }

  empty() {
    this.formGroup.patchValue({
      name: '',
			description: '',
			permissions: '',

    })
  }
}
