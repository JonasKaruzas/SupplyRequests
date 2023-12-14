import { IListItem } from "./IListItem";

export interface IListItemProps {
  item: IListItem;
  onDelete: (id: number) => Promise<void>;
  onSelect: (id: number) => void;
}