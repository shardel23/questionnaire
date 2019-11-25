export class Edge {
    constructor(from, to, label) {
        this.from = from;
        this.to = to;
        this.label = label;
        this.content = label;
        this.type = label;
    }

    toString() {
        return this.from + ' -> ' + this.to +
            ' [' + this.label + ']';
    }
}