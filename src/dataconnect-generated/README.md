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
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*CreateProperty*](#createproperty)
  - [*ApproveProperty*](#approveproperty)

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

