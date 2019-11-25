export class GraphNode {
    constructor(index, label, field) {
        this.index = index;
        this.label = label;
        this.field = field;
    }

    toString() {
        return this.index + ' [' + this.label() + ']';
    }
}