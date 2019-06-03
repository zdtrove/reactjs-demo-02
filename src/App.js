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
            isDisplayForm : false,
            taskEditing : null,
            filter : {
                name : '',
                status: -1
            },
            keyword : '',
            sort : {
                by : 'name',
                value : 1
            }
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
                name : 'React JS',
                status : true
            },
            {
                id : this.generateID(),
                name : 'Angular 4',
                status : false
            },
            {
                id : this.generateID(),
                name : 'Laravel Dusk',
                status : true
            },
            {
                id : this.generateID(),
                name : 'Codeigniter 3',
                status : false
            },
            {
                id : this.generateID(),
                name : 'Vue JS',
                status : false
            },
            {
                id : this.generateID(),
                name : 'Wordpress',
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

    onToggleForm = () => { // Them Task
        if (this.state.isDisplayForm && this.state.taskEditing !== null) {
            this.setState({
                isDisplayForm : true,
                taskEditing : null
            });
        } else {
            this.setState({
                isDisplayForm : !this.state.isDisplayForm,
                taskEditing : null
            });
        }
    }

    onCloseFormApp = () => {
        this.setState({
            isDisplayForm : false
        });
    }

    onShowFormApp = () => {
        this.setState({
            isDisplayForm : true
        });
    }

    onSubmit = (data) => {
        var { tasksApp } = this.state;
        if (data.id === '') {
            data.id = this.generateID();
            tasksApp.push(data);
        } else {
            // Editing
            var index = this.findIndex(data.id);
            tasksApp[index] = data;
        }
        this.setState({
            tasksApp : tasksApp,
            taskEditing : null
        });
        localStorage.setItem('tasks', JSON.stringify(tasksApp));
    }

    onUpdateStatus = (id) => {
        var { tasksApp } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasksApp[index].status = !tasksApp[index].status
            this.setState({
                tasksApp : tasksApp
            });
        }
        localStorage.setItem('tasks', JSON.stringify(tasksApp));
    }

    findIndex = (id) => {
        var { tasksApp } = this.state;
        var result = -1;
        tasksApp.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    onDelete = (id) => {
        var { tasksApp } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasksApp.splice(index, 1);
            this.setState({
                tasksApp : tasksApp
            });
        } 
        localStorage.setItem('tasks',JSON.stringify(tasksApp));
        this.onCloseFormApp();
    }

    onUpdate = (id) => {
        var { tasksApp } = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasksApp[index];
        this.setState({
            taskEditing : taskEditing
        });
        this.onShowFormApp();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }
        });
    }

    onSearch = (keyword) => {
        this.setState({
            keyword : keyword
        });
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sort : {
                by : sortBy,
                value : sortValue
            }
        });
    }

    render() {
        var { tasksApp, isDisplayForm, taskEditing, filter, keyword, sort } = this.state; // var tasks = this.state.tasksApp
        if (filter) {
            if (filter.name) {
                tasksApp = tasksApp.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
            //if (filter.status) { // !== null !== undefined !== 0
                tasksApp = tasksApp.filter((task) => {
                    if (filter.status === -1) {
                        return tasksApp;
                    } else {
                        return task.status === (filter.status === 1 ? true : false)
                    }
                });
            //}
        }

        if (keyword) {
            tasksApp = tasksApp.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            });
        }

        if (sort.by === 'name') {
            tasksApp.sort((a, b) => { 
                if (a.name > b.name) return sort.value;
                else if (a.name < b.name) return -sort.value;
                else return 0;
            });
        }

        if (sort.by === 'status') {
            tasksApp.sort((a, b) => { 
                if (a.status > b.status) return -sort.value;
                else if (a.status < b.status) return sort.value;
                else return 0;
            });
        }

        var elmTaskForm = isDisplayForm 
            ? <TaskForm 
                onSubmit={ this.onSubmit } 
                onCloseFormApp={ this.onCloseFormApp }
                taskEditing={ taskEditing }
            /> 
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
                        <Control 
                            onSearch={ this.onSearch }
                            onSort={ this.onSort }
                        />
                        { /* List */ }
                        <div className="form-group">
                            <TaskList 
                                tasksFromAppToTaskList={ tasksApp }
                                onUpdateStatus={ this.onUpdateStatus }
                                onDelete={ this.onDelete }
                                onUpdate={ this.onUpdate }
                                onFilter={ this.onFilter }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
