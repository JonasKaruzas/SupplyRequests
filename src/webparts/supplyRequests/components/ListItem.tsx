import * as React from "react";

import { Button, Card } from "@fluentui/react-components";
import { IListItemProps } from "./IListItemProps";

import { EditRegular } from "@fluentui/react-icons";

const ListItem: React.FC<IListItemProps> = (props: IListItemProps) => {
  return (
    <Card orientation="horizontal">
      <div>
        <div>Author</div>
        <div>{props.item.AuthorId}</div>
      </div>
      <div>
        <div>Title</div>
        <div>{props.item.Title}</div>
      </div>
      <div>
        <div>DueDate</div>
        <div>{props.item.DueDate}</div>
      </div>
      <div>
        <div>ExecutionDate</div>
        <div>{props.item.ExecutionDate}</div>
      </div>
      <Button
        shape="circular"
        onClick={() => props.onSelect(props.item.Id)}
        icon={<EditRegular />}
      />
    </Card>
  );
};

export default ListItem;
