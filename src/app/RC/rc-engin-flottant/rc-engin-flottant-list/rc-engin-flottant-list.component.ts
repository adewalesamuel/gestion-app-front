import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RCEnginFlottantEntity } from '../rc-engin-flottant.entity';
import { RCEnginFlottantService } from '../services/rc-engin-flottant.service';
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
  selector: 'app-rc-engin-flottant-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-engin-flottant-list.component.html',
  styleUrl: './rc-engin-flottant-list.component.css'
})
export class RCEnginFlottantListComponent {

  rCEnginFlottants = signal<RCEnginFlottantEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'rc_type_engin_id': {},
		'rc_pays_id': {},
		'rc_acteur_id': {},
		'nom': {},
		'immatriculation': {},
		'tonnage_brut': {},
		'longueur': {},
		'annee_construction': {},
		'capacite_passagers': {},
		'capacite_fret': {},
		
  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCEnginFlottantService: RCEnginFlottantService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rCEnginFlottantResponse = await this.rCEnginFlottantService.getAll(
        {page: this.page()}
      );
      const rCEnginFlottantData = rCEnginFlottantResponse.data as ResponsePaginate<RCEnginFlottantEntity[]>;

      this.rCEnginFlottants.set(rCEnginFlottantData.data);
      this.pageLength.set(rCEnginFlottantData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc-engin-flottants/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc-engin-flottants/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rCEnginFlottant: RCEnginFlottantEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rCEnginFlottant')) return;
    this.rCEnginFlottants.update((rCEnginFlottantList) => rCEnginFlottantList.filter(
      rCEnginFlottantItem => rCEnginFlottantItem.id != rCEnginFlottant.id
    ));
    await this.rCEnginFlottantService.destroy(rCEnginFlottant.id);
  }
}