import type { Form, FormType } from "./types";

export const BSForm: Form = {
    sections: [
        {
            type: "section",
            id: "Test",
            header: "Test",
            inputs: [
                {
                    type: "input",
                    label: "test",
                    component: {
                        type: "Dropdown",
                        id: "test",
                        options: ["Does not work", "Works?"],
                        
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        validator: (choice: string) => undefined
                    }
                }
            ]
        }
        /*{
            type: "section",
            id: "Auto",
            header: "Auto",
            inputs: [
                {
                    type: "input",
                    label: "Score amp",
                    component: {
                        type: "Counter",
                        id: "auto score amp",
                        hasButtons: true,
                        initialValue: 0,
                        min: 0
                    }
                    
                },
                {
                    type: "input",
                    label: "Score speaker",
                    component: {
                        type: "Counter",
                        id: "auto score speaker",
                        hasButtons: true,
                        initialValue: 0,
                        min: 0
                    }
                    
                },
            ]
        },
        {
            type: "section",
            id: "Teleop",
            header: "Teleop",
            inputs: [
                {
                    type: "input",
                    label: "Score amp",
                    component: {
                        type: "Counter",
                        id: "teleop score amp",
                        hasButtons: true,
                        initialValue: 0,
                        min: 0
                    }
                    
                },
                {
                    type: "input",
                    label: "Score speaker",
                    component: {
                        type: "Counter",
                        id: "teleop score speaker",
                        hasButtons: true,
                        initialValue: 0,
                        min: 0
                    }
                    
                },
                {
                    type: "input",
                    label: "Ground intake",
                    component: {
                        type: "Checkbox",
                        id: "ground intake",
                        initialValue: false
                    }
                },
                {
                    type: "input",
                    label: "Source (not ground) intake",
                    component: {
                        type: "Checkbox",
                        id: "source intake",
                        initialValue: false
                    }
                }
            ]
        }*/
    ]
}

export const SSForm: Form = {
    sections: [
        {
            type: "section",
            id: "Auto",
            header: "Auto",
            inputs: [
                {
                    type: "input",
                    label: "Used Auto stop?",
                    component: {
                        type: "Checkbox",
                        id: "auto stop",
                        initialValue: false
                    }
                }
            ]
        },
        {
            type: "section",
            id: "Teleop",
            header: "Teleop",
            inputs: [
                {
                    type: "input",
                    label: "Did defend?",
                    component: {
                        type: "Checkbox",
                        id: "defended",
                        initialValue: false
                    }
                },
                {
                    type: "input",
                    label: "Was defended?",
                    component: {
                        type: "Checkbox",
                        id: "was defended",
                        initialValue: false
                    }
                },
                {
                    type: "input",
                    label: "Level of failure",
                    component: {
                        type: "Dropdown",
                        id: "level of failure",
                        options: ["None", "Minor", "Major", "Catastrophic"],
                        manual: false,

                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Serious foul?",
                    component: {
                        type: "Dropdown",
                        id: "serious foul",
                        options: ["None", "Yellow card", "Red card", "Disqualified"],
                        manual: false,
                        
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Reason for serious foul?",
                    component: {
                        type: "Textbox",
                        id: "serious foul reason",
                        maxLength: 100
                    }
                },
                {
                    type: "input",
                    label: "Comments",
                    component: {
                        type: "Textbox",
                        id: "comments",
                        maxLength: 500
                    }
                },
            ]
        },
        {
            type: "section",
            id: "Endgame",
            header: "Endgame",
            inputs: [
                {
                    type: "input",
                    label: "Attempted park",
                    component: {
                        type: "Checkbox",
                        id: "attempted park",
                        initialValue: false
                    }
                },
                {
                    type: "input",
                    label: "Attempted climb",
                    component: {
                        type: "Checkbox",
                        id: "attempted climb",
                        initialValue: false
                    }
                },
                {
                    type: "input",
                    label: "Attempted harmony",
                    component: {
                        type: "Checkbox",
                        id: "attempted harmony",
                        initialValue: false
                    }
                },
                {
                    type: "input",
                    label: "Attempted trap",
                    component: {
                        type: "Checkbox",
                        id: "attempted trap",
                        initialValue: false
                    }
                },
                {
                    type: "input",
                    label: "Climb time",
                    component: {
                        type: "Counter",
                        id: "climb time",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
            ]
        }
    ] 
} 

export const PSForm: Form = {
    sections: [
        {
            type: "section",
            id: "pit scouting",
            header: "Pit scouting",
            inputs: [
                {
                    type: "input",
                    label: "Can score amp?",
                    component: {
                        type: "Dropdown",
                        id: "amp scoring",
                        options: ["Yes", "Maybe", "No"],
                        manual: false,
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Can score speaker?",
                    component: {
                        type: "Dropdown",
                        id: "speaker scoring",
                        options: ["Yes", "Maybe", "No"],
                        manual: false,
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Fits under stage?",
                    component: {
                        type: "Checkbox",
                        id: "under stage",
                        initialValue: false
                    }
                },
                {
                    type: "input",
                    label: "Drivetrain",
                    component: {
                        type: "Dropdown",
                        id: "drivetrain",
                        options: ["Tank", "Swerve", "Other"],
                        manual: false,
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Weight (lbs)",
                    component: {
                        type: "Counter",
                        id: "weight",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Length (front to back, inches)",
                    component: {
                        type: "Counter",
                        id: "length",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Width (side to side, inches)",
                    component: {
                        type: "Counter",
                        id: "width",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Height (inches)",
                    component: {
                        type: "Counter",
                        id: "height",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "List of autos",
                    component: {
                        type: "Textbox",
                        id: "autos",
                        maxLength: 200
                    }
                },
                {
                    type: "input",
                    label: "Robots favourite colour",
                    component: {
                        type: "Textbox",
                        id: "fave colour",
                        maxLength: 42
                    }
                },
            ]
        }
    ]
}

export const formTypes: FormType[] = [
    {
        name: "Scouting",
        type: BSForm
    },
    {
        name: "Super Scouting",
        type: SSForm
    },
    {
        name: "Pit Scouting",
        type: PSForm
    }
]