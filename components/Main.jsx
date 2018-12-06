const React = require('react');
const axios = require('axios');

const Header = require('./Header');
const Boards = require('./Boards');

class Main extends React.Component {
    state = {
        isSubmitting: false,
        boards: null
    };

    componentDidMount() {
        this.setState({isSubmitting: true});

        axios.get('/api/boards').then(({data}) => {
            this.setState({
                boards: data,
                isSubmitting: false
            });
        });
    }

    render() {
        if (this.state.isSubmitting || !this.state.boards) {
            return <div>Preloader</div>
        }

        return (
            <div>
                <Header bgColor="#237FC2" userInitials="CK"/>
                <Boards groups={this.state.boards}/>
            </div>
        );
    }
}

module.exports = Main;
