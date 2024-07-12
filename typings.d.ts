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

export type CountriesWithExtensionCustomizer = CollectionCustomizer<Schema, 'countries_with_extension'>;
export type CountriesWithExtensionRecord = TPartialRow<Schema, 'countries_with_extension'>;
export type CountriesWithExtensionConditionTree = TConditionTree<Schema, 'countries_with_extension'>;
export type CountriesWithExtensionFilter = TPaginatedFilter<Schema, 'countries_with_extension'>;
export type CountriesWithExtensionSortClause = TSortClause<Schema, 'countries_with_extension'>;
export type CountriesWithExtensionAggregation = TAggregation<Schema, 'countries_with_extension'>;


export type Schema = {
  'companies': {
    plain: {
      'headquarter': string | null;
      'iban': string | null;
      'id': number;
      'name': string;
      'status': 'approved' | 'created' | 'rejected' | 'require_further_verification' | 'waiting_for_legal_doc' | null;
      'url': string | null;
      'urlExtension': string | null;
      'user_id': number | null;
    };
    nested: {
      'owner': Schema['users']['plain'] & Schema['users']['nested'];
      'potentialCountry': Schema['countries_with_extension']['plain'] & Schema['countries_with_extension']['nested'];
    };
    flat: {
      'owner:address': string | null;
      'owner:email': string;
      'owner:firstname': string | null;
      'owner:iban': string | null;
      'owner:id': number;
      'owner:is_blacklisted': boolean | null;
      'owner:lastname': string | null;
      'owner:phone_number': string | null;
      'owner:signup_date': string | null;
      'owner:status': 'approved' | 'rejected' | 'require_further_verification' | 'signed_up' | 'waiting_for_legal_doc' | null;
      'potentialCountry:country': string;
      'potentialCountry:id': string;
    };
  };
  'countries_with_extension': {
    plain: {
      'country': string;
      'id': string;
    };
    nested: {};
    flat: {};
  };
  'users': {
    plain: {
      'address': string | null;
      'email': string;
      'firstname': string | null;
      'iban': string | null;
      'id': number;
      'is_blacklisted': boolean | null;
      'lastname': string | null;
      'phone_number': string | null;
      'signup_date': string | null;
      'status': 'approved' | 'rejected' | 'require_further_verification' | 'signed_up' | 'waiting_for_legal_doc' | null;
    };
    nested: {};
    flat: {};
  };
};
