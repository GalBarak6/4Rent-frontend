import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export class GoogleMap extends Component {

    state = {
        center: {
            lat: 32.109333,
            lng: 34.855499
        },
        zoom: 10
    }

    componentDidMount() {
        console.log(this.props.lat);
        console.log(this.props.lng);
    }
    onSetCenter = ({ x, y, lat, lng, event }) => {
        this.setState({
            center: {
                lat,
                lng
            }
        })
    }

    render() {
        return (
            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAcisAmdvztZYz3ZptoZE1zwPpbSndD_Zs" }}
                    defaultCenter={this.state.center}
                    center={this.state.center}
                    defaultZoom={this.state.zoom}
                    onClick={this.onSetCenter}
                >
                    <AnyReactComponent
                        lat={this.state.center.lat}
                        lng={this.state.center.lng}
                        text="🚩"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

