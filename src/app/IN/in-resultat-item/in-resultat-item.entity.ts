export interface INResultatItemEntity {
  id: number,
  in_inspection_id: number,
  conforme: boolean,
  observations: string,
  checklist_item_code: string,
  photo_url: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}