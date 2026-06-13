import { CreateUserData, CreateUserVariables, CreatePropertyData, CreatePropertyVariables, UpdatePropertyData, UpdatePropertyVariables, ApprovePropertyData, ApprovePropertyVariables, DeletePropertyData, DeletePropertyVariables, UpdatePropertyStatusData, UpdatePropertyStatusVariables, CreateFavoriteData, CreateFavoriteVariables, DeleteFavoriteData, DeleteFavoriteVariables, CreateSavedSearchData, CreateSavedSearchVariables, CreateLeadData, CreateLeadVariables, RejectPropertyData, RejectPropertyVariables, ListApprovedPropertiesData, ListApprovedPropertiesVariables, GetPropertyByIdData, GetPropertyByIdVariables, ListPendingPropertiesData, ListUserPropertiesData, ListUserFavoritesData, ListUserSavedSearchesData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useCreateProperty(options?: useDataConnectMutationOptions<CreatePropertyData, FirebaseError, CreatePropertyVariables>): UseDataConnectMutationResult<CreatePropertyData, CreatePropertyVariables>;
export function useCreateProperty(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePropertyData, FirebaseError, CreatePropertyVariables>): UseDataConnectMutationResult<CreatePropertyData, CreatePropertyVariables>;

export function useUpdateProperty(options?: useDataConnectMutationOptions<UpdatePropertyData, FirebaseError, UpdatePropertyVariables>): UseDataConnectMutationResult<UpdatePropertyData, UpdatePropertyVariables>;
export function useUpdateProperty(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePropertyData, FirebaseError, UpdatePropertyVariables>): UseDataConnectMutationResult<UpdatePropertyData, UpdatePropertyVariables>;

export function useApproveProperty(options?: useDataConnectMutationOptions<ApprovePropertyData, FirebaseError, ApprovePropertyVariables>): UseDataConnectMutationResult<ApprovePropertyData, ApprovePropertyVariables>;
export function useApproveProperty(dc: DataConnect, options?: useDataConnectMutationOptions<ApprovePropertyData, FirebaseError, ApprovePropertyVariables>): UseDataConnectMutationResult<ApprovePropertyData, ApprovePropertyVariables>;

export function useDeleteProperty(options?: useDataConnectMutationOptions<DeletePropertyData, FirebaseError, DeletePropertyVariables>): UseDataConnectMutationResult<DeletePropertyData, DeletePropertyVariables>;
export function useDeleteProperty(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePropertyData, FirebaseError, DeletePropertyVariables>): UseDataConnectMutationResult<DeletePropertyData, DeletePropertyVariables>;

export function useUpdatePropertyStatus(options?: useDataConnectMutationOptions<UpdatePropertyStatusData, FirebaseError, UpdatePropertyStatusVariables>): UseDataConnectMutationResult<UpdatePropertyStatusData, UpdatePropertyStatusVariables>;
export function useUpdatePropertyStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePropertyStatusData, FirebaseError, UpdatePropertyStatusVariables>): UseDataConnectMutationResult<UpdatePropertyStatusData, UpdatePropertyStatusVariables>;

export function useCreateFavorite(options?: useDataConnectMutationOptions<CreateFavoriteData, FirebaseError, CreateFavoriteVariables>): UseDataConnectMutationResult<CreateFavoriteData, CreateFavoriteVariables>;
export function useCreateFavorite(dc: DataConnect, options?: useDataConnectMutationOptions<CreateFavoriteData, FirebaseError, CreateFavoriteVariables>): UseDataConnectMutationResult<CreateFavoriteData, CreateFavoriteVariables>;

export function useDeleteFavorite(options?: useDataConnectMutationOptions<DeleteFavoriteData, FirebaseError, DeleteFavoriteVariables>): UseDataConnectMutationResult<DeleteFavoriteData, DeleteFavoriteVariables>;
export function useDeleteFavorite(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteFavoriteData, FirebaseError, DeleteFavoriteVariables>): UseDataConnectMutationResult<DeleteFavoriteData, DeleteFavoriteVariables>;

export function useCreateSavedSearch(options?: useDataConnectMutationOptions<CreateSavedSearchData, FirebaseError, CreateSavedSearchVariables>): UseDataConnectMutationResult<CreateSavedSearchData, CreateSavedSearchVariables>;
export function useCreateSavedSearch(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSavedSearchData, FirebaseError, CreateSavedSearchVariables>): UseDataConnectMutationResult<CreateSavedSearchData, CreateSavedSearchVariables>;

export function useCreateLead(options?: useDataConnectMutationOptions<CreateLeadData, FirebaseError, CreateLeadVariables>): UseDataConnectMutationResult<CreateLeadData, CreateLeadVariables>;
export function useCreateLead(dc: DataConnect, options?: useDataConnectMutationOptions<CreateLeadData, FirebaseError, CreateLeadVariables>): UseDataConnectMutationResult<CreateLeadData, CreateLeadVariables>;

export function useRejectProperty(options?: useDataConnectMutationOptions<RejectPropertyData, FirebaseError, RejectPropertyVariables>): UseDataConnectMutationResult<RejectPropertyData, RejectPropertyVariables>;
export function useRejectProperty(dc: DataConnect, options?: useDataConnectMutationOptions<RejectPropertyData, FirebaseError, RejectPropertyVariables>): UseDataConnectMutationResult<RejectPropertyData, RejectPropertyVariables>;

export function useListApprovedProperties(vars: ListApprovedPropertiesVariables, options?: useDataConnectQueryOptions<ListApprovedPropertiesData>): UseDataConnectQueryResult<ListApprovedPropertiesData, ListApprovedPropertiesVariables>;
export function useListApprovedProperties(dc: DataConnect, vars: ListApprovedPropertiesVariables, options?: useDataConnectQueryOptions<ListApprovedPropertiesData>): UseDataConnectQueryResult<ListApprovedPropertiesData, ListApprovedPropertiesVariables>;

export function useGetPropertyById(vars: GetPropertyByIdVariables, options?: useDataConnectQueryOptions<GetPropertyByIdData>): UseDataConnectQueryResult<GetPropertyByIdData, GetPropertyByIdVariables>;
export function useGetPropertyById(dc: DataConnect, vars: GetPropertyByIdVariables, options?: useDataConnectQueryOptions<GetPropertyByIdData>): UseDataConnectQueryResult<GetPropertyByIdData, GetPropertyByIdVariables>;

export function useListPendingProperties(options?: useDataConnectQueryOptions<ListPendingPropertiesData>): UseDataConnectQueryResult<ListPendingPropertiesData, undefined>;
export function useListPendingProperties(dc: DataConnect, options?: useDataConnectQueryOptions<ListPendingPropertiesData>): UseDataConnectQueryResult<ListPendingPropertiesData, undefined>;

export function useListUserProperties(options?: useDataConnectQueryOptions<ListUserPropertiesData>): UseDataConnectQueryResult<ListUserPropertiesData, undefined>;
export function useListUserProperties(dc: DataConnect, options?: useDataConnectQueryOptions<ListUserPropertiesData>): UseDataConnectQueryResult<ListUserPropertiesData, undefined>;

export function useListUserFavorites(options?: useDataConnectQueryOptions<ListUserFavoritesData>): UseDataConnectQueryResult<ListUserFavoritesData, undefined>;
export function useListUserFavorites(dc: DataConnect, options?: useDataConnectQueryOptions<ListUserFavoritesData>): UseDataConnectQueryResult<ListUserFavoritesData, undefined>;

export function useListUserSavedSearches(options?: useDataConnectQueryOptions<ListUserSavedSearchesData>): UseDataConnectQueryResult<ListUserSavedSearchesData, undefined>;
export function useListUserSavedSearches(dc: DataConnect, options?: useDataConnectQueryOptions<ListUserSavedSearchesData>): UseDataConnectQueryResult<ListUserSavedSearchesData, undefined>;
