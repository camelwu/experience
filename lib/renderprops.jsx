// 提供一个函数 prop 来动态的确定要渲染什么 —— 一个 render prop。
import React from React
import React from 'react'

class Mouse extends React.Component {
    constructor(props) {
        super(props)
        // this.handleMouseMove = this.handleMouseMove.bind(this)
        this.state = { x: 0, y: 0 }
    }
    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }
    render() {
        return (
            <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
                {this.props.render(this.state)}
            </div>
        );
    }
}
class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
        );
    }
}

class MouseTracker extends React.Component {
    render() {
        return (
            <div>
                <h1>移动鼠标!</h1>
                <Mouse render={mouse => (
                    <Cat mouse={mouse} />
                )} />
            </div>
        );
    }
}

export default MouseTracker;