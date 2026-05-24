import { CreateUserData, CreateUserVariables, CreatePropertyData, CreatePropertyVariables, ApprovePropertyData, ApprovePropertyVariables, ListApprovedPropertiesData, ListApprovedPropertiesVariables, GetPropertyByIdData, GetPropertyByIdVariables, ListPendingPropertiesData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useCreateProperty(options?: useDataConnectMutationOptions<CreatePropertyData, FirebaseError, CreatePropertyVariables>): UseDataConnectMutationResult<CreatePropertyData, CreatePropertyVariables>;
export function useCreateProperty(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePropertyData, FirebaseError, CreatePropertyVariables>): UseDataConnectMutationResult<CreatePropertyData, CreatePropertyVariables>;

export function useApproveProperty(options?: useDataConnectMutationOptions<ApprovePropertyData, FirebaseError, ApprovePropertyVariables>): UseDataConnectMutationResult<ApprovePropertyData, ApprovePropertyVariables>;
export function useApproveProperty(dc: DataConnect, options?: useDataConnectMutationOptions<ApprovePropertyData, FirebaseError, ApprovePropertyVariables>): UseDataConnectMutationResult<ApprovePropertyData, ApprovePropertyVariables>;

export function useListApprovedProperties(vars: ListApprovedPropertiesVariables, options?: useDataConnectQueryOptions<ListApprovedPropertiesData>): UseDataConnectQueryResult<ListApprovedPropertiesData, ListApprovedPropertiesVariables>;
export function useListApprovedProperties(dc: DataConnect, vars: ListApprovedPropertiesVariables, options?: useDataConnectQueryOptions<ListApprovedPropertiesData>): UseDataConnectQueryResult<ListApprovedPropertiesData, ListApprovedPropertiesVariables>;

export function useGetPropertyById(vars: GetPropertyByIdVariables, options?: useDataConnectQueryOptions<GetPropertyByIdData>): UseDataConnectQueryResult<GetPropertyByIdData, GetPropertyByIdVariables>;
export function useGetPropertyById(dc: DataConnect, vars: GetPropertyByIdVariables, options?: useDataConnectQueryOptions<GetPropertyByIdData>): UseDataConnectQueryResult<GetPropertyByIdData, GetPropertyByIdVariables>;

export function useListPendingProperties(options?: useDataConnectQueryOptions<ListPendingPropertiesData>): UseDataConnectQueryResult<ListPendingPropertiesData, undefined>;
export function useListPendingProperties(dc: DataConnect, options?: useDataConnectQueryOptions<ListPendingPropertiesData>): UseDataConnectQueryResult<ListPendingPropertiesData, undefined>;
