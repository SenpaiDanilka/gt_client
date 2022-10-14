import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as Operations from "./operations";
const defaultOptions = {} as const;

export const UserLoginDocument = gql`
    mutation UserLogin($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ttl
    secret
    email
    userId
  }
}
    `;
export type UserLoginMutationFn = Apollo.MutationFunction<Operations.UserLoginMutation, Operations.UserLoginMutationVariables>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.UserLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: Apollo.MutationHookOptions<Operations.UserLoginMutation, Operations.UserLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.UserLoginMutation, Operations.UserLoginMutationVariables>(UserLoginDocument, options);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<Operations.UserLoginMutation>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<Operations.UserLoginMutation, Operations.UserLoginMutationVariables>;
export const UserSignUpDocument = gql`
    mutation UserSignUp($name: String!, $email: String!, $password: String!) {
  registerUser(name: $name, email: $email, password: $password) {
    name
    email
  }
}
    `;
export type UserSignUpMutationFn = Apollo.MutationFunction<Operations.UserSignUpMutation, Operations.UserSignUpMutationVariables>;

/**
 * __useUserSignUpMutation__
 *
 * To run a mutation, you first call `useUserSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.UserSignUpMutation, { data, loading, error }] = useUserSignUpMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUserSignUpMutation(baseOptions?: Apollo.MutationHookOptions<Operations.UserSignUpMutation, Operations.UserSignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.UserSignUpMutation, Operations.UserSignUpMutationVariables>(UserSignUpDocument, options);
      }
export type UserSignUpMutationHookResult = ReturnType<typeof useUserSignUpMutation>;
export type UserSignUpMutationResult = Apollo.MutationResult<Operations.UserSignUpMutation>;
export type UserSignUpMutationOptions = Apollo.BaseMutationOptions<Operations.UserSignUpMutation, Operations.UserSignUpMutationVariables>;
export const DeleteItemDocument = gql`
    mutation DeleteItem($id: ID!) {
  deleteItem(id: $id) {
    _id
  }
}
    `;
export type DeleteItemMutationFn = Apollo.MutationFunction<Operations.DeleteItemMutation, Operations.DeleteItemMutationVariables>;

/**
 * __useDeleteItemMutation__
 *
 * To run a mutation, you first call `useDeleteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.DeleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteItemMutation(baseOptions?: Apollo.MutationHookOptions<Operations.DeleteItemMutation, Operations.DeleteItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.DeleteItemMutation, Operations.DeleteItemMutationVariables>(DeleteItemDocument, options);
      }
export type DeleteItemMutationHookResult = ReturnType<typeof useDeleteItemMutation>;
export type DeleteItemMutationResult = Apollo.MutationResult<Operations.DeleteItemMutation>;
export type DeleteItemMutationOptions = Apollo.BaseMutationOptions<Operations.DeleteItemMutation, Operations.DeleteItemMutationVariables>;
export const FindUserItemsByIdDocument = gql`
    query FindUserItemsByID($id: ID!) {
  findUserByID(id: $id) {
    _id
    items {
      data {
        _id
        description
        name
        type
      }
    }
  }
}
    `;

/**
 * __useFindUserItemsByIdQuery__
 *
 * To run a query within a React component, call `useFindUserItemsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserItemsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserItemsByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindUserItemsByIdQuery(baseOptions: Apollo.QueryHookOptions<Operations.FindUserItemsByIdQuery, Operations.FindUserItemsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.FindUserItemsByIdQuery, Operations.FindUserItemsByIdQueryVariables>(FindUserItemsByIdDocument, options);
      }
export function useFindUserItemsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.FindUserItemsByIdQuery, Operations.FindUserItemsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.FindUserItemsByIdQuery, Operations.FindUserItemsByIdQueryVariables>(FindUserItemsByIdDocument, options);
        }
export type FindUserItemsByIdQueryHookResult = ReturnType<typeof useFindUserItemsByIdQuery>;
export type FindUserItemsByIdLazyQueryHookResult = ReturnType<typeof useFindUserItemsByIdLazyQuery>;
export type FindUserItemsByIdQueryResult = Apollo.QueryResult<Operations.FindUserItemsByIdQuery, Operations.FindUserItemsByIdQueryVariables>;
export const GetItemsDocument = gql`
    query GetItems($user_id: String!) {
  getItems(user_id: $user_id) {
    _id
    description
    name
    type
  }
}
    `;

/**
 * __useGetItemsQuery__
 *
 * To run a query within a React component, call `useGetItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemsQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useGetItemsQuery(baseOptions: Apollo.QueryHookOptions<Operations.GetItemsQuery, Operations.GetItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.GetItemsQuery, Operations.GetItemsQueryVariables>(GetItemsDocument, options);
      }
export function useGetItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.GetItemsQuery, Operations.GetItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.GetItemsQuery, Operations.GetItemsQueryVariables>(GetItemsDocument, options);
        }
export type GetItemsQueryHookResult = ReturnType<typeof useGetItemsQuery>;
export type GetItemsLazyQueryHookResult = ReturnType<typeof useGetItemsLazyQuery>;
export type GetItemsQueryResult = Apollo.QueryResult<Operations.GetItemsQuery, Operations.GetItemsQueryVariables>;
export const GetModelItemsDocument = gql`
    query GetModelItems($model: AvailabilityModel!, $model_id: String!) {
  getModelItems(model: $model, model_id: $model_id) {
    _id
    model
    model_id
    item {
      _id
      name
      description
    }
  }
}
    `;

/**
 * __useGetModelItemsQuery__
 *
 * To run a query within a React component, call `useGetModelItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetModelItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetModelItemsQuery({
 *   variables: {
 *      model: // value for 'model'
 *      model_id: // value for 'model_id'
 *   },
 * });
 */
export function useGetModelItemsQuery(baseOptions: Apollo.QueryHookOptions<Operations.GetModelItemsQuery, Operations.GetModelItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.GetModelItemsQuery, Operations.GetModelItemsQueryVariables>(GetModelItemsDocument, options);
      }
export function useGetModelItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.GetModelItemsQuery, Operations.GetModelItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.GetModelItemsQuery, Operations.GetModelItemsQueryVariables>(GetModelItemsDocument, options);
        }
export type GetModelItemsQueryHookResult = ReturnType<typeof useGetModelItemsQuery>;
export type GetModelItemsLazyQueryHookResult = ReturnType<typeof useGetModelItemsLazyQuery>;
export type GetModelItemsQueryResult = Apollo.QueryResult<Operations.GetModelItemsQuery, Operations.GetModelItemsQueryVariables>;
export const DeleteAvailableItemDocument = gql`
    mutation DeleteAvailableItem($id: ID!) {
  deleteAvailableItem(id: $id) {
    _id
  }
}
    `;
export type DeleteAvailableItemMutationFn = Apollo.MutationFunction<Operations.DeleteAvailableItemMutation, Operations.DeleteAvailableItemMutationVariables>;

/**
 * __useDeleteAvailableItemMutation__
 *
 * To run a mutation, you first call `useDeleteAvailableItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAvailableItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.DeleteAvailableItemMutation, { data, loading, error }] = useDeleteAvailableItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAvailableItemMutation(baseOptions?: Apollo.MutationHookOptions<Operations.DeleteAvailableItemMutation, Operations.DeleteAvailableItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.DeleteAvailableItemMutation, Operations.DeleteAvailableItemMutationVariables>(DeleteAvailableItemDocument, options);
      }
export type DeleteAvailableItemMutationHookResult = ReturnType<typeof useDeleteAvailableItemMutation>;
export type DeleteAvailableItemMutationResult = Apollo.MutationResult<Operations.DeleteAvailableItemMutation>;
export type DeleteAvailableItemMutationOptions = Apollo.BaseMutationOptions<Operations.DeleteAvailableItemMutation, Operations.DeleteAvailableItemMutationVariables>;
export const FindItemByIdDocument = gql`
    query FindItemByID($id: ID!) {
  findItemByID(id: $id) {
    _id
    name
    description
    type
  }
}
    `;

/**
 * __useFindItemByIdQuery__
 *
 * To run a query within a React component, call `useFindItemByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindItemByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindItemByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindItemByIdQuery(baseOptions: Apollo.QueryHookOptions<Operations.FindItemByIdQuery, Operations.FindItemByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.FindItemByIdQuery, Operations.FindItemByIdQueryVariables>(FindItemByIdDocument, options);
      }
export function useFindItemByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.FindItemByIdQuery, Operations.FindItemByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.FindItemByIdQuery, Operations.FindItemByIdQueryVariables>(FindItemByIdDocument, options);
        }
export type FindItemByIdQueryHookResult = ReturnType<typeof useFindItemByIdQuery>;
export type FindItemByIdLazyQueryHookResult = ReturnType<typeof useFindItemByIdLazyQuery>;
export type FindItemByIdQueryResult = Apollo.QueryResult<Operations.FindItemByIdQuery, Operations.FindItemByIdQueryVariables>;
export const CreateItemDocument = gql`
    mutation CreateItem($name: String!, $description: String!, $type: ItemType!, $owner: String!) {
  createItem(name: $name, description: $description, type: $type, owner: $owner) {
    _id
    name
    description
    type
  }
}
    `;
export type CreateItemMutationFn = Apollo.MutationFunction<Operations.CreateItemMutation, Operations.CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.CreateItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      type: // value for 'type'
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: Apollo.MutationHookOptions<Operations.CreateItemMutation, Operations.CreateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.CreateItemMutation, Operations.CreateItemMutationVariables>(CreateItemDocument, options);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = Apollo.MutationResult<Operations.CreateItemMutation>;
export type CreateItemMutationOptions = Apollo.BaseMutationOptions<Operations.CreateItemMutation, Operations.CreateItemMutationVariables>;
export const CreateAvailableItemDocument = gql`
    mutation CreateAvailableItem($model: AvailabilityModel!, $model_id: String!, $item_id: String!) {
  createAvailableItem(model: $model, model_id: $model_id, item_id: $item_id) {
    _id
    model
    model_id
    item {
      _id
      type
      name
      description
    }
  }
}
    `;
export type CreateAvailableItemMutationFn = Apollo.MutationFunction<Operations.CreateAvailableItemMutation, Operations.CreateAvailableItemMutationVariables>;

/**
 * __useCreateAvailableItemMutation__
 *
 * To run a mutation, you first call `useCreateAvailableItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAvailableItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.CreateAvailableItemMutation, { data, loading, error }] = useCreateAvailableItemMutation({
 *   variables: {
 *      model: // value for 'model'
 *      model_id: // value for 'model_id'
 *      item_id: // value for 'item_id'
 *   },
 * });
 */
export function useCreateAvailableItemMutation(baseOptions?: Apollo.MutationHookOptions<Operations.CreateAvailableItemMutation, Operations.CreateAvailableItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.CreateAvailableItemMutation, Operations.CreateAvailableItemMutationVariables>(CreateAvailableItemDocument, options);
      }
export type CreateAvailableItemMutationHookResult = ReturnType<typeof useCreateAvailableItemMutation>;
export type CreateAvailableItemMutationResult = Apollo.MutationResult<Operations.CreateAvailableItemMutation>;
export type CreateAvailableItemMutationOptions = Apollo.BaseMutationOptions<Operations.CreateAvailableItemMutation, Operations.CreateAvailableItemMutationVariables>;
export const UpdateItemDocument = gql`
    mutation UpdateItem($id: ID!, $data: ItemInput!) {
  updateItem(id: $id, data: $data) {
    _id
    name
    description
    type
  }
}
    `;
export type UpdateItemMutationFn = Apollo.MutationFunction<Operations.UpdateItemMutation, Operations.UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.UpdateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: Apollo.MutationHookOptions<Operations.UpdateItemMutation, Operations.UpdateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.UpdateItemMutation, Operations.UpdateItemMutationVariables>(UpdateItemDocument, options);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = Apollo.MutationResult<Operations.UpdateItemMutation>;
export type UpdateItemMutationOptions = Apollo.BaseMutationOptions<Operations.UpdateItemMutation, Operations.UpdateItemMutationVariables>;
export const FindUserSpacesByIdDocument = gql`
    query FindUserSpacesByID($id: ID!) {
  findUserByID(id: $id) {
    _id
    spaces {
      data {
        _id
        description
        name
      }
    }
  }
}
    `;

/**
 * __useFindUserSpacesByIdQuery__
 *
 * To run a query within a React component, call `useFindUserSpacesByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserSpacesByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserSpacesByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindUserSpacesByIdQuery(baseOptions: Apollo.QueryHookOptions<Operations.FindUserSpacesByIdQuery, Operations.FindUserSpacesByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.FindUserSpacesByIdQuery, Operations.FindUserSpacesByIdQueryVariables>(FindUserSpacesByIdDocument, options);
      }
export function useFindUserSpacesByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.FindUserSpacesByIdQuery, Operations.FindUserSpacesByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.FindUserSpacesByIdQuery, Operations.FindUserSpacesByIdQueryVariables>(FindUserSpacesByIdDocument, options);
        }
export type FindUserSpacesByIdQueryHookResult = ReturnType<typeof useFindUserSpacesByIdQuery>;
export type FindUserSpacesByIdLazyQueryHookResult = ReturnType<typeof useFindUserSpacesByIdLazyQuery>;
export type FindUserSpacesByIdQueryResult = Apollo.QueryResult<Operations.FindUserSpacesByIdQuery, Operations.FindUserSpacesByIdQueryVariables>;
export const DeleteSpaceDocument = gql`
    mutation DeleteSpace($id: ID!) {
  deleteSpace(id: $id) {
    _id
  }
}
    `;
export type DeleteSpaceMutationFn = Apollo.MutationFunction<Operations.DeleteSpaceMutation, Operations.DeleteSpaceMutationVariables>;

/**
 * __useDeleteSpaceMutation__
 *
 * To run a mutation, you first call `useDeleteSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.DeleteSpaceMutation, { data, loading, error }] = useDeleteSpaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSpaceMutation(baseOptions?: Apollo.MutationHookOptions<Operations.DeleteSpaceMutation, Operations.DeleteSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.DeleteSpaceMutation, Operations.DeleteSpaceMutationVariables>(DeleteSpaceDocument, options);
      }
export type DeleteSpaceMutationHookResult = ReturnType<typeof useDeleteSpaceMutation>;
export type DeleteSpaceMutationResult = Apollo.MutationResult<Operations.DeleteSpaceMutation>;
export type DeleteSpaceMutationOptions = Apollo.BaseMutationOptions<Operations.DeleteSpaceMutation, Operations.DeleteSpaceMutationVariables>;
export const CreateSpaceDocument = gql`
    mutation CreateSpace($name: String!, $description: String!, $owner: String!) {
  createSpace(name: $name, description: $description, owner: $owner) {
    _id
    name
    description
  }
}
    `;
export type CreateSpaceMutationFn = Apollo.MutationFunction<Operations.CreateSpaceMutation, Operations.CreateSpaceMutationVariables>;

/**
 * __useCreateSpaceMutation__
 *
 * To run a mutation, you first call `useCreateSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.CreateSpaceMutation, { data, loading, error }] = useCreateSpaceMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useCreateSpaceMutation(baseOptions?: Apollo.MutationHookOptions<Operations.CreateSpaceMutation, Operations.CreateSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.CreateSpaceMutation, Operations.CreateSpaceMutationVariables>(CreateSpaceDocument, options);
      }
export type CreateSpaceMutationHookResult = ReturnType<typeof useCreateSpaceMutation>;
export type CreateSpaceMutationResult = Apollo.MutationResult<Operations.CreateSpaceMutation>;
export type CreateSpaceMutationOptions = Apollo.BaseMutationOptions<Operations.CreateSpaceMutation, Operations.CreateSpaceMutationVariables>;
export const FindSpaceByIdDocument = gql`
    query FindSpaceByID($id: ID!) {
  findSpaceByID(id: $id) {
    _id
    name
    description
    contacts {
      data {
        _id
        contact {
          _id
          user {
            _id
            name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useFindSpaceByIdQuery__
 *
 * To run a query within a React component, call `useFindSpaceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSpaceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSpaceByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindSpaceByIdQuery(baseOptions: Apollo.QueryHookOptions<Operations.FindSpaceByIdQuery, Operations.FindSpaceByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.FindSpaceByIdQuery, Operations.FindSpaceByIdQueryVariables>(FindSpaceByIdDocument, options);
      }
export function useFindSpaceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.FindSpaceByIdQuery, Operations.FindSpaceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.FindSpaceByIdQuery, Operations.FindSpaceByIdQueryVariables>(FindSpaceByIdDocument, options);
        }
export type FindSpaceByIdQueryHookResult = ReturnType<typeof useFindSpaceByIdQuery>;
export type FindSpaceByIdLazyQueryHookResult = ReturnType<typeof useFindSpaceByIdLazyQuery>;
export type FindSpaceByIdQueryResult = Apollo.QueryResult<Operations.FindSpaceByIdQuery, Operations.FindSpaceByIdQueryVariables>;
export const UpdateSpaceDocument = gql`
    mutation UpdateSpace($id: ID!, $data: SpaceInput!) {
  updateSpace(id: $id, data: $data) {
    _id
    name
    description
  }
}
    `;
export type UpdateSpaceMutationFn = Apollo.MutationFunction<Operations.UpdateSpaceMutation, Operations.UpdateSpaceMutationVariables>;

/**
 * __useUpdateSpaceMutation__
 *
 * To run a mutation, you first call `useUpdateSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.UpdateSpaceMutation, { data, loading, error }] = useUpdateSpaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSpaceMutation(baseOptions?: Apollo.MutationHookOptions<Operations.UpdateSpaceMutation, Operations.UpdateSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.UpdateSpaceMutation, Operations.UpdateSpaceMutationVariables>(UpdateSpaceDocument, options);
      }
export type UpdateSpaceMutationHookResult = ReturnType<typeof useUpdateSpaceMutation>;
export type UpdateSpaceMutationResult = Apollo.MutationResult<Operations.UpdateSpaceMutation>;
export type UpdateSpaceMutationOptions = Apollo.BaseMutationOptions<Operations.UpdateSpaceMutation, Operations.UpdateSpaceMutationVariables>;
export const CreateSpaceContactLinkDocument = gql`
    mutation CreateSpaceContactLink($data: SpaceContactLinkInput!) {
  createSpaceContactLink(data: $data) {
    _id
    contact {
      _id
      user {
        _id
        name
      }
    }
  }
}
    `;
export type CreateSpaceContactLinkMutationFn = Apollo.MutationFunction<Operations.CreateSpaceContactLinkMutation, Operations.CreateSpaceContactLinkMutationVariables>;

/**
 * __useCreateSpaceContactLinkMutation__
 *
 * To run a mutation, you first call `useCreateSpaceContactLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSpaceContactLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.CreateSpaceContactLinkMutation, { data, loading, error }] = useCreateSpaceContactLinkMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSpaceContactLinkMutation(baseOptions?: Apollo.MutationHookOptions<Operations.CreateSpaceContactLinkMutation, Operations.CreateSpaceContactLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.CreateSpaceContactLinkMutation, Operations.CreateSpaceContactLinkMutationVariables>(CreateSpaceContactLinkDocument, options);
      }
export type CreateSpaceContactLinkMutationHookResult = ReturnType<typeof useCreateSpaceContactLinkMutation>;
export type CreateSpaceContactLinkMutationResult = Apollo.MutationResult<Operations.CreateSpaceContactLinkMutation>;
export type CreateSpaceContactLinkMutationOptions = Apollo.BaseMutationOptions<Operations.CreateSpaceContactLinkMutation, Operations.CreateSpaceContactLinkMutationVariables>;
export const DeleteSpaceContactLinkDocument = gql`
    mutation DeleteSpaceContactLink($id: ID!) {
  deleteSpaceContactLink(id: $id) {
    _id
  }
}
    `;
export type DeleteSpaceContactLinkMutationFn = Apollo.MutationFunction<Operations.DeleteSpaceContactLinkMutation, Operations.DeleteSpaceContactLinkMutationVariables>;

/**
 * __useDeleteSpaceContactLinkMutation__
 *
 * To run a mutation, you first call `useDeleteSpaceContactLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSpaceContactLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.DeleteSpaceContactLinkMutation, { data, loading, error }] = useDeleteSpaceContactLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSpaceContactLinkMutation(baseOptions?: Apollo.MutationHookOptions<Operations.DeleteSpaceContactLinkMutation, Operations.DeleteSpaceContactLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.DeleteSpaceContactLinkMutation, Operations.DeleteSpaceContactLinkMutationVariables>(DeleteSpaceContactLinkDocument, options);
      }
export type DeleteSpaceContactLinkMutationHookResult = ReturnType<typeof useDeleteSpaceContactLinkMutation>;
export type DeleteSpaceContactLinkMutationResult = Apollo.MutationResult<Operations.DeleteSpaceContactLinkMutation>;
export type DeleteSpaceContactLinkMutationOptions = Apollo.BaseMutationOptions<Operations.DeleteSpaceContactLinkMutation, Operations.DeleteSpaceContactLinkMutationVariables>;
export const DeleteContactDocument = gql`
    mutation DeleteContact($id: ID!) {
  deleteContact(id: $id) {
    _id
  }
}
    `;
export type DeleteContactMutationFn = Apollo.MutationFunction<Operations.DeleteContactMutation, Operations.DeleteContactMutationVariables>;

/**
 * __useDeleteContactMutation__
 *
 * To run a mutation, you first call `useDeleteContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.DeleteContactMutation, { data, loading, error }] = useDeleteContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContactMutation(baseOptions?: Apollo.MutationHookOptions<Operations.DeleteContactMutation, Operations.DeleteContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.DeleteContactMutation, Operations.DeleteContactMutationVariables>(DeleteContactDocument, options);
      }
export type DeleteContactMutationHookResult = ReturnType<typeof useDeleteContactMutation>;
export type DeleteContactMutationResult = Apollo.MutationResult<Operations.DeleteContactMutation>;
export type DeleteContactMutationOptions = Apollo.BaseMutationOptions<Operations.DeleteContactMutation, Operations.DeleteContactMutationVariables>;
export const CreateContactDocument = gql`
    mutation CreateContact($owner: String!, $user: String!) {
  createContact(owner: $owner, user: $user) {
    _id
    owner {
      _id
      name
    }
    user {
      _id
      name
    }
  }
}
    `;
export type CreateContactMutationFn = Apollo.MutationFunction<Operations.CreateContactMutation, Operations.CreateContactMutationVariables>;

/**
 * __useCreateContactMutation__
 *
 * To run a mutation, you first call `useCreateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [Operations.CreateContactMutation, { data, loading, error }] = useCreateContactMutation({
 *   variables: {
 *      owner: // value for 'owner'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateContactMutation(baseOptions?: Apollo.MutationHookOptions<Operations.CreateContactMutation, Operations.CreateContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.CreateContactMutation, Operations.CreateContactMutationVariables>(CreateContactDocument, options);
      }
export type CreateContactMutationHookResult = ReturnType<typeof useCreateContactMutation>;
export type CreateContactMutationResult = Apollo.MutationResult<Operations.CreateContactMutation>;
export type CreateContactMutationOptions = Apollo.BaseMutationOptions<Operations.CreateContactMutation, Operations.CreateContactMutationVariables>;
export const FindUserContactsByIdDocument = gql`
    query FindUserContactsByID($id: ID!) {
  findUserByID(id: $id) {
    _id
    contacts {
      data {
        _id
        user {
          _id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useFindUserContactsByIdQuery__
 *
 * To run a query within a React component, call `useFindUserContactsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserContactsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserContactsByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindUserContactsByIdQuery(baseOptions: Apollo.QueryHookOptions<Operations.FindUserContactsByIdQuery, Operations.FindUserContactsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.FindUserContactsByIdQuery, Operations.FindUserContactsByIdQueryVariables>(FindUserContactsByIdDocument, options);
      }
export function useFindUserContactsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.FindUserContactsByIdQuery, Operations.FindUserContactsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.FindUserContactsByIdQuery, Operations.FindUserContactsByIdQueryVariables>(FindUserContactsByIdDocument, options);
        }
export type FindUserContactsByIdQueryHookResult = ReturnType<typeof useFindUserContactsByIdQuery>;
export type FindUserContactsByIdLazyQueryHookResult = ReturnType<typeof useFindUserContactsByIdLazyQuery>;
export type FindUserContactsByIdQueryResult = Apollo.QueryResult<Operations.FindUserContactsByIdQuery, Operations.FindUserContactsByIdQueryVariables>;
export const FindUserByEmailDocument = gql`
    query FindUserByEmail($email: String!) {
  findUserByEmail(email: $email) {
    _id
    name
  }
}
    `;

/**
 * __useFindUserByEmailQuery__
 *
 * To run a query within a React component, call `useFindUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useFindUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<Operations.FindUserByEmailQuery, Operations.FindUserByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.FindUserByEmailQuery, Operations.FindUserByEmailQueryVariables>(FindUserByEmailDocument, options);
      }
export function useFindUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.FindUserByEmailQuery, Operations.FindUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.FindUserByEmailQuery, Operations.FindUserByEmailQueryVariables>(FindUserByEmailDocument, options);
        }
export type FindUserByEmailQueryHookResult = ReturnType<typeof useFindUserByEmailQuery>;
export type FindUserByEmailLazyQueryHookResult = ReturnType<typeof useFindUserByEmailLazyQuery>;
export type FindUserByEmailQueryResult = Apollo.QueryResult<Operations.FindUserByEmailQuery, Operations.FindUserByEmailQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: String!) {
  getUserById(id: $id) {
    name
    email
    spaces_count
    items_count
    contacts_count
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<Operations.GetUserByIdQuery, Operations.GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.GetUserByIdQuery, Operations.GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.GetUserByIdQuery, Operations.GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.GetUserByIdQuery, Operations.GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<Operations.GetUserByIdQuery, Operations.GetUserByIdQueryVariables>;