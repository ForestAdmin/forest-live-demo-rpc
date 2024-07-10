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
    nested: {};
    flat: {};
  };
};
