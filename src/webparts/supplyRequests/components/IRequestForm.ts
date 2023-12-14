export interface IRequestForm {
  onAddItem: (formData: object) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}