/* eslint-disable @rushstack/no-new-null */
import { IListItem } from "./IListItem";
import { IRequestTypeListItem } from "./IRequestTypeListItem";
import { IRequestStatusListItem } from "./IRequestStatusListItem";
import { IRequestAreaOptions } from "./IRequestAreaOptions";
import { ICurrentUser } from "./ICurrentUser";

export interface IGlobalContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SpContext: any;
  SelectedListItemContext: IListItem | null;
  RequestsTypesContext: IRequestTypeListItem[] | undefined;
  RequestsStatusesContext: IRequestStatusListItem[] | null;
  RequestsAreaOptionsContext: IRequestAreaOptions[] | undefined;
  CurrentUserContext: ICurrentUser | undefined;
  AllUsersContext: ICurrentUser[] | undefined;
  IsUserAManagerContext: Promise<boolean> | boolean;
  updateListItemTags: (id: number, tagStrings: string) => Promise<void>;
}
