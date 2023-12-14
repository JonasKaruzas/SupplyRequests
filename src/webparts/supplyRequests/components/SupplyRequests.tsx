import * as React from "react";
// import { useState, useEffect, createContext } from "react";
import { useState, useEffect } from "react";
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
// import { WebPartContext } from "@microsoft/sp-webpart-base";

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

  // const SpContext = createContext<WebPartContext | null>(context);

  const [requestsList, setRequestsList] = useState<IListItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | null>();
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

  const addItem = async (formData: object): Promise<void> => {
    await sp.web.lists.getByTitle(_requestsTable).items.add(formData);
    await getListItems();
    console.log(requestsList);
  };

  const deleteItem = async (id: number): Promise<void> => {
    const list = sp.web.lists.getByTitle(_requestsTable);
    await list.items.getById(id).delete();
    await getListItems();
  };

  const selectItem = (id: number): void => {
    setSelectedItem(id);
  };

  const hideFormPanel = (): void => {
    setFormPanelVisible(false);
    setSelectedItem(null);
  };

  const showFormPanel = () => {
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
    if (selectedItem) {
      setFormPanelVisible(true);
    }
  }, [selectItem]);

  return (
    // <SpContext.Provider value={props.context}>
    <FluentProvider theme={webLightTheme}>
      <div>{selectedItem}</div>
      <FormPanel
        onAddItem={addItem}
        onDelete={deleteItem}
        formPanelVisible={formPanelVisible}
        hideFormPanel={hideFormPanel}
        showFormPanel={showFormPanel}
      />

      {requestsList.length > 0 ? (
        <div>
          {requestsList.map((item) => (
            <ListItem
              key={item.Id}
              item={item}
              onDelete={deleteItem}
              onSelect={selectItem}
            />
          ))}
        </div>
      ) : (
        <Skeleton {...props}>
          <SkeletonItem />
        </Skeleton>
      )}
    </FluentProvider>
    // </SpContext.Provider>
  );
};

export default SupplyRequests;
