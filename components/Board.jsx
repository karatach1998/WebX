const React = require('react');
const Modal = require('react-modal');
const styled = require('styled-components').default;
const axios = require('axios');
const _ = require('underscore');

const Preload = require('./Preload');
const Header = require('./Header');
const BoardHeader = require('./BoardHeader');
const BoardColumn = require('./BoardColumn');
const Task = require('./Task');

const BackgroundLayer = styled.div`
    height: 100%;
    background: url(${props => props.bgUrl}) center;
    background-attachment: fixed;
    background-size: cover;
    // background: #000000;
`;

Modal.setAppElement('#root');

class Board extends React.Component {
    state = {
        isSubmitting: false,
        data: null,
        newColumn: null,
        selectedTaskId: null
    }

    componentDidMount() {
        this.setState({isSubmitting: true});
        console.log('!!!!!!!!!!!!');

        axios.get(`/api/boards/${this.props.match.params.boardId}`).then(({status, data}) => {
            console.log(status);
            console.log(data);
            this.setState({
                isSubmitting: false,
                data: data
            });
        }).catch((err) => {
            console.error(err);
        });
    }

    // TODO(sergey): Move handleCreateBoard implementation to Header class.
    // We need to pass enough information to this class instance to allow it perform the handling.

    handleBoardHeaderSubmit = (updatedData) => {
        let {data} = this.state;

        axios.put(`/api/boards/${this.state.data._id}`, updatedData).then(({status}) => {
            if (status !== 200) return;

            this.setState({data: _(data).extend(updatedData)});
        })
    }

    handleColumnTitleSubmit = async (title, index) => {
        let {data} = this.state;
        let {columns} = data;

        columns[index].title = title;
        return await axios.put(`/api/boards/${this.state.data._id}`, {columns}).then(({status}) => {
            if (status !== 200) return;

            this.setState({data: {...data, columns}});
        });
    }

    handleTaskAdd = (taskTitle, columnIndex) => {
        return axios.post(`/api/boards/${this.state.data._id}`, {taskTitle, columnIndex})
                    .then(({status, data: task}) => {
            if (status !== 200) return;

            let {data} = this.state;
            let {columns} = data;
            let {tasks} = columns[columnIndex];

            tasks.push(task);
            this.setState({data: {...data, columns}});
        });
    }

    handleTaskSelect = (taskId) => {
        this.setState({selectedTaskId: taskId});
    }

    handleTaskLoad = (callback) => {
        axios.get(`/api/tasks/${this.state.selectedTaskId}`).then(({data}) => callback(data));
    }

    handleTaskModalClose = () => {
        this.setState({selectedTaskId: null});
    }

    handleTaskDelete = ({_id: taskId, columnIndex}) => {
        axios.delete(`/api/tasks/${taskId}`).then(({status}) => {
            if (status !== 200) return;

            let {data} = this.state;
            let {columns} = data;

            this.handleTaskModalClose();
            columns[columnIndex].tasks = _.reject(columns[columnIndex].tasks, ({taskId: id}) => id === taskId);
            console.log(columns);
            this.setState({data: {...data, columns}});
        });
    }

    handleTaskUpdate  = ({_id: taskId, title, text, columnIndex}) => {
        return axios.put(`/api/tasks/${taskId}`, {title, text}).then(({status}) => {
            if (status !== 200) return;

            let {data} = this.state;
            let {columns} = data;

            this.handleTaskModalClose();
            console.log(taskId, title, text, columnIndex);
            console.log(columns[columnIndex].tasks);
            columns[columnIndex].tasks = _(columns[columnIndex].tasks)
                .map(x => ((x.taskId === taskId) ? {taskId, title} : x));
            console.log(_(columns[columnIndex].tasks).map(x => x.taskId === taskId));
            console.log(columns);
            this.setState({data: {...data, columns}});
        })
    }

    handleColumnDelete = async (columnIndex) => {
        let {data} = this.state;
        let {columns} = data;

        console.log(columns);
        console.log(columnIndex);
        columns.splice(columnIndex, 1);
        console.log(columns);
        return await axios.put(`/api/boards/${this.state.data._id}`, {columns}).then(({status}) => {
            if (status !== 200) return;

            console.log(columns);
            this.setState({data: {...data, columns}});
        });
    }

    handleNewColumnCreate = (e) => {
        console.log('create');
        this.setState({newColumn: {title: ''}});
    }

    handleNewColumnReset = (e) => {
        console.log('reset');
        this.setState({newColumn: null});
    }

    handleNewColumnChange = (e) => {
        console.log('change', e.target.value);
        this.setState({newColumn: {title: e.target.value}});
    }

    handleNewColumnKeyPress = (e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            this.handleNewColumnSubmit(e);
        }
    }

    handleNewColumnSubmit = (e) => {
        console.log('handleNewColumnSubmit');
        const {title} = this.state.newColumn;

        this.handleNewColumnReset(e);
        if (title === '') {
            return
        }

        let {data} = this.state;
        let columns = _(data.columns).map(x => x);

        columns.push({title, tasks: []});
        axios.put(`/api/boards/${this.state.data._id}`, {columns}).then(({status}) => {
            if (status !== 200) return;

            this.setState({data: {...data, columns}});
            console.log(columns);
        });
        e.preventDefault();
    }

    render() {
        if (this.state.isSubmitting || !this.state.data) {
            return <Preload />
        }

        return (
            <BackgroundLayer bgUrl={this.state.data.bgUrl}>
                <Header bgcolor={this.state.data.bgColor} userinitials={'СК'}/>
                <div>
                    <BoardHeader {..._(this.state.data).pick(['title', 'stared', 'bgColor'])}
                                 onTitleSubmit={title => this.handleBoardHeaderSubmit({title})}
                                 onStaredSwitch={stared => this.handleBoardHeaderSubmit({stared})} />
                    <div className="container">
                        <div className="row">
                            {_(this.state.data.columns).map((column, i) => (
                                <BoardColumn key={`col-${i}`} index={i} {...column}
                                             onTaskClick={this.handleTaskSelect}
                                             onTitleSubmit={this.handleColumnTitleSubmit}
                                             onColumnDelete={this.handleColumnDelete}
                                             onTaskAdd={this.handleTaskAdd} />
                            ))}
                            {this.state.newColumn ? (
                                <div className="board-column">
                                    <div className="board-column-title-wrapper">
                                        <form onSubmit={this.handleNewColumnSubmit}
                                              onReset={this.handleNewColumnReset}
                                              onBlur={this.handleNewColumnReset} >
                                            <input type="text" className="board-input board-input-title"
                                                   data-test-id="board-input-new-column-title"
                                                   value={this.state.newColumn.title}
                                                   placeholder="Enter new column title" autoFocus={true}
                                                   onChange={this.handleNewColumnChange}
                                                   onKeyPress={this.handleNewColumnKeyPress}
                                                   onBlur={e => e.relatedTarget && e.relatedTarget.type === "submit" && e.stopPropagation()} />
                                            <br/>
                                            <br/>
                                            <button type="submit" data-test-id="board-btn-new-board-submit"
                                                    className="board-btn board-btn-add-column-submit">Add column</button>
                                            <button type="reset" className="board-btn board-add-column-cancel"><i className="fas fa-times"></i></button>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="board-column" style={{background: "rgba(0, 0, 0, 0)"}}>
                                    <button className="board-btn board-btn-add-column" data-test-id="board-btn-new-column"
                                            onClick={this.handleNewColumnCreate}>
                                        {'\u002B Добавить еще одну колонку'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <Modal isOpen={!!this.state.selectedTaskId}
                           onRequestClose={this.handleTaskModalClose}
                           shouldCloseOnOverlayClick={true}
                           style={{
                               overlay: {
                                   backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                   zIndex: 100
                               },
                               content: {
                                   top: '50%',
                                   left: '50%',
                                   right: 'auto',
                                   bottom: 'auto',
                                   marginRight: '-50%',
                                   transform: 'translate(-50%, -50%)',
                                   width: '600px',
                                   // minHeight: '300px',
                                   backgroundColor: 'rgb(235, 238, 240)'
                               }
                           }}>
                        <Task onLoad={this.handleTaskLoad}
                              onClose={this.handleTaskModalClose}
                              onDelete={this.handleTaskDelete}
                              onSave={this.handleTaskUpdate}/>
                    </Modal>
                </div>
            </BackgroundLayer>
        );
    }
}

module.exports = Board;