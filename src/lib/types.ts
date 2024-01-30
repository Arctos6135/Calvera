

export type Response = {
    data: Record<string, string | number>;
    id: number;
    match: number;
    team: number;
    scout: string;
    alliance: "RED" | "BLUE";
};

export type Form = {
    sections: Section[];
};

export type Section = {
    type: "section"
    id: string;
    header: string;
    inputs: Input[]
};

export type Input = {
    type: "input";
    label: string;
    component: Component;
    section: string;
};

export type Component = {}

export type Team = {
    number: number;
    name: string;
};

export type Match = {
    number: number;
    red_alliance: Alliance;
    blue_alliance: Alliance;
    red_score?: number;
    blue_score?: number;
}

export type Alliance = [Team, Team, Team]

