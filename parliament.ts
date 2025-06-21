// This file should be kept up to date with the current assembly/prime minister.
export enum PartiesEnum {
    // Parties
    HCP,
    HGP,
    WME,
    HDP,
    HCRP,
    Colon3,
    HCLP,

    // Independent Candidates
    Ryan,

    // Peanut Gallery
    Peanut,

    TESTPARTY,
}

export type PartyInformation = {
    name: string,
    seatholders: { userId: string, seats: number }[],
    shortName: string,
    seats: number
}

export const Parties: Record<PartiesEnum, PartyInformation> = {
    [PartiesEnum.HCP]: {
        name: "Hack Club Communist Party",
        seatholders: [
            { userId: 'U0807ADEC6L', seats: 20 }, // Manan
            { userId: 'U07E4196AMA', seats: 20 }, // Souptik
        ],
        shortName: "HCP",
        seats: 40
    },

    [PartiesEnum.HGP]: {
        name: "Hack Club Gay Party",
        seatholders: [
            { userId: 'U06JLP2R8JV', seats: 9 }, // Firepup
        ],
        shortName: "HGP",
        seats: 9
    },

    [PartiesEnum.WME]: {
        name: "Church of Windows M.E.",
        seatholders: [
            { userId: 'U07F2P4EDBP', seats: 7 }, // Lucas
        ],
        shortName: "WME",
        seats: 7
    },

    [PartiesEnum.HDP]: {
        name: "Hack Club Dino Party",
        seatholders: [
            { userId: 'U08B60DCYG2', seats: 31 }, // Manni
        ],
        shortName: "HDP",
        seats: 31
    },

    [PartiesEnum.HCRP]: {
        name: "Hack Club Republic Party",
        seatholders: [
            { userId: 'U083T3ZP6AV', seats: 12 }, // Navdeep
        ],
        shortName: "HCRP",
        seats: 12
    },

    [PartiesEnum.Colon3]: {
        name: ":3 Party",
        seatholders: [
            { userId: 'U08JMV3PEGN', seats: 22 }, // Emma
        ],
        shortName: ":3",
        seats: 22
    },

    [PartiesEnum.HCLP]: {
        name: "Hack Club Linux Party",
        seatholders: [
            { userId: 'U07H41WMEEL', seats: 10 }, // Samannoy
        ],
        shortName: "HCLP",
        seats: 10
    },

    [PartiesEnum.Ryan]: {
        name: "(Independent) Ryan",
        seatholders: [
            { userId: 'U07NKS9S8GZ', seats: 21 }, // Ryan
        ],
        shortName: "(Independent) Ryan",
        seats: 21
    },

    [PartiesEnum.Peanut]: {
        name: "Peanut Gallery",
        seatholders: [
            { userId: 'U089924LMK8', seats: 1 }, // Astra
            { userId: 'U079YUX7220', seats: 1 }, // Lenny
            { userId: 'U08EMT46G3V', seats: 1 }, // Lynn
        ],
        shortName: "Peanut Gallery",
        seats: 3
    }
}

export const PRIME_MINISTER = "U08JMV3PEGN" // Emma