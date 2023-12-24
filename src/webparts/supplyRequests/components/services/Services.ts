import { IListItem } from "../interfaces/IListItem";
import { SPFI } from "@pnp/sp";
import { REQUESTS_LIST } from "../config/config";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

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
}

export default Services;
