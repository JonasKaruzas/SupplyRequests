export interface IListFilters {
  Title: string;
  Description: string;
  DueDateMin: Date | undefined;
  DueDateMax: Date | undefined;
  ExecutionDateMin: Date | undefined;
  ExecutionDateMax: Date | undefined;
}

export interface IRequestFilter {
  listFilters: IListFilters;
  setListFilters: React.Dispatch<React.SetStateAction<IListFilters>>;
  clearFilters: () => void;
}
