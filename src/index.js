import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'


//outlining the project. Goal is to determine whether it is Summer or Winter for the user based on the month and the latitude(northern or southern hemisphere). There is a built-in function for that. We will need an app component that contains code to determine location and month. Then the app component will pass data down as a prop to the display component. The display component will obviously be in charge of displaying text and icons on the screen to tell the user whether it is winter or summer(determined by the props from the app),

/*Here is the play by play of what is happening: 
* A JS file gets loaded into our browser
* The browser interprets our JS file, sees that we are trying to create an app component, and that app component gets created.
* At some point in time, the app component is going to get invoked, such as the App function in this file.
* When that function gets invoked, we then call our geolocation service
* App returns JSX, gets rendered to page as html. So we see content before the location is even found. 

* geolocation is found, but content already appears. It causes us to sit and wait for the location to appear. We don't have time to wait, and we don't have the ability to stop the rendering until the position is found. And we can't tell it to re-render itself. This is why a class based component, in conjunction with React's State system, is more useful in this situation. The class based component will do all of the above, but it will be able to tell the component to re-render itself once the location is found.

Rules of class based components:
* Must be a JavaScript Class
* The class we create must extend React.Component
* Must define a render method that is going to return some JSX

*/

//==================Functional Component=================================
/*
const App = () => {
    window.navigator.geolocation.getCurrentPosition( //to determine where the user is we have to pass in two separate function callbacks.The first argument is a function callback that gets called anytime the getCurrentPosition function successfully gets the user's location.
        (position) => console.log(position), //this is usually referred to as the success callback
        (err) => console.log(err) //this is the failure callback, since it will be called when the function is unable to determine the user's location. 
        //during the console.log I received the position callback because I consented when the popup asked if I would share my location. When I clicked the i button before the address bar and changed it to be asked again, I declined to show my location, so i got the error message.  
    )
    return <div>Latitude:</div>
}
*/


//====================Class Based Component========================================
/* When we make a class, we are creating a new class inside of JS that has just one method assigned to it, and that is the render method. But in order to use a class based component with React, React assumes that our class-based component has many other methods attached to it. Normaly we don't implement these methods by ourselves; we borrow from this other class called React.Component. So that is why we type extends React.Component. It allows us to pull in all of its functionality into our app. We are just borrowing functionality into our app class. But creating this component alone will not solve the problem. The next thing we have to do is implement State in React

Having a good understanding will open the doors for creating more complex apps

Rules of the State System in React:
* Only useable with class-based components (there is actually a way to use with functional, but it requires hooks. So for now, this is the rule)
* You will confuse props and state. :(
* State is a JS object that contains some data relevant to a singular component. In our case--for our app we will have one piece of State or one State property that is relevant to our App component. That one piece of state, that one property that we care about in our App component is our user's latitude, which we get out of that 'position' object. There are many properties that the geolocation will give us, but all we need is latitude.
* Updating state or properties inside this JS object on a component will cause our component to almost instantly re-render. The key to getting our component to re-render is to update State. If we want to get a single component to update itself, we will update its State.
* State must be initialized when a component is first created. State is always going to contain some amount of information that is related to a component, so when we create a component we have to initialize State.
* State can ONLY be updated by using the function 'setState'


*/ 


/*

//curly braces below to open the app body, where we will define a render method
class App extends React.Component {
    constructor (props) {
        super(props) //we HAVE to call a function called super and pass in props. super is a reference to the parent function in React.Component. Remember we are borrowing functionality and that is how we access it. When we create our constructor function, it overrides what is in React.Component, so super(props) will make sure we get the functionality we need. Now to initialize state we do this...
        this.state = { lat: 40, errorMessage:'' } //between the brackets is the state object. it's going to contain specific properties that are important and relevant to our component that we are creating. So in our case now, latitude. So we will want to inialize our state to contain the property latitude or lat, we want to default it to a sensible value. We don't know what the value will be yet, so we will set it to null. It's a key value pair lat:null. Now that it has been initialized we can use this.stat as a variable.
    }
    //React says we have to define render. If not we will get an error message that we don't have a render method that's returning JSX.
    //We will add a constructor function, a function that is specific to the JS language, not React. In a JS class the constructor function is the very first function that will get called any time an instance of this class is created. Anytime we create a new instance of the app component and show it on the screen, the constructor function is going to be automatically and instantly called before anything else. So that makes it a very good place for us to initialize State...when our App is first created. When we define the constructor method, it is going to automatically be called wiith the props object, and this is the same props object we had with our functional component.
    render () {
        window.navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState ({ lat: position.coords.latitude }) this comes from the inspect console in Chrome...the one that finds the latitude.

        }   //we want to take the latitude out of the position object and use the latitude alone to update the this.state object. So we use this.setState and pass it an object that has the update to state that we want to make
        (err) => {
            this.setState({errorMessage: err.message})
        }
        )
    return    <div>Latitude: {this.state.lat}</div>
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)

*/
/*====================================================
Here, we initialized state using the constructor function. I have copied that out with all my notes, and below that we will use the componentDoesMount function for initializing state.
===================================================     */
/*
class App extends React.Component {
    constructor (props) {
        super(props) 

        //THIS IS THE ONLY TIME we do direct assignment to this.state. This is how we initialize state. There is another way.
        this.state = { lat: null, errorMessage:'' }; 
       
        window.navigator.geolocation.getCurrentPosition(
        (position) => {
            //We called setState!!!
            this.setState ({ lat: position.coords.latitude })
        }, 
        (err) => {
            this.setState({ errorMessage: err.message })
        }
        )
}   
        
    
    //React says we must define render
    render () {
        //this is conditional rendering.
        if(this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
         } 
       
         if(!this.state.errorMessage && this.state.lat) {
            return <div>Latitude: {this.state.lat}</div>
         } 
       
         return <div>Loading...</div>

      
        }
 
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)
*/




/* Notes on lifecycle 

Component LifeCycle:
* constructor - good place to do one-time set up
* render - only for returning JSX
-----content appears on the screen
* componentDidMount - recommended place to initialize state instead of in the constructor
-----sit and wait for updates--good place to do data loading or call our geolocation stuff
* componentDidUpdate - good place to do more data loading when state/props change. so if we want to do multiple data loading requests every time a component is updated, start looking at componentDidUpdate
-----sit and wait until this component is no longer shown
* componentwWillUnmount - good place to do cleanup (especially for non-React stuff)

There are three other lifecycle methods, but they rarely get used, so I am not going to mention them for now, for the sake of simplicity


*/



class App extends React.Component {
    state = { lat: null, errorMessage:'' };  //this is equivalent to defining the constructor function and initializing state.
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState ({ lat: position.coords.latitude }),
            (err) => this.setState ({ errorMessage: err.message })
        );
    }   
    
    //pretend that no matter the conditions of the if statements, we want to have a red border. The way it is styled below would require that we put a className border on each one. I will comment out this method and show the simpler way below.
    /*
    render () {
        
        if(this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
         } 
       
         if(!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay  lat={this.state.lat}/> //so we are taking a property from the state on app component and passing it as a prop onto the SeasonDisplay. When we call set state, the component re-renders itself, but in addition, the component will re-render any children that it is showing as well.
         } 
       
         return <Spinner message = 'Please accept location request./>

      
        }
 
} //in general, anytime we create a component we try as much as possible not to have multiple return statments inside of a render method. if we have conditional logic, we instead want to try to put it into a helper function
*/
 renderContent () { //this is a helper function
    if(this.state.errorMessage && !this.state.lat) {
        return <div>Error: {this.state.errorMessage}</div>
     } 
   
     if(!this.state.errorMessage && this.state.lat) {
        return <SeasonDisplay  lat={this.state.lat}/> 
     } 
   
     return <Spinner message = 'Please accept location request.'/>
    }
  

render () {
    return(
    <div className = "border-red">
    {this.renderContent ()} 
    </div>
    )    
   
    }

}


ReactDOM.render(
    <App />,
    document.querySelector('#root')
)


/* Benefits of Class Components:
* Easier code organization
* Can use "state," another React system and it makes it easier to handle user input
* It unerstands lifecycle events, and that makes it easier to do things when the app first starts.
*/





/*

************************************************************************************

//***Below is an example of a functional component that is refactored as a class component.***
If you want to test the functional component, comment out everything but lines 232-239 as well as line 277. If you want to test the class compnent, comment out everything but lines 261-277.

//functional component
/*
const UserForm = () => {
    return (
        <form>
            <label>Enter a username:</label>
            <input />
        </form>
    );
}
*/

// here is the functional component with notes on how it can easily be changed to a class component:
/*
const UserForm = () => { //we change this to say class UserForm extends React.Component{

return (//we wrap this whole return statement jsx inside of a render method render(){}
    <form>
        <label>Enter a username:</label>
        <input />
    </form>
);
}


see below the line for the class component. 
=========================================

//*****  this is the Class Component *****
/*
/*
class UserForm extends React.Component{
render() {
    return (
    <form>
        <label>Enter a username:</label>
        <input />
    </form>
    );

}

}




//ReactDOM.render(<UserForm />, document.querySelector('#root'));
*/

