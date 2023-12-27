/* eslint-disable @rushstack/no-new-null */
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IListItem } from "./IListItem";
import { IRequestTypeListItem } from "./IRequestTypeListItem";
import { IRequestStatusListItem } from "./IRequestStatusListItem";
import { IRequestAreaOptions } from "./IRequestAreaOptions";
import { ICurrentUser } from "./ICurrentUser";
import { ITag } from "@fluentui/react";

export interface IGlobalContext {
  SpContext: WebPartContext | null;
  SelectedListItemContext: IListItem | null;
  RequestsTypesContext: IRequestTypeListItem[] | undefined;
  RequestsStatusesContext: IRequestStatusListItem[] | null;
  RequestsAreaOptionsContext: IRequestAreaOptions[] | undefined;
  CurrentUserContext: ICurrentUser | null;
  AllUsersContext: ICurrentUser[] | undefined;
  IsUserAManagerContext: Promise<boolean> | boolean;
  AvailableTagsContext: ITag[] | [];
}
