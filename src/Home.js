import React, { Component } from 'react'

export default class Home extends Component {
    render () {
        let errors = []
        if (this.props.errors.length > 0) {
            console.log(this.props.errors)
            this.props.errors.forEach((error, idx) => {
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
                    <form onSubmit={this.props.handleFormSubmit}>
                        <input type="file" name='file' multiple onChange={this.props.handleFileChange}></input>
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
}