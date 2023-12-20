import { IPersonaProps } from "@fluentui/react";

export interface IRequestFormPeoplePickerProps {
  // eslint-disable-next-line @rushstack/no-new-null
  assignedManager: number | null;
  onManagerChange: (persons: IPersonaProps[]) => void
}