# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateUser, useCreateProperty, useApproveProperty, useDeleteProperty, useUpdatePropertyStatus, useCreateFavorite, useDeleteFavorite, useCreateSavedSearch, useCreateLead, useRejectProperty } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateUser(createUserVars);

const { data, isPending, isSuccess, isError, error } = useCreateProperty(createPropertyVars);

const { data, isPending, isSuccess, isError, error } = useApproveProperty(approvePropertyVars);

const { data, isPending, isSuccess, isError, error } = useDeleteProperty(deletePropertyVars);

const { data, isPending, isSuccess, isError, error } = useUpdatePropertyStatus(updatePropertyStatusVars);

const { data, isPending, isSuccess, isError, error } = useCreateFavorite(createFavoriteVars);

const { data, isPending, isSuccess, isError, error } = useDeleteFavorite(deleteFavoriteVars);

const { data, isPending, isSuccess, isError, error } = useCreateSavedSearch(createSavedSearchVars);

const { data, isPending, isSuccess, isError, error } = useCreateLead(createLeadVars);

const { data, isPending, isSuccess, isError, error } = useRejectProperty(rejectPropertyVars);

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
import { createUser, createProperty, approveProperty, deleteProperty, updatePropertyStatus, createFavorite, deleteFavorite, createSavedSearch, createLead, rejectProperty } from '@dataconnect/generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation CreateProperty:  For variables, look at type CreatePropertyVars in ../index.d.ts
const { data } = await CreateProperty(dataConnect, createPropertyVars);

// Operation ApproveProperty:  For variables, look at type ApprovePropertyVars in ../index.d.ts
const { data } = await ApproveProperty(dataConnect, approvePropertyVars);

// Operation DeleteProperty:  For variables, look at type DeletePropertyVars in ../index.d.ts
const { data } = await DeleteProperty(dataConnect, deletePropertyVars);

// Operation UpdatePropertyStatus:  For variables, look at type UpdatePropertyStatusVars in ../index.d.ts
const { data } = await UpdatePropertyStatus(dataConnect, updatePropertyStatusVars);

// Operation CreateFavorite:  For variables, look at type CreateFavoriteVars in ../index.d.ts
const { data } = await CreateFavorite(dataConnect, createFavoriteVars);

// Operation DeleteFavorite:  For variables, look at type DeleteFavoriteVars in ../index.d.ts
const { data } = await DeleteFavorite(dataConnect, deleteFavoriteVars);

// Operation CreateSavedSearch:  For variables, look at type CreateSavedSearchVars in ../index.d.ts
const { data } = await CreateSavedSearch(dataConnect, createSavedSearchVars);

// Operation CreateLead:  For variables, look at type CreateLeadVars in ../index.d.ts
const { data } = await CreateLead(dataConnect, createLeadVars);

// Operation RejectProperty:  For variables, look at type RejectPropertyVars in ../index.d.ts
const { data } = await RejectProperty(dataConnect, rejectPropertyVars);


```