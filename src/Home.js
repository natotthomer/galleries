import React, { Component } from 'react'

export default class Home extends Component {
    render () {
        return (
            <div className="home">
                <div className="home__prompt">
                    <span>
                        Make a new gallery or start voting on your favorite images!
                    </span>
                </div>
                <div>
                    <form onSubmit={this.props.handleFormSubmit}>
                        <input type="file" name='file' multiple onChange={this.props.handleFileChange}></input>
                        <input type="text" name="title" placeholder="title"></input>
                        <input type="submit"></input>
                    </form>
                </div>
            </div>
        )
    }
}