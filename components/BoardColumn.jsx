const React = require('react');
const _ = require('underscore');


class BoardColumn extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            data: {title: props.title, tasks: props.tasks || []},
            index: props.index,
            newTask: {
                active: false,
                form: null,
                value: null
            },
            newTitle: {

            }
        };
    }

    componentDidUpdate() {
        this.state.data = {title: this.props.title, tasks: this.props.tasks || []};
    }

    handleTitleChange = (e) => {
        const {data} = this.state;
        this.setState({data: {...data, title: e.target.value}, newTitle: true});
    }

    handleKeyPress = (e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            console.log(e.key);
            e.preventDefault();
            this.refs.title.dispatchEvent(new Event('submit'));
        }
    }

    handleTitleSubmit = (e) => {
        console.log('handleTitleSubmit');
        console.log(this.state.data.title);
        const {data} = this.state;
        const {title} = data;
        // const {value: title} = this.state.newTitle;

        e.preventDefault();
        this.setState({newTitle: false});
        e.target.blur();
        console.log('------------');
        this.props.onTitleSubmit(title, this.state.index).then(_ => {
            this.setState({data: {...data, title}});
            console.log(this.state.data);
        });
    }

    handleTitleBlur = (e) => {
        console.log('blur');
        if (this.state.newTitle) {
            e.target.dispatchEvent(new Event('submit'));
        }
    }

    handleElementClick = (e) => {
        const i = e.i;
        const {taskId} = this.state.data.tasks[i];
        this.props.onTaskClick(taskId);
    }

    handleNewTaskCreate = (e) => {
        this.setState({newTask: {...this.state.newTask, active: true, value: ''}});
        console.log(this.state);
    }

    handleNewTaskReset = (e) => {
        console.log('handleNewTaskReset');
        this.setState({newTask: {...this.state.newTask, active: false}});
    }

    handleNewTaskChange = (e) => {
        const {newTask} = this.state;
        this.setState({newTask: {...newTask, value: e.target.value}});
    }

    handleNewTaskKeyDown = (e) => {
        console.log(e.keyCode);
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.state.newTask.form.dispatchEvent(new Event('submit'));
        }
    }

    handleNewTaskSubmit = async (e) => {
        console.log('handleNewTaskSubmit');
        const {value: newTaskTitle} = this.state.newTask;

        e.preventDefault();
        this.handleNewTaskReset(e);
        // NOTE(serge): When calling onTaskAdd, this one have to:
        // 1. Send POST to /api/board router,
        // 2. Board schema pre-hook must update list for specified column and add the record to Task collection.
        // 3. Then it should return json === shortTask item (from column.tasks list).
        this.props.onTaskAdd(newTaskTitle, this.state.index).then((task) => {
            console.log('callback');
            console.log('0000000000000000000000000000000000');
            console.log(this.state);
            let {data} = this.state;
            let {tasks} = data;

            tasks.push(task);
            console.log({data: {...data, tasks}});
            this.setState({data: {...data, tasks}});
        });
    }

    render() {
        return (
            <div className="board-column">
                <div className="board-column-title-wrapper">
                    <input ref="title"
                           type="text" className="board-input board-input-title"
                           value={this.state.data.title} placeholder="Enter column title here"
                           onChange={this.handleTitleChange}
                           onSubmit={this.handleTitleSubmit}
                           onKeyPress={this.handleKeyPress}
                           onBlur={this.handleTitleBlur} />
                    <button className="board-btn board-btn-delete-column"
                            onClick={this.handleColumnDelete}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
                {_(this.props.tasks).map(({title}, i) => (
                    <div key={`col-${this.state.index}-${i}`} className="board-column-element board-column-element-static"
                         onClick={e => {e.i = i; this.handleElementClick(e)}}>
                        <input className="board-column-element-text" value={title} readOnly={true} />
                    </div>
                ))}
                {this.state.newTask.active && (
                    <div key={`col-${this.state.index}-new`} className="board-column-element">
                        <form ref={el => this.state.newTask.form = el} onSubmit={this.handleNewTaskSubmit}>
                            <textarea className="board-input board-input-new-element"
                                      autoFocus={true} placeholder="Enter new task title"
                                      value={this.state.newTask.value}
                                      onChange={this.handleNewTaskChange}
                                      onBlur={this.handleNewTaskReset}
                                      onKeyDown={this.handleNewTaskKeyDown}/>
                            <input type="submit" style={{display: 'none'}} />
                        </form>
                    </div>
                )}
                <button className="board-btn board-btn-column" onClick={this.handleNewTaskCreate}>
                    {'\u002B Добавить еще одну карточку'}
                </button>
            </div>
        );
    }
}

module.exports = BoardColumn;