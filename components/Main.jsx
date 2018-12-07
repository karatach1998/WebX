const React = require('react');
const axios = require('axios');

const Preload = require('./Preload');
const Header = require('./Header');
const Boards = require('./Boards');

class Main extends React.Component {
    state = {
        isSubmitting: false,
        groups: null
    }

    componentDidMount() {
        this.setState({isSubmitting: true});

        axios.get('/api/boards').then(({data}) => {
            this.setState({
                isSubmitting: false,
                groups: data
            });
        });
    }

    render() {
        console.log(this.props);
        if (this.state.isSubmitting || !this.state.groups) {
            return <div>Preloader</div>;
        }

        return (
            <div>
                <Header bgColor="#237FC2" userInitials="CK"/>
                <Boards groups={this.state.groups} />
                {/*{this.props.children}*/}
            </div>
        );
    }
}

module.exports = Main;
