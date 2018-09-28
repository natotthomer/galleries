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
            <div className='auth-form__outer-container'>
                <div className="auth-form__inner-container">
                    <form onSubmit={this.handleSignIn} className='auth-form'>
                        <div className='auth-form__inputs'>
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
                                        name='password'
                                        type='password' 
                                        onChange={this.handlePasswordChange} 
                                        value={this.setState.password}></input>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <label htmlFor='password'>password</label>
                                </div>
                            </div>
                        </div>
                        <input type='submit'></input>
                    </form>
                    <div>
                        New user? <Link to={'/sign_up'} className="text-link">Sign up instead</Link>
                    </div>
                    <div className="home__errors">
                        {typeof this.props.error === 'string' ? this.props.error : ''}
                    </div>
                </div>
            </div>
        )
    }
}