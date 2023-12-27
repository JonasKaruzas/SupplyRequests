import { ITag } from "@fluentui/react";

export interface RequestFormTagPickerProps {
  selectedTags?: ITag[] | string;
  onTagsChange: (tagsIds: string[]) => void;
}
