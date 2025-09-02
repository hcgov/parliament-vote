export const IS_PARLIAMENT_IN_SESSION = true;

// This file should be kept up to date with the current assembly/prime minister.
export enum PartiesEnum {
    // Parties
    AVCAP,
    Colon3,
    PAR,
    WSP,
    XREP,
    WME,

    // Independents
    Lexm,

    // Peanut Gallery
    Peanut
}

export type PartyInformation = {
    name: string,
    seatholders: { userId: string, seats: number }[],
    shortName: string,
    seats: number
}

export const Parties: Record<PartiesEnum, PartyInformation> = {
    [PartiesEnum.AVCAP]: {
        name: "Anti-Vibe Coding and PHP Party",
        seatholders: [
            {
                userId: 'U08D3AY7BG8', // Gizzy
                seats: 15
            },
            {
                userId: 'U08RJ1PEM7X', // Nova
                seats: 15
            },
            {
                userId: 'U08R4SW3FU7', // Adrian
                seats: 14
            }
        ],
        shortName: "AVCAP",
        seats: 44
    },

    [PartiesEnum.Colon3]: {
        name: ":3 Party",
        seatholders: [
            {
                userId: 'U07LECV4Q59', // Stars
                seats: 10
            },
            {
                userId: 'U0915TRKB6U', // Emma
                seats: 0 // 14 upon end of suspension
            },
            {
                userId: 'U08JN012F7G', // Hayden
                seats: 10
            },
            {
                userId: 'U093T2F9UKW', // Birdy
                seats: 10
            }
        ],
        shortName: ":3",
        seats: 30
    },

    [PartiesEnum.PAR]: {
        name: "Parmesan",
        seatholders: [
            {
                userId: 'U081C6XT885', // Sahana
                seats: 24
            }
        ],
        shortName: "PAR",
        seats: 24,
    },

    [PartiesEnum.XREP]: {
        name: "X Republic",
        seatholders: [
            {
                userId: 'U083T3ZP6AV', // Navdeep
                seats: 10
            }
        ],
        shortName: 'XREP',
        seats: 10
    },

    [PartiesEnum.WME]: {
        name: "Church of Windows ME",
        seatholders: [
            {
                userId: 'U07F2P4EDBP', // Lucas
                seats: 7
            }
        ],
        shortName: 'WME',
        seats: 7
    },

    [PartiesEnum.Lexm]: {
        name: "(Independent) lexm",
        seatholders: [
            {
                userId: 'U079UHJDBRT', // Lennier
                seats: 24
            }
        ],
        shortName: '(Independent) lexm',
        seats: 24
    },

    [PartiesEnum.WSP]: {
        name: "Whitestone Inc., Political Division",
        seatholders: [
            {
                userId: 'U02KQ9WQT0A', // Krish
                seats: 17
            }
        ],
        seats: 17,
        shortName: 'WSP'
    },

    [PartiesEnum.Peanut]: {
        name: "Peanut Gallery",
        seatholders: [
            {
                userId: 'U089924LMK8', // Astra
                seats: 1
            },
            {
                userId: 'U08EMT46G3V', // Lynn
                seats: 1
            },
            {
                userId: 'U079YUX7220', // Lenny
                seats: 1
            },            
        ],
        seats: 3,
        shortName: "Peanut Gallery"
    }
}

export const PRIME_MINISTER = "U0915TRKB6U" // Emma
