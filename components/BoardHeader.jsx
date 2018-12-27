const React = require('react');
const styled = require('styled-components').default;
const _ = require('underscore');

const {rgbToHsl, hexToRgb} = require('../utils/colorConverter');

const SubstrateLayer = styled.div`
    background: ${props => {let {h, s, l} = rgbToHsl(hexToRgb(props.bgColor)); return `hsla(${h}, ${s}%, ${l * 0.5}%, 0.7)`;}};
    height: 40px;
    position: relative;
    overflow: hidden;
    padding: 8px 4px 8px 8px;
    z-index: 10;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const TitleInput = styled.input`
    height: 28px;
    width: ${props => (props.value.length + 2) * 9.5}px;
    padding: 0 8px 0 6px;
    background-color: transparent;
    border-radius: 3px;
    border: 2px solid transparent;
    color: white;
    font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: bold;
    line-height: 20px;
    display: inline;
    
    :hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
    
    :focus {
        background: white;
        color: #17394d;
        border: 2px solid #5ba4cf;
    }
`;

const Button = styled.button`
    height: 32px;
    min-width: 32px;
    margin: 0 0 0 6px;
    padding: 0;
    background-color: transparent;
    border-radius: 3px;
    border: 0px none transparent;
    color: white;
    text-decoration: none;
    outline:none;
    font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    
    :hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

class BoardHeader extends React.Component {
    state = {
        newTitle: null
    }

    handleTitleChange = (e) => {
        this.setState({newTitle: e.target.value});
    }

    handleTitleKeyPress = (e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            this.handleTitleSubmit(e);
        }
    }

    handleTitleSubmit = (e) => {
        // e.preventDefault(); // To prevent redirect.
        const {newTitle} = this.state;
        console.log(newTitle);

        e.target.blur();
        this.setState({newTitle: null});
        this.props.onTitleSubmit(newTitle);
    }

    handleStaredSwitch = (e) => {
        const newState = !this.props.stared;
        this.props.onStaredSwitch(newState);
    }

    render() {
        return (
            <SubstrateLayer bgColor={this.props.bgColor}>
                <div onSubmit={this.handleTitleSubmit}>
                    <TitleInput type="text" value={this.state.newTitle || this.props.title}
                                data-test-id="board-header-input-title"
                                onChange={this.handleTitleChange}
                                onBlur={this.handleTitleSubmit} onKeyPress={this.handleTitleKeyPress} />
                </div>
                <Button onClick={this.handleStaredSwitch}>
                    {this.props.stared
                        ? <span className="fas fa-star" style={{color: "#f2d600"}}></span>
                        : <span className="far fa-star" style={{color: "#f2d600"}}></span>}
                </Button>
            </SubstrateLayer>
        )
    };
}

module.exports = BoardHeader;
