import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() tableAttributes!: object;
  @Input() tableActions!: string[];
  @Input() tableData!: any[];
  @Input() handleReadClick?: (e: Event, data: any) => void;
  @Input() handleEditClick?: (e: Event, data: any) => void;
  @Input() handleDeleteClick?: (e: Event, data: any) => Promise<void>;


  getTableEntries(): [string, any][] {
    return Object.entries(this.tableAttributes);
  }

  onReadClick($event: MouseEvent, data: any) {
    if (this.handleReadClick) this.handleReadClick($event, data)
  }
  onEditClick($event: MouseEvent, data: any) {
    if (this.handleEditClick) this.handleEditClick($event, data)
  }
  onDeleteClick($event: MouseEvent, data: any) {
    if (this.handleDeleteClick) this.handleDeleteClick($event, data)
  }

  getNestedValue(attributeName: string, valueObject: any) {
    if (!attributeName || attributeName === '' || !valueObject) return;
    if (valueObject === null) return valueObject[attributeName];
    if (typeof valueObject !== 'object' && valueObject !== undefined) return valueObject[attributeName];
    if (valueObject instanceof Array) return String(valueObject);

    let value = null;
    const nestedAttributeKeys = this.getNestedAttruibuteKeys(attributeName);
    if (typeof nestedAttributeKeys === 'string') return valueObject[attributeName];
    let currentObjectValue = valueObject;
    for (let key of nestedAttributeKeys as string[]) {
      currentObjectValue = currentObjectValue[key] ?? {};

      if (this.isValueParseable(currentObjectValue)) {
        value = currentObjectValue;
        break;
      }
    }

    return value;
  }

  protected getNestedAttruibuteKeys(attributeName: string): string[] | string {
    return (attributeName.includes('.') ?
      attributeName.split('.') :
      attributeName
    )
  }

  protected isValueParseable(valueObject: unknown): boolean {
    return (
      (typeof valueObject !== 'object' && valueObject !== null) ||
      valueObject instanceof Array
    )
  }
}
