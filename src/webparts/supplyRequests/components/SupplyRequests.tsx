import * as React from "react";
import { useState } from "react";
// import styles from './SupplyRequests.module.scss';
import type { ISupplyRequestsProps } from "./ISupplyRequestsProps";
// import { escape } from '@microsoft/sp-lodash-subset';

import {
  FluentProvider,
  webLightTheme,
  Skeleton,
  SkeletonItem,
} from "@fluentui/react-components";

import { SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IListItem } from "./IListItem";
import ListItem from "./ListItem";
import RequestForm from "./RequestForm";

const _requestsTable = "Requests";

const SupplyRequests: React.FC<ISupplyRequestsProps> = (
  props: ISupplyRequestsProps,
) => {
  const {
    // description,
    // isDarkTheme,
    // environmentMessage,
    // hasTeamsContext,
    // userDisplayName,
    context,
  } = props;

  const sp = spfi().using(SPFx(context));

  const [requestsList, setRequestsList] = useState<IListItem[]>([]);

  const getListItems = async () => {
    try {
      const items: any[] | [] = await sp.web.lists
        .getByTitle(_requestsTable)
        .items();
      setRequestsList(items);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (formData: object): Promise<void> => {
    console.log("adding item");
    console.log(formData);

    await sp.web.lists.getByTitle(_requestsTable).items.add(formData);
    await getListItems();
  };

  const deleteItem = async (id: number): Promise<void> => {
    const list = sp.web.lists.getByTitle(_requestsTable);
    await list.items.getById(id).delete();
    await getListItems();
  };

  console.log(requestsList);

  return (
    <FluentProvider theme={webLightTheme}>
      <button onClick={addItem}>ADD</button>
      <button onClick={getListItems}>Refresh</button>
      <RequestForm onAddItem={addItem} />

      {requestsList.length > 0 ? (
        <div>
          {requestsList.map((item) => (
            <ListItem key={item.Id} item={item} onDelete={deleteItem} />
          ))}
        </div>
      ) : (
        <Skeleton {...props}>
          <SkeletonItem />
        </Skeleton>
      )}
    </FluentProvider>
  );
};

export default SupplyRequests;
