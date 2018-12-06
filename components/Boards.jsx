const React = require('react');
const _ = require('underscore');
const {Route} = require('react-router');
const Board = require('./Board');

const CardGroup = require('./CardGroup');

class Boards extends React.Component {
    state = {
        boardId: ""
    }

    handleClick = (boardId) => {
        this.setState({boardId: boardId});
    }


    render() {
        const {boardId} = this.state;

        return (
            <div style={{ margin: "50px" }}>
                {_(this.props.groups).map((args) => (
                    <CardGroup key={`cardGroup_${args.groupTitle}`} {...args} />
                ))}
            </div>
        );
    }
}

module.exports = Boards;