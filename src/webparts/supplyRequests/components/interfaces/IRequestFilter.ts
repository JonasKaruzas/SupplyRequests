/* eslint-disable @rushstack/no-new-null */
export interface IListFilters {
  Title: string;
  Description: string;
  DueDateMin: Date | undefined;
  DueDateMax: Date | undefined;
  ExecutionDateMin: Date | undefined;
  ExecutionDateMax: Date | undefined;
  AssignedManagerId: number | null;
  RequestTypeId: number | null;
  RequestArea: string | null;
}

export interface IRequestFilter {
  listTagFilter: string[];
  setListTagFilter: React.Dispatch<React.SetStateAction<string[]>>;
  listFilters: IListFilters;
  setListFilters: React.Dispatch<React.SetStateAction<IListFilters>>;
}
