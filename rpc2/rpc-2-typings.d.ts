/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

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
      'potentialCountry': Schema['countries_with_extension']['plain'] & Schema['countries_with_extension']['nested'];
    };
    flat: {
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
};
