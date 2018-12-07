const React = require('react');
const {Route} = require('react-router');
const _ = require('underscore');

const CardGroup = require('./CardGroup');

class Boards extends React.Component {
    render() {
        console.log('222222');

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