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

export interface CreateFavoriteData {
  favorite_upsert: Favorite_Key;
}

export interface CreateFavoriteVariables {
  propertyId: UUIDString;
}

export interface CreateLeadData {
  lead_insert: Lead_Key;
}

export interface CreateLeadVariables {
  propertyId: UUIDString;
  agentPhone: string;
  clientName: string;
  clientPhone: string;
  clientMessage?: string | null;
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

export interface CreateSavedSearchData {
  savedSearch_insert: SavedSearch_Key;
}

export interface CreateSavedSearchVariables {
  filters: string;
  label?: string | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface DeleteFavoriteData {
  favorite_delete?: Favorite_Key | null;
}

export interface DeleteFavoriteVariables {
  propertyId: UUIDString;
}

export interface DeletePropertyData {
  property_delete?: Property_Key | null;
}

export interface DeletePropertyVariables {
  id: UUIDString;
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

export interface Lead_Key {
  id: UUIDString;
  __typename?: 'Lead_Key';
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

export interface ListUserFavoritesData {
  favorites: ({
    property: {
      id: UUIDString;
      title: string;
      price: number;
      locality: string;
      bhkCount: number;
      imageUrls: string[];
      listingType: string;
    } & Property_Key;
  })[];
}

export interface ListUserPropertiesData {
  properties: ({
    id: UUIDString;
    title: string;
    price: number;
    locality: string;
    propertyType: string;
    listingType: string;
    isApproved: boolean;
    imageUrls: string[];
    createdAt: DateString;
  } & Property_Key)[];
}

export interface ListUserSavedSearchesData {
  savedSearches: ({
    id: UUIDString;
    filters: string;
    label?: string | null;
    createdAt: DateString;
  } & SavedSearch_Key)[];
}

export interface Property_Key {
  id: UUIDString;
  __typename?: 'Property_Key';
}

export interface Report_Key {
  id: UUIDString;
  __typename?: 'Report_Key';
}

export interface SavedSearch_Key {
  id: UUIDString;
  __typename?: 'SavedSearch_Key';
}

export interface UpdatePropertyStatusData {
  property_update?: Property_Key | null;
}

export interface UpdatePropertyStatusVariables {
  id: UUIDString;
  isApproved: boolean;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

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

interface ListUserPropertiesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserPropertiesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserPropertiesData, undefined>;
  operationName: string;
}
export const listUserPropertiesRef: ListUserPropertiesRef;

export function listUserProperties(options?: ExecuteQueryOptions): QueryPromise<ListUserPropertiesData, undefined>;
export function listUserProperties(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserPropertiesData, undefined>;

interface ListUserFavoritesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserFavoritesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserFavoritesData, undefined>;
  operationName: string;
}
export const listUserFavoritesRef: ListUserFavoritesRef;

export function listUserFavorites(options?: ExecuteQueryOptions): QueryPromise<ListUserFavoritesData, undefined>;
export function listUserFavorites(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserFavoritesData, undefined>;

interface ListUserSavedSearchesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserSavedSearchesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserSavedSearchesData, undefined>;
  operationName: string;
}
export const listUserSavedSearchesRef: ListUserSavedSearchesRef;

export function listUserSavedSearches(options?: ExecuteQueryOptions): QueryPromise<ListUserSavedSearchesData, undefined>;
export function listUserSavedSearches(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserSavedSearchesData, undefined>;

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

interface DeletePropertyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePropertyVariables): MutationRef<DeletePropertyData, DeletePropertyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePropertyVariables): MutationRef<DeletePropertyData, DeletePropertyVariables>;
  operationName: string;
}
export const deletePropertyRef: DeletePropertyRef;

export function deleteProperty(vars: DeletePropertyVariables): MutationPromise<DeletePropertyData, DeletePropertyVariables>;
export function deleteProperty(dc: DataConnect, vars: DeletePropertyVariables): MutationPromise<DeletePropertyData, DeletePropertyVariables>;

interface UpdatePropertyStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePropertyStatusVariables): MutationRef<UpdatePropertyStatusData, UpdatePropertyStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePropertyStatusVariables): MutationRef<UpdatePropertyStatusData, UpdatePropertyStatusVariables>;
  operationName: string;
}
export const updatePropertyStatusRef: UpdatePropertyStatusRef;

export function updatePropertyStatus(vars: UpdatePropertyStatusVariables): MutationPromise<UpdatePropertyStatusData, UpdatePropertyStatusVariables>;
export function updatePropertyStatus(dc: DataConnect, vars: UpdatePropertyStatusVariables): MutationPromise<UpdatePropertyStatusData, UpdatePropertyStatusVariables>;

interface CreateFavoriteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFavoriteVariables): MutationRef<CreateFavoriteData, CreateFavoriteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateFavoriteVariables): MutationRef<CreateFavoriteData, CreateFavoriteVariables>;
  operationName: string;
}
export const createFavoriteRef: CreateFavoriteRef;

export function createFavorite(vars: CreateFavoriteVariables): MutationPromise<CreateFavoriteData, CreateFavoriteVariables>;
export function createFavorite(dc: DataConnect, vars: CreateFavoriteVariables): MutationPromise<CreateFavoriteData, CreateFavoriteVariables>;

interface DeleteFavoriteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFavoriteVariables): MutationRef<DeleteFavoriteData, DeleteFavoriteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteFavoriteVariables): MutationRef<DeleteFavoriteData, DeleteFavoriteVariables>;
  operationName: string;
}
export const deleteFavoriteRef: DeleteFavoriteRef;

export function deleteFavorite(vars: DeleteFavoriteVariables): MutationPromise<DeleteFavoriteData, DeleteFavoriteVariables>;
export function deleteFavorite(dc: DataConnect, vars: DeleteFavoriteVariables): MutationPromise<DeleteFavoriteData, DeleteFavoriteVariables>;

interface CreateSavedSearchRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSavedSearchVariables): MutationRef<CreateSavedSearchData, CreateSavedSearchVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSavedSearchVariables): MutationRef<CreateSavedSearchData, CreateSavedSearchVariables>;
  operationName: string;
}
export const createSavedSearchRef: CreateSavedSearchRef;

export function createSavedSearch(vars: CreateSavedSearchVariables): MutationPromise<CreateSavedSearchData, CreateSavedSearchVariables>;
export function createSavedSearch(dc: DataConnect, vars: CreateSavedSearchVariables): MutationPromise<CreateSavedSearchData, CreateSavedSearchVariables>;

interface CreateLeadRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLeadVariables): MutationRef<CreateLeadData, CreateLeadVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLeadVariables): MutationRef<CreateLeadData, CreateLeadVariables>;
  operationName: string;
}
export const createLeadRef: CreateLeadRef;

export function createLead(vars: CreateLeadVariables): MutationPromise<CreateLeadData, CreateLeadVariables>;
export function createLead(dc: DataConnect, vars: CreateLeadVariables): MutationPromise<CreateLeadData, CreateLeadVariables>;

