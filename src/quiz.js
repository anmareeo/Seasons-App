//the challenge is to fix this text so that the time will actually update.

//non-working code
//setInterval is a built in JavaScript function, and it's going to run the inner function (the arrow function until the curly brace before ",1000" every second. i guess 1000 stands for second. i will have to look into that). So according to the code below, once every second, we are taking the current time, printing it up as a string and assigning it to the this.time property. The code works, but it does not update the component. To fix it, we need to set our time on state as opposed to the instance variable of this.time. Whenever we assign an instance variable, there is no automatic update of the component. So we need to initialize our state object up at the top of the class by typing state = {time:''}. This is a key value pair in the state object. Then inside of the setInterval function, we don't need the this.time, so we will delete that whole line/reference, and replace it with a setState call. this.setState({time: newDate().toLocaleTimeString()}). as show in the text just before, this.setState is an object, and we want to update the time property, and we want the updated property to be newDate().toLocaleTimeString(). So new, every single second we are going to run setInterval, and that is going to call setState and that is going to cause our component to re-render itself automatically.  Then in the render method, we have to change this.time to this.state.time.
/*

    class Clock extends React.Component {
        componentDidMount() {
            setInterval(() => {
                this.time = new Date().toLocaleTimeString()    
            }, 1000)
        }
        
        render() {
            return (
                <div className="time">
                    The time is: {this.time}
                </div>
            );
        }
    }
*/
  //=======================================================================  

  class Clock extends React.Component {
      state = {time: ''}
      componentDidMount() {
        setInterval(() => {
            this.setState({time: new Date().toLocaleTimeString()})
             
        }, 1000)
    }
    
    render() {
        return (
            <div className="time">
                The time is: {this.state.time}
            </div>
        );
    }
}





    // Renders the App component into a div with id 'root'
    ReactDOM.render(<Clock />, document.querySelector('#root'));






