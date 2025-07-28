import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfigSystemeEntity } from '../config-systeme.entity';
import { ConfigSystemeService } from '../services/config-systeme.service';
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
  selector: 'app-config-systeme-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './config-systeme-list.component.html',
  styleUrl: './config-systeme-list.component.css'
})
export class ConfigSystemeListComponent {

  configSystemes = signal<ConfigSystemeEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'parametre': {},
		'valeur': {},
		'module': {},
		'editable': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected configSystemeService: ConfigSystemeService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const configSystemeResponse = await this.configSystemeService.getAll(
        {page: this.page()}
      );
      const configSystemeData = configSystemeResponse.data as ResponsePaginate<ConfigSystemeEntity[]>;

      this.configSystemes.set(configSystemeData.data);
      this.pageLength.set(configSystemeData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/settings/config-systemes/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/settings/config-systemes/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, configSysteme: ConfigSystemeEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce configSysteme')) return;
    this.configSystemes.update((configSystemeList) => configSystemeList.filter(
      configSystemeItem => configSystemeItem.id != configSysteme.id
    ));
    await this.configSystemeService.destroy(configSysteme.id);
  }
}
