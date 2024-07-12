/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type CountriesWithExtensionCustomizer = CollectionCustomizer<Schema, 'countries_with_extension'>;
export type CountriesWithExtensionRecord = TPartialRow<Schema, 'countries_with_extension'>;
export type CountriesWithExtensionConditionTree = TConditionTree<Schema, 'countries_with_extension'>;
export type CountriesWithExtensionFilter = TPaginatedFilter<Schema, 'countries_with_extension'>;
export type CountriesWithExtensionSortClause = TSortClause<Schema, 'countries_with_extension'>;
export type CountriesWithExtensionAggregation = TAggregation<Schema, 'countries_with_extension'>;


export type Schema = {
  'countries_with_extension': {
    plain: {
      'country': string;
      'id': string;
    };
    nested: {};
    flat: {};
  };
};
