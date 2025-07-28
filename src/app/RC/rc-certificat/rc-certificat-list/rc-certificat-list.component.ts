import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RCCertificatEntity } from '../rc-certificat.entity';
import { RCCertificatService } from '../services/rc-certificat.service';
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
  selector: 'app-rc-certificat-list',
  imports: [
    RouterLink,
    CommonModule,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
    ErrorMessagesComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-certificat-list.component.html',
  styleUrl: './rc-certificat-list.component.css'
})
export class RCCertificatListComponent {

  rCCertificats = signal<RCCertificatEntity[]>([]);
  page = signal<number>(1);
  pageLength = signal<number>(1);
  isLoading = signal<boolean>(true);

  tableAttributes = {
    'rc_engin_flottant_id': {},
		'type': {},
		'numero': {},
		'date_emission': {},
		'date_expiration': {},
		'organisme_emetteur': {},

  }
  tableActions = ['edit', 'delete'];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCCertificatService: RCCertificatService,
  ) {
    this.route.queryParamMap.subscribe( params => {
      if (params.has('page')) this.page.set(Number(params.get('page')))
      this.init();
    });
  }

  async init() {
    this.errorHandler.setErrorMessages([]);

    try {
      const rCCertificatResponse = await this.rCCertificatService.getAll(
        {page: this.page()}
      );
      const rCCertificatData = rCCertificatResponse.data as ResponsePaginate<RCCertificatEntity[]>;

      this.rCCertificats.set(rCCertificatData.data);
      this.pageLength.set(rCCertificatData.last_page);
    } catch (error: any) {
      this.errorHandler.setError(error);
    } finally {
        this.isLoading.set(false);
    }
  }

  handleReadClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc/rc-certificats/${data?.id}`]);
  }

  handleEditClick = (e: Event, data: any) => {
    e.preventDefault();
    this.router.navigate([`/rc/rc-certificats/${data?.id}/edit`]);
  }

  handleDeleteClick = async (e: Event, rCCertificat: RCCertificatEntity ) => {
    e.preventDefault();
    if (!Utils.confirmAlert('Voulez vous vraiment supprimer ce rCCertificat')) return;
    this.rCCertificats.update((rCCertificatList) => rCCertificatList.filter(
      rCCertificatItem => rCCertificatItem.id != rCCertificat.id
    ));
    await this.rCCertificatService.destroy(rCCertificat.id);
  }
}
