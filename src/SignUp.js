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
            <div className='auth-form__outer-container'>
                <div className="auth-form__inner-container">
                    <form onSubmit={this.handleSignUp} className="auth-form">
                        <div className='auth-form__input'>
                            <div style={{ textAlign: 'center' }}>
                                <input 
                                    name='username'
                                    type='text' 
                                    onChange={this.handleUsernameChange} 
                                    value={this.setState.username}></input>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <label htmlFor='username'>username</label>
                            </div>
                        </div>
                        <div className='auth-form__input'>
                            <div style={{ textAlign: 'center' }}>
                                <input 
                                    name='email'
                                    type='text' 
                                    onChange={this.handleEmailChange} 
                                    value={this.setState.email}></input>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <label htmlFor='email'>email</label>
                            </div>
                        </div>
                        <div className='auth-form__input'>
                            <div style={{ textAlign: 'center' }}>
                                <input 
                                    name='password1'
                                    type='password' 
                                    onChange={this.handlePassword1Change} 
                                    value={this.setState.password1}></input>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <label htmlFor='password1'>password1</label>
                            </div>
                        </div>
                        <div className='auth-form__input'>
                            <div style={{ textAlign: 'center' }}>
                                <input 
                                    name='password2'
                                    type='password' 
                                    onChange={this.handlePassword2Change} 
                                    value={this.setState.password2}></input>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <label htmlFor='password2'>password2</label>
                            </div>
                        </div>
                        <input type='submit'></input>
                    </form>
                    <div>
                        Already have an account? <Link to={'/sign_in'} className="text-link">Sign in instead</Link>
                    </div>
                </div>
            </div>
        )
    }
}