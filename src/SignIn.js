import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SignIn extends Component {
    constructor (props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.handleSignIn = this.handleSignIn.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleSignIn (e) {
        e.preventDefault()
        this.props.handleSignIn(this.state)
    }

    handleUsernameChange (e) {
        this.setState({ username: e.target.value })
    }

    handlePasswordChange (e) {
        this.setState({ password: e.target.value })
    }
    
    render () {
        return (
            <div>
                <div className="sign-in-container">
                    <form onSubmit={this.handleSignIn}>
                        <input type='text' onChange={this.handleUsernameChange} value={this.setState.username}></input>
                        <input type='password' onChange={this.handlePasswordChange} value={this.setState.password}></input>
                        <input type='submit'></input>
                    </form>
                    <div>
                        New user? <Link to={'/sign_up'}>Sign up instead</Link>
                    </div>
                </div>
            </div>
        )
    }
}