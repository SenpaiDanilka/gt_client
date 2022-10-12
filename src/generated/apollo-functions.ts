import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import {
  CreateContactMutation,
  CreateContactMutationVariables,
  CreateItemMutation,
  CreateItemMutationVariables, CreateSpaceMutation, CreateSpaceMutationVariables,
  DeleteContactMutation, DeleteContactMutationVariables, DeleteItemMutation,
  DeleteItemMutationVariables,
  DeleteSpaceMutation,
  DeleteSpaceMutationVariables, FindItemByIdQuery,
  FindItemByIdQueryVariables,
  FindSpaceByIdQuery, FindSpaceByIdQueryVariables, FindUserByEmailQuery,
  FindUserByEmailQueryVariables,
  FindUserContactsByIdQuery, FindUserContactsByIdQueryVariables,
  FindUserItemsByIdQuery,
  FindUserItemsByIdQueryVariables, FindUserSpacesByIdQuery,
  FindUserSpacesByIdQueryVariables, GetUserByIdQuery,
  GetUserByIdQueryVariables,
  UpdateItemMutation, UpdateItemMutationVariables,
  UpdateSpaceMutation, UpdateSpaceMutationVariables, UserLoginMutation,
  UserLoginMutationVariables, UserSignUpMutation, UserSignUpMutationVariables
} from "./operations";
const defaultOptions = {} as const;

export const DeleteItemDocument = gql`
    mutation DeleteItem($id: ID!) {
  deleteItem(id: $id) {
    _id
  }
}
    `;
export type DeleteItemMutationFn = Apollo.MutationFunction<DeleteItemMutation, DeleteItemMutationVariables>;

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
 * const [deleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteItemMutation, DeleteItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument, options);
      }
export type DeleteItemMutationHookResult = ReturnType<typeof useDeleteItemMutation>;
export type DeleteItemMutationResult = Apollo.MutationResult<DeleteItemMutation>;
export type DeleteItemMutationOptions = Apollo.BaseMutationOptions<DeleteItemMutation, DeleteItemMutationVariables>;
export const FindUserItemsByIdDocument = gql`
    query FindUserItemsByID($id: ID!) {
  findUserByID(id: $id) {
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
export function useFindUserItemsByIdQuery(baseOptions: Apollo.QueryHookOptions<FindUserItemsByIdQuery, FindUserItemsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserItemsByIdQuery, FindUserItemsByIdQueryVariables>(FindUserItemsByIdDocument, options);
      }
export function useFindUserItemsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserItemsByIdQuery, FindUserItemsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserItemsByIdQuery, FindUserItemsByIdQueryVariables>(FindUserItemsByIdDocument, options);
        }
export type FindUserItemsByIdQueryHookResult = ReturnType<typeof useFindUserItemsByIdQuery>;
export type FindUserItemsByIdLazyQueryHookResult = ReturnType<typeof useFindUserItemsByIdLazyQuery>;
export type FindUserItemsByIdQueryResult = Apollo.QueryResult<FindUserItemsByIdQuery, FindUserItemsByIdQueryVariables>;
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
export function useFindItemByIdQuery(baseOptions: Apollo.QueryHookOptions<FindItemByIdQuery, FindItemByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindItemByIdQuery, FindItemByIdQueryVariables>(FindItemByIdDocument, options);
      }
export function useFindItemByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindItemByIdQuery, FindItemByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindItemByIdQuery, FindItemByIdQueryVariables>(FindItemByIdDocument, options);
        }
export type FindItemByIdQueryHookResult = ReturnType<typeof useFindItemByIdQuery>;
export type FindItemByIdLazyQueryHookResult = ReturnType<typeof useFindItemByIdLazyQuery>;
export type FindItemByIdQueryResult = Apollo.QueryResult<FindItemByIdQuery, FindItemByIdQueryVariables>;
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
export type CreateItemMutationFn = Apollo.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

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
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      type: // value for 'type'
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, options);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = Apollo.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = Apollo.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
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
export type UpdateItemMutationFn = Apollo.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

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
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, options);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = Apollo.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = Apollo.BaseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>;
export const FindUserSpacesByIdDocument = gql`
    query FindUserSpacesByID($id: ID!) {
  findUserByID(id: $id) {
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
export function useFindUserSpacesByIdQuery(baseOptions: Apollo.QueryHookOptions<FindUserSpacesByIdQuery, FindUserSpacesByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserSpacesByIdQuery, FindUserSpacesByIdQueryVariables>(FindUserSpacesByIdDocument, options);
      }
export function useFindUserSpacesByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserSpacesByIdQuery, FindUserSpacesByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserSpacesByIdQuery, FindUserSpacesByIdQueryVariables>(FindUserSpacesByIdDocument, options);
        }
export type FindUserSpacesByIdQueryHookResult = ReturnType<typeof useFindUserSpacesByIdQuery>;
export type FindUserSpacesByIdLazyQueryHookResult = ReturnType<typeof useFindUserSpacesByIdLazyQuery>;
export type FindUserSpacesByIdQueryResult = Apollo.QueryResult<FindUserSpacesByIdQuery, FindUserSpacesByIdQueryVariables>;
export const DeleteSpaceDocument = gql`
    mutation DeleteSpace($id: ID!) {
  deleteSpace(id: $id) {
    _id
  }
}
    `;
export type DeleteSpaceMutationFn = Apollo.MutationFunction<DeleteSpaceMutation, DeleteSpaceMutationVariables>;

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
 * const [deleteSpaceMutation, { data, loading, error }] = useDeleteSpaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSpaceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSpaceMutation, DeleteSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSpaceMutation, DeleteSpaceMutationVariables>(DeleteSpaceDocument, options);
      }
export type DeleteSpaceMutationHookResult = ReturnType<typeof useDeleteSpaceMutation>;
export type DeleteSpaceMutationResult = Apollo.MutationResult<DeleteSpaceMutation>;
export type DeleteSpaceMutationOptions = Apollo.BaseMutationOptions<DeleteSpaceMutation, DeleteSpaceMutationVariables>;
export const CreateSpaceDocument = gql`
    mutation CreateSpace($name: String!, $description: String!, $owner: String!) {
  createSpace(name: $name, description: $description, owner: $owner) {
    _id
    name
    description
  }
}
    `;
export type CreateSpaceMutationFn = Apollo.MutationFunction<CreateSpaceMutation, CreateSpaceMutationVariables>;

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
 * const [createSpaceMutation, { data, loading, error }] = useCreateSpaceMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useCreateSpaceMutation(baseOptions?: Apollo.MutationHookOptions<CreateSpaceMutation, CreateSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSpaceMutation, CreateSpaceMutationVariables>(CreateSpaceDocument, options);
      }
export type CreateSpaceMutationHookResult = ReturnType<typeof useCreateSpaceMutation>;
export type CreateSpaceMutationResult = Apollo.MutationResult<CreateSpaceMutation>;
export type CreateSpaceMutationOptions = Apollo.BaseMutationOptions<CreateSpaceMutation, CreateSpaceMutationVariables>;
export const FindSpaceByIdDocument = gql`
    query FindSpaceByID($id: ID!) {
  findSpaceByID(id: $id) {
    _id
    name
    description
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
export function useFindSpaceByIdQuery(baseOptions: Apollo.QueryHookOptions<FindSpaceByIdQuery, FindSpaceByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSpaceByIdQuery, FindSpaceByIdQueryVariables>(FindSpaceByIdDocument, options);
      }
export function useFindSpaceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSpaceByIdQuery, FindSpaceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSpaceByIdQuery, FindSpaceByIdQueryVariables>(FindSpaceByIdDocument, options);
        }
export type FindSpaceByIdQueryHookResult = ReturnType<typeof useFindSpaceByIdQuery>;
export type FindSpaceByIdLazyQueryHookResult = ReturnType<typeof useFindSpaceByIdLazyQuery>;
export type FindSpaceByIdQueryResult = Apollo.QueryResult<FindSpaceByIdQuery, FindSpaceByIdQueryVariables>;
export const UpdateSpaceDocument = gql`
    mutation UpdateSpace($id: ID!, $data: SpaceInput!) {
  updateSpace(id: $id, data: $data) {
    _id
    name
    description
  }
}
    `;
export type UpdateSpaceMutationFn = Apollo.MutationFunction<UpdateSpaceMutation, UpdateSpaceMutationVariables>;

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
 * const [updateSpaceMutation, { data, loading, error }] = useUpdateSpaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSpaceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSpaceMutation, UpdateSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSpaceMutation, UpdateSpaceMutationVariables>(UpdateSpaceDocument, options);
      }
export type UpdateSpaceMutationHookResult = ReturnType<typeof useUpdateSpaceMutation>;
export type UpdateSpaceMutationResult = Apollo.MutationResult<UpdateSpaceMutation>;
export type UpdateSpaceMutationOptions = Apollo.BaseMutationOptions<UpdateSpaceMutation, UpdateSpaceMutationVariables>;
export const DeleteContactDocument = gql`
    mutation DeleteContact($id: ID!) {
  deleteContact(id: $id) {
    _id
  }
}
    `;
export type DeleteContactMutationFn = Apollo.MutationFunction<DeleteContactMutation, DeleteContactMutationVariables>;

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
 * const [deleteContactMutation, { data, loading, error }] = useDeleteContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContactMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContactMutation, DeleteContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContactMutation, DeleteContactMutationVariables>(DeleteContactDocument, options);
      }
export type DeleteContactMutationHookResult = ReturnType<typeof useDeleteContactMutation>;
export type DeleteContactMutationResult = Apollo.MutationResult<DeleteContactMutation>;
export type DeleteContactMutationOptions = Apollo.BaseMutationOptions<DeleteContactMutation, DeleteContactMutationVariables>;
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
export type CreateContactMutationFn = Apollo.MutationFunction<CreateContactMutation, CreateContactMutationVariables>;

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
 * const [createContactMutation, { data, loading, error }] = useCreateContactMutation({
 *   variables: {
 *      owner: // value for 'owner'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateContactMutation(baseOptions?: Apollo.MutationHookOptions<CreateContactMutation, CreateContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContactMutation, CreateContactMutationVariables>(CreateContactDocument, options);
      }
export type CreateContactMutationHookResult = ReturnType<typeof useCreateContactMutation>;
export type CreateContactMutationResult = Apollo.MutationResult<CreateContactMutation>;
export type CreateContactMutationOptions = Apollo.BaseMutationOptions<CreateContactMutation, CreateContactMutationVariables>;
export const FindUserContactsByIdDocument = gql`
    query FindUserContactsByID($id: ID!) {
  findUserByID(id: $id) {
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
export function useFindUserContactsByIdQuery(baseOptions: Apollo.QueryHookOptions<FindUserContactsByIdQuery, FindUserContactsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserContactsByIdQuery, FindUserContactsByIdQueryVariables>(FindUserContactsByIdDocument, options);
      }
export function useFindUserContactsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserContactsByIdQuery, FindUserContactsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserContactsByIdQuery, FindUserContactsByIdQueryVariables>(FindUserContactsByIdDocument, options);
        }
export type FindUserContactsByIdQueryHookResult = ReturnType<typeof useFindUserContactsByIdQuery>;
export type FindUserContactsByIdLazyQueryHookResult = ReturnType<typeof useFindUserContactsByIdLazyQuery>;
export type FindUserContactsByIdQueryResult = Apollo.QueryResult<FindUserContactsByIdQuery, FindUserContactsByIdQueryVariables>;
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
export function useFindUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<FindUserByEmailQuery, FindUserByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserByEmailQuery, FindUserByEmailQueryVariables>(FindUserByEmailDocument, options);
      }
export function useFindUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserByEmailQuery, FindUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserByEmailQuery, FindUserByEmailQueryVariables>(FindUserByEmailDocument, options);
        }
export type FindUserByEmailQueryHookResult = ReturnType<typeof useFindUserByEmailQuery>;
export type FindUserByEmailLazyQueryHookResult = ReturnType<typeof useFindUserByEmailLazyQuery>;
export type FindUserByEmailQueryResult = Apollo.QueryResult<FindUserByEmailQuery, FindUserByEmailQueryVariables>;
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
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
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
export type UserLoginMutationFn = Apollo.MutationFunction<UserLoginMutation, UserLoginMutationVariables>;

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
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: Apollo.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, options);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<UserLoginMutation>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<UserLoginMutation, UserLoginMutationVariables>;
export const UserSignUpDocument = gql`
    mutation UserSignUp($name: String!, $email: String!, $password: String!) {
  registerUser(name: $name, email: $email, password: $password) {
    name
    email
  }
}
    `;
export type UserSignUpMutationFn = Apollo.MutationFunction<UserSignUpMutation, UserSignUpMutationVariables>;

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
 * const [userSignUpMutation, { data, loading, error }] = useUserSignUpMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUserSignUpMutation(baseOptions?: Apollo.MutationHookOptions<UserSignUpMutation, UserSignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserSignUpMutation, UserSignUpMutationVariables>(UserSignUpDocument, options);
      }
export type UserSignUpMutationHookResult = ReturnType<typeof useUserSignUpMutation>;
export type UserSignUpMutationResult = Apollo.MutationResult<UserSignUpMutation>;
export type UserSignUpMutationOptions = Apollo.BaseMutationOptions<UserSignUpMutation, UserSignUpMutationVariables>;