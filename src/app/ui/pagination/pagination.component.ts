import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-pagination',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() page!: number;
  @Input() pageLength!: number;

  getPreviousPage(): number {
    return this.page > 1 ? this.page - 1 : this.page;
  }

  getNextPage(): number {
    return this.pageLength > this.page ? this.page + 1 : this.page;
  }

  getArrayFromPageLength(): number[] {
    return Array(this.pageLength).fill(0);
  }

  isCurrentPage(index: number): boolean {
    return this.page === index + 1;
  }
}
