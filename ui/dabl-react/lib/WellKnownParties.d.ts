import React, { PropsWithChildren } from "react";
/**
 * @param userAdminParty ID of the UserAdmin party on a ledger.
 * @param publicParty ID of the Public party on a ledger.
 */
export declare type Parties = {
    userAdminParty: string;
    publicParty: string;
};
/**
 * @param parties The party IDs returned by a successful response.
 * @param loading The current status of the response.
 * @param error The error returned by a failed response.
 */
export declare type WellKnownParties = {
    parties: Parties | null;
    loading: boolean;
    error: string | null;
};
declare type WellKnownPartiesProviderProps = {
    defaultWkp?: Parties;
};
/**
 * A React context within which you can use the [[useWellKnowParties]] hook.
 *
 * @param defaultWkp An optional [[WellKnownParties]] that will be returned if the fetch fails.
 */
export declare function WellKnownPartiesProvider({ defaultWkp, children }: PropsWithChildren<WellKnownPartiesProviderProps>): React.FunctionComponentElement<React.ProviderProps<WellKnownParties | undefined>> | null;
/**
 * React hook the Well Known parties.
 */
export declare function useWellKnownParties(): WellKnownParties;
export {};
