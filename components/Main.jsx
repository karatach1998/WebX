const React = require('react');
const { Link } = require('react-router-dom');
const Modal = require('react-modal');
const axios = require('axios');

const Preload = require('./Preload');
const Header = require('./Header');
const Boards = require('./Boards');

const modalStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
    },
    overlay: {
        zIndex                : 10
    }
};

Modal.setAppElement('#root');

class Main extends React.Component {
    state = {
        isSubmitting: false,
        groups: null
    }

    componentDidMount() {
        this.setState({isSubmitting: true});

        axios.get('/api/boards').then(({data}) => {
            // const fact = n => {
            //     var res = 1;
            //
            //     for (var i = 1; i < n; i++) res *= Math.exp(Math.sin(1/i));
            //     return res;
            // }
            // console.log(fact(200000000));
            // console.log('done');
            this.setState({
                isSubmitting: false,
                groups: data.groups
            });
        });
    }

    handleCreateBoard(title) {
        console.log('fjak;');
        axios.post('/api/boards', { title });
    }

    render() {
        console.log(this.props);
        if (this.state.isSubmitting || !this.state.groups) {
            return <Preload color={`#237FC2`}/>;
        }

        return (
            <div>
                <Header bgcolor="#237FC2" userinitials="CK" onCreateBoard={this.handleCreateBoard} />
                <Boards key="boards" groups={this.state.groups} />
            </div>
        );
    }
}

module.exports = Main;
