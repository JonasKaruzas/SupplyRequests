interface ITag {
  Label: string
  TermGuid: string
  WssId: number
}

export interface IListItem {
  "odata.type": string
  "odata.id": string
  "odata.etag": string
  "odata.editLink": string
  FileSystemObjectType: number
  Id: number
  ServerRedirectedEmbedUrl: string
  ContentTypeId: string
  Title: string
  Description: string
  DueDate: string
  ExecutionDate: string
  RequestTypeId: number
  RequestTypeText: string
  RequestArea: string
  AssignedManagerId: number
  AssignedManagerStringId: string
  StatusId: number
  StatusText: string
  ID: number
  Modified: string
  Created: string
  AuthorId: number
  EditorId: number
  OData__UIVersionString: string
  Attachments: boolean
  GUID: string
  UserFullName: string
  AssignedManagerText: string
  Tags: ITag[]
}
