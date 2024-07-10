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

export type CompaniesCustomizer = CollectionCustomizer<Schema, 'companies'>;
export type CompaniesRecord = TPartialRow<Schema, 'companies'>;
export type CompaniesConditionTree = TConditionTree<Schema, 'companies'>;
export type CompaniesFilter = TPaginatedFilter<Schema, 'companies'>;
export type CompaniesSortClause = TSortClause<Schema, 'companies'>;
export type CompaniesAggregation = TAggregation<Schema, 'companies'>;


export type Schema = {
  'companies': {
    plain: {
      'headquarter': string | null;
      'iban': string | null;
      'id': number;
      'name': string;
      'status': 'approved' | 'created' | 'rejected' | 'require_further_verification' | 'waiting_for_legal_doc' | null;
      'user_id': number | null;
    };
    nested: {
      'owner': Schema['users']['plain'] & Schema['users']['nested'];
    };
    flat: {
      'owner:address': string | null;
      'owner:email': string;
      'owner:firstName': string | null;
      'owner:iban': string | null;
      'owner:id': number;
      'owner:is_blacklisted': boolean | null;
      'owner:lastName': string | null;
      'owner:phone_number': string | null;
      'owner:signup_date': string | null;
      'owner:status': 'approved' | 'rejected' | 'require_further_verification' | 'signed_up' | 'waiting_for_legal_doc' | null;
    };
  };
  'users': {
    plain: {
      'address': string | null;
      'email': string;
      'firstName': string | null;
      'iban': string | null;
      'id': number;
      'is_blacklisted': boolean | null;
      'lastName': string | null;
      'phone_number': string | null;
      'signup_date': string | null;
      'status': 'approved' | 'rejected' | 'require_further_verification' | 'signed_up' | 'waiting_for_legal_doc' | null;
    };
    nested: {};
    flat: {};
  };
};
