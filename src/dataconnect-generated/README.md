# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListApprovedProperties*](#listapprovedproperties)
  - [*GetPropertyById*](#getpropertybyid)
  - [*ListPendingProperties*](#listpendingproperties)
  - [*ListUserProperties*](#listuserproperties)
  - [*ListUserFavorites*](#listuserfavorites)
  - [*ListUserSavedSearches*](#listusersavedsearches)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*CreateProperty*](#createproperty)
  - [*ApproveProperty*](#approveproperty)
  - [*DeleteProperty*](#deleteproperty)
  - [*UpdatePropertyStatus*](#updatepropertystatus)
  - [*CreateFavorite*](#createfavorite)
  - [*DeleteFavorite*](#deletefavorite)
  - [*CreateSavedSearch*](#createsavedsearch)
  - [*CreateLead*](#createlead)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListApprovedProperties
You can execute the `ListApprovedProperties` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listApprovedProperties(vars: ListApprovedPropertiesVariables, options?: ExecuteQueryOptions): QueryPromise<ListApprovedPropertiesData, ListApprovedPropertiesVariables>;

interface ListApprovedPropertiesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListApprovedPropertiesVariables): QueryRef<ListApprovedPropertiesData, ListApprovedPropertiesVariables>;
}
export const listApprovedPropertiesRef: ListApprovedPropertiesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listApprovedProperties(dc: DataConnect, vars: ListApprovedPropertiesVariables, options?: ExecuteQueryOptions): QueryPromise<ListApprovedPropertiesData, ListApprovedPropertiesVariables>;

interface ListApprovedPropertiesRef {
  ...
  (dc: DataConnect, vars: ListApprovedPropertiesVariables): QueryRef<ListApprovedPropertiesData, ListApprovedPropertiesVariables>;
}
export const listApprovedPropertiesRef: ListApprovedPropertiesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listApprovedPropertiesRef:
```typescript
const name = listApprovedPropertiesRef.operationName;
console.log(name);
```

### Variables
The `ListApprovedProperties` query requires an argument of type `ListApprovedPropertiesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListApprovedPropertiesVariables {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}
```
### Return Type
Recall that executing the `ListApprovedProperties` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListApprovedPropertiesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListApprovedProperties`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listApprovedProperties, ListApprovedPropertiesVariables } from '@dataconnect/generated';

// The `ListApprovedProperties` query requires an argument of type `ListApprovedPropertiesVariables`:
const listApprovedPropertiesVars: ListApprovedPropertiesVariables = {
  minLat: ..., 
  maxLat: ..., 
  minLng: ..., 
  maxLng: ..., 
};

// Call the `listApprovedProperties()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listApprovedProperties(listApprovedPropertiesVars);
// Variables can be defined inline as well.
const { data } = await listApprovedProperties({ minLat: ..., maxLat: ..., minLng: ..., maxLng: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listApprovedProperties(dataConnect, listApprovedPropertiesVars);

console.log(data.properties);

// Or, you can use the `Promise` API.
listApprovedProperties(listApprovedPropertiesVars).then((response) => {
  const data = response.data;
  console.log(data.properties);
});
```

### Using `ListApprovedProperties`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listApprovedPropertiesRef, ListApprovedPropertiesVariables } from '@dataconnect/generated';

// The `ListApprovedProperties` query requires an argument of type `ListApprovedPropertiesVariables`:
const listApprovedPropertiesVars: ListApprovedPropertiesVariables = {
  minLat: ..., 
  maxLat: ..., 
  minLng: ..., 
  maxLng: ..., 
};

// Call the `listApprovedPropertiesRef()` function to get a reference to the query.
const ref = listApprovedPropertiesRef(listApprovedPropertiesVars);
// Variables can be defined inline as well.
const ref = listApprovedPropertiesRef({ minLat: ..., maxLat: ..., minLng: ..., maxLng: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listApprovedPropertiesRef(dataConnect, listApprovedPropertiesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.properties);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.properties);
});
```

## GetPropertyById
You can execute the `GetPropertyById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPropertyById(vars: GetPropertyByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetPropertyByIdData, GetPropertyByIdVariables>;

interface GetPropertyByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPropertyByIdVariables): QueryRef<GetPropertyByIdData, GetPropertyByIdVariables>;
}
export const getPropertyByIdRef: GetPropertyByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPropertyById(dc: DataConnect, vars: GetPropertyByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetPropertyByIdData, GetPropertyByIdVariables>;

interface GetPropertyByIdRef {
  ...
  (dc: DataConnect, vars: GetPropertyByIdVariables): QueryRef<GetPropertyByIdData, GetPropertyByIdVariables>;
}
export const getPropertyByIdRef: GetPropertyByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPropertyByIdRef:
```typescript
const name = getPropertyByIdRef.operationName;
console.log(name);
```

### Variables
The `GetPropertyById` query requires an argument of type `GetPropertyByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPropertyByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetPropertyById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPropertyByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPropertyById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPropertyById, GetPropertyByIdVariables } from '@dataconnect/generated';

// The `GetPropertyById` query requires an argument of type `GetPropertyByIdVariables`:
const getPropertyByIdVars: GetPropertyByIdVariables = {
  id: ..., 
};

// Call the `getPropertyById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPropertyById(getPropertyByIdVars);
// Variables can be defined inline as well.
const { data } = await getPropertyById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPropertyById(dataConnect, getPropertyByIdVars);

console.log(data.property);

// Or, you can use the `Promise` API.
getPropertyById(getPropertyByIdVars).then((response) => {
  const data = response.data;
  console.log(data.property);
});
```

### Using `GetPropertyById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPropertyByIdRef, GetPropertyByIdVariables } from '@dataconnect/generated';

// The `GetPropertyById` query requires an argument of type `GetPropertyByIdVariables`:
const getPropertyByIdVars: GetPropertyByIdVariables = {
  id: ..., 
};

// Call the `getPropertyByIdRef()` function to get a reference to the query.
const ref = getPropertyByIdRef(getPropertyByIdVars);
// Variables can be defined inline as well.
const ref = getPropertyByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPropertyByIdRef(dataConnect, getPropertyByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.property);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.property);
});
```

## ListPendingProperties
You can execute the `ListPendingProperties` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPendingProperties(options?: ExecuteQueryOptions): QueryPromise<ListPendingPropertiesData, undefined>;

interface ListPendingPropertiesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPendingPropertiesData, undefined>;
}
export const listPendingPropertiesRef: ListPendingPropertiesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPendingProperties(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPendingPropertiesData, undefined>;

interface ListPendingPropertiesRef {
  ...
  (dc: DataConnect): QueryRef<ListPendingPropertiesData, undefined>;
}
export const listPendingPropertiesRef: ListPendingPropertiesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPendingPropertiesRef:
```typescript
const name = listPendingPropertiesRef.operationName;
console.log(name);
```

### Variables
The `ListPendingProperties` query has no variables.
### Return Type
Recall that executing the `ListPendingProperties` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPendingPropertiesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListPendingProperties`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPendingProperties } from '@dataconnect/generated';


// Call the `listPendingProperties()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPendingProperties();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPendingProperties(dataConnect);

console.log(data.properties);

// Or, you can use the `Promise` API.
listPendingProperties().then((response) => {
  const data = response.data;
  console.log(data.properties);
});
```

### Using `ListPendingProperties`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPendingPropertiesRef } from '@dataconnect/generated';


// Call the `listPendingPropertiesRef()` function to get a reference to the query.
const ref = listPendingPropertiesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPendingPropertiesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.properties);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.properties);
});
```

## ListUserProperties
You can execute the `ListUserProperties` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserProperties(options?: ExecuteQueryOptions): QueryPromise<ListUserPropertiesData, undefined>;

interface ListUserPropertiesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserPropertiesData, undefined>;
}
export const listUserPropertiesRef: ListUserPropertiesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserProperties(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserPropertiesData, undefined>;

interface ListUserPropertiesRef {
  ...
  (dc: DataConnect): QueryRef<ListUserPropertiesData, undefined>;
}
export const listUserPropertiesRef: ListUserPropertiesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserPropertiesRef:
```typescript
const name = listUserPropertiesRef.operationName;
console.log(name);
```

### Variables
The `ListUserProperties` query has no variables.
### Return Type
Recall that executing the `ListUserProperties` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserPropertiesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListUserProperties`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserProperties } from '@dataconnect/generated';


// Call the `listUserProperties()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserProperties();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserProperties(dataConnect);

console.log(data.properties);

// Or, you can use the `Promise` API.
listUserProperties().then((response) => {
  const data = response.data;
  console.log(data.properties);
});
```

### Using `ListUserProperties`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserPropertiesRef } from '@dataconnect/generated';


// Call the `listUserPropertiesRef()` function to get a reference to the query.
const ref = listUserPropertiesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserPropertiesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.properties);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.properties);
});
```

## ListUserFavorites
You can execute the `ListUserFavorites` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserFavorites(options?: ExecuteQueryOptions): QueryPromise<ListUserFavoritesData, undefined>;

interface ListUserFavoritesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserFavoritesData, undefined>;
}
export const listUserFavoritesRef: ListUserFavoritesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserFavorites(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserFavoritesData, undefined>;

interface ListUserFavoritesRef {
  ...
  (dc: DataConnect): QueryRef<ListUserFavoritesData, undefined>;
}
export const listUserFavoritesRef: ListUserFavoritesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserFavoritesRef:
```typescript
const name = listUserFavoritesRef.operationName;
console.log(name);
```

### Variables
The `ListUserFavorites` query has no variables.
### Return Type
Recall that executing the `ListUserFavorites` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserFavoritesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListUserFavorites`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserFavorites } from '@dataconnect/generated';


// Call the `listUserFavorites()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserFavorites();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserFavorites(dataConnect);

console.log(data.favorites);

// Or, you can use the `Promise` API.
listUserFavorites().then((response) => {
  const data = response.data;
  console.log(data.favorites);
});
```

### Using `ListUserFavorites`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserFavoritesRef } from '@dataconnect/generated';


// Call the `listUserFavoritesRef()` function to get a reference to the query.
const ref = listUserFavoritesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserFavoritesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.favorites);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.favorites);
});
```

## ListUserSavedSearches
You can execute the `ListUserSavedSearches` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserSavedSearches(options?: ExecuteQueryOptions): QueryPromise<ListUserSavedSearchesData, undefined>;

interface ListUserSavedSearchesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserSavedSearchesData, undefined>;
}
export const listUserSavedSearchesRef: ListUserSavedSearchesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserSavedSearches(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserSavedSearchesData, undefined>;

interface ListUserSavedSearchesRef {
  ...
  (dc: DataConnect): QueryRef<ListUserSavedSearchesData, undefined>;
}
export const listUserSavedSearchesRef: ListUserSavedSearchesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserSavedSearchesRef:
```typescript
const name = listUserSavedSearchesRef.operationName;
console.log(name);
```

### Variables
The `ListUserSavedSearches` query has no variables.
### Return Type
Recall that executing the `ListUserSavedSearches` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserSavedSearchesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUserSavedSearchesData {
  savedSearches: ({
    id: UUIDString;
    filters: string;
    label?: string | null;
    createdAt: DateString;
  } & SavedSearch_Key)[];
}
```
### Using `ListUserSavedSearches`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserSavedSearches } from '@dataconnect/generated';


// Call the `listUserSavedSearches()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserSavedSearches();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserSavedSearches(dataConnect);

console.log(data.savedSearches);

// Or, you can use the `Promise` API.
listUserSavedSearches().then((response) => {
  const data = response.data;
  console.log(data.savedSearches);
});
```

### Using `ListUserSavedSearches`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserSavedSearchesRef } from '@dataconnect/generated';


// Call the `listUserSavedSearchesRef()` function to get a reference to the query.
const ref = listUserSavedSearchesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserSavedSearchesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.savedSearches);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.savedSearches);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  fullName: string;
  phoneNumber: string;
  email: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  fullName: ..., 
  phoneNumber: ..., 
  email: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ fullName: ..., phoneNumber: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  fullName: ..., 
  phoneNumber: ..., 
  email: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ fullName: ..., phoneNumber: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## CreateProperty
You can execute the `CreateProperty` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createProperty(vars: CreatePropertyVariables): MutationPromise<CreatePropertyData, CreatePropertyVariables>;

interface CreatePropertyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePropertyVariables): MutationRef<CreatePropertyData, CreatePropertyVariables>;
}
export const createPropertyRef: CreatePropertyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProperty(dc: DataConnect, vars: CreatePropertyVariables): MutationPromise<CreatePropertyData, CreatePropertyVariables>;

interface CreatePropertyRef {
  ...
  (dc: DataConnect, vars: CreatePropertyVariables): MutationRef<CreatePropertyData, CreatePropertyVariables>;
}
export const createPropertyRef: CreatePropertyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPropertyRef:
```typescript
const name = createPropertyRef.operationName;
console.log(name);
```

### Variables
The `CreateProperty` mutation requires an argument of type `CreatePropertyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateProperty` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePropertyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePropertyData {
  property_insert: Property_Key;
}
```
### Using `CreateProperty`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProperty, CreatePropertyVariables } from '@dataconnect/generated';

// The `CreateProperty` mutation requires an argument of type `CreatePropertyVariables`:
const createPropertyVars: CreatePropertyVariables = {
  title: ..., 
  description: ..., 
  price: ..., 
  bhkCount: ..., 
  propertyType: ..., 
  listingType: ..., 
  locality: ..., 
  latitude: ..., 
  longitude: ..., 
  imageUrls: ..., 
};

// Call the `createProperty()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProperty(createPropertyVars);
// Variables can be defined inline as well.
const { data } = await createProperty({ title: ..., description: ..., price: ..., bhkCount: ..., propertyType: ..., listingType: ..., locality: ..., latitude: ..., longitude: ..., imageUrls: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProperty(dataConnect, createPropertyVars);

console.log(data.property_insert);

// Or, you can use the `Promise` API.
createProperty(createPropertyVars).then((response) => {
  const data = response.data;
  console.log(data.property_insert);
});
```

### Using `CreateProperty`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPropertyRef, CreatePropertyVariables } from '@dataconnect/generated';

// The `CreateProperty` mutation requires an argument of type `CreatePropertyVariables`:
const createPropertyVars: CreatePropertyVariables = {
  title: ..., 
  description: ..., 
  price: ..., 
  bhkCount: ..., 
  propertyType: ..., 
  listingType: ..., 
  locality: ..., 
  latitude: ..., 
  longitude: ..., 
  imageUrls: ..., 
};

// Call the `createPropertyRef()` function to get a reference to the mutation.
const ref = createPropertyRef(createPropertyVars);
// Variables can be defined inline as well.
const ref = createPropertyRef({ title: ..., description: ..., price: ..., bhkCount: ..., propertyType: ..., listingType: ..., locality: ..., latitude: ..., longitude: ..., imageUrls: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPropertyRef(dataConnect, createPropertyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.property_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.property_insert);
});
```

## ApproveProperty
You can execute the `ApproveProperty` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
approveProperty(vars: ApprovePropertyVariables): MutationPromise<ApprovePropertyData, ApprovePropertyVariables>;

interface ApprovePropertyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ApprovePropertyVariables): MutationRef<ApprovePropertyData, ApprovePropertyVariables>;
}
export const approvePropertyRef: ApprovePropertyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
approveProperty(dc: DataConnect, vars: ApprovePropertyVariables): MutationPromise<ApprovePropertyData, ApprovePropertyVariables>;

interface ApprovePropertyRef {
  ...
  (dc: DataConnect, vars: ApprovePropertyVariables): MutationRef<ApprovePropertyData, ApprovePropertyVariables>;
}
export const approvePropertyRef: ApprovePropertyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the approvePropertyRef:
```typescript
const name = approvePropertyRef.operationName;
console.log(name);
```

### Variables
The `ApproveProperty` mutation requires an argument of type `ApprovePropertyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ApprovePropertyVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `ApproveProperty` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ApprovePropertyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ApprovePropertyData {
  property_update?: Property_Key | null;
}
```
### Using `ApproveProperty`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, approveProperty, ApprovePropertyVariables } from '@dataconnect/generated';

// The `ApproveProperty` mutation requires an argument of type `ApprovePropertyVariables`:
const approvePropertyVars: ApprovePropertyVariables = {
  id: ..., 
};

// Call the `approveProperty()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await approveProperty(approvePropertyVars);
// Variables can be defined inline as well.
const { data } = await approveProperty({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await approveProperty(dataConnect, approvePropertyVars);

console.log(data.property_update);

// Or, you can use the `Promise` API.
approveProperty(approvePropertyVars).then((response) => {
  const data = response.data;
  console.log(data.property_update);
});
```

### Using `ApproveProperty`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, approvePropertyRef, ApprovePropertyVariables } from '@dataconnect/generated';

// The `ApproveProperty` mutation requires an argument of type `ApprovePropertyVariables`:
const approvePropertyVars: ApprovePropertyVariables = {
  id: ..., 
};

// Call the `approvePropertyRef()` function to get a reference to the mutation.
const ref = approvePropertyRef(approvePropertyVars);
// Variables can be defined inline as well.
const ref = approvePropertyRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = approvePropertyRef(dataConnect, approvePropertyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.property_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.property_update);
});
```

## DeleteProperty
You can execute the `DeleteProperty` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteProperty(vars: DeletePropertyVariables): MutationPromise<DeletePropertyData, DeletePropertyVariables>;

interface DeletePropertyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePropertyVariables): MutationRef<DeletePropertyData, DeletePropertyVariables>;
}
export const deletePropertyRef: DeletePropertyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProperty(dc: DataConnect, vars: DeletePropertyVariables): MutationPromise<DeletePropertyData, DeletePropertyVariables>;

interface DeletePropertyRef {
  ...
  (dc: DataConnect, vars: DeletePropertyVariables): MutationRef<DeletePropertyData, DeletePropertyVariables>;
}
export const deletePropertyRef: DeletePropertyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePropertyRef:
```typescript
const name = deletePropertyRef.operationName;
console.log(name);
```

### Variables
The `DeleteProperty` mutation requires an argument of type `DeletePropertyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePropertyVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProperty` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePropertyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePropertyData {
  property_delete?: Property_Key | null;
}
```
### Using `DeleteProperty`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProperty, DeletePropertyVariables } from '@dataconnect/generated';

// The `DeleteProperty` mutation requires an argument of type `DeletePropertyVariables`:
const deletePropertyVars: DeletePropertyVariables = {
  id: ..., 
};

// Call the `deleteProperty()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProperty(deletePropertyVars);
// Variables can be defined inline as well.
const { data } = await deleteProperty({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProperty(dataConnect, deletePropertyVars);

console.log(data.property_delete);

// Or, you can use the `Promise` API.
deleteProperty(deletePropertyVars).then((response) => {
  const data = response.data;
  console.log(data.property_delete);
});
```

### Using `DeleteProperty`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePropertyRef, DeletePropertyVariables } from '@dataconnect/generated';

// The `DeleteProperty` mutation requires an argument of type `DeletePropertyVariables`:
const deletePropertyVars: DeletePropertyVariables = {
  id: ..., 
};

// Call the `deletePropertyRef()` function to get a reference to the mutation.
const ref = deletePropertyRef(deletePropertyVars);
// Variables can be defined inline as well.
const ref = deletePropertyRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePropertyRef(dataConnect, deletePropertyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.property_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.property_delete);
});
```

## UpdatePropertyStatus
You can execute the `UpdatePropertyStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePropertyStatus(vars: UpdatePropertyStatusVariables): MutationPromise<UpdatePropertyStatusData, UpdatePropertyStatusVariables>;

interface UpdatePropertyStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePropertyStatusVariables): MutationRef<UpdatePropertyStatusData, UpdatePropertyStatusVariables>;
}
export const updatePropertyStatusRef: UpdatePropertyStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePropertyStatus(dc: DataConnect, vars: UpdatePropertyStatusVariables): MutationPromise<UpdatePropertyStatusData, UpdatePropertyStatusVariables>;

interface UpdatePropertyStatusRef {
  ...
  (dc: DataConnect, vars: UpdatePropertyStatusVariables): MutationRef<UpdatePropertyStatusData, UpdatePropertyStatusVariables>;
}
export const updatePropertyStatusRef: UpdatePropertyStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePropertyStatusRef:
```typescript
const name = updatePropertyStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdatePropertyStatus` mutation requires an argument of type `UpdatePropertyStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePropertyStatusVariables {
  id: UUIDString;
  isApproved: boolean;
}
```
### Return Type
Recall that executing the `UpdatePropertyStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePropertyStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePropertyStatusData {
  property_update?: Property_Key | null;
}
```
### Using `UpdatePropertyStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePropertyStatus, UpdatePropertyStatusVariables } from '@dataconnect/generated';

// The `UpdatePropertyStatus` mutation requires an argument of type `UpdatePropertyStatusVariables`:
const updatePropertyStatusVars: UpdatePropertyStatusVariables = {
  id: ..., 
  isApproved: ..., 
};

// Call the `updatePropertyStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePropertyStatus(updatePropertyStatusVars);
// Variables can be defined inline as well.
const { data } = await updatePropertyStatus({ id: ..., isApproved: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePropertyStatus(dataConnect, updatePropertyStatusVars);

console.log(data.property_update);

// Or, you can use the `Promise` API.
updatePropertyStatus(updatePropertyStatusVars).then((response) => {
  const data = response.data;
  console.log(data.property_update);
});
```

### Using `UpdatePropertyStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePropertyStatusRef, UpdatePropertyStatusVariables } from '@dataconnect/generated';

// The `UpdatePropertyStatus` mutation requires an argument of type `UpdatePropertyStatusVariables`:
const updatePropertyStatusVars: UpdatePropertyStatusVariables = {
  id: ..., 
  isApproved: ..., 
};

// Call the `updatePropertyStatusRef()` function to get a reference to the mutation.
const ref = updatePropertyStatusRef(updatePropertyStatusVars);
// Variables can be defined inline as well.
const ref = updatePropertyStatusRef({ id: ..., isApproved: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePropertyStatusRef(dataConnect, updatePropertyStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.property_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.property_update);
});
```

## CreateFavorite
You can execute the `CreateFavorite` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createFavorite(vars: CreateFavoriteVariables): MutationPromise<CreateFavoriteData, CreateFavoriteVariables>;

interface CreateFavoriteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFavoriteVariables): MutationRef<CreateFavoriteData, CreateFavoriteVariables>;
}
export const createFavoriteRef: CreateFavoriteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createFavorite(dc: DataConnect, vars: CreateFavoriteVariables): MutationPromise<CreateFavoriteData, CreateFavoriteVariables>;

interface CreateFavoriteRef {
  ...
  (dc: DataConnect, vars: CreateFavoriteVariables): MutationRef<CreateFavoriteData, CreateFavoriteVariables>;
}
export const createFavoriteRef: CreateFavoriteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFavoriteRef:
```typescript
const name = createFavoriteRef.operationName;
console.log(name);
```

### Variables
The `CreateFavorite` mutation requires an argument of type `CreateFavoriteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateFavoriteVariables {
  propertyId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateFavorite` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFavoriteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFavoriteData {
  favorite_upsert: Favorite_Key;
}
```
### Using `CreateFavorite`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFavorite, CreateFavoriteVariables } from '@dataconnect/generated';

// The `CreateFavorite` mutation requires an argument of type `CreateFavoriteVariables`:
const createFavoriteVars: CreateFavoriteVariables = {
  propertyId: ..., 
};

// Call the `createFavorite()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFavorite(createFavoriteVars);
// Variables can be defined inline as well.
const { data } = await createFavorite({ propertyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createFavorite(dataConnect, createFavoriteVars);

console.log(data.favorite_upsert);

// Or, you can use the `Promise` API.
createFavorite(createFavoriteVars).then((response) => {
  const data = response.data;
  console.log(data.favorite_upsert);
});
```

### Using `CreateFavorite`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFavoriteRef, CreateFavoriteVariables } from '@dataconnect/generated';

// The `CreateFavorite` mutation requires an argument of type `CreateFavoriteVariables`:
const createFavoriteVars: CreateFavoriteVariables = {
  propertyId: ..., 
};

// Call the `createFavoriteRef()` function to get a reference to the mutation.
const ref = createFavoriteRef(createFavoriteVars);
// Variables can be defined inline as well.
const ref = createFavoriteRef({ propertyId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFavoriteRef(dataConnect, createFavoriteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.favorite_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.favorite_upsert);
});
```

## DeleteFavorite
You can execute the `DeleteFavorite` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteFavorite(vars: DeleteFavoriteVariables): MutationPromise<DeleteFavoriteData, DeleteFavoriteVariables>;

interface DeleteFavoriteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFavoriteVariables): MutationRef<DeleteFavoriteData, DeleteFavoriteVariables>;
}
export const deleteFavoriteRef: DeleteFavoriteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFavorite(dc: DataConnect, vars: DeleteFavoriteVariables): MutationPromise<DeleteFavoriteData, DeleteFavoriteVariables>;

interface DeleteFavoriteRef {
  ...
  (dc: DataConnect, vars: DeleteFavoriteVariables): MutationRef<DeleteFavoriteData, DeleteFavoriteVariables>;
}
export const deleteFavoriteRef: DeleteFavoriteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFavoriteRef:
```typescript
const name = deleteFavoriteRef.operationName;
console.log(name);
```

### Variables
The `DeleteFavorite` mutation requires an argument of type `DeleteFavoriteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFavoriteVariables {
  propertyId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFavorite` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFavoriteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFavoriteData {
  favorite_delete?: Favorite_Key | null;
}
```
### Using `DeleteFavorite`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFavorite, DeleteFavoriteVariables } from '@dataconnect/generated';

// The `DeleteFavorite` mutation requires an argument of type `DeleteFavoriteVariables`:
const deleteFavoriteVars: DeleteFavoriteVariables = {
  propertyId: ..., 
};

// Call the `deleteFavorite()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFavorite(deleteFavoriteVars);
// Variables can be defined inline as well.
const { data } = await deleteFavorite({ propertyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFavorite(dataConnect, deleteFavoriteVars);

console.log(data.favorite_delete);

// Or, you can use the `Promise` API.
deleteFavorite(deleteFavoriteVars).then((response) => {
  const data = response.data;
  console.log(data.favorite_delete);
});
```

### Using `DeleteFavorite`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFavoriteRef, DeleteFavoriteVariables } from '@dataconnect/generated';

// The `DeleteFavorite` mutation requires an argument of type `DeleteFavoriteVariables`:
const deleteFavoriteVars: DeleteFavoriteVariables = {
  propertyId: ..., 
};

// Call the `deleteFavoriteRef()` function to get a reference to the mutation.
const ref = deleteFavoriteRef(deleteFavoriteVars);
// Variables can be defined inline as well.
const ref = deleteFavoriteRef({ propertyId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFavoriteRef(dataConnect, deleteFavoriteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.favorite_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.favorite_delete);
});
```

## CreateSavedSearch
You can execute the `CreateSavedSearch` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSavedSearch(vars: CreateSavedSearchVariables): MutationPromise<CreateSavedSearchData, CreateSavedSearchVariables>;

interface CreateSavedSearchRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSavedSearchVariables): MutationRef<CreateSavedSearchData, CreateSavedSearchVariables>;
}
export const createSavedSearchRef: CreateSavedSearchRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSavedSearch(dc: DataConnect, vars: CreateSavedSearchVariables): MutationPromise<CreateSavedSearchData, CreateSavedSearchVariables>;

interface CreateSavedSearchRef {
  ...
  (dc: DataConnect, vars: CreateSavedSearchVariables): MutationRef<CreateSavedSearchData, CreateSavedSearchVariables>;
}
export const createSavedSearchRef: CreateSavedSearchRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSavedSearchRef:
```typescript
const name = createSavedSearchRef.operationName;
console.log(name);
```

### Variables
The `CreateSavedSearch` mutation requires an argument of type `CreateSavedSearchVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSavedSearchVariables {
  filters: string;
  label?: string | null;
}
```
### Return Type
Recall that executing the `CreateSavedSearch` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSavedSearchData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSavedSearchData {
  savedSearch_insert: SavedSearch_Key;
}
```
### Using `CreateSavedSearch`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSavedSearch, CreateSavedSearchVariables } from '@dataconnect/generated';

// The `CreateSavedSearch` mutation requires an argument of type `CreateSavedSearchVariables`:
const createSavedSearchVars: CreateSavedSearchVariables = {
  filters: ..., 
  label: ..., // optional
};

// Call the `createSavedSearch()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSavedSearch(createSavedSearchVars);
// Variables can be defined inline as well.
const { data } = await createSavedSearch({ filters: ..., label: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSavedSearch(dataConnect, createSavedSearchVars);

console.log(data.savedSearch_insert);

// Or, you can use the `Promise` API.
createSavedSearch(createSavedSearchVars).then((response) => {
  const data = response.data;
  console.log(data.savedSearch_insert);
});
```

### Using `CreateSavedSearch`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSavedSearchRef, CreateSavedSearchVariables } from '@dataconnect/generated';

// The `CreateSavedSearch` mutation requires an argument of type `CreateSavedSearchVariables`:
const createSavedSearchVars: CreateSavedSearchVariables = {
  filters: ..., 
  label: ..., // optional
};

// Call the `createSavedSearchRef()` function to get a reference to the mutation.
const ref = createSavedSearchRef(createSavedSearchVars);
// Variables can be defined inline as well.
const ref = createSavedSearchRef({ filters: ..., label: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSavedSearchRef(dataConnect, createSavedSearchVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.savedSearch_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.savedSearch_insert);
});
```

## CreateLead
You can execute the `CreateLead` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createLead(vars: CreateLeadVariables): MutationPromise<CreateLeadData, CreateLeadVariables>;

interface CreateLeadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLeadVariables): MutationRef<CreateLeadData, CreateLeadVariables>;
}
export const createLeadRef: CreateLeadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createLead(dc: DataConnect, vars: CreateLeadVariables): MutationPromise<CreateLeadData, CreateLeadVariables>;

interface CreateLeadRef {
  ...
  (dc: DataConnect, vars: CreateLeadVariables): MutationRef<CreateLeadData, CreateLeadVariables>;
}
export const createLeadRef: CreateLeadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createLeadRef:
```typescript
const name = createLeadRef.operationName;
console.log(name);
```

### Variables
The `CreateLead` mutation requires an argument of type `CreateLeadVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateLeadVariables {
  propertyId: UUIDString;
  agentPhone: string;
  clientName: string;
  clientPhone: string;
  clientMessage?: string | null;
}
```
### Return Type
Recall that executing the `CreateLead` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateLeadData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateLeadData {
  lead_insert: Lead_Key;
}
```
### Using `CreateLead`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createLead, CreateLeadVariables } from '@dataconnect/generated';

// The `CreateLead` mutation requires an argument of type `CreateLeadVariables`:
const createLeadVars: CreateLeadVariables = {
  propertyId: ..., 
  agentPhone: ..., 
  clientName: ..., 
  clientPhone: ..., 
  clientMessage: ..., // optional
};

// Call the `createLead()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createLead(createLeadVars);
// Variables can be defined inline as well.
const { data } = await createLead({ propertyId: ..., agentPhone: ..., clientName: ..., clientPhone: ..., clientMessage: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createLead(dataConnect, createLeadVars);

console.log(data.lead_insert);

// Or, you can use the `Promise` API.
createLead(createLeadVars).then((response) => {
  const data = response.data;
  console.log(data.lead_insert);
});
```

### Using `CreateLead`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createLeadRef, CreateLeadVariables } from '@dataconnect/generated';

// The `CreateLead` mutation requires an argument of type `CreateLeadVariables`:
const createLeadVars: CreateLeadVariables = {
  propertyId: ..., 
  agentPhone: ..., 
  clientName: ..., 
  clientPhone: ..., 
  clientMessage: ..., // optional
};

// Call the `createLeadRef()` function to get a reference to the mutation.
const ref = createLeadRef(createLeadVars);
// Variables can be defined inline as well.
const ref = createLeadRef({ propertyId: ..., agentPhone: ..., clientName: ..., clientPhone: ..., clientMessage: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createLeadRef(dataConnect, createLeadVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lead_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lead_insert);
});
```

