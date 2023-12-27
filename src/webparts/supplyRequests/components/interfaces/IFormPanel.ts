export interface IFormPanel {
  onAddItem: (formData: object) => Promise<number | undefined>;
  onUpdateItem: (formData: object) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  formPanelVisible: boolean;
  hideFormPanel: () => void;
  showFormPanel: () => void;
}
