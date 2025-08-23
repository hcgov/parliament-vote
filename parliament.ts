export const IS_PARLIAMENT_IN_SESSION = false;

// This file should be kept up to date with the current assembly/prime minister.
export enum PartiesEnum {

}

export type PartyInformation = {
    name: string,
    seatholders: { userId: string, seats: number }[],
    shortName: string,
    seats: number
}

export const Parties: Record<PartiesEnum, PartyInformation> = {

}

export const PRIME_MINISTER = "" // <NONE>
