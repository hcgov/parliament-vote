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
}

export type PartyInformation = {
    name: string,
    seatholders: string[]
    shortName: string,
    seats: number
}

export const Parties: Record<PartiesEnum, PartyInformation> = {
    [PartiesEnum.HCP]: {
        name: "Hack Club Communist Party",
        seatholders: [
            'U0807ADEC6L', // Manan
            'U07E4196AMA', // Souptik
        ],
        shortName: "HCP",
        seats: 40
    },

    [PartiesEnum.HGP]: {
        name: "Hack Club Gay Party",
        seatholders: [
            'U06JLP2R8JV', // Firepup
        ],
        shortName: "HGP",
        seats: 9
    },

    [PartiesEnum.WME]: {
        name: "Church of Windows M.E.",
        seatholders: [
            'U07F2P4EDBP', // Lucas
        ],
        shortName: "WME",
        seats: 7
    },

    [PartiesEnum.HDP]: {
        name: "Hack Club Dino Party",
        seatholders: [
            'U08B60DCYG2', // Manni
        ],
        shortName: "HDP",
        seats: 31
    },

    [PartiesEnum.HCRP]: {
        name: "Hack Club Republic Party",
        seatholders: [
            'U083T3ZP6AV', // Navdeep
        ],
        shortName: "HCRP",
        seats: 12
    },

    [PartiesEnum.Colon3]: {
        name: ":3 Party",
        seatholders: [
            'U08JMV3PEGN', // Emma
        ],
        shortName: ":3",
        seats: 22
    },

    [PartiesEnum.HCLP]: {
        name: "Hack Club Linux Party",
        seatholders: [
            'U07H41WMEEL', // Samannoy
        ],
        shortName: "HCLP",
        seats: 10
    },

    [PartiesEnum.Ryan]: {
        name: "(Independent) Ryan",
        seatholders: [
            'U07NKS9S8GZ', // Ryan
        ],
        shortName: "(Independent) Ryan",
        seats: 21
    },

    [PartiesEnum.Peanut]: {
        name: "Peanut Gallery",
        seatholders: [
            'U089924LMK8', // Astra
            'U079YUX7220', // Lenny
        ],
        shortName: "Peanut Gallery",
        seats: 2
    }
}

export const PRIME_MINISTER = "U08JMV3PEGN" // Emma
