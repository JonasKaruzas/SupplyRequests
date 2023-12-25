import { IListItem } from "./IListItem";

export interface IRequestListProps {
  list: IListItem[] | undefined;
  onSelect: (id: number) => void;
}
