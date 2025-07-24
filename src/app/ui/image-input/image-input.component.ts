import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-image-input',
  imports: [],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.css'
})
export class ImageInputComponent {
  @Input() imgUrl!: string;
  @Input() isLoading!: boolean;
  @Input() setFile!: (file: File) => void;

  protected file!: File;
  protected currentImgUrl = signal<string | null>(null);

  ngOnChanges() {
    if (!this.imgUrl ||
      this.imgUrl === undefined ||
      this.imgUrl === '') return;

    this.currentImgUrl.set(this.imgUrl);
  }

  getFileUrl(file: File) {
    return window.URL.createObjectURL(file);
  }

  createFileUrl(file: File) {
    return URL.createObjectURL(file);
  }

  loadFile(event: Event) {
    event.preventDefault();
    const files = (event.target as HTMLInputElement).files

    if (!files) return;
    if (files?.length < 1) return;

    const fileUrl = this.createFileUrl(files[0]);
    this.currentImgUrl.set(fileUrl);
    this.setFile(files[0]);
  }
}
