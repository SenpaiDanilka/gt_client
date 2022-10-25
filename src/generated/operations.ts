import { Exact, Scalars, ItemType, AvailabilityModel, ItemInput, ContactStatus, SpaceInput, SpaceContactLinkInput, PartialUpdateContactInput } from "./types";

export type UserLoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserLoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Token', ttl: any, secret: string, email: string, userId: string } | null };

export type UserSignUpMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserSignUpMutation = { __typename?: 'Mutation', registerUser?: { __typename?: 'User', name: string, email: string } | null };

export type DeleteItemMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem?: { __typename?: 'Item', _id: string } | null };

export type FindUserItemsByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FindUserItemsByIdQuery = { __typename?: 'Query', findUserByID?: { __typename?: 'User', _id: string, items: { __typename?: 'ItemPage', data: Array<{ __typename?: 'Item', _id: string, description?: string | null, name: string, type: ItemType } | null> } } | null };

export type GetItemsQueryVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type GetItemsQuery = { __typename?: 'Query', getItems?: Array<{ __typename?: 'Item', _id: string, description?: string | null, name: string, type: ItemType }> | null };

export type GetModelItemsQueryVariables = Exact<{
  model: AvailabilityModel;
  model_id: Scalars['String'];
}>;


export type GetModelItemsQuery = { __typename?: 'Query', getModelItems?: Array<{ __typename?: 'AvailableItem', _id: string, model: AvailabilityModel, model_id: string, item: { __typename?: 'Item', _id: string, name: string, description?: string | null, type: ItemType } }> | null };

export type DeleteAvailableItemMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteAvailableItemMutation = { __typename?: 'Mutation', deleteAvailableItem?: { __typename?: 'AvailableItem', _id: string } | null };

export type FindItemByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FindItemByIdQuery = { __typename?: 'Query', findItemByID?: { __typename?: 'Item', _id: string, name: string, description?: string | null, type: ItemType } | null };

export type CreateItemMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  type: ItemType;
  owner: Scalars['String'];
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem?: { __typename?: 'Item', _id: string, name: string, description?: string | null, type: ItemType } | null };

export type CreateAvailableItemMutationVariables = Exact<{
  model: AvailabilityModel;
  model_id: Scalars['String'];
  item_id: Scalars['String'];
}>;


export type CreateAvailableItemMutation = { __typename?: 'Mutation', createAvailableItem?: { __typename?: 'AvailableItem', _id: string, model: AvailabilityModel, model_id: string, item: { __typename?: 'Item', _id: string, type: ItemType, name: string, description?: string | null } } | null };

export type UpdateItemMutationVariables = Exact<{
  id: Scalars['ID'];
  data: ItemInput;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem?: { __typename?: 'Item', _id: string, name: string, description?: string | null, type: ItemType } | null };

export type FindUserSpacesByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FindUserSpacesByIdQuery = { __typename?: 'Query', findUserByID?: { __typename?: 'User', _id: string, spaces: { __typename?: 'SpacePage', data: Array<{ __typename?: 'Space', _id: string, description?: string | null, name: string } | null> } } | null };

export type DeleteSpaceMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteSpaceMutation = { __typename?: 'Mutation', deleteSpace?: { __typename?: 'Space', _id: string } | null };

export type CreateSpaceMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  owner: Scalars['String'];
}>;


export type CreateSpaceMutation = { __typename?: 'Mutation', createSpace?: { __typename?: 'Space', _id: string, name: string, description?: string | null } | null };

export type FindSpaceByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FindSpaceByIdQuery = { __typename?: 'Query', findSpaceByID?: { __typename?: 'Space', _id: string, name: string, description?: string | null, contacts: { __typename?: 'SpaceContactLinkPage', data: Array<{ __typename?: 'SpaceContactLink', _id: string, contact: { __typename?: 'Contact', _id: string, status: ContactStatus, user_one: { __typename?: 'User', _id: string, name: string }, user_two: { __typename?: 'User', _id: string, name: string } } } | null> } } | null };

export type UpdateSpaceMutationVariables = Exact<{
  id: Scalars['ID'];
  data: SpaceInput;
}>;


export type UpdateSpaceMutation = { __typename?: 'Mutation', updateSpace?: { __typename?: 'Space', _id: string, name: string, description?: string | null } | null };

export type CreateSpaceContactLinkMutationVariables = Exact<{
  data: SpaceContactLinkInput;
}>;


export type CreateSpaceContactLinkMutation = { __typename?: 'Mutation', createSpaceContactLink: { __typename?: 'SpaceContactLink', _id: string, contact: { __typename?: 'Contact', _id: string, status: ContactStatus, user_one: { __typename?: 'User', _id: string, name: string }, user_two: { __typename?: 'User', _id: string, name: string } } } };

export type DeleteSpaceContactLinkMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteSpaceContactLinkMutation = { __typename?: 'Mutation', deleteSpaceContactLink?: { __typename?: 'SpaceContactLink', _id: string } | null };

export type DeleteContactMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact?: { __typename?: 'Contact', _id: string } | null };

export type CreateContactMutationVariables = Exact<{
  user_one: Scalars['String'];
  user_two: Scalars['String'];
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact?: { __typename?: 'Contact', _id: string, status: ContactStatus, user_one: { __typename?: 'User', _id: string, name: string }, user_two: { __typename?: 'User', _id: string, name: string } } | null };

export type PartialUpdateContactMutationVariables = Exact<{
  id: Scalars['ID'];
  data: PartialUpdateContactInput;
}>;


export type PartialUpdateContactMutation = { __typename?: 'Mutation', partialUpdateContact?: { __typename?: 'Contact', _id: string, status: ContactStatus, user_one: { __typename?: 'User', _id: string, name: string }, user_two: { __typename?: 'User', _id: string, name: string } } | null };

export type GetContactsByUserIdQueryVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type GetContactsByUserIdQuery = { __typename?: 'Query', getContactsByUserId?: Array<{ __typename?: 'Contact', _id: string, status: ContactStatus, user_one: { __typename?: 'User', _id: string, name: string }, user_two: { __typename?: 'User', _id: string, name: string } }> | null };

export type GetSentContactRequestsQueryVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type GetSentContactRequestsQuery = { __typename?: 'Query', getSentContactRequests?: Array<{ __typename?: 'Contact', _id: string, status: ContactStatus, user_one: { __typename?: 'User', _id: string, name: string }, user_two: { __typename?: 'User', _id: string, name: string } }> | null };

export type GetIncomingContactRequestsQueryVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type GetIncomingContactRequestsQuery = { __typename?: 'Query', getIncomingContactRequests?: Array<{ __typename?: 'Contact', _id: string, status: ContactStatus, user_one: { __typename?: 'User', _id: string, name: string }, user_two: { __typename?: 'User', _id: string, name: string } }> | null };

export type FindUserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type FindUserByEmailQuery = { __typename?: 'Query', findUserByEmail?: { __typename?: 'User', _id: string, name: string } | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: { __typename?: 'ShortUser', name: string, email: string, spaces_count: number, items_count: number, contacts_count: number } | null };
