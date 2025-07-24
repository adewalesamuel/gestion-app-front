import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserFormComponent } from '../forms/user-form.component';
import { UserService } from '../services/user.service';
import { UserEntity } from '../user.entity';
import { RoleService } from '../../../common-features/role/services/role.service';
import { RoleEntity } from '../../../common-features/role/role.entity';
import { RCActeurService } from '../../../RC/rc-acteur/services/rc-acteur.service';
import { RCActeurEntity } from '../../../RC/rc-acteur/rc-acteur.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-user-edit',
  imports: [
    ErrorMessagesComponent,
    UserFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  @ViewChild(UserFormComponent) userForm!: UserFormComponent;

  id = signal<number>(1);
  user = signal<UserEntity|null>(null)
  roles = signal<RoleEntity[]>([]);
	rcActeurs = signal<RCActeurEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected userService: UserService,
    protected roleService: RoleService,
		protected rcActeurService: RCActeurService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const userResponse = await this.userService.getById(this.id())
      const userData = userResponse.data as UserEntity;

      this.user.set(userData);
      this.userForm.fill(userData);

      const roleResponse = await this.roleService.getAll({page: ''});
			const roleData = roleResponse.data as RoleEntity[];
			this.roles.set(roleData);

			const rcActeurResponse = await this.rcActeurService.getAll({page: ''});
			const rcActeurData = rcActeurResponse.data as RCActeurEntity[];
			this.rcActeurs.set(rcActeurData);


    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.userForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.userForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
