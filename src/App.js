import React, { Component } from 'react'
import { fetcher } from './utils.js'

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            files: []
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    handleFormSubmit (e) {
        e.preventDefault()
        fetcher({
            method: 'POST', 
            data: this.state.files,
            url: '/api/gallery/new'
        }).then(response => console.log('wow: ', response))
    }

    handleFileChange (e) {
        console.log(e.target.files)
        this.setState({ files: e.target.files })
    }
    
    render () {
        return (
            <div>
                Galleries App
                <form onSubmit={this.handleFormSubmit}>
                    <input type="file" name='file' multiple onChange={this.handleFileChange}></input>
                    <input type="text" name="title" placeholder="title"></input>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}
 