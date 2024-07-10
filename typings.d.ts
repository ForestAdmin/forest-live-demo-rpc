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

export type DocumentsCustomizer = CollectionCustomizer<Schema, 'documents'>;
export type DocumentsRecord = TPartialRow<Schema, 'documents'>;
export type DocumentsConditionTree = TConditionTree<Schema, 'documents'>;
export type DocumentsFilter = TPaginatedFilter<Schema, 'documents'>;
export type DocumentsSortClause = TSortClause<Schema, 'documents'>;
export type DocumentsAggregation = TAggregation<Schema, 'documents'>;

export type UsersCustomizer = CollectionCustomizer<Schema, 'users'>;
export type UsersRecord = TPartialRow<Schema, 'users'>;
export type UsersConditionTree = TConditionTree<Schema, 'users'>;
export type UsersFilter = TPaginatedFilter<Schema, 'users'>;
export type UsersSortClause = TSortClause<Schema, 'users'>;
export type UsersAggregation = TAggregation<Schema, 'users'>;


export type Schema = {
  'companies': {
    plain: {
      'bank_statement_id': number | null;
      'BankStatementURL': string | null;
      'certificate_of_incorporation_id': number | null;
      'CertificateOfIncorporationURL': string | null;
      'headquarter': string | null;
      'iban': string | null;
      'id': number;
      'name': string;
      'status': 'approved' | 'created' | 'rejected' | 'require_further_verification' | 'waiting_for_legal_doc' | null;
    };
    nested: {
      'bank_statement': Schema['documents']['plain'] & Schema['documents']['nested'];
      'certificate_of_incorporation': Schema['documents']['plain'] & Schema['documents']['nested'];
    };
    flat: {
      'bank_statement:id': number;
      'bank_statement:isVerified': boolean | null;
      'bank_statement:status': 'approved' | 'created' | 'rejected' | 'require_further_verification' | 'waiting_for_legal_doc' | null;
      'bank_statement:type': string;
      'bank_statement:url': string;
      'certificate_of_incorporation:id': number;
      'certificate_of_incorporation:isVerified': boolean | null;
      'certificate_of_incorporation:status': 'approved' | 'created' | 'rejected' | 'require_further_verification' | 'waiting_for_legal_doc' | null;
      'certificate_of_incorporation:type': string;
      'certificate_of_incorporation:url': string;
    };
  };
  'documents': {
    plain: {
      'id': number;
      'isVerified': boolean | null;
      'status': 'approved' | 'created' | 'rejected' | 'require_further_verification' | 'waiting_for_legal_doc' | null;
      'type': string;
      'url': string;
    };
    nested: {};
    flat: {};
  };
  'users': {
    plain: {
      'address': string | null;
      'company_id': number | null;
      'email': string;
      'fullname': string | null;
      'iban': string | null;
      'id': number;
      'is_blacklisted': boolean | null;
      'passport_id': number | null;
      'PassportURL': string | null;
      'phone_number': string | null;
      'proof_of_address_id': number | null;
      'ProofOfAddressURL': string | null;
      'signup_date': string | null;
      'status': 'approved' | 'rejected' | 'require_further_verification' | 'signed_up' | 'waiting_for_legal_doc' | null;
    };
    nested: {
      'company': Schema['companies']['plain'] & Schema['companies']['nested'];
      'passport': Schema['documents']['plain'] & Schema['documents']['nested'];
      'proof_of_address': Schema['documents']['plain'] & Schema['documents']['nested'];
    };
    flat: {
      'company:bank_statement_id': number | null;
      'company:BankStatementURL': string | null;
      'company:certificate_of_incorporation_id': number | null;
      'company:CertificateOfIncorporationURL': string | null;
      'company:headquarter': string | null;
      'company:iban': string | null;
      'company:id': number;
      'company:name': string;
      'company:status': 'approved' | 'created' | 'rejected' | 'require_further_verification' | 'waiting_for_legal_doc' | null;
      'passport:id': number;
      'passport:isVerified': boolean | null;
      'passport:status': 'approved' | 'created' | 'rejected' | 'require_further_verification' | 'waiting_for_legal_doc' | null;
      'passport:type': string;
      'passport:url': string;
      'proof_of_address:id': number;
      'proof_of_address:isVerified': boolean | null;
      'proof_of_address:status': 'approved' | 'created' | 'rejected' | 'require_further_verification' | 'waiting_for_legal_doc' | null;
      'proof_of_address:type': string;
      'proof_of_address:url': string;
      'company:bank_statement:id': number;
      'company:bank_statement:isVerified': boolean | null;
      'company:bank_statement:status': 'approved' | 'created' | 'rejected' | 'require_further_verification' | 'waiting_for_legal_doc' | null;
      'company:bank_statement:type': string;
      'company:bank_statement:url': string;
      'company:certificate_of_incorporation:id': number;
      'company:certificate_of_incorporation:isVerified': boolean | null;
      'company:certificate_of_incorporation:status': 'approved' | 'created' | 'rejected' | 'require_further_verification' | 'waiting_for_legal_doc' | null;
      'company:certificate_of_incorporation:type': string;
      'company:certificate_of_incorporation:url': string;
    };
  };
};
