import {GraphNode} from "./GraphNode";
import {Edge} from "./Edge";

export class Graph {
    constructor(nodes, edges) {
        this.nodes = nodes;
        this.edges = edges;
    }

    static newGraph(numOfNodes, numOfEdges) {
        let nodes = [];
        let edges = [];
        for (let i = 0; i < numOfNodes; i++) {
            nodes.push(new GraphNode(i));
        }
        for (let i = 0; i < numOfEdges; i++) {
            edges.push(new Edge());
        }
        return new Graph(nodes, edges);
    }

    toJson() {

    }

    static jsonToGraph(json) {
        let nodes = [];
        let edges = [];
        json.nodes.forEach(node => nodes.push(new GraphNode(node.index, node.label, node.field)));
        json.edges.forEach(edge => edges.push(new Edge(edge.from, edge.to, edge.label)));
        return new Graph(nodes, edges);
    }

    getEdges(node) {
        return this.edges.filter(edge => edge.from === node.index)
    }

    toString() {
        let res = '';
        for (let i = 0; i < this.nodes.length; i++) {
            res += this.nodes[i].toString() + '\n';
        }
        for (let i = 0; i < this.edges.length; i++) {
            res += this.edges[i].toString() + '\n';
        }
        return res;
    }

    getNextNode(questionId, answer) {
        for (let j = 0; j < this.edges.length; j++) {
            if (this.edges[j].from === questionId && this.edges[j].label === answer) {
                for (let k = 0; k < this.nodes.length; k++) {
                    if (this.nodes[k].index === this.edges[j].to) {
                        return this.nodes[k];
                    }
                }
            }
        }
    }

    getProgress(questionId) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].index === questionId) {
                return (i/this.getNumOfQuestions())*100;
            }
        }
    }

    getNumOfQuestions() {
        return this.nodes.length-2;
    }
}
