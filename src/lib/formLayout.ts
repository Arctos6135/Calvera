import type { Form, FormType } from "./types";

export const BSForm: Form = {
    sections: [
        {
            type: "section",
            id: "Auto",
            header: "Auto",
            inputs: [
                {
                    type: "input",
                    label: "Score amp",
                    tooltip: "The number of notes scored in the amp",
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
                    tooltip: "The number of notes scored in the speaker",
                    component: {
                        type: "Counter",
                        id: "auto score speaker",
                        hasButtons: true,
                        initialValue: 0,
                        min: 0
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
                    label: "Score amp",
                    tooltip: "The number of notes scored in the amp",
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
                    tooltip: "The number of notes scored in the speaker",
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
                    tooltip: "The number of notes intaked off the ground",
                    component: {
                        type: "Checkbox",
                        id: "ground intake",
                        initialValue: 0
                    }
                },
                {
                    type: "input",
                    tooltip: "The number of notes intaked from the source locations",
                    label: "Source (not ground) intake",
                    component: {
                        type: "Checkbox",
                        id: "source intake",
                        initialValue: 0
                    }
                }
            ]
        }
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
                    tooltip: "Auto stop refers to the A-STOP (i.e. the emergency stop for the autonomous period)",
                    component: {
                        type: "Checkbox",
                        id: "auto stop",
                        initialValue: 0
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
                    tooltip: "Did the robot defend another robot?",
                    component: {
                        type: "Checkbox",
                        id: "defended",
                        initialValue: 0
                    }
                },
                {
                    type: "input",
                    label: "Was defended?",
                    tooltip: "Was the robot defended by another robot?",
                    component: {
                        type: "Checkbox",
                        id: "was defended",
                        initialValue: 0
                    }
                },
                {
                    type: "input",
                    label: "Level of failure",
                    tooltip: "Minor: small components breaking, nothing game-changing.\nMajor: important components broken, robot tipped, etc. Disrupts the team's ability to play the match effectively or participate at all.\nCatastrophic: failuires that render the team unable to compete for the entire season.",
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
                    label: "Fouls?",
                    tooltip: "Select the worst foul received during the match",
                    component: {
                        type: "Dropdown",
                        id: "serious foul",
                        options: ["None", "Foul", "Tech fouls", "Yellow card", "Red card", "Disqualified"],
                        manual: false,
                        
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Foul details",
                    tooltip: "Detail the number of each type of foul and why they received each one",
                    component: {
                        type: "Textbox",
                        id: "serious foul reason",
                        maxLength: 250
                    }
                },
                {
                    type: "input",
                    label: "Where do they shoot from?",
                    tooltip: "Describe relative to other field elements in as much detail as possible. Not distance",
                    component: {
                        type: "Textbox",
                        id: "shooting location",
                        maxLength: 100
                    }
                },
                {
                    type: "input",
                    label: "Comments",
                    tooltip: "Did the team get a lot of fouls (touched opposing robots in opposing alliance’s source, amp, stage during last 20 seconds)\nHow good against defense?\nHow efficient at amp versus speaker (which seems to be easier for them)\nPath of travel\nAccuracy of shots?\nAny weird things that happened (robot put note in opposing alliance’s amp)",
                    component: {
                        type: "Textbox",
                        id: "comments",
                        maxLength: 500
                    }
                }
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
                        initialValue: 0
                    }
                },
                {
                    type: "input",
                    label: "Attempted climb",
                    component: {
                        type: "Checkbox",
                        id: "attempted climb",
                        initialValue: 0
                    }
                },
                {
                    type: "input",
                    label: "Attempted harmony",
                    component: {
                        type: "Checkbox",
                        id: "attempted harmony",
                        initialValue: 0
                    }
                },
                {
                    type: "input",
                    label: "Attempted trap",
                    component: {
                        type: "Checkbox",
                        id: "attempted trap",
                        initialValue: 0
                    }
                },
                {
                    type: "input",
                    label: "Climb time",
                    tooltip: "The number of seconds the robot took to climb.",
                    component: {
                        type: "Counter",
                        id: "climb time",
                        initialValue: 0,
                        hasButtons: false
                    }
                }
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
                        initialValue: 0
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
                    label: "Robot's favourite colour",
                    tooltip: "Most important question.",
                    component: {
                        type: "Textbox",
                        id: "fave colour",
                        maxLength: 42
                    }
                },
                {
                    type: "input",
                    label: "Comments",
                    component: {
                        type: "Textbox",
                        id: "comments",
                        maxLength: 200
                    }
                }
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