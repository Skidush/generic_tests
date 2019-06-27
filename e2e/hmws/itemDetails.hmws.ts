export enum Outcome {
    FIELD = 'FIELD',
    UNIT = 'UNIT',
    TUPLE = 'TUPLE',
    TABLE = 'TABLE',
    TABVIEW = 'TABVIEW',
    WARNING = 'WARNING'
}

export class ItemDetails {
    outcome: { [s: string]: Outcome };

    constructor(params: {
        outcome: { [s: string]: Outcome }
    }) {
        this.outcome = params.outcome;
    }
}