export type Response = {
    type: string,
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
};

export type Component = Counter | Checkbox | Dropdown | Textbox;

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

export type Alliance = [number, number, number]

export type Counter = {
    type: "Counter",
    id: string;
    hasButtons?: boolean;
    initialValue?: number;
    min?: number;
    max?: number;
}

export type Checkbox = {
    type: "Checkbox",
    id: string,
    initialValue?: boolean,
}

export type Dropdown = {
    type: "Dropdown",
    id: string,
    options: string[],

    // When this value is true, an input
    // box appears instead of a dropbox
    // allowing the user to type in whatever
    // they wish.
    manual?: boolean,

    // A function that will validate the input
    // and return either an error string
    // or undefined if everything is valid.
    // Note: If manual is enabled, this function
    // is only ran when the input textbox loses focus.
    validator: (choice: string) => string | undefined,
}

export type Textbox = {
    type: "Textbox",
    id: string,
    maxLength?: number,
}