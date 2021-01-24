import React, { Component } from 'react';
import './map.css'
import store from '../../store/index.js'
class Map extends Component {


    constructor(props) {
        super(props);
        this.state = {
            oCurrentCity: store.getState(),
        }
        //初始化时订阅
        this.unsubscrbe = store.subscribe(this.fnChangeCity)
    }
    //卸载前取消订阅
    componentWillUnmount() {
        this.unsubscrbe()
    }
    //订阅获取最新值得方法
    fnChangeCity = () => {
        this.setState({
            oCurrentCity: store.getState()
        })
    }



    componentDidMount() {
        console.log(this.state.oCurrentCity);
        let BMap = window.BMap
        //创建地图实例
        let map = new BMap.Map("baidu_map");
        // // 创建坐标  
        // var point = new BMap.Point(116.404, 39.915);
        // // 初始化地图，设置中心点坐标和地图级别 
        // map.centerAndZoom(point, 15);


        let myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(this.state.oCurrentCity.label, function (point) {
            if (point) {
                map.centerAndZoom(point, 16);
            }
        }, this.state.oCurrentCity.label);

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