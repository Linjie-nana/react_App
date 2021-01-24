import React, { Component } from 'react';
import './map.css'
class Map extends Component {
    render() {
        return (
            //容器标签可以写成空标签
            <>
                <div className="common_title">
                    <span className="back iconfont icon-prev" onClick={() => this.props.history.goBack()}></span>
                    <h3>地图找房</h3>
                </div>
                <div className="map_com">

                </div>
            </>
        );
    }
}

export default Map;