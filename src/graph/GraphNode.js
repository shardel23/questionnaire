export class GraphNode {
    constructor(index, label) {
        this.index = index;
        this.label = label;
    }

    toString() {
        return this.index + ' [' + this.label() + ']';
    }
}