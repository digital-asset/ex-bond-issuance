import { PropsWithChildren } from 'react';
import { Party, Template } from '@daml/types';
import Ledger, { Query, StreamCloseEvent } from '@daml/ledger';
import { FetchByKeysResult, FetchResult, QueryResult } from '@daml/react';
declare type PublicProp = {
    ledgerId: string;
    publicParty: string;
    httpBaseUrl?: string;
    wsBaseUrl?: string;
    defaultToken?: string;
    reconnectThreshold?: number;
};
export declare function PublicLedger({ ledgerId, publicParty, httpBaseUrl, wsBaseUrl, defaultToken, reconnectThreshold, children }: PropsWithChildren<PublicProp>): import("react").FunctionComponentElement<import("@daml/react/createLedgerContext").LedgerProps> | null;
export declare const usePartyAsPublic: () => Party;
export declare const useLedgerAsPublic: () => Ledger;
export declare function useQueryAsPublic<T extends object, K, I extends string>(template: Template<T, K, I>, queryFactory: () => Query<T>, queryDeps: readonly unknown[]): QueryResult<T, K, I>;
export declare function useQueryAsPublic<T extends object, K, I extends string>(template: Template<T, K, I>): QueryResult<T, K, I>;
export declare function useFetchByKeyAsPublic<T extends object, K, I extends string>(template: Template<T, K, I>, keyFactory: () => K, keyDeps: readonly unknown[]): FetchResult<T, K, I>;
/**
 * React Hook to query the ledger, the returned result is updated as the ledger state changes.
 *
 * @deprecated prefer useStreamQueriesAsPublic
 *
 * @typeparam T The contract template type of the query.
 * @typeparam K The contract key type of the query.
 * @typeparam I The template id type.
 *
 * @param template The template of the contracts to match.
 * @param queryFactory A function returning a query. If the query is omitted, all visible contracts of the given template are returned.
 * @param queryDeps The dependencies of the query (for which a change triggers an update of the result).
 * @param closeHandler A callback that will be called if the underlying WebSocket connection fails in an unrecoverable way.
 *
 * @return The matching contracts.
 */
export declare function useStreamQueryAsPublic<T extends object, K, I extends string>(template: Template<T, K, I>, queryFactory: () => Query<T>, queryDeps: readonly unknown[], closeHandler: (e: StreamCloseEvent) => void): QueryResult<T, K, I>;
export declare function useStreamQueryAsPublic<T extends object, K, I extends string>(template: Template<T, K, I>): QueryResult<T, K, I>;
export declare function useStreamQueriesAsPublic<T extends object, K, I extends string>(template: Template<T, K, I>, queryFactory: () => Query<T>[], queryDeps: readonly unknown[], closeHandler: (e: StreamCloseEvent) => void): QueryResult<T, K, I>;
export declare function useStreamQueriesAsPublic<T extends object, K, I extends string>(template: Template<T, K, I>): QueryResult<T, K, I>;
/**
 * React Hook to query the ledger. Same as useStreamQueryAsPublic, but query by contract key instead.
 *
 * @deprecated prefer useStreamFetchByKeysAsPublic
 *
 * @typeparam T The contract template type of the query.
 * @typeparam K The contract key type of the query.
 * @typeparam I The template id type.
 *
 * @param template The template of the contracts to match.
 * @param queryFactory A function returning a contract key.
 * @param queryDeps The dependencies of the query (for which a change triggers an update of the result).
 * @param closeHandler A callback that will be called if the underlying WebSocket connection fails in an unrecoverable way.
 *
 * @return The matching (unique) contract, or null.
 */
export declare function useStreamFetchByKeyAsPublic<T extends object, K, I extends string>(template: Template<T, K, I>, keyFactory: () => K, keyDeps: readonly unknown[], closeHandler: (e: StreamCloseEvent) => void): FetchResult<T, K, I>;
export declare function useStreamFetchByKeysAsPublic<T extends object, K, I extends string>(template: Template<T, K, I>, keyFactory: () => K[], keyDeps: readonly unknown[], closeHandler: (e: StreamCloseEvent) => void): FetchByKeysResult<T, K, I>;
export declare const useReloadAsPublic: () => () => void;
export {};
