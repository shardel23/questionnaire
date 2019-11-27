import React, {Component} from 'react';
import questions_json from './api/questionGraph';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/nlogo.png';
import './App.css';
import './css/bootstrap-iso.css'
import {Graph} from "./graph/Graph";
import WelcomePage from "./components/WelcomePage";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            isStarted: false,
            status: {},
            eligible: false,
            questionsGraph: null,
            counter: 0,
            questionNode: null,
            questionId: 0,
            question: '',
            answerOptions: [],
            answer: '',
            done: false
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    handleInputTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = () => {
        if (this.state.name.length > 2) {
            this.setState({
                isStarted: true
            })
        }
    };

    handleAnswerSelected(event) {
        this.setStatus(event.currentTarget.id);
        this.setState({
            answer: event.currentTarget.id
        });
        this.setEligible(event.currentTarget.value === 'true');
        setTimeout(() => this.setNextQuestion(), 300);
    }

    setEligible(value) {
        this.setState({
            eligible: this.state.eligible || value
        });
        if (value) {
            console.log('eligible!')
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

    setNextQuestion() {
        const nextQuestion = this.state.questionsGraph.getNextNode(this.state.questionId, this.state.answer);
        const counter = this.state.counter + 1;

        if (nextQuestion.index >= 100) {
            this.setState({
                done: true
            })
        }
        else {
            this.setState({
                counter: counter,
                questionNode: nextQuestion,
                questionId: nextQuestion.index,
                question: nextQuestion.label,
                answerOptions: this.state.questionsGraph.getEdges(nextQuestion),
                answer: ''
            });
        }
    }

    renderQuiz() {
        const questionsTotal = this.state.questionsGraph === null ? 0 : this.state.questionsGraph.getNumOfQuestions();
        const progress = this.state.questionsGraph === null ? 0 : this.state.questionsGraph.getProgress(this.state.questionId);
        return (
            <Quiz
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                question={this.state.question}
                questionTotal={questionsTotal}
                progress={progress}
                onAnswerSelected={this.handleAnswerSelected}
            />
        );
    }

    renderResult() {
        return <Result quizResult={this.state.eligible}/>;
    }

    render() {
        const toDisplay = !this.state.isStarted ?
            <WelcomePage
                name={this.state.status.name}
                onSubmit={this.onSubmit}
                handleInputTextChange={this.handleInputTextChange}/> :
            (this.state.done ? this.renderResult() : this.renderQuiz());
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>שאלון החזר מס</h1>
                </div>
                {toDisplay}
            </div>
        );
    }
}

export default App;
