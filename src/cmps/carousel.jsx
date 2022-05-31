import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
var Carousel = require('react-responsive-carousel').Carousel;

export class DemoCarousel extends Component {
    render() {
        const { imgs } = this.props
        return (
            <Carousel showThumbs={false} showStatus={false} onClickItem={(ev) => console.log(ev)}>
                {/* <div>
                    <img src={require(`../assets/Images/001.jpeg`)} alt="" />
                </div>
                <div>
                    <img src={require('../assets/Images/002.jpeg')} alt="" />
                </div>
                <div>
                    <img src={require('../assets/Images/003.jpeg')} alt="" />
                </div>
                <div>
                    <img src={require('../assets/Images/004.jpeg')} alt="" />
                </div>
                <div>
                    <img src={require('../assets/Images/005.jpeg')} alt="" />
                </div>
                <div>
                    <img src={require('../assets/Images/006.jpeg')} alt="" />
                </div> */}
                {imgs.map(img => <div key={img}><img src={require(`../assets/Images/${img}`)} alt="" /></div>)}
            </Carousel>
        );
    }
};
// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));