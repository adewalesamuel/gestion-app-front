import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RCActeurEntity } from '../rc-acteur.entity';
import { RCActeurService } from '../services/rc-acteur.service';
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
  selector: 'app-rc-acteur-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-acteur-list.component.html',
  styleUrl: './rc-acteur-list.component.css'
})
export class RCActeurListComponent {

  rCActeurs = signal<RCActeurEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'type': {},
		'nom': {},
		'prenom': {},
		'raison_sociale': {},
		'registre_commerce': {},
		'email': {},
		'adresse': {},
		'telephone': {},
		'secteur_activite': {},
		'pays_origine': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCActeurService: RCActeurService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rCActeurResponse = await this.rCActeurService.getAll(
        {page: this.page()}
      );
      const rCActeurData = rCActeurResponse.data as ResponsePaginate<RCActeurEntity[]>;

      this.rCActeurs.set(rCActeurData.data);
      this.pageLength.set(rCActeurData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc-acteurs/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc-acteurs/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rCActeur: RCActeurEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rCActeur')) return;
    this.rCActeurs.update((rCActeurList) => rCActeurList.filter(
      rCActeurItem => rCActeurItem.id != rCActeur.id
    ));
    await this.rCActeurService.destroy(rCActeur.id);
  }
}