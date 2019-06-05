import React, { Component } from 'react';
import TaskSearchControl from './TaskSearchControl';
import TaskSortControl from './TaskSortControl';

class Control extends Component {

    render() {
        return (
            <div className="row">
                <TaskSearchControl onSearch={ this.props.onSearch } />
                <TaskSortControl onSort={ this.props.onSort } />
            </div>
        );
    }
}

export default Control;
