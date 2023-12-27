import { IDropdownOption } from "@fluentui/react";

export interface IRequestFormRequestTypeProps {
  // eslint-disable-next-line @rushstack/no-new-null
  selectedTypeId: number | null;
  onTypeChange: (item: IDropdownOption) => void;
}
