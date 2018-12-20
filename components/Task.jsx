const React = require('react');
const axios = require('axios');
const _ = require('underscore');

const Preload = require('./Preload');

class Task extends React.Component {
    state = {
        isSubmitting: false,
        data: null,
        updatedData: null
    }

    componentDidMount() {
        this.setState({ isSubmitting: true });

        axios.get(`/api/tasks/${this.props.taskId}`).then(({data}) => {
            this.setState({
                isSubmitting: false,
                data: data
            });
        });
    }

    handleTitleFocus = (e) => {
        this.setState({updatedData: {title: this.state.data.title}});
    }

    handleTitleChange = (e) => {
        this.setState({data: {...this.state.data, title: e.target.value}});
    }

    handleTitleReset = (e) => {
    }

    handleTitleSubmit = (e) => {
    }

    handleTextFocus = (e) => {
        this.setState({updateData: {text: this.state.data.title}});
    }

    handleTextChange = (e) => {
        this.setState({updateData: {...this.state.title}});
    }

    handleTextReset = (e) => {
        // this.setState({updateData: })
    }

    handleTextChange = (e) => {
        this.setState({data: {...this.state.data, text: e.target.value}});
    }

    render() {
        if (this.state.isSubmitting || !this.state.data) {
            return <Preload />
        }

        return (
            <div className="container" style={{padding: "0 10px 10px 10px"}}>
                <a className="task-btn task-btn-close"><i className="fas fa-times" onClick={this.props.onClose}></i></a>
                <div className="row" style={{display: 'flex', alignItems: 'center', flexWrap: 'nowrap', flexBasis: '100%'}}>
                    <i className="fas fa-heading" style={{marginRight: 10, minWidth: 18}}></i>

                    <input className="task-input task-input-title" style={{width: '100%', marginRight: 20}}
                           value={this.state.updateData ? this.state.updateData.title : this.state.data.title}
                           onFocus={this.handleTitleFocus} onChange={this.handleTitleChange}
                           onSubmit={this.handleTitleSubmit} onBlur={this.handleTitleReset} />
                </div>
                <div style={{display: 'flex', flexBasis: '100%', marginTop: 10}}>
                    <div style={{padding: "10px 10px 10px 0", display: 'flex', flexDirection: 'row', flex: 1}}>
                        <i className="fas fa-align-left" style={{marginRight: 10, minWidth: 18}}></i>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                            <span className="task-label" style={{marginBottom: 20}}>Description</span>
                            <textarea className="task-input task-input-desc"></textarea>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', flex: 0.4, padding: "20  px 0 10px 10px"}}>
                        <button className="task-btn task-btn-link task-btn-link-delete" style={{}} onClick={(e) => this.props.onDelete(this.props.taskId)}>
                            <i className="fas fa-trash-alt task-btn-icon"></i>
                            Delete
                        </button>
                        <button className="task-btn task-btn-link task-btn-link-save">
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
