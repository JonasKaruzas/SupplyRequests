import { IListItem } from "./IListItem";
import { IListFilters } from "./IRequestFilter";

export interface IRequestListProps {
  list: IListItem[] | undefined;
  onSelect: (id: number) => void;
  listFilters: IListFilters;
}
