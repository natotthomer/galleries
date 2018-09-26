import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router-dom'

import { fetcher } from './utils.js'
import history from './history'
import Home from './Home'
import Gallery from './Gallery'

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currentGallery: [],
            errors: []
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
        }).then(response => {
            if (response.gallery) {
                this.setState({ errors: [] })
                history.push(`/gallery/${response.gallery.id}`)
            } else {
                console.log(this.state.errors)
                const errors = this.state.errors.slice()
                errors.push(response.error)
                console.log(errors)
                this.setState({ errors })
            }
        })
    }

    handleFileChange (e) {
        console.log(e.target.files)
        this.setState({ files: e.target.files })
    }
    
    render () {
        return (
            <Router history={history}>
                <div>
                    <Link to='/'>
                        <div className="jumbotron">
                            <div className="jumbotron__content">
                                Galleries App
                            </div>
                        </div>
                    </Link>
                    <Route exact path='/' render={(props) => <Home errors={this.state.errors} handleFormSubmit={this.handleFormSubmit} handleFileChange={this.handleFileChange} />} />
                    <Route path='/gallery/:id' component={Gallery} />
                </div>

            </Router>
        )
    }
}
 