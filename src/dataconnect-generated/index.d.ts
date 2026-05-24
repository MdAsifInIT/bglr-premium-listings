import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ApprovePropertyData {
  property_update?: Property_Key | null;
}

export interface ApprovePropertyVariables {
  id: UUIDString;
}

export interface CreatePropertyData {
  property_insert: Property_Key;
}

export interface CreatePropertyVariables {
  title: string;
  description: string;
  price: number;
  bhkCount: number;
  propertyType: string;
  listingType: string;
  locality: string;
  latitude: number;
  longitude: number;
  imageUrls: string[];
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface Favorite_Key {
  userId: string;
  propertyId: UUIDString;
  __typename?: 'Favorite_Key';
}

export interface GetPropertyByIdData {
  property?: {
    id: UUIDString;
    title: string;
    description: string;
    price: number;
    bhkCount: number;
    propertyType: string;
    listingType: string;
    locality: string;
    latitude: number;
    longitude: number;
    imageUrls: string[];
    owner: {
      fullName: string;
      phoneNumber: string;
    };
  } & Property_Key;
}

export interface GetPropertyByIdVariables {
  id: UUIDString;
}

export interface ListApprovedPropertiesData {
  properties: ({
    id: UUIDString;
    title: string;
    description: string;
    price: number;
    bhkCount: number;
    propertyType: string;
    listingType: string;
    locality: string;
    latitude: number;
    longitude: number;
    imageUrls: string[];
  } & Property_Key)[];
}

export interface ListApprovedPropertiesVariables {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export interface ListPendingPropertiesData {
  properties: ({
    id: UUIDString;
    title: string;
    price: number;
    locality: string;
    propertyType: string;
    listingType: string;
    owner: {
      fullName: string;
    };
  } & Property_Key)[];
}

export interface Property_Key {
  id: UUIDString;
  __typename?: 'Property_Key';
}

export interface Report_Key {
  id: UUIDString;
  __typename?: 'Report_Key';
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreatePropertyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePropertyVariables): MutationRef<CreatePropertyData, CreatePropertyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePropertyVariables): MutationRef<CreatePropertyData, CreatePropertyVariables>;
  operationName: string;
}
export const createPropertyRef: CreatePropertyRef;

export function createProperty(vars: CreatePropertyVariables): MutationPromise<CreatePropertyData, CreatePropertyVariables>;
export function createProperty(dc: DataConnect, vars: CreatePropertyVariables): MutationPromise<CreatePropertyData, CreatePropertyVariables>;

interface ApprovePropertyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ApprovePropertyVariables): MutationRef<ApprovePropertyData, ApprovePropertyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ApprovePropertyVariables): MutationRef<ApprovePropertyData, ApprovePropertyVariables>;
  operationName: string;
}
export const approvePropertyRef: ApprovePropertyRef;

export function approveProperty(vars: ApprovePropertyVariables): MutationPromise<ApprovePropertyData, ApprovePropertyVariables>;
export function approveProperty(dc: DataConnect, vars: ApprovePropertyVariables): MutationPromise<ApprovePropertyData, ApprovePropertyVariables>;

interface ListApprovedPropertiesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListApprovedPropertiesVariables): QueryRef<ListApprovedPropertiesData, ListApprovedPropertiesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListApprovedPropertiesVariables): QueryRef<ListApprovedPropertiesData, ListApprovedPropertiesVariables>;
  operationName: string;
}
export const listApprovedPropertiesRef: ListApprovedPropertiesRef;

export function listApprovedProperties(vars: ListApprovedPropertiesVariables, options?: ExecuteQueryOptions): QueryPromise<ListApprovedPropertiesData, ListApprovedPropertiesVariables>;
export function listApprovedProperties(dc: DataConnect, vars: ListApprovedPropertiesVariables, options?: ExecuteQueryOptions): QueryPromise<ListApprovedPropertiesData, ListApprovedPropertiesVariables>;

interface GetPropertyByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPropertyByIdVariables): QueryRef<GetPropertyByIdData, GetPropertyByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPropertyByIdVariables): QueryRef<GetPropertyByIdData, GetPropertyByIdVariables>;
  operationName: string;
}
export const getPropertyByIdRef: GetPropertyByIdRef;

export function getPropertyById(vars: GetPropertyByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetPropertyByIdData, GetPropertyByIdVariables>;
export function getPropertyById(dc: DataConnect, vars: GetPropertyByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetPropertyByIdData, GetPropertyByIdVariables>;

interface ListPendingPropertiesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPendingPropertiesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPendingPropertiesData, undefined>;
  operationName: string;
}
export const listPendingPropertiesRef: ListPendingPropertiesRef;

export function listPendingProperties(options?: ExecuteQueryOptions): QueryPromise<ListPendingPropertiesData, undefined>;
export function listPendingProperties(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPendingPropertiesData, undefined>;

