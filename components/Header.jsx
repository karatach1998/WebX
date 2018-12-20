const React = require('react');
const { withRouter, Link } = require('react-router-dom');
const Modal = require('react-modal');
const styled = require('styled-components').default;
const axios = require('axios');

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

Modal.setAppElement('#root');

class Header extends React.Component {
    state = {
        newBoard: null
    }

    handleNewBoardModalOpen = () => {
        console.log('handleNewBoardModalOpen');
        this.setState({newBoard: {title: ''}});
    }

    handleNewBoardModalClose = () => {
        // const title = this.state.newBoard;
        // console.log(title);
        // this.props.onCreateBoard(title);
        this.setState({newBoard: null});
    }

    handleNewBoardTitleChange = (e) => {
        this.setState({newBoard: {title: e.target.value}});
    }

    handleNewBoardSubmit = (e) => {
        const {title} = this.state.newBoard;

        this.handleNewBoardModalClose();
        if (title === '') {
            return;
        }
        axios.post(`/api/boards`, {title}).then(({status, data: {boardId}}) => {
            if (status !== 200) return;

            this.props.history.push(`/boards/${boardId}`);
        });
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
                        <Button to="/" bgcolor={this.props.bgcolor} onClick={this.handleNewBoardModalOpen}>
                            <span className="fas fa-plus header-btn-icon"></span>
                        </Button>
                    </div>
                    <div className="header-r-btn-wrapper">
                        <AvatarButton to="/" bgcolor={this.props.bgcolor}>{this.props.userinitials}</AvatarButton>
                    </div>
                </div>
                {/* MODALS */}
                {/*<Modal isOpen={this.state.showModal} style={modalStyles} contentLabel="Modal">*/}
                    {/*<Link to={`/`} onClick={() => axios('/api/users/logout')}>Logout</Link>*/}
                {/*</Modal>*/}
                <Modal isOpen={!!this.state.newBoard}
                       onRequestClose={this.handleNewBoardModalClose}
                       shouldCloseOnOverlayClick={true}
                       style={{
                           overlay: {
                               // backgroundColor: 'rgba(0, 0, 0, 0.7)',
                               backgroundColor: 'transparent',
                               zIndex: 100
                           },
                           content: {
                               top: '25%',
                               left: '50%',
                               right: 'auto',
                               bottom: 'auto',
                               transform: 'translate(-50%, -50%)',
                           }
                       }}>
                    <form onSubmit={this.handleNewBoardSubmit} id={'newBoardForm'}>
                        <h3 style={{}}>Create new board</h3>
                        <input style={{}} form={'newBoardForm'}
                               value={this.state.newBoard ? this.state.newBoard.title : ''}
                               placeholder="Enter new board title ..." autoFocus={true}
                               onChange={this.handleNewBoardTitleChange}/>
                    </form>
                </Modal>
            </SubstrateLayer>
        );
    }
}

module.exports = withRouter(Header);