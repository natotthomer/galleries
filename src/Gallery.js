import React, { Component } from 'react'

import API from './api'

export default class Gallery extends Component {
    constructor (props) {
        super(props)

        this.state = {
            gallery: {},
            user_vote: -1
        }

        this.handleClick = this.handleClick.bind(this)
        this.renderImages = this.renderImages.bind(this)
    }
    
    componentDidMount () {
        API.fetchGallery(this.props.match.params.id)
            .then(response => this.setState(response))
    }

    handleClick (image) {
        API.vote({
            gallery: this.state.gallery.id,
            image
        }).then(response => this.setState(response))
        .catch(response => this.setState({ error: response.error }))
    }

    renderImages () {
        let images = []

        if (this.state.gallery.images) {
            this.state.gallery.images.forEach((image, idx) => {
                const className = this.state.user_vote === image.id ? "gallery__image-container voted" : "gallery__image-container"
                const boundClickHandler = () => this.handleClick(image.id)
                images.push(
                    <div key={idx} className={className} onClick={boundClickHandler}>
                        <div>
                            <img src={image.url} />
                            <div>{image.votes}</div>
                        </div>
                    </div>
                )
            })
        }
        return images
    }
    
    render () {
        return (
            <div>
                Gallery
                <div className="gallery__images-list">
                    {this.renderImages()}
                </div>
                <div className='home__errors' style={{ textAlign: 'center' }}>
                    {this.state.error}
                </div>
            </div>
        )
    }
}