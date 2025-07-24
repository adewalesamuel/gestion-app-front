import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleFormComponent } from '../forms/role-form.component';
import { RoleService } from '../services/role.service';
import { RoleEntity } from '../role.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-role-edit',
  imports: [
    ErrorMessagesComponent,
    RoleFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.css'
})
export class RoleEditComponent {
  @ViewChild(RoleFormComponent) roleForm!: RoleFormComponent;

  id = signal<number>(1);
  role = signal<RoleEntity|null>(null)
  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected roleService: RoleService,
    
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
      const roleResponse = await this.roleService.getById(this.id())
      const roleData = roleResponse.data as RoleEntity;

      this.role.set(roleData);
      this.roleForm.fill(roleData);

      
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.roleForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.roleForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}