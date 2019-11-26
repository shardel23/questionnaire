import React, {Component} from 'react';
import quizQuestions from './api/quizQuestions';
import questions_json from './api/questionGraph';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import './App.css';
import './css/bootstrap-iso.css'
import {Graph} from "./graph/Graph";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: {},
            questionsGraph: null,
            counter: 0,
            questionNode: null,
            questionId: 0,
            question: '',
            answerOptions: [],
            answer: '',
            answersCount: {},
            result: ''
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentDidMount() {
        const questionsGraph = Graph.jsonToGraph(questions_json);
        this.setState({
            questionsGraph: questionsGraph,
            questionNode: questionsGraph.nodes[0],
            question: questionsGraph.nodes[0].label,
            questionId: questionsGraph.nodes[0].index,
            answerOptions: questionsGraph.getEdges(questionsGraph.nodes[0])
        });
    }

    shuffleArray(array) {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    handleAnswerSelected(event) {
        this.setStatus(event.currentTarget.value);
        this.setUserAnswer(event.currentTarget.value);

        // TODO: Check if last question, if so, display result page accordingly
        // if (this.state.questionsGraph.getNextNode(this.state.questionId, this.state.answer))
        if (this.state.counter < this.state.questionsGraph.getNumOfQuestions()) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setResults(this.getResults()), 300);
        }
    }

    setStatus(answer) {
        let status = this.state.status;
        const field = this.state.questionNode.field;
        status[field] = answer;
        this.setState({
           status: status
        });
    }

    setUserAnswer(answer) {
        this.setState((state, props) => ({
            answersCount: {
                ...state.answersCount,
                [answer]: (state.answersCount[answer] || 0) + 1
            },
            answer: answer
        }));
    }

    setNextQuestion() {
        const nextQuestion = this.state.questionsGraph.getNextNode(this.state.questionId, this.state.answer);
        const counter = this.state.counter + 1;

        this.setState({
            counter: counter,
            questionNode: nextQuestion,
            questionId: nextQuestion.index,
            question: nextQuestion.label,
            answerOptions: this.state.questionsGraph.getEdges(nextQuestion),
            answer: ''
        });
    }

    getResults() {
        const answersCount = this.state.answersCount;
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map(key => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);

        return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
    }

    setResults(result) {
        if (result.length === 1) {
            this.setState({result: result[0]});
        } else {
            this.setState({result: 'Undetermined'});
        }
    }

    renderQuiz() {
        const questionsTotal = this.state.questionsGraph === null ? 0 : this.state.questionsGraph.getNumOfQuestions()
        return (
            <Quiz
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                question={this.state.question}
                questionTotal={questionsTotal}
                onAnswerSelected={this.handleAnswerSelected}
            />
        );
    }

    renderResult() {
        return <Result quizResult={this.state.result}/>;
    }

    render() {
        console.log(this.state.status);
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Tax Quiz</h2>
                </div>
                {this.state.result ? this.renderResult() : this.renderQuiz()}
            </div>
        );
    }
}

export default App;
