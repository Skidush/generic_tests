export enum outcome {
    FIELD = 'FIELD',
    UNIT = 'UNIT',
    TUPLE = 'TUPLE',
    TABLE = 'TABLE',
    TABVIEW = 'TABVIEW',
    WARNING = 'WARNING'
}

export class ItemDetails {
    outcome: { [s: string]: outcome };

    constructor(params: {
        outcome: { [s: string]: outcome }
    }) {
        this.outcome = params.outcome;
    }
}