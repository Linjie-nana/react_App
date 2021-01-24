import React, { Component } from 'react';
import './map.css'
class Map extends Component {
    componentDidMount() {
        let BMap = window.BMap
        //创建地图实例
        var map = new BMap.Map("baidu_map");
        // 创建坐标  
        var point = new BMap.Point(116.404, 39.915);
        // 初始化地图，设置中心点坐标和地图级别 
        map.centerAndZoom(point, 15);

        //地图组件
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());

    }
    render() {
        return (
            //容器标签可以写成空标签
            <>
                <div className="common_title">
                    <span className="back iconfont icon-prev" onClick={() => this.props.history.goBack()}></span>
                    <h3>地图找房</h3>
                </div>
                <div className="map_com">
                    <div id='baidu_map' style={{ 'width': '100%', 'height': '100%' }}></div>
                </div>
            </>
        );
    }
}

export default Map;