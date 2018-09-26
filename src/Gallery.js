import React, { Component } from 'react'
import { fetcher } from './utils.js'

export default class Gallery extends Component {
    constructor (props) {
        super(props)

        this.state = {
            gallery: {}
        }
    }
    
    componentDidMount () {
        fetcher({
            url: `/api/gallery/${this.props.match.params.id}/`
        }).then(response => this.setState({ gallery: response.gallery }))
    }
    
    render () {
        let images = []

        if (this.state.gallery.images) {
            this.state.gallery.images.forEach((image, idx) => {
                images.push(
                    <div key={idx} className="gallery__image-container">
                        <div>
                            <img src={image} />
                        </div>
                    </div>
                )
            })
        }
        return (
            <div>
                Gallery
                <div className="gallery__images-list">
                    {images}
                </div>
            </div>
        )
    }
}