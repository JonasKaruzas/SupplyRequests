import { IListItem } from "../interfaces/IListItem";
import { SPFI } from "@pnp/sp";
import {
  REQUESTS_LIST,
  REQUESTS_REQUEST_AREA_COLUMN,
  REQUESTS_STATUSES_LIST,
  REQUESTS_TAGS_COLUMN,
  REQUESTS_TYPES_LIST,
} from "../config/config";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/site-users/web";

import { IRequestStatusListItem } from "../interfaces/IRequestStatusListItem";
import { IRequestTypeListItem } from "../interfaces/IRequestTypeListItem";
import { ICurrentUser } from "../interfaces/ICurrentUser";
import { UserGroups } from "../enums/UserGroups";
import { IFieldInfo } from "@pnp/sp/fields/types";
import { IRequestAreaOptions } from "../interfaces/IRequestAreaOptions";
import { ITermInfo } from "@pnp/sp/taxonomy";
import { IAvailableTags } from "../interfaces/IAvailableTags";
import { IFormState } from "../RequestForm";

class Services {
  private sp: SPFI;

  constructor(sp: SPFI) {
    this.sp = sp;
  }

  public getListItems = async (): Promise<IListItem[] | undefined> => {
    try {
      const items: IListItem[] = await this.sp.web.lists
        .getByTitle(REQUESTS_LIST)
        .items();

      if (items && items.length > 0) {
        return items;
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
      )[0];

      if (group) {
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
        const optionsArray: IRequestAreaOptions[] = fields.Choices.map(
          (item) => ({
            key: item,
            text: item,
          }),
        );

        return optionsArray;
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  public getTags = async (): Promise<IAvailableTags[]> => {
    try {
      const field: IFieldInfo & { TermSetId: string } = await this.sp.web.lists
        .getByTitle(REQUESTS_LIST)
        .fields.getByTitle(REQUESTS_TAGS_COLUMN)();

      const termSetId = field.TermSetId;

      const terms: ITermInfo[] = await this.sp.termStore.sets
        .getById(termSetId)
        .terms();

      const availableTags: IAvailableTags[] = terms.map((term) => ({
        key: term.id,
        name: term.labels[0].name,
      }));

      return availableTags;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  public updateTags = async (): Promise<void> => {
    // TODO: refactor

    const fields = await this.sp.web.lists
      .getByTitle(REQUESTS_LIST)
      .fields.filter("Title eq 'Tags_0'")
      .select("Title", "InternalName")();

    const oldItem = await this.sp.web.lists
      .getByTitle(REQUESTS_LIST)
      .items.getById(1);

    // to do that for each field value you need to serialize each as -1;#{field label}|{field id} joined by ";#"
    const updateVal: { [key: string]: unknown } = {};
    updateVal[fields[0].InternalName] =
      "-1;#null|7903d66e-6fb7-4faa-95c4-c9478a6ac149";

    await oldItem.update(updateVal);
  };

  public addItem = async (formData: IFormState): Promise<void> => {
    await this.sp.web.lists.getByTitle(REQUESTS_LIST).items.add(formData);
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
