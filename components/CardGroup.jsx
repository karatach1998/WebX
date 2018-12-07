const React = require('react');
const _ = require('underscore');

const Card = require('./Card');

const group2class = {
    Stared: 'fas fa-star',
    Recent: 'fas fa-clock'
}


class CardGroup extends React.Component {
    render() {
        const {onclick} = this.props;

        return (
            <div className="boards-group">
                <p className="boards-group-title"><span className={group2class[this.props.groupTitle]}></span> {this.props.groupTitle}</p>
                {_(this.props.groupBoards).map(({_id, title, bgUrl}) => (
                    <Card key={`card2board${_id}`}
                          boardId={_id} boardTitle={title} boardBgUrl={bgUrl} />
                ))}
            </div>
        );
    }
}

module.exports = CardGroup;