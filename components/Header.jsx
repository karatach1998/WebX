const React = require('react');
const styled = require('styled-components').default;
const { hexToRgb, rgbToHsl } = require('./utils');

const SubstrateLayer = styled.div`
    background: ${props => {let {h, s, l} = rgbToHsl(hexToRgb(props.bgColor)); return `hsl(${h}, ${s}%, ${l * 0.9}%)`;}};
    height: 32px;
    position: relative;
    overflow: hidden;
    padding: 4px;
    z-index: 10;
    display: flex;
    flex-wrap: wrap;
`;

const Button = styled.button`
    min-width: 32px;
    height: 100%;
    border-radius: 2px;
    border-width: 0;
    padding: 5px 10px;
    outline: none;
    font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 4px;
    transition: .1s ease;
        
    color: whitesmoke;
    background: #288DC7;
    
    :hover {
        background: ${props => {let {h, s, l} = rgbToHsl(hexToRgb(props.bgColor)); return `hsl(${h}, ${s}%, ${l * 0.8}%)`;}};
    }
    
    :active {
        background: ${props => {let {h, s, l} = rgbToHsl(hexToRgb(props.bgColor)); return `hsl(${h}, ${s}%, ${l * 0.5}%)`;}};
    }
`;

const AvatarButton = styled(Button)`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    padding: 0;
    align-items: center;
    
    color: #17394d;
    background: linear-gradient(to bottom, #FAFAFA 0%, #F5F5F5 100%);
    
    :hover {
        background: linear-gradient(to bottom, #F5F5F5 0%, #EEEEEE 100%);
    }
    
    :active {
        background: linear-gradient(to bottom, #EEEEEE 0%, #E0E0E0 100%);
    }
`;

class Header extends React.Component {
    render() {
        return (
            <SubstrateLayer bgColor={this.props.bgColor}>
                <div className="header-btn-wrapper">
                    <Button bgColor={this.props.bgColor}><span className="fas fa-home"></span></Button>
                </div>
                <div className="header-btn-wrapper">
                    <Button bgColor={this.props.bgColor}><span className="fab fa-trello"></span> Доски</Button>
                </div>
                <div className="header-right-aligner">
                    <div className="header-r-btn-wrapper">
                        <Button bgColor={this.props.bgColor}><span className="fas fa-plus"></span></Button>
                    </div>
                    <div className="header-r-btn-wrapper">
                        <AvatarButton bgColor={this.props.bgColor}>{this.props.userInitials}</AvatarButton>
                    </div>
                </div>
            </SubstrateLayer>
        );
    }
}

module.exports = Header;