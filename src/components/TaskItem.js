import React, { Component } from 'react';

class TaskItem extends Component {

    onUpdateStatus = (id) => {
        this.props.onUpdateStatus(this.props.taskFromTaskListToTaskItem.id);
    }

    onDelete = (id) => {
        this.props.onDelete(this.props.taskFromTaskListToTaskItem.id);
    }

    onUpdate = (id) => {
        this.props.onUpdate(this.props.taskFromTaskListToTaskItem.id);
    }

    render() {
        var { taskFromTaskListToTaskItem, index } = this.props;
        return (
            <tr>
                <td>{ index + 1 }</td>
                <td>{ taskFromTaskListToTaskItem.name }</td>
                <td className="text-center">
                    <span 
                        className={ taskFromTaskListToTaskItem.status === true ? 'label label-danger' : 'label label-success' }
                        onClick={ this.onUpdateStatus }
                    >
                        { taskFromTaskListToTaskItem.status === true ? 'Kích Hoạt' : 'Ẩn' }
                    </span>
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning"
                        onClick={ this.onUpdate }
                    >
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>&nbsp;
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={ this.onDelete }
                    >
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;