export interface IRequestForm {
  onAddItem: (formData: object) => Promise<void>;
  onUpdateItem: (formData: object) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}