import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router-dom'

import API from './api.js'

import history from './history'
import Home from './Home'
import Gallery from './Gallery'
import Header from './Header'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currentGallery: [],
            errors: [],
            user: null
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
        this.handleSignIn = this.handleSignIn.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
    }

    componentDidMount () {
        // Using json.dumps, Python coerces None to 'null' rather than null. The solution I've
        // come up with here ensures that 'null' never ends up in this.state.
        // This is a slightly hacky workaround that I would likely find a better solution to 
        // in a professional setting, but I figured it might be a good excuse to use a 
        // much-needed comment
        if (window.__REACT_STATE__ && ![null, 'null'].includes(window.__REACT_STATE__.user)) {
            this.setState({ user: window.__REACT_STATE__.user })
        } else {
            history.push('/sign_in')
        }
    }

    handleFormSubmit (e) {
        e.preventDefault()
        API.newGallery(this.state.files).then(response => {
            if (response.gallery) {
                this.setState({ errors: [] })
                history.push(`/gallery/${response.gallery.id}`)
            } else {
                const errors = this.state.errors.slice()
                errors.push(response.error)
                this.setState({ errors })
            }
        })
    }

    handleFileChange (e) {
        this.setState({ files: e.target.files })
    }

    handleSignOut (e) {
        API.logout().then(() => this.setState({ user: null }))
    }

    handleSignIn (data) {
        API.login(data).then(response => this.setState({ user: response.user }))
            .then(() => history.push('/'))
    }

    handleSignUp (data) {
        API.signup(data).then(response => this.setState({ user: response.user }))
            .then(() => history.push('/'))
    }
    
    render () {
        return (
            <Router history={history}>
                <div>
                    <div className="header">
                        <Header user={this.state.user} handleSignOut={this.handleSignOut} />
                    </div>
                    <Link to='/'>
                        <div className="jumbotron">
                            <div className="jumbotron__content">
                                Galleries App
                            </div>
                        </div>
                    </Link>
                    <Route exact path='/' render={(props) => <Home user={this.state.user} errors={this.state.errors} handleFormSubmit={this.handleFormSubmit} handleFileChange={this.handleFileChange} />} />
                    <Route path='/sign_in' render={(props) => <SignIn handleSignIn={this.handleSignIn} />} />
                    <Route path='/sign_up' render={(props) => <SignUp handleSignUp={this.handleSignUp} />} />
                    <Route path='/gallery/:id' component={Gallery} />
                </div>

            </Router>
        )
    }
}
 