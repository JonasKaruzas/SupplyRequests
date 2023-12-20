import * as React from "react";
import { useContext } from "react";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { UserGroups } from "./enums/UserGroups";
import { SpContext } from "./SupplyRequests";
import { IPersonaProps } from "@fluentui/react";
import { IRequestFormPeoplePickerProps } from "./interfaces/IRequestFormPeoplePickerProps";
import { AllUsersContext } from "./SupplyRequests";

const RequestFormPeoplePicker: React.FC<IRequestFormPeoplePickerProps> = (
  props: IRequestFormPeoplePickerProps,
) => {
  const spContext = useContext(SpContext);
  const allUsers = useContext(AllUsersContext);

  const findUserName = (id: number | null): string => {
    if (id === undefined || id === undefined) return "";

    let res = "";

    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].Id === id) {
        res = allUsers[i].Title;
        break;
      }
    }
    return res;
  };

  const onPeoplePickerChange = (items: IPersonaProps[]): void => {
    props.onManagerChange(items);
  };

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
      resolveDelay={1000}
      required
      defaultSelectedUsers={[findUserName(props.assignedManager)]}
    />
  ) : null;
};
export default RequestFormPeoplePicker;
