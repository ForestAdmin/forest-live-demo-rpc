/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type UsersCustomizer = CollectionCustomizer<Schema, 'users'>;
export type UsersRecord = TPartialRow<Schema, 'users'>;
export type UsersConditionTree = TConditionTree<Schema, 'users'>;
export type UsersFilter = TPaginatedFilter<Schema, 'users'>;
export type UsersSortClause = TSortClause<Schema, 'users'>;
export type UsersAggregation = TAggregation<Schema, 'users'>;


export type Schema = {
  'users': {
    plain: {
      'address': string | null;
      'email': string;
      'firstName': string | null;
      'fullname': string | null;
      'iban': string | null;
      'id': number;
      'is_blacklisted': boolean | null;
      'lastName': string | null;
      'phone_number': string | null;
      'signup_date': string | null;
      'splittedName': string | null;
      'status': 'approved' | 'rejected' | 'require_further_verification' | 'signed_up' | 'waiting_for_legal_doc' | null;
    };
    nested: {};
    flat: {};
  };
};
