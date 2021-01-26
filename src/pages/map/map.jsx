import React, { Component } from 'react';
import './map.css'
import store from '../../store/index.js'
let BMap = window.BMap

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
        //创建地图实例
        this.map = new BMap.Map("baidu_map");
        // // 创建坐标  
        // var point = new BMap.Point(116.404, 39.915);
        // // 初始化地图，设置中心点坐标和地图级别 
        // map.centerAndZoom(point, 15);


        let myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(this.state.oCurrentCity.label, point => {
            if (point) {
                this.map.centerAndZoom(point, 11);
                this.fnAddOverLay(point);
            }
        }, this.state.oCurrentCity.label);

        //地图组件
        this.map.addControl(new BMap.NavigationControl());
        this.map.addControl(new BMap.ScaleControl());
        this.map.addControl(new BMap.OverviewMapControl());
        this.map.addControl(new BMap.MapTypeControl());
    }

    //自定义标签方法 http://lbsyun.baidu.com/jsdemo.htm#eAddLabel
    fnAddOverLay = (point) => {
        let opts = {
            position: point, // 指定文本标注所在的地理位置
            offset: new BMap.Size(37, -37) // 设置文本偏移量
        };
        // 创建文本标注对象
        let label = new BMap.Label('<div class="map_label01">文本<br />套数</div>', opts);
        // 自定义文本标注样式
        label.setStyle({
            border: '0px',
            backgroundColor: 'transparent'
        });
        this.map.addOverlay(label);
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