import * as React from "react";
import { useContext } from "react";
import { GlobalContext } from "./SupplyRequests";

const TestComponent: React.FC = () => {
  const globalContext = useContext(GlobalContext);

  const selectedItem = globalContext?.SelectedListItemContext?.Id;

  return (
    <>
      <div>GlobalContext ID</div>
      <div>{selectedItem ? selectedItem : "nope"}</div>
    </>
  );
};

export default TestComponent;
