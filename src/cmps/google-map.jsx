import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export class GoogleMap extends Component {

    state = {
        center: {
            lat: 32.109333,
            lng: 34.855499
        }
    }

    // componentDidMount() {
    //     console.log(this.props.lat)
    //     console.log(this.props.lng)
    //     // this.setState(prevState => ({ ...prevState, center: { lat: this.props.lat, lng: this.props.lng } }))
    //     const center = {
    //         lat: +this.props.lat.toFixed(2),
    //         lng: this.props.lng
    //     }
    //     this.setState({center},() => {
    //         console.log('workingg', this.state.center)
    //     })
    // }

    onSetCenter = ({ x, y, lat, lng, event }) => {
        this.setState({
            center: {
                lat,
                lng
            }
        })
    }

    render() {
        const {center} = this.state

        return (
            <div style={{ height: '50vh', width: '100%' }} className='map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAcisAmdvztZYz3ZptoZE1zwPpbSndD_Zs" }}
                    // defaultCenter={this.state.center}
                    center={center}
                    zoom = {10}
                    onClick={this.onSetCenter}
                >
                    <AnyReactComponent
                        lat={center.lat}
                        lng={center.lng}
                        text="🚩"
                    />
                </GoogleMapReact>
            </div>
        )
    }
}

