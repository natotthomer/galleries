import React from 'react'

const Header = props => {
    if (props.user !== null) {
        return (
            <div className="header">
                <div className="float-left">
                    <span className="header__title-item float-left">Galleries</span>
                </div>
                <div className='float-right'>
                    <span className='header__auth-item'>{`Welcome back, ${props.user.username}`}</span>
                    <span className='header__auth-item header__logout' onClick={props.handleSignOut}>Log out</span>
                </div>
            </div>
        )
    } else {
        return ''
    }
}

export default Header