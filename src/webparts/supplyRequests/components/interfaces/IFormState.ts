/* eslint-disable @rushstack/no-new-null */
export interface IFormState {
  Id: number | undefined;
  AuthorId: number;
  Title: string;
  Description: string;
  RequestTypeId: number | null;
  RequestArea: string | null;
  DueDate: Date | undefined;
  StatusId: number;
  AssignedManagerId: number | null;
}
