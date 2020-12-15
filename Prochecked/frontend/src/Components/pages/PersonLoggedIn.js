import React, { Component } from 'react';
import StudentenView from './StudentenView'
import AdminView from './AdminView'
import DozentView from './DozentView'
import UserView from './UserView'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';



class PersonLoggedIn extends Component {
    constructor(props) {
        super(props);
    }
    render() 
    { console.log(this.props.person)
        let page
        let berechtigung = this.props.berechtigung
        if (berechtigung === 1){
            page = <> 
                    <Redirect from='/' to='StudentenView' />
                    <Route exact path='/StudentenView'>
                    <StudentenView/>
                    </Route>
                    </>
        }
        else if (berechtigung === 2){
            page = <>	
                    <Redirect from='/' to='DozentView' />
                    <Route exact path='/DozentView'>
                    <DozentView person={this.props.person}></DozentView>
                    </Route> 
                    </>
        }
        else if (berechtigung === 3){
            page = <>	
                    <Redirect from='/' to='AdminView' />
                    <Route exact path='/AdminView'>
                    <AdminView/>
                    </Route>
                   </>
        }
        else {
            page = <>
                    <Redirect from='/' to='UserView' />
                    <Route exact path='/UserView'>
                    <UserView setRole={this.props.setRole}/>
                    </Route>
                    </>;
        }
        return(
            <div>
                {page}
            </div>
            
            )
         ;
    }
}
 
export default PersonLoggedIn; 


// let page
        // let berechtigung = person.getBerechtigung()
        // if (berechtigung === 1){
        //     page = <> 
        //             <Redirect from='/' to='StudentenView' />
        //             <Route exact path='/StudentenView'>
        //             <StudentenView/>
        //             </Route>
        //             </>
        // }
        // else if (berechtigung === 2){
        //     page = <>	
        //             <Redirect from='/' to='DozentView' />
        //             <Route exact path='/DozentView'>
        //             <DozentView/>
        //             </Route> 
        //             </>
        // }
        // else if (berechtigung === 3){
        //     page = <>	
        //             <Redirect from='/' to='AdminView' />
        //             <Route exact path='/AdminView'>
        //             <AdminView/>
        //             </Route>
        //            </>
        // }
        // else {
        //     page = <>
        //             <Redirect from='/' to='UserView' />
        //             <Route exact path='/UserView'>
        //             <UserView setRole={this.setRole}/>
        //             </Route>
        //             </>;
        // }