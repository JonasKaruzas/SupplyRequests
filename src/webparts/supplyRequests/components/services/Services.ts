import { IListItem } from "../interfaces/IListItem";
import { SPFI } from "@pnp/sp";
import {
  REQUESTS_LIST,
  REQUESTS_REQUEST_AREA_COLUMN,
  REQUESTS_STATUSES_LIST,
  REQUESTS_TYPES_LIST,
} from "../config/config";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/taxonomy";
import "@pnp/sp/site-users/web";

import { IRequestStatusListItem } from "../interfaces/IRequestStatusListItem";
import { IRequestTypeListItem } from "../interfaces/IRequestTypeListItem";
import { ICurrentUser } from "../interfaces/ICurrentUser";
import { UserGroups } from "../enums/UserGroups";
import { IFieldInfo } from "@pnp/sp/fields/types";
import { IRequestAreaOptions } from "../interfaces/IRequestAreaOptions";
import { IFormState } from "../interfaces/IFormState";
import { IItemAddResult } from "@pnp/sp/items";

class Services {
  private sp: SPFI;

  constructor(sp: SPFI) {
    this.sp = sp;
  }

  private mapItems = async (list: IListItem[]): Promise<IListItem[]> => {
    const requestStatuses = await this.getStatusesItems();
    const requestTypes = await this.getTypesItems();
    const allUsers = await this.getAllUsers();

    return list.map((item) => {
      const findStatusText = (id: number): string => {
        if (Array.isArray(requestStatuses)) {
          return (
            requestStatuses.filter((item) => item.Id === id)[0]?.Title ?? ""
          );
        }
        return "";
      };

      const findTypeText = (id: number): string => {
        if (Array.isArray(requestTypes)) {
          return requestTypes.filter((item) => item.Id === id)[0]?.Title ?? "";
        }
        return "";
      };

      const findUserName = (id: number): string => {
        if (Array.isArray(allUsers)) {
          return allUsers.filter((item) => item.Id === id)[0]?.Title ?? "";
        }
        return "";
      };

      return {
        ...item,
        StatusText: findStatusText(item.StatusId),
        RequestTypeText: findTypeText(item.RequestTypeId),
        UserFullName: findUserName(item.AuthorId),
        AssignedManagerText: findUserName(item.AssignedManagerId),
      };
    });
  };

  public getListItems = async (): Promise<IListItem[] | undefined> => {
    try {
      const items: IListItem[] = await this.sp.web.lists
        .getByTitle(REQUESTS_LIST)
        .items();

      if (items && items.length > 0) {
        return this.mapItems(items);
      }

      return undefined;
    } catch (error) {
      console.error(error);
    }
  };

  public getStatusesItems = async (): Promise<
    IRequestStatusListItem[] | undefined
  > => {
    try {
      const items: IRequestStatusListItem[] = await this.sp.web.lists
        .getByTitle(REQUESTS_STATUSES_LIST)
        .items();

      if (items && items.length > 0) {
        return items;
      }

      return undefined;
    } catch (error) {
      console.error(error);
    }
  };

  public getTypesItems = async (): Promise<
    IRequestTypeListItem[] | undefined
  > => {
    try {
      const items: IRequestTypeListItem[] = await this.sp.web.lists
        .getByTitle(REQUESTS_TYPES_LIST)
        .items();

      if (items && items.length > 0) {
        return items;
      }

      return undefined;
    } catch (error) {
      console.error(error);
    }
  };

  public getCurrentUser = async (): Promise<ICurrentUser | undefined> => {
    try {
      const user: ICurrentUser = await this.sp.web.currentUser();

      if (user) {
        return user;
      }

      return undefined;
    } catch (error) {
      console.error(error);
    }
  };

  public getAllUsers = async (): Promise<ICurrentUser[] | undefined> => {
    try {
      const users: ICurrentUser[] = await this.sp.web.siteUsers();

      if (users && users.length > 0) {
        return users;
      }

      return undefined;
    } catch (error) {
      console.error(error);
    }
  };

  public getIsUserAManager = async (): Promise<boolean> => {
    try {
      const userGroups = await this.sp.web.currentUser.groups();

      const group = userGroups.filter(
        (item) => item.Id === UserGroups["SupplyDepartment Managers"],
      );

      if (group && group.length > 0) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  public getAreaOptions = async (): Promise<
    undefined | IRequestAreaOptions[]
  > => {
    try {
      const fields: IFieldInfo = await this.sp.web.lists
        .getByTitle(REQUESTS_LIST)
        .fields.getByInternalNameOrTitle(REQUESTS_REQUEST_AREA_COLUMN)();

      if (fields.Choices === undefined) {
        return undefined;
      } else {
        const emptyOption = [{ key: "emptyOption", text: "" }];

        const optionsArray: IRequestAreaOptions[] = fields.Choices.map(
          (item) => ({
            key: item,
            text: item,
          }),
        );

        return emptyOption.concat(optionsArray);
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  public updateTags = async (id: number, tagStrings: string): Promise<void> => {
    const fields = await this.sp.web.lists
      .getByTitle(REQUESTS_LIST)
      .fields.filter("Title eq 'Tags_0'")
      .select("Title", "InternalName")();

    const item = await this.sp.web.lists
      .getByTitle(REQUESTS_LIST)
      .items.getById(id);

    const updateVal: { [key: string]: unknown } = {};
    updateVal[fields[0].InternalName] = tagStrings;

    await item.update(updateVal);
  };

  public addItem = async (
    formData: IFormState,
  ): Promise<number | undefined> => {
    const res: IItemAddResult = await this.sp.web.lists
      .getByTitle(REQUESTS_LIST)
      .items.add(formData);

    if (res) {
      const id: number = res.data.Id;
      return id;
    }

    return undefined;
  };

  public deleteItem = async (id: number): Promise<void> => {
    const list = this.sp.web.lists.getByTitle(REQUESTS_LIST);
    await list.items.getById(id).delete();
  };

  public updateItem = async (formData: IFormState): Promise<void> => {
    if (!formData.Id) return;

    await this.sp.web.lists
      .getByTitle(REQUESTS_LIST)
      .items.getById(formData.Id)
      .update(formData);
  };

  public selectItemFromList = (
    id: number,
    requestsList: IListItem[],
  ): IListItem => {
    return requestsList.filter((item) => item.Id === id)[0];
  };
}

export default Services;
