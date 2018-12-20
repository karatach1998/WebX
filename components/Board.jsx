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

    submitBoardChange = (updatedData) => {
        console.log(updatedData);
        axios.put(`/api/boards/${this.state.data._id}`, updatedData).then(({status}) => {
            console.log(`SUBMIT CODE: ${status}`)
        });
        // NOTE(sergey): Try not to do entire board data fetch.
        // Update component specific state update instead.

        // await axios.get(`/api/boards/${this.state.data._id}`).then(({status, data}) => {
        //     if (status === 200) {
        //         this.setState({data});
        //     }
        // });
    }

    handleBoardSubmit = (updatedData) => {
        this.submitBoardChange(updatedData);
    }

    handleColumnTitleSubmit = (title, index) => {
        return axios.post(`/api/boards/${this.state.data._id}`, {
            columnTitle: title,
            columnIndex: index
        });
    }

    handleTaskAdd = (title, index) => {
        return axios.post(`/api/boards/${this.state.data._id}`, {
            taskTitle: title,
            columnIndex: index
        }).then(({data}) => {
            console.log('dja;');
            console.log(data);
            return data;
        });
    }

    handleTaskSelect = (taskId) => {
        this.setState({selectedTaskId: taskId});
    }

    handleTaskModalClose = () => {
        this.setState({selectedTaskId: null});
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

    handleNewColumnSubmit = (e) => {
        console.log('submit');
        if (this.state.newColumn.title !== '') {
            console.log(`NEW COLUMN{${this.state.newColumn.title}} SUBMIT!`);
        }
        this.handleNewColumnReset(e);
        e.preventDefault();
    }

    render() {
        if (this.state.isSubmitting || !this.state.data) {
            return <Preload />
        }

        return (
            <BackgroundLayer bgUrl={this.state.data.bgUrl}>
                <Header bgcolor={this.state.data.bgColor} />
                <div>
                    <BoardHeader {..._(this.state.data).pick(['title', 'stared', 'bgColor'])} onSubmit={this.handleBoardSubmit} />
                    <div className="container">
                        <div className="row">
                            {_(this.state.data.columns).map((column, i) => (
                                <BoardColumn key={`col-${i}`} index={i} {...column}
                                             onTaskClick={this.handleTaskSelect}
                                             onTitleSubmit={this.handleColumnTitleSubmit}
                                             onTaskAdd={this.handleTaskAdd} />
                            ))}
                            {this.state.newColumn ? (
                                <div className="board-column">
                                    <div className="board-column-title-wrapper">
                                        <form onSubmit={this.handleNewColumnSubmit}
                                              onReset={this.handleNewColumnReset} >
                                            {/*<div>*/}
                                                <input type="text" className="board-input board-input-title" placeholder="Enter new column title"
                                                       value={this.state.newColumn.title} autoFocus={this}
                                                       onChange={this.handleNewColumnChange} onBlur={e => {e.preventDefault()}}/>
                                            {/*</div>*/}
                                            <br/>
                                            <br/>
                                            <button type="submit" className="board-btn board-btn-add-column-submit">Add column</button>
                                            <button type="reset" className="board-btn board-add-column-cancel">
                                                <span className="fas fa-times"></span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="board-column" style={{background: "rgba(0, 0, 0, 0)"}}>
                                    <button className="board-btn board-btn-add-column" onClick={this.handleNewColumnCreate}>
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
                        <Task taskId={this.state.selectedTaskId} onClose={this.handleTaskModalClose} />
                    </Modal>
                </div>
            </BackgroundLayer>
        );
    }
}

module.exports = Board;