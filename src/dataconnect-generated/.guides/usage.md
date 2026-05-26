# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useListApprovedProperties, useGetPropertyById, useListPendingProperties, useListUserProperties, useListUserFavorites, useListUserSavedSearches, useCreateUser, useCreateProperty, useApproveProperty, useDeleteProperty } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useListApprovedProperties(listApprovedPropertiesVars);

const { data, isPending, isSuccess, isError, error } = useGetPropertyById(getPropertyByIdVars);

const { data, isPending, isSuccess, isError, error } = useListPendingProperties();

const { data, isPending, isSuccess, isError, error } = useListUserProperties();

const { data, isPending, isSuccess, isError, error } = useListUserFavorites();

const { data, isPending, isSuccess, isError, error } = useListUserSavedSearches();

const { data, isPending, isSuccess, isError, error } = useCreateUser(createUserVars);

const { data, isPending, isSuccess, isError, error } = useCreateProperty(createPropertyVars);

const { data, isPending, isSuccess, isError, error } = useApproveProperty(approvePropertyVars);

const { data, isPending, isSuccess, isError, error } = useDeleteProperty(deletePropertyVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listApprovedProperties, getPropertyById, listPendingProperties, listUserProperties, listUserFavorites, listUserSavedSearches, createUser, createProperty, approveProperty, deleteProperty } from '@dataconnect/generated';


// Operation ListApprovedProperties:  For variables, look at type ListApprovedPropertiesVars in ../index.d.ts
const { data } = await ListApprovedProperties(dataConnect, listApprovedPropertiesVars);

// Operation GetPropertyById:  For variables, look at type GetPropertyByIdVars in ../index.d.ts
const { data } = await GetPropertyById(dataConnect, getPropertyByIdVars);

// Operation ListPendingProperties: 
const { data } = await ListPendingProperties(dataConnect);

// Operation ListUserProperties: 
const { data } = await ListUserProperties(dataConnect);

// Operation ListUserFavorites: 
const { data } = await ListUserFavorites(dataConnect);

// Operation ListUserSavedSearches: 
const { data } = await ListUserSavedSearches(dataConnect);

// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation CreateProperty:  For variables, look at type CreatePropertyVars in ../index.d.ts
const { data } = await CreateProperty(dataConnect, createPropertyVars);

// Operation ApproveProperty:  For variables, look at type ApprovePropertyVars in ../index.d.ts
const { data } = await ApproveProperty(dataConnect, approvePropertyVars);

// Operation DeleteProperty:  For variables, look at type DeletePropertyVars in ../index.d.ts
const { data } = await DeleteProperty(dataConnect, deletePropertyVars);


```