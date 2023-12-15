import * as React from "react";
import { useState, useEffect, createContext } from "react";
import type { ISupplyRequestsProps } from "./ISupplyRequestsProps";

import FormPanel from "./FormPanel";

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
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFormState } from "./RequestForm";
import { DetailsListDocumentsExample } from "./DetailsListDocumentsExample";
import RequestList from "./RequestList";

const _requestsTable = "Requests";

export const SpContext = createContext<WebPartContext | null>(null);
export const SelectedListItemContext = createContext<IListItem | null>(null);

const SupplyRequests: React.FC<ISupplyRequestsProps> = (
  props: ISupplyRequestsProps,
) => {
  const { context } = props;
  const sp = spfi().using(SPFx(context));

  const [requestsList, setRequestsList] = useState<IListItem[]>([]);
  const [selectedListItem, setSelectedListItem] = useState<IListItem | null>(
    null,
  );
  const [formPanelVisible, setFormPanelVisible] = useState<boolean>(false);

  const getListItems = async (): Promise<void> => {
    try {
      const items: IListItem[] | [] = await sp.web.lists
        .getByTitle(_requestsTable)
        .items();
      setRequestsList(items);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (formData: IFormState): Promise<void> => {
    await sp.web.lists.getByTitle(_requestsTable).items.add(formData);
    await getListItems();
  };

  const deleteItem = async (id: number): Promise<void> => {
    const list = sp.web.lists.getByTitle(_requestsTable);
    await list.items.getById(id).delete();
    await getListItems();
  };

  const updateItem = async (formData: IFormState): Promise<void> => {
    await sp.web.lists
      .getByTitle(_requestsTable)
      .items.getById(formData.Id)
      .update(formData);
    await getListItems();
  };

  const selectItem = (id: number): void => {
    const findItem = (id: number): IListItem | null => {
      let res = null;

      for (let i = 0; i < requestsList.length; i++) {
        if (requestsList[i].Id === id) {
          res = { ...requestsList[i] };
          break;
        }
      }
      return res;
    };

    const foundItem = findItem(id);

    setSelectedListItem(foundItem);
  };

  const hideFormPanel = (): void => {
    setFormPanelVisible(false);
    setSelectedListItem(null);
  };

  const showFormPanel = (): void => {
    setFormPanelVisible(true);
  };

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        await getListItems();
      } catch (error) {
        console.log(error);
      }
    };

    getData().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedListItem) {
      setFormPanelVisible(true);
    }
  }, [selectItem]);

  return (
    <SpContext.Provider value={props.context}>
      <SelectedListItemContext.Provider value={selectedListItem}>
        <FluentProvider theme={webLightTheme}>
          <FormPanel
            onAddItem={addItem}
            onDelete={deleteItem}
            onUpdateItem={updateItem}
            formPanelVisible={formPanelVisible}
            hideFormPanel={hideFormPanel}
            showFormPanel={showFormPanel}
          />

          <RequestList />

          <DetailsListDocumentsExample />
          {requestsList.length > 0 ? (
            <div>
              {requestsList.map((item) => (
                <ListItem key={item.Id} item={item} onSelect={selectItem} />
              ))}
            </div>
          ) : (
            <Skeleton {...props}>
              <SkeletonItem />
            </Skeleton>
          )}
        </FluentProvider>
      </SelectedListItemContext.Provider>
    </SpContext.Provider>
  );
};

export default SupplyRequests;
