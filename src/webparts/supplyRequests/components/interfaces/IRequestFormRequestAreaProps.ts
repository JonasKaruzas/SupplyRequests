import { IDropdownOption } from "@fluentui/react";

export interface IRequestFormRequestAreaProps {
  // eslint-disable-next-line @rushstack/no-new-null
  selectedOption: string | null;
  onOptionChange: (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption,
  ) => void;
  required?: boolean;
}
