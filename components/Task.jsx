const React = require('react');
const axios = require('axios');
const _ = require('underscore');

const Preload = require('./Preload');

class Task extends React.Component {
    state = {
        isSubmitting: false,
        data: null
    }

    componentDidMount() {
        this.setState({ isSubmitting: true });

        this.props.onLoad((task) => {
            this.setState({
                isSubmitting: false,
                data: task
            });
        });
    }

    blurOnEnter = (e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            e.preventDefault();
            e.target.blur();
        }
    }

    handleKeyPress = (e) => {
        this.blurOnEnter(e);
    }

    handleTitleChange = (e) => {
        this.setState({data: {...this.state.data, title: e.target.value}});
    }

    handleTextChange = (e) => {
        this.setState({data: {...this.state.data, text: e.target.value}});
    }

    handleDelete = (e) => {
        console.log('handleDelete');
        this.props.onDelete(this.state.data);
    }

    handleSave = (e) => {
        console.log('handleSave');
        this.props.onSave(this.state.data);
    }

    render() {
        if (this.state.isSubmitting || !this.state.data) {
            return <Preload />
        }

        return (
            <div className="container" style={{padding: "0 10px 10px 10px"}}>
                <a className="task-btn task-btn-close"><i className="fas fa-times" data-test-id="task-btn-close" onClick={this.props.onClose}></i></a>
                <div className="row" style={{display: 'flex', alignItems: 'center', flexWrap: 'nowrap', flexBasis: '100%'}}>
                    <i className="fas fa-heading" style={{marginRight: 10, minWidth: 18}}></i>

                    <input className="task-input task-input-title"
                           data-test-id="task-input-title"
                           style={{width: '100%', marginRight: 20}}
                           value={this.state.data.title}
                           onChange={this.handleTitleChange} onKeyPress={this.handleKeyPress}/>
                </div>
                <div style={{display: 'flex', flexBasis: '100%', marginTop: 10}}>
                    <div style={{padding: "10px 10px 10px 0", display: 'flex', flexDirection: 'row', flex: 1}}>
                        <i className="fas fa-align-left" style={{marginRight: 10, minWidth: 18}}></i>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                            <span className="task-label" style={{marginBottom: 20}}>Description</span>
                            <textarea className="task-input task-input-desc"
                                      data-test-id="task-input-text"
                                      value={this.state.data.text} placeholder={'Left more detailed description here ...'}
                                      onChange={this.handleTextChange} onKeyPress={this.handleKeyPress}
                                      onSubmit={this.handleTextSubmit} />
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', flex: 0.4, justifyContent: 'flex-end', padding: "0"}}>
                        <button className="task-btn task-btn-link task-btn-link-delete"
                                data-test-id="task-btn-delete"
                                onClick={this.handleDelete}>
                            <i className="fas fa-trash-alt task-btn-icon"></i>
                            Delete
                        </button>
                        <button className="task-btn task-btn-link task-btn-link-save"
                                data-test-id="task-btn-save"
                                onClick={this.handleSave}>
                            <i className="fas fa-save task-btn-icon"></i>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Task;
