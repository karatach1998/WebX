const React = require('react');

const Preload = (props) => {
    return (
        <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1" style={{background: props.color}}></div>
            <div className="sk-cube sk-cube2" style={{background: props.color}}></div>
            <div className="sk-cube sk-cube3" style={{background: props.color}}></div>
            <div className="sk-cube sk-cube4" style={{background: props.color}}></div>
            <div className="sk-cube sk-cube5" style={{background: props.color}}></div>
            <div className="sk-cube sk-cube6" style={{background: props.color}}></div>
            <div className="sk-cube sk-cube7" style={{background: props.color}}></div>
            <div className="sk-cube sk-cube8" style={{background: props.color}}></div>
            <div className="sk-cube sk-cube9" style={{background: props.color}}></div>
        </div>
    );
}

module.exports = Preload;