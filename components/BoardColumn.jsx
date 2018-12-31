const React = require('react');
const _ = require('underscore');


class BoardColumn extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            newTitle: null,
            newTask: null
        };
    }

    handleTitleChange = (e) => {
        this.setState({newTitle: e.target.value});
    }

    handleTitleKeyPress = (e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            console.log(e.key);
            // e.preventDefault();
            // this.refs.title.dispatchEvent(new Event('submit'));
            this.handleTitleSubmit(e);
        }
    }

    handleTitleSubmit = (e) => {
        console.log('handleTitleSubmit');
        const {newTitle: title} = this.state;

        // e.preventDefault();
        e.target.blur();
        console.log('------------');
        this.props.onTitleSubmit(title, this.props.index);
    }

    handleTitleReset = (e) => {
        console.log('handleTitleReset');
        this.setState({newTitle: null});
    }

    handleColumnDelete = (e) => {
        this.props.onColumnDelete(this.props.index);
    }

    handleElementClick = (e, index) => {
        const {taskId} = this.props.tasks[index];
        this.props.onTaskClick(taskId);
    }

    handleNewTaskCreate = (e) => {
        this.setState({newTask: ''});
        console.log(this.state);
    }

    handleNewTaskReset = (e) => {
        console.log('handleNewTaskReset');
        this.setState({newTask: null});
    }

    handleNewTaskChange = (e) => {
        this.setState({newTask: e.target.value});
    }

    handleNewTaskKeyPress = (e) => {
        console.log(e.key);
        if (e.key === "Enter" && e.shiftKey === false) {
            // e.preventDefault();
            // this.state.newTask.form.dispatchEvent(new Event('submit'));
            this.handleNewTaskSubmit(e);
        }
    }

    handleNewTaskSubmit = async (e) => {
        console.log('handleNewTaskSubmit');
        const {newTask: title} = this.state;

        // e.preventDefault();
        e.target.blur();
        // NOTE(serge): When calling onTaskAdd, this one have to:
        // 1. Send POST to /api/board router,
        // 2. Board schema pre-hook must update list for specified column and add the record to Task collection.
        // 3. Then it should return json === shortTask item (from column.tasks list).
        this.props.onTaskAdd(title, this.props.index);
    }

    render() {
        return (
            <div className="board-column" data-test-id="board-column">
                <div className="board-column-title-wrapper">
                    <input data-test-id="board-input-column-title"
                           type="text" className="board-input board-input-title"
                           value={this.state.newTitle || this.props.title} placeholder="Enter column title here"
                           onChange={this.handleTitleChange}
                           onSubmit={this.handleTitleSubmit}
                           onKeyPress={this.handleTitleKeyPress}
                           onBlur={this.handleTitleReset} />
                    <button className="board-btn board-btn-delete-column"
                            data-test-id="board-btn-delete-column"
                            onClick={this.handleColumnDelete}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
                {_(this.props.tasks).map(({title}, i) => (
                    <div key={`col-${this.props.index}-${i}`} className="board-column-element board-column-element-static"
                         data-test-id="board-elem"
                         onClick={e => this.handleElementClick(e, i)}>
                        <input className="board-column-element-text" data-test-id="board-input-elem" value={title} readOnly={true} />
                    </div>
                ))}
                {this.state.newTask !== null && (
                    <div key={`col-${this.props.index}-new`} className="board-column-element">
                        <div onSubmit={this.handleNewTaskSubmit}>
                            <textarea className="board-input board-input-new-element"
                                      data-test-id="board-input-new-task-title"
                                      autoFocus={true} placeholder="Enter new task title"
                                      value={this.state.newTask}
                                      onChange={this.handleNewTaskChange}
                                      onKeyPress={this.handleNewTaskKeyPress}
                                      onBlur={this.handleNewTaskReset}/>
                            <input type="submit" style={{display: 'none'}} />
                        </div>
                    </div>
                )}
                <button className="board-btn board-btn-add-element" data-test-id="board-btn-new-task" onClick={this.handleNewTaskCreate}>
                    {'\u002B Добавить еще одну карточку'}
                </button>
            </div>
        );
    }
}

module.exports = BoardColumn;