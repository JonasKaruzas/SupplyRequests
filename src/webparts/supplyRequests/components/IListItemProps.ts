import { IListItem } from "./IListItem";

export interface IListItemProps {
  item: IListItem;
  onSelect: (id: number) => void;
}