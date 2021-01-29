/// <reference types="react" />
export declare type PartyDetails = {
    ledgerId: string;
    owner: string;
    party: string;
    partyName: string;
    token: string;
};
declare type PartiesOrError = [PartyDetails[] | undefined, string | undefined];
export declare function convertPartiesJson(partiesJson: string, ledgerId: string, validateFile?: boolean): PartiesOrError;
declare type DablPartiesInputProps = {
    ledgerId: string;
    partiesJson?: string;
    validateFile?: boolean;
    onLoad: (parties: PartyDetails[]) => void;
    onError: (error: string) => void;
};
export declare const DablPartiesInput: ({ ledgerId, partiesJson, validateFile, onError, onLoad }: DablPartiesInputProps) => JSX.Element;
export {};
