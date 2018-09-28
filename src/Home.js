import React from 'react'
import { Link } from 'react-router-dom'

const Home = props => {
    let error = <div className="error-message">
                    {props.error}
                </div>
    return (
        <div className="home">
            <div className="home__prompt">
                <span>
                    Make a new gallery or start voting on your favorite images!
                </span>
            </div>
            <div className="home__form-container">
                <form onSubmit={props.handleFormSubmit}>
                    <input disabled={!props.user} type="file" name='file' multiple onChange={props.handleFileChange}></input>
                    <input disabled={!props.user} type="submit"></input>
                </form>
            </div>
            <div className='home__errors'>
                {error}
            </div>
            { props.user ? '' : <div><div>You must be signed in to make galleries.</div><br/> <Link className='text-link' to='/sign_in'>Sign in here!</Link></div>}
        </div>
    )
}

export default Home