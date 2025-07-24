import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoleEntity } from '../role.entity';
import { RoleService } from '../services/role.service';
import { CommonModule } from '@angular/common';
import { Utils } from '../../../utils';
import { ResponsePaginate } from '../../../types';
import { TableComponent } from '../../../ui/table/table.component';
import { PaginationComponent } from '../../../ui/pagination/pagination.component';
import { LoaderComponent } from '../../../ui/loader/loader.component';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-role-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent {

  roles = signal<RoleEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'name': {},
		'description': {},
		'permissions': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected roleService: RoleService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const roleResponse = await this.roleService.getAll(
        {page: this.page()}
      );
      const roleData = roleResponse.data as ResponsePaginate<RoleEntity[]>;

      this.roles.set(roleData.data);
      this.pageLength.set(roleData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/roles/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/roles/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, role: RoleEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce role')) return;
    this.roles.update((roleList) => roleList.filter(
      roleItem => roleItem.id != role.id
    ));
    await this.roleService.destroy(role.id);
  }
}