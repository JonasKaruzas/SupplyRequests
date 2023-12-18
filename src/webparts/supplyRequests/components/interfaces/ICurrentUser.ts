export interface ICurrentUser {
  'odata.metadata': string;
  'odata.type': string;
  'odata.id': string;
  'odata.editLink': string;
  Id: number;
  IsHiddenInUI: boolean;
  LoginName: string;
  Title: string;
  PrincipalType: number;
  Email: string;
  Expiration: string;
  IsEmailAuthenticationGuestUser: boolean;
  IsShareByEmailGuestUser: boolean;
  IsSiteAdmin: boolean;
  UserId: UserId;
  UserPrincipalName: string;
}

interface UserId {
  NameId: string;
  NameIdIssuer: string;
}