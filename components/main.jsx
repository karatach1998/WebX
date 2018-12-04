const React = require('react');
const { Component } = React;
const axios = require('axios');

class Main extends Component {
    state = {
        isSubmitting: false,
        board: null
    };

    componentDidMount() {
        this.setState({isSubmitting: true});

        axios.get('/api/boards').then(({data}) => {
            this.setState({
                board: data,
                isSubmitting: false
            });
        });
    }

    render() {
        if (this.state.isSubmitting || !this.state.board) {
            return <div>Preloader</div>
        }

        return (
            <div>
                <p>Hello!!! Done</p>
            </div>
        );
    }
}

module.exports = Main;
