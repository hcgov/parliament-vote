// This file should be kept up to date with the current assembly/prime minister.
export enum Parties {
    // Parties
    HCP,
    hUWUp,
    HGP,
    WME,
    HDP,
    HCRP,
    Colon3,
    HCLP,

    // Independent Candidates
    Ryan,
    Loop
}

export type PartyInformation = {
    name: string,
    seatholders: string[]
    shortName: string,
    seats: number
}

export const PartyLeaders: Record<Parties, PartyInformation> = {
    [Parties.HCP]: {
        name: "Hack Club Communist Party",
        seatholders: [],
        shortName: "HCP",
        seats: 40
    },

    [Parties.hUWUp]: {
        name: "Hack Club UwU Party",
        seatholders: [],
        shortName: "hUwUp",
        seats: 14
    },

    [Parties.HGP]: {
        name: "Hack Club Gay Party",
        seatholders: [],
        shortName: "HGP",
        seats: 9
    },

    [Parties.WME]: {
        name: "Church of Windows M.E.",
        seatholders: [],
        shortName: "WME",
        seats: 7
    },

    [Parties.HDP]: {
        name: "Hack Club Dino Party",
        seatholders: [],
        shortName: "HDP",
        seats: 7
    },

    [Parties.HCRP]: {
        name: "Hack Club Republic Party",
        seatholders: [],
        shortName: "HCRP",
        seats: 12
    },

    [Parties.Colon3]: {
        name: ":3 Party",
        seatholders: [],
        shortName: ":3",
        seats: 22
    },

    [Parties.HCLP]: {
        name: "Hack Club Linux Party",
        seatholders: [],
        shortName: "HCLP",
        seats: 10
    },

    [Parties.Ryan]: {
        name: "(Independent) Ryan",
        seatholders: [],
        shortName: "(Independent) Ryan",
        seats: 21
    },

    [Parties.Loop]: {
        name: "(Independent) Loop",
        seatholders: [],
        shortName: "(Independent) Loop",
        seats: 10
    }
}

export const PRIME_MINISTER = "U07E4196AMA"