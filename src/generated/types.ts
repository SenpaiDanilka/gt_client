export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Long: any;
  Time: any;
};

export enum AvailabilityModel {
  Space = 'SPACE',
  User = 'USER'
}

export type AvailableItem = {
  __typename?: 'AvailableItem';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  item: Item;
  model: AvailabilityModel;
  model_id: Scalars['String'];
};

/** 'AvailableItem' input values */
export type AvailableItemInput = {
  item?: InputMaybe<AvailableItemItemRelation>;
  model: AvailabilityModel;
  model_id: Scalars['String'];
};

/** Allow manipulating the relationship between the types 'AvailableItem' and 'Item' using the field 'AvailableItem.item'. */
export type AvailableItemItemRelation = {
  /** Connect a document of type 'Item' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
  /** Create a document of type 'Item' and associate it with the current document. */
  create?: InputMaybe<ItemInput>;
};

export type Contact = {
  __typename?: 'Contact';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  owner: User;
  user: User;
};

/** 'Contact' input values */
export type ContactInput = {
  owner?: InputMaybe<ContactOwnerRelation>;
  user?: InputMaybe<ContactUserRelation>;
};

/** Allow manipulating the relationship between the types 'Contact' and 'User' using the field 'Contact.owner'. */
export type ContactOwnerRelation = {
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
  /** Create a document of type 'User' and associate it with the current document. */
  create?: InputMaybe<UserInput>;
};

/** The pagination object for elements of type 'Contact'. */
export type ContactPage = {
  __typename?: 'ContactPage';
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
  /** The elements of type 'Contact' in this page. */
  data: Array<Maybe<Contact>>;
};

/** Allow manipulating the relationship between the types 'Contact' and 'User' using the field 'Contact.user'. */
export type ContactUserRelation = {
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
  /** Create a document of type 'User' and associate it with the current document. */
  create?: InputMaybe<UserInput>;
};

export type Item = {
  __typename?: 'Item';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner: User;
  type: ItemType;
};

/** 'Item' input values */
export type ItemInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  owner?: InputMaybe<ItemOwnerRelation>;
  type: ItemType;
};

/** Allow manipulating the relationship between the types 'Item' and 'User' using the field 'Item.owner'. */
export type ItemOwnerRelation = {
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
  /** Create a document of type 'User' and associate it with the current document. */
  create?: InputMaybe<UserInput>;
};

/** The pagination object for elements of type 'Item'. */
export type ItemPage = {
  __typename?: 'ItemPage';
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
  /** The elements of type 'Item' in this page. */
  data: Array<Maybe<Item>>;
};

export enum ItemType {
  Electronics = 'ELECTRONICS',
  Other = 'OTHER',
  RealEstate = 'REAL_ESTATE',
  Vehicle = 'VEHICLE'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAvailableItem?: Maybe<AvailableItem>;
  createContact?: Maybe<Contact>;
  createItem?: Maybe<Item>;
  createSpace?: Maybe<Space>;
  /** Create a new document in the collection of 'SpaceContactLink' */
  createSpaceContactLink: SpaceContactLink;
  /** Create a new document in the collection of 'SpaceUser' */
  createSpaceUser: SpaceUser;
  /** Create a new document in the collection of 'User' */
  createUser: User;
  /** Delete an existing document in the collection of 'AvailableItem' */
  deleteAvailableItem?: Maybe<AvailableItem>;
  /** Delete an existing document in the collection of 'Contact' */
  deleteContact?: Maybe<Contact>;
  /** Delete an existing document in the collection of 'Item' */
  deleteItem?: Maybe<Item>;
  /** Delete an existing document in the collection of 'Space' */
  deleteSpace?: Maybe<Space>;
  /** Delete an existing document in the collection of 'SpaceContactLink' */
  deleteSpaceContactLink?: Maybe<SpaceContactLink>;
  /** Delete an existing document in the collection of 'SpaceUser' */
  deleteSpaceUser?: Maybe<SpaceUser>;
  /** Delete an existing document in the collection of 'User' */
  deleteUser?: Maybe<User>;
  login?: Maybe<Token>;
  /** Partially updates an existing document in the collection of 'AvailableItem'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateAvailableItem?: Maybe<AvailableItem>;
  /** Partially updates an existing document in the collection of 'Contact'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateContact?: Maybe<Contact>;
  /** Partially updates an existing document in the collection of 'Item'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateItem?: Maybe<Item>;
  /** Partially updates an existing document in the collection of 'Space'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateSpace?: Maybe<Space>;
  /** Partially updates an existing document in the collection of 'SpaceContactLink'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateSpaceContactLink?: Maybe<SpaceContactLink>;
  /** Partially updates an existing document in the collection of 'SpaceUser'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateSpaceUser?: Maybe<SpaceUser>;
  /** Partially updates an existing document in the collection of 'User'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateUser?: Maybe<User>;
  registerUser?: Maybe<User>;
  /** Update an existing document in the collection of 'AvailableItem' */
  updateAvailableItem?: Maybe<AvailableItem>;
  /** Update an existing document in the collection of 'Contact' */
  updateContact?: Maybe<Contact>;
  /** Update an existing document in the collection of 'Item' */
  updateItem?: Maybe<Item>;
  /** Update an existing document in the collection of 'Space' */
  updateSpace?: Maybe<Space>;
  /** Update an existing document in the collection of 'SpaceContactLink' */
  updateSpaceContactLink?: Maybe<SpaceContactLink>;
  /** Update an existing document in the collection of 'SpaceUser' */
  updateSpaceUser?: Maybe<SpaceUser>;
  /** Update an existing document in the collection of 'User' */
  updateUser?: Maybe<User>;
};


export type MutationCreateAvailableItemArgs = {
  item_id: Scalars['String'];
  model: AvailabilityModel;
  model_id: Scalars['String'];
};


export type MutationCreateContactArgs = {
  owner: Scalars['String'];
  user: Scalars['String'];
};


export type MutationCreateItemArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  owner: Scalars['String'];
  type: ItemType;
};


export type MutationCreateSpaceArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  owner: Scalars['String'];
};


export type MutationCreateSpaceContactLinkArgs = {
  data: SpaceContactLinkInput;
};


export type MutationCreateSpaceUserArgs = {
  data: SpaceUserInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteAvailableItemArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteContactArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSpaceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSpaceContactLinkArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSpaceUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationPartialUpdateAvailableItemArgs = {
  data: PartialUpdateAvailableItemInput;
  id: Scalars['ID'];
};


export type MutationPartialUpdateContactArgs = {
  data: PartialUpdateContactInput;
  id: Scalars['ID'];
};


export type MutationPartialUpdateItemArgs = {
  data: PartialUpdateItemInput;
  id: Scalars['ID'];
};


export type MutationPartialUpdateSpaceArgs = {
  data: PartialUpdateSpaceInput;
  id: Scalars['ID'];
};


export type MutationPartialUpdateSpaceContactLinkArgs = {
  data: PartialUpdateSpaceContactLinkInput;
  id: Scalars['ID'];
};


export type MutationPartialUpdateSpaceUserArgs = {
  data: PartialUpdateSpaceUserInput;
  id: Scalars['ID'];
};


export type MutationPartialUpdateUserArgs = {
  data: PartialUpdateUserInput;
  id: Scalars['ID'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateAvailableItemArgs = {
  data: AvailableItemInput;
  id: Scalars['ID'];
};


export type MutationUpdateContactArgs = {
  data: ContactInput;
  id: Scalars['ID'];
};


export type MutationUpdateItemArgs = {
  data: ItemInput;
  id: Scalars['ID'];
};


export type MutationUpdateSpaceArgs = {
  data: SpaceInput;
  id: Scalars['ID'];
};


export type MutationUpdateSpaceContactLinkArgs = {
  data: SpaceContactLinkInput;
  id: Scalars['ID'];
};


export type MutationUpdateSpaceUserArgs = {
  data: SpaceUserInput;
  id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  data: UserInput;
  id: Scalars['ID'];
};

/** 'AvailableItem' input values */
export type PartialUpdateAvailableItemInput = {
  item?: InputMaybe<AvailableItemItemRelation>;
  model?: InputMaybe<AvailabilityModel>;
  model_id?: InputMaybe<Scalars['String']>;
};

/** 'Contact' input values */
export type PartialUpdateContactInput = {
  owner?: InputMaybe<ContactOwnerRelation>;
  user?: InputMaybe<ContactUserRelation>;
};

/** 'Item' input values */
export type PartialUpdateItemInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<ItemOwnerRelation>;
  type?: InputMaybe<ItemType>;
};

/** 'ShortUser' input values */
export type PartialUpdateShortUserInput = {
  contacts_count?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  items_count?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  spaces_count?: InputMaybe<Scalars['Int']>;
};

/** 'SpaceContactLink' input values */
export type PartialUpdateSpaceContactLinkInput = {
  contact?: InputMaybe<SpaceContactLinkContactRelation>;
  space?: InputMaybe<SpaceContactLinkSpaceRelation>;
};

/** 'Space' input values */
export type PartialUpdateSpaceInput = {
  contacts?: InputMaybe<SpaceContactsRelation>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<SpaceOwnerRelation>;
};

/** 'SpaceUser' input values */
export type PartialUpdateSpaceUserInput = {
  space?: InputMaybe<SpaceUserSpaceRelation>;
  user?: InputMaybe<SpaceUserUserRelation>;
};

/** 'Token' input values */
export type PartialUpdateTokenInput = {
  email?: InputMaybe<Scalars['String']>;
  secret?: InputMaybe<Scalars['String']>;
  ttl?: InputMaybe<Scalars['Time']>;
  userId?: InputMaybe<Scalars['String']>;
};

/** 'User' input values */
export type PartialUpdateUserInput = {
  contacts?: InputMaybe<UserContactsRelation>;
  email?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<UserItemsRelation>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  spaces?: InputMaybe<UserSpacesRelation>;
};

export type Query = {
  __typename?: 'Query';
  /** Find a document from the collection of 'AvailableItem' by its id. */
  findAvailableItemByID?: Maybe<AvailableItem>;
  /** Find a document from the collection of 'Contact' by its id. */
  findContactByID?: Maybe<Contact>;
  /** Find a document from the collection of 'Item' by its id. */
  findItemByID?: Maybe<Item>;
  /** Find a document from the collection of 'Space' by its id. */
  findSpaceByID?: Maybe<Space>;
  /** Find a document from the collection of 'SpaceContactLink' by its id. */
  findSpaceContactLinkByID?: Maybe<SpaceContactLink>;
  /** Find a document from the collection of 'SpaceUser' by its id. */
  findSpaceUserByID?: Maybe<SpaceUser>;
  findUserByEmail?: Maybe<User>;
  /** Find a document from the collection of 'User' by its id. */
  findUserByID?: Maybe<User>;
  getModelItems?: Maybe<Array<AvailableItem>>;
  getUserByEmail?: Maybe<ShortUser>;
  getUserById?: Maybe<ShortUser>;
  listUsers: UserPage;
};


export type QueryFindAvailableItemByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindContactByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindItemByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindSpaceByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindSpaceContactLinkByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindSpaceUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindUserByEmailArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type QueryFindUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetModelItemsArgs = {
  model: AvailabilityModel;
  model_id: Scalars['String'];
};


export type QueryGetUserByEmailArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryListUsersArgs = {
  _cursor?: InputMaybe<Scalars['String']>;
  _size?: InputMaybe<Scalars['Int']>;
};

export type ShortUser = {
  __typename?: 'ShortUser';
  contacts_count: Scalars['Int'];
  email: Scalars['String'];
  items_count: Scalars['Int'];
  name: Scalars['String'];
  spaces_count: Scalars['Int'];
};

/** 'ShortUser' input values */
export type ShortUserInput = {
  contacts_count: Scalars['Int'];
  email: Scalars['String'];
  items_count: Scalars['Int'];
  name: Scalars['String'];
  spaces_count: Scalars['Int'];
};

export type Space = {
  __typename?: 'Space';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  contacts: SpaceContactLinkPage;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner: User;
};


export type SpaceContactsArgs = {
  _cursor?: InputMaybe<Scalars['String']>;
  _size?: InputMaybe<Scalars['Int']>;
};

export type SpaceContactLink = {
  __typename?: 'SpaceContactLink';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  contact: Contact;
  space: Space;
};

/** Allow manipulating the relationship between the types 'SpaceContactLink' and 'Contact' using the field 'SpaceContactLink.contact'. */
export type SpaceContactLinkContactRelation = {
  /** Connect a document of type 'Contact' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
  /** Create a document of type 'Contact' and associate it with the current document. */
  create?: InputMaybe<ContactInput>;
};

/** 'SpaceContactLink' input values */
export type SpaceContactLinkInput = {
  contact?: InputMaybe<SpaceContactLinkContactRelation>;
  space?: InputMaybe<SpaceContactLinkSpaceRelation>;
};

/** The pagination object for elements of type 'SpaceContactLink'. */
export type SpaceContactLinkPage = {
  __typename?: 'SpaceContactLinkPage';
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
  /** The elements of type 'SpaceContactLink' in this page. */
  data: Array<Maybe<SpaceContactLink>>;
};

/** Allow manipulating the relationship between the types 'SpaceContactLink' and 'Space' using the field 'SpaceContactLink.space'. */
export type SpaceContactLinkSpaceRelation = {
  /** Connect a document of type 'Space' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
  /** Create a document of type 'Space' and associate it with the current document. */
  create?: InputMaybe<SpaceInput>;
};

/** Allow manipulating the relationship between the types 'Space' and 'SpaceContactLink'. */
export type SpaceContactsRelation = {
  /** Connect one or more documents of type 'SpaceContactLink' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Create one or more documents of type 'SpaceContactLink' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<SpaceContactLinkInput>>>;
  /** Disconnect the given documents of type 'SpaceContactLink' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** 'Space' input values */
export type SpaceInput = {
  contacts?: InputMaybe<SpaceContactsRelation>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  owner?: InputMaybe<SpaceOwnerRelation>;
};

/** Allow manipulating the relationship between the types 'Space' and 'User' using the field 'Space.owner'. */
export type SpaceOwnerRelation = {
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
  /** Create a document of type 'User' and associate it with the current document. */
  create?: InputMaybe<UserInput>;
};

/** The pagination object for elements of type 'Space'. */
export type SpacePage = {
  __typename?: 'SpacePage';
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
  /** The elements of type 'Space' in this page. */
  data: Array<Maybe<Space>>;
};

export type SpaceUser = {
  __typename?: 'SpaceUser';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  space: Space;
  user: User;
};

/** 'SpaceUser' input values */
export type SpaceUserInput = {
  space?: InputMaybe<SpaceUserSpaceRelation>;
  user?: InputMaybe<SpaceUserUserRelation>;
};

/** Allow manipulating the relationship between the types 'SpaceUser' and 'Space' using the field 'SpaceUser.space'. */
export type SpaceUserSpaceRelation = {
  /** Connect a document of type 'Space' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
  /** Create a document of type 'Space' and associate it with the current document. */
  create?: InputMaybe<SpaceInput>;
};

/** Allow manipulating the relationship between the types 'SpaceUser' and 'User' using the field 'SpaceUser.user'. */
export type SpaceUserUserRelation = {
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
  /** Create a document of type 'User' and associate it with the current document. */
  create?: InputMaybe<UserInput>;
};

export type Token = {
  __typename?: 'Token';
  email: Scalars['String'];
  secret: Scalars['String'];
  ttl: Scalars['Time'];
  userId: Scalars['String'];
};

/** 'Token' input values */
export type TokenInput = {
  email: Scalars['String'];
  secret: Scalars['String'];
  ttl: Scalars['Time'];
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  contacts: ContactPage;
  email: Scalars['String'];
  items: ItemPage;
  name: Scalars['String'];
  password: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  spaces: SpacePage;
};


export type UserContactsArgs = {
  _cursor?: InputMaybe<Scalars['String']>;
  _size?: InputMaybe<Scalars['Int']>;
};


export type UserItemsArgs = {
  _cursor?: InputMaybe<Scalars['String']>;
  _size?: InputMaybe<Scalars['Int']>;
};


export type UserSpacesArgs = {
  _cursor?: InputMaybe<Scalars['String']>;
  _size?: InputMaybe<Scalars['Int']>;
};

/** Allow manipulating the relationship between the types 'User' and 'Contact'. */
export type UserContactsRelation = {
  /** Connect one or more documents of type 'Contact' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Create one or more documents of type 'Contact' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<ContactInput>>>;
  /** Disconnect the given documents of type 'Contact' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** 'User' input values */
export type UserInput = {
  contacts?: InputMaybe<UserContactsRelation>;
  email: Scalars['String'];
  items?: InputMaybe<UserItemsRelation>;
  name: Scalars['String'];
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  spaces?: InputMaybe<UserSpacesRelation>;
};

/** Allow manipulating the relationship between the types 'User' and 'Item'. */
export type UserItemsRelation = {
  /** Connect one or more documents of type 'Item' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Create one or more documents of type 'Item' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<ItemInput>>>;
  /** Disconnect the given documents of type 'Item' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** The pagination object for elements of type 'User'. */
export type UserPage = {
  __typename?: 'UserPage';
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
  /** The elements of type 'User' in this page. */
  data: Array<Maybe<User>>;
};

/** Allow manipulating the relationship between the types 'User' and 'Space'. */
export type UserSpacesRelation = {
  /** Connect one or more documents of type 'Space' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Create one or more documents of type 'Space' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<SpaceInput>>>;
  /** Disconnect the given documents of type 'Space' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};
