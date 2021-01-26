import React, { Component } from 'react';
import './map.css'
import store from '../../store/index.js'
import { Toast } from 'antd-mobile'

let BMap = window.BMap

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oCurrentCity: store.getState(),
            sClass: 'houseList'
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

        //创建地图缩放等级
        this.level = 11

        let myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(this.state.oCurrentCity.label, point => {
            if (point) {
                this.fnAddOverLay(point, this.state.oCurrentCity.value, this.level);
            }
        }, this.state.oCurrentCity.label);

        //地图组件
        this.map.addControl(new BMap.NavigationControl());
        this.map.addControl(new BMap.ScaleControl());
        this.map.addControl(new BMap.OverviewMapControl());
        this.map.addControl(new BMap.MapTypeControl());
    }

    //自定义标签方法 http://lbsyun.baidu.com/jsdemo.htm#eAddLabel
    fnAddOverLay = async (point, id, level) => {
        //以坐标为中心缩放地图
        if (level) {
            this.level = 11
        } else if (this.level === 11) {
            this.level = 13
        } else {
            this.level = 15
        }
        this.map.centerAndZoom(point, this.level);


        //创建加载状态
        Toast.loading('加载中..', 0)
        let Res = await this.axios.get('/area/map?id=' + id);
        // console.log(Res);
        //请求完后清除加载状态
        Toast.hide();

        let HouseList = Res.data.body;

        if (this.level !== 15) {
            HouseList.forEach(item => {

                //取到经纬度
                let { longitude, latitude } = item.coord;
                //创建经纬度左边点
                let point = new BMap.Point(longitude, latitude);

                let opts = {
                    position: point, // 指定文本标注所在的地理位置
                    offset: new BMap.Size(37, -37) // 设置文本偏移量
                };
                // 创建文本标注对象
                let label = new BMap.Label(`<div class="map_label01">${item.label}<br />${item.count}</div>`, opts);
                // 自定义文本标注样式
                label.setStyle({
                    border: '0px',
                    backgroundColor: 'transparent'
                });

                //给label绑定事件
                label.addEventListener('click', () => {
                    this.fnRefreshMap(point, item.value)
                })

                this.map.addOverlay(label);
            })
        } else {
            HouseList.forEach(item => {
                // 拿出经纬度值
                let { longitude, latitude } = item.coord;

                // 通过经纬度值创建百度的坐标点
                let point = new BMap.Point(longitude, latitude);

                let opts = {
                    position: point, // 指定文本标注所在的地理位置
                    offset: new BMap.Size(-60, -50) // 设置文本偏移量
                };
                // 创建文本标注对象
                let label = new BMap.Label(`<div class="map_label02">${item.label}&nbsp;&nbsp;${item.count}套</div>`, opts);
                // 自定义文本标注样式
                label.setStyle({
                    border: '0px',
                    backgroundColor: 'transparent'
                });

                // 给label绑定点击事件
                label.addEventListener('click', () => {
                    // alert(item.label);
                    this.fnShowHouselist()
                })

                this.map.addOverlay(label);
            })
        }
    }

    //根据层级修改样式
    fnShowHouselist = () => {
        // alert('第三级别！')
        this.setState({
            sClass: 'houseList houseListShow'
        })
    }


    fnRefreshMap = (point, id) => {
        setTimeout(() => {
            this.map.clearOverlays()
        }, 0)

        this.fnAddOverLay(point, id)
    }


    render() {
        let { sClass } = this.state
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
                {/* level等于15的时候，显示此样式 */}
                <div className={sClass}>
                    <div className="titleWrap">
                        <h1 className="listTitle">房屋列表</h1>
                        <a className="titleMore" href="/house/list">
                            更多房源
                        </a>
                    </div>
                    <div className="houseItems">
                        <div className="house">
                            <div className="imgWrap">
                                <img className="img" src='images/news/1.png' />
                            </div>
                            <div className="content">
                                <h3 className="title">三期装修两房，南北户型</h3>
                                <div className="desc">两室一厅</div>
                                <div>
                                    <span className="tag tag1">地铁近</span>
                                    <span className="tag tag2">买菜方便</span>
                                </div>
                                <div className="price">
                                    <span className="priceNum">1600</span> 元/月
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default Map;