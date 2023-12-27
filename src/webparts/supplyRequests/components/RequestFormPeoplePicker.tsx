import * as React from "react";
import { useContext } from "react";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { UserGroups } from "./enums/UserGroups";
import { IPersonaProps } from "@fluentui/react";
import { IRequestFormPeoplePickerProps } from "./interfaces/IRequestFormPeoplePickerProps";

import { GlobalContext } from "./SupplyRequests";

const RequestFormPeoplePicker: React.FC<IRequestFormPeoplePickerProps> = (
  props: IRequestFormPeoplePickerProps,
) => {
  const globalContext = useContext(GlobalContext);
  const spContext = globalContext?.SpContext;
  const allUsers = globalContext?.AllUsersContext || [];

  const findUserName = (id: number | null): string => {
    if (id === undefined || id === null) return "";

    return allUsers.filter((item) => item.Id === id)[0].Title ?? "";
  };

  const onPeoplePickerChange = (items: IPersonaProps[]): void => {
    props.onManagerChange(items);
  };

  console.log(props.assignedManager);

  return spContext ? (
    <PeoplePicker
      context={spContext}
      titleText="Assigned Manager"
      personSelectionLimit={1}
      groupName={"SupplyDepartment Managers"}
      groupId={UserGroups["SupplyDepartment Employees"]}
      showtooltip={true}
      onChange={onPeoplePickerChange}
      ensureUser={true}
      principalTypes={[PrincipalType.User]}
      resolveDelay={500}
      required
      defaultSelectedUsers={[findUserName(props.assignedManager)]}
    />
  ) : null;
};
export default RequestFormPeoplePicker;
