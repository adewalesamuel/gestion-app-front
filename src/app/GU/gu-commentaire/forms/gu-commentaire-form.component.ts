import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GUCommentaireService } from '../services/gu-commentaire.service';
import { GUCommentaireEntity } from '../gu-commentaire.entity';
import { UserEntity } from '../../../common-features/user/user.entity';
import { GUDemandeEntity } from '../../../GU/gu-demande/gu-demande.entity';


@Component({
  standalone: true,
  selector: 'app-gu-commentaire-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './gu-commentaire-form.component.html',
  styleUrl: './gu-commentaire-form.component.css'
})
export class GUCommentaireFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      contenu: new FormControl(undefined, []),
			date: new FormControl(undefined, []),
			heure: new FormControl(undefined, []),
			user_id: new FormControl('', []),
			gu_demande_id: new FormControl('', []),

    }
  );

  @Input() users!: UserEntity[];
	@Input() guDemandes!: GUDemandeEntity[];
	@Input() handleSubmit!: (e: Event) => Promise<void>;
  @Input() isLoading!: boolean;

  constructor(protected gUCommentaireService: GUCommentaireService) {}

  ngOnChanges() {
    if (this.isLoading) {
      this.formGroup.disable()
    } else {
      this.formGroup.enable()
    }
  }

  create() {
    const payload = {
      contenu: this.formGroup.value.contenu,
			date: this.formGroup.value.date,
			heure: this.formGroup.value.heure,
			user_id: this.formGroup.value.user_id,
			gu_demande_id: this.formGroup.value.gu_demande_id,

    }

    return this.gUCommentaireService.create(JSON.stringify(payload))
  }

  update(id: number) {
    const payload = {
      contenu: this.formGroup.value.contenu,
			date: this.formGroup.value.date,
			heure: this.formGroup.value.heure,
			user_id: this.formGroup.value.user_id,
			gu_demande_id: this.formGroup.value.gu_demande_id,

    }

    return this.gUCommentaireService.update(id, JSON.stringify(payload)
    )
  }

  fill(gUCommentaire: GUCommentaireEntity) {
    this.formGroup.patchValue({
      contenu: gUCommentaire.contenu,
			date: gUCommentaire.date,
			heure: gUCommentaire.heure,
			user_id: gUCommentaire.user_id,
			gu_demande_id: gUCommentaire.gu_demande_id,

    })
  }

  empty() {
    this.formGroup.patchValue({
      contenu: '',
			date: '',
			heure: '',
			user_id: '',
			gu_demande_id: '',

    })
  }
}
