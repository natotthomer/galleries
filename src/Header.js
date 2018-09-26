import React from 'react'

const Header = props => {
    if (props.user) {
        return (
            <div className="header">
                <div className="float-left">
                    <span className="header__title-item float-left">Galleries</span>
                </div>
                <div className='float-right'>
                    <span className='header__auth-item'>{`Welcome back, ${props.user.username}`}</span>
                    <span className='header__auth-item'>  Log out</span>
                </div>
            </div>
        )
    } else {
        return ''
    }
}

export default Header