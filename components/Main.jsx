const React = require('react');
const { Link } = require('react-router-dom');
const axios = require('axios');

const Preload = require('./Preload');
const Header = require('./Header');
const Boards = require('./Boards');

class Main extends React.Component {
    BG_COLOR = "#237FC2";

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

    handleAdminQuery = (params) => {
        this.setState({isSubmitting: true});

        axios.get('/api/boards/admin', params).then(({status, data}) => {
            if (status !== 200) return;

            console.log('data');
            console.log(data);
            this.setState({
                isSubmitting: false,
                groups: data
            });
        });
    }

    render() {
        console.log(this.props);
        if (this.state.isSubmitting || !this.state.groups) {
            return <Preload color={this.BG_COLOR}/>;
        }

        return (
            <div>
                <Header bgcolor={this.BG_COLOR} userinitials="CK" onAdminQuery={this.handleAdminQuery} />
                <Boards key="boards" groups={this.state.groups} />
            </div>
        );
    }
}

module.exports = Main;
