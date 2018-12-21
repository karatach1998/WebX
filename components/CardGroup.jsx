const React = require('react');
const _ = require('underscore');

const Card = require('./Card');

const group2class = {
    Stared: 'fas fa-star',
    Recent: 'fas fa-clock',
    Other: 'fas fa-user'
}


class CardGroup extends React.Component {
    render() {
        const {onclick} = this.props;

        return (
            <div className="boards-group">
                <p className="boards-group-title"><span className={group2class[this.props.groupTitle]}></span> {this.props.groupTitle}</p>
                <div style={{display: 'flex'}}>
                {this.props.groupBoards.length !== 0
                    ? (_(this.props.groupBoards).map(({_id, title, bgUrl}) => (
                        <Card key={`card2board${_id}`}
                            boardId={_id} boardTitle={title} boardBgUrl={bgUrl} />
                      )))
                    : <p className="boards-group-text">List is empty</p>
                }
                </div>
            </div>
        );
    }
}

module.exports = CardGroup;