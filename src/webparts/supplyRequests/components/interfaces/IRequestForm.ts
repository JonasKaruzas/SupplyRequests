export interface IRequestForm {
  onAddItem: (formData: object) => Promise<number | undefined>;
  onUpdateItem: (formData: object) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onCancel: () => void;
}
