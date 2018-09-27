import React from 'react'

const Home = props => {
    let errors = []
    if (props.errors.length > 0) {
        props.errors.forEach((error, idx) => {
            errors.push(
                <div key={idx} className="error-message">
                    {error}
                </div>
            )
        })
    }
    return (
        <div className="home">
            <div className="home__prompt">
                <span>
                    Make a new gallery or start voting on your favorite images!
                </span>
            </div>
            <div className="home__form-container">
                <form onSubmit={props.handleFormSubmit}>
                    <input type="file" name='file' multiple onChange={props.handleFileChange}></input>
                    <input type="text" name="title" placeholder="title"></input>
                    <input type="submit"></input>
                </form>
            </div>
            <div className='home__errors'>
                {errors}
            </div>
        </div>
    )
}

export default Home