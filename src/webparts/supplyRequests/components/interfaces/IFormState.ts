// import { ITag } from "@fluentui/react";

export interface IFormState {
  // eslint-disable-next-line @rushstack/no-new-null
  Id: number | undefined;
  AuthorId: number;
  Title: string;
  Description: string;
  // eslint-disable-next-line @rushstack/no-new-null
  RequestTypeId: number | null;
  // eslint-disable-next-line @rushstack/no-new-null
  RequestArea: string | null;
  DueDate: Date | undefined;
  StatusId: number;
  // eslint-disable-next-line @rushstack/no-new-null
  AssignedManagerId: number | null;
  // Tags: ITag[];
}
