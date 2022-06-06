import React, { Component } from 'react'
var Carousel = require('react-responsive-carousel').Carousel
export class DemoCarousel extends Component {
    render() {
        const { imgs } = this.props
        return (
            <Carousel showThumbs={false} showStatus={false}>
                {imgs.map(img => <div key={img}><img src={require(`../assets/Images/${img}`)} alt="" /></div>)}
            </Carousel>
        )
    }
}
