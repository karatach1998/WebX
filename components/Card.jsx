const React = require('react');
const { Link } = require('react-router-dom');

class Card extends React.Component {
    /**
     * @param boardId
     * @param boardBgUrl
     * @param boardTitle
     * @returns {*}
     */
    render() {
        return (
            <div className="boards-tile-wrapper">
                <Link to={`/boards/${this.props.boardId}`} className="boards-tile">
                    <img className="boards-tile-bg" src={this.props.boardBgUrl}/>
                    <span className="boards-tile-title">{this.props.boardTitle}</span>
                </Link>
            </div>
        );
    }
}

module.exports = Card;