import {Component} from "react";

class CounterC extends Component {
    constructor(props) {
        super(props);
        console.log("Consturctor")
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        console.log("Get derived state from props")
        return null;
    }

    componentDidMount() {
        console.log("Mount")
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Update")
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("snap shot before update")
        return null;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("Should Component Update")
        return this.state.count <= 3;
    }

    state = {
        count: null,
        student: {
            id: 1,
            name: "Yosr"
        },
        test: !this.props.propsName
    };
    increment = () => {
        return this.setState({
            count: this.state.count + 1,
            student: {
                ...this.state.student,
                name: "Gwak"
            }
        });

    }
    decrement = () => {
        return this.setState({
            count: this.state.count - 1,
            student: {
                ...this.state.student,
                name: "Yosr"
            }
        });
    }

    render() {
        console.log(this.state)
        return (
            <>
                <button onClick={this.increment}>Increment</button>
                <p>
                    {this.state.count} <br/>
                    Student name : {this.state.student.name}
                </p>
                <button onClick={this.decrement}>Decrement</button>
                {
                    [...Array(this.state.count)].map((item, index) => {
                        return <Cell count={index} key={index}/>

                    })
                }
            </>
        )
    }
}

export default CounterC;

class Cell extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        console.log("Unmount")
    }

    render() {
        return <h3>
            Unmount : {this.props.count}
        </h3>
    }
}