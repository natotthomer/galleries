import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SignUp extends Component {
    constructor (props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: ''
        }

        this.handleSignUp = this.handleSignUp.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePassword1Change = this.handlePassword1Change.bind(this)
        this.handlePassword2Change = this.handlePassword2Change.bind(this)
    }

    handleSignUp (e) {
        e.preventDefault()
        this.props.handleSignUp(this.state)
    }

    handleUsernameChange (e) {
        this.setState({ username: e.target.value })
    }

    handleEmailChange (e) {
        this.setState({ email: e.target.value })
    }

    handlePassword1Change (e) {
        this.setState({ password1: e.target.value })
    }

    handlePassword2Change (e) {
        this.setState({ password2: e.target.value })
    }
    
    render () {
        return (
            <div>
                <div className="sign-in-container">
                    <form onSubmit={this.handleSignUp}>
                        <input type='text' onChange={this.handleUsernameChange} value={this.setState.username}></input>
                        <input type='text' onChange={this.handleEmailChange} value={this.setState.email}></input>
                        <input type='password' onChange={this.handlePassword1Change} value={this.setState.password1}></input>
                        <input type='password' onChange={this.handlePassword2Change} value={this.setState.password2}></input>
                        <input type='submit'></input>
                    </form>
                    <div>
                        Already have an account? <Link to={'/sign_in'}>Sign in instead</Link>
                    </div>
                </div>
            </div>
        )
    }
}