import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasksApp : [],
            isDisplayForm : false
        }
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasksApp = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasksApp : tasksApp
            });
        }
    }

    onGenerateData = () => {
        var tasks = [
            {
                id : this.generateID(),
                name : 'A',
                status : true
            },
            {
                id : this.generateID(),
                name : 'B',
                status : false
            },
            {
                id : this.generateID(),
                name : 'C',
                status : true
            }
        ];
        this.setState({
            tasksApp : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    s4() {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID() {
        return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    onToggleForm = () => {
        this.setState({
            isDisplayForm : !this.state.isDisplayForm
        });
    }

    onCloseFormApp = () => {
        this.setState({
            isDisplayForm : false
        });
    }

    onSubmit = (data) => {
        var { tasksApp } = this.state;
        data.id = this.generateID();
        tasksApp.push(data);
        this.setState({
            tasksApp : tasksApp
        });
        localStorage.setItem('tasks', JSON.stringify(tasksApp));
    }   

    render() {
        var { tasksApp, isDisplayForm } = this.state; // var tasks = this.state.tasksApp
        var elmTaskForm = isDisplayForm 
            ? <TaskForm onSubmit={ this.onSubmit } onCloseFormApp={ this.onCloseFormApp } /> 
            : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr />
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        { /* Form */ }
                        { elmTaskForm }
                    </div>
                    <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                    <button 
                                        type="button" 
                                        className="btn btn-primary"
                                        onClick={ this.onToggleForm }
                                    >
                                        Thêm Công Việc
                                    </button>&nbsp;
                                    <button type="button" className="btn btn-danger" onClick={ this.onGenerateData }>
                                        Generate Data
                                    </button>
                                </div>
                            </div>
                        </div>
                        { /* Search - Sort */ }
                        <Control />
                        { /* List */ }
                        <div className="form-group">
                            <TaskList tasksFromAppToTaskList={ tasksApp } />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
