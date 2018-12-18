const React = require('react');
const { Link } = require('react-router-dom');
const Modal = require('react-modal');
const styled = require('styled-components').default;
const { hexToRgb, rgbToHsl } = require('../utils/colorConverter');

const SubstrateLayer = styled.div`
    background: ${props => {let {h, s, l} = rgbToHsl(hexToRgb(props.bgcolor)); return `hsla(${h}, ${s}%, ${l * 0.4}%, 0.7)`;}};
    height: 32px;
    position: relative;
    overflow: hidden;
    padding: 4px;
    z-index: 10;
    display: flex;
    flex-wrap: wrap;
`;

const Button = styled(Link)`
    min-width: 32px;
    height: 32px;
    border-radius: 3px;
    display: block;
    padding: 0;
    text-decoration: none;
    float: left;
    font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 32px;
    text-align: center;
    transition: .1s ease;
        
    color: whitesmoke;
    background: ${props => {let {h, s, l} = rgbToHsl(hexToRgb(props.bgcolor)); return `hsla(${h}, ${s * 0.5}%, ${l * 0.85}%, 0.9)`;}};
    
    :hover {
        background: ${props => {let {h, s, l} = rgbToHsl(hexToRgb(props.bgcolor)); return `hsl(${h}, ${s * 0.9}%, ${l * 0.7}%)`;}};
    }
    
    :active {
        background: ${props => {let {h, s, l} = rgbToHsl(hexToRgb(props.bgcolor)); return `hsl(${h}, ${s}%, ${l * 0.55}%)`;}};
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

const modalStyle = {
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

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCreateModal: false,
            createModalInputValue: ''
        }

        this.handleOpenCreateModal = this.handleOpenCreateModal.bind(this);
        this.handleCloseCreateModal = this.handleCloseCreateModal.bind(this);
        this.handleCreateModalInputChange = this.handleCreateModalInputChange.bind(this);
    }

    handleCreateModalInputChange(e) {
        this.state.createModalInputValue = e.target.value;
    }

    handleOpenCreateModal() {
        this.setState({ showCreateModal: true });
    }

    handleCloseCreateModal(e) {
        this.setState({ showCreateModal: false });
        const title = this.state.createModalInputValue;
        console.log(title);
        this.props.onCreateBoard(title);
    }

    render() {
        return (
            <SubstrateLayer bgcolor={this.props.bgcolor}>
                <div className="header-btn-wrapper">
                    <Button to="/" bgcolor={this.props.bgcolor}>
                        <span className="fas fa-home header-btn-icon"></span>
                    </Button>
                </div>
                <div className="header-btn-wrapper">
                    <Button to="/" bgcolor={this.props.bgcolor}>
                        <span className="fab fa-trello header-btn-icon" ></span>
                        <span className="header-btn-text">Доски</span>
                    </Button>
                </div>
                <div className="header-right-aligner">
                    <div className="header-r-btn-wrapper">
                        <Button to="/" bgcolor={this.props.bgcolor} onClick={this.handleOpenCreateModal}>
                            <span className="fas fa-plus header-btn-icon"></span>
                        </Button>
                    </div>
                    <div className="header-r-btn-wrapper">
                        <AvatarButton to="/" bgcolor={this.props.bgcolor}>{this.props.userInitials}</AvatarButton>
                    </div>
                </div>
                {/* MODALS */}
                {/*<Modal isOpen={this.state.showModal} style={modalStyles} contentLabel="Modal">*/}
                    {/*<Link to={`/`} onClick={() => axios('/api/users/logout')}>Logout</Link>*/}
                {/*</Modal>*/}
                <Modal isOpen={this.state.showCreateModal} style={modalStyle} contentLabel="Create new board">
                    <form onSubmit={this.handleCloseCreateModal}>
                        <input type="text" name="create-board-input" value={this.state.createModalInputValue}
                               onChange={this.handleCreateModalInputChange}/>
                        <button type="submit">Create</button>
                    </form>
                </Modal>
            </SubstrateLayer>
        );
    }
}

module.exports = Header;