export class Edge {
    constructor(from, to, label, eligible) {
        this.from = from;
        this.to = to;
        this.label = label;
        this.content = label;
        this.type = label;
        this.eligible = eligible;
    }

    toString() {
        return this.from + ' -> ' + this.to +
            ' [' + this.label + ']';
    }
}