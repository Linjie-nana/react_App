import React, { Component } from 'react';
import './detail.css';
import { Carousel } from 'antd-mobile';
import { BASE_URL } from '../../utils';
import avatar from '../../assets/images/avatar.png'


let oSurpport = {
    '衣柜': 'icon-yigui',
    '洗衣机': 'icon-xiyiji',
    '空调': 'icon-kongtiao',
    '天然气': 'icon-tianranqi',
    '冰箱': 'icon-bingxiang',
    '电视': 'icon-dianshi',
    '热水器': 'icon-reshuiqi',
    '沙发': 'icon-shafa',
    '暖气': 'icon-nuanqi',
    '宽带': 'icon-_huabanfuben'
}

class Detail extends Component {
    state = {
        oHouseData: {
            houseImg: [],
            tags: [],
            oriented: [],
            supporting: []

        }
    }

    componentDidMount() {
        this.fnGetData()
    }

    fnGetData = async () => {
        let houseCode = this.props.match.params.houseCode;
        //console.log(houseCode);
        let oRes = await this.axios.get('/houses/' + houseCode);
        console.log(oRes);
        this.setState({
            oHouseData: oRes.data.body
        }, () => {
            let { longitude, latitude } = this.state.oHouseData.coord;
            let BMap = window.BMap;
            let map = new BMap.Map("house_map");
            let point = new BMap.Point(longitude, latitude);
            map.centerAndZoom(point, 15);
            let marker = new BMap.Marker(point);
            map.addOverlay(marker);
        })
    }

    /* 
        {
            community: "光大花园和榕风景"
            coord: {latitude: "23.09336", longitude: "113.266216"}
            description: "光大花园主套带独立卫生间，温馨舒适，清爽自在，超具***，采光很好，身在其中很温暖，处在闹中取静的小区，体会那别有一番的自如生活"
            floor: "2"
            houseCode: "5cc4861a1439630e5b4a02d8"
            houseImg: (8) ["/newImg/7bhemc5ff.jpg", "/newImg/7bhhdmm7b.jpg", "/newImg/7bhmoa31a.jpg", "/newImg/7bj90d4a3.jpg", "/newImg/7bjn1agaa.jpg", "/newImg/7bi65k0d4.jpg", "/newImg/7bi9cmnm9.jpg", "/newImg/7bii8ij54.jpg"]
            oriented: ["南"]
            price: 2330
            roomType: "四室"
            size: 82
            supporting: (7) ["冰箱", "洗衣机", "空调", "热水器", "沙发", "宽带", "衣柜"]
            tags: (5) ["公寓", "独立卫生间", "近地铁", "押一付一", "随时看房"]
            title: "合租 · 光大花园和榕风景 4室1厅"
        }
    
    */

    render() {
        let {
            houseImg,
            title,
            tags,
            price,
            roomType,
            size,
            floor,
            oriented,
            community,
            supporting,
            description
        } = this.state.oHouseData
        return (
            <div>
                <span className="detail_back iconfont icon-prev" onClick={() => this.props.history.goBack()}></span>

                <div className="detail_slide_con">
                    {
                        houseImg.length > 0 && <Carousel
                            autoplay={true}
                            infinite
                        >
                            {houseImg.map((item, i) => (
                                <a
                                    key={i}
                                    href="http://www.itcast.cn"
                                    style={{ display: 'inline-block', width: '100%', height: '10.375rem' }}
                                >
                                    <img
                                        src={BASE_URL + item}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    }
                </div>

                <div className="detail_info">
                    <div className="detail_more">
                        <h3>{title}</h3>
                        <div className="detail_tag">
                            {
                                tags.map((item, i) => <span key={i} className={"tag tag" + i}>{item}</span>)
                            }
                        </div>
                    </div>

                    <ul className="detail_more more2">
                        <li>
                            <span>{price}<em>/月</em></span>
                            <b>租金</b>
                        </li>
                        <li>
                            <span>{roomType}</span>
                            <b>房型</b>
                        </li>
                        <li>
                            <span>{size}平米</span>
                            <b>面积</b>
                        </li>
                    </ul>
                    <ul className="detail_more more3">
                        <li><em>装修：</em>精装</li>
                        <li><em>楼层：</em>{floor}</li>
                        <li><em>朝向：</em>{oriented.join('、')}</li>
                        <li><em>类型：</em>普通住宅</li>
                    </ul>
                </div>

                <div className="detail_info">
                    <h4 className="map_title">{community}</h4>
                    <div className="map_con">
                        <div id="house_map" style={{ 'width': '100%', 'height': '100%' }}></div>
                    </div>

                    <h3 className="detail_common_title">
                        房屋配套
                    </h3>
                    <ul className="support_list">
                        {
                            supporting.map((item, i) => (
                                <li key={i}>
                                    <i className={"iconfont " + oSurpport[item]}></i>
                                    <b>{item}</b>
                                </li>
                            ))
                        }
                        {
                            supporting.length === 0 && <li style={{ 'width': '100%', 'textAlign': 'center' }}>暂无房屋配套</li>
                        }


                    </ul>
                </div>

                <div className="detail_info">
                    <h3 className="detail_common_title">
                        房屋概况
                    </h3>
                    <div className="landlord ">
                        <div className="lorder">
                            <img src={avatar} alt="" />
                            <div className="lorder_name">
                                <b>王女士</b>
                                <span><i className="iconfont icon-renzheng"></i> <b>已认证房主</b></span>
                            </div>

                        </div>
                        <span className="send_info">发消息</span>
                    </div>
                    <p className="detail_text">
                        {description || '暂无房屋概况'}
                    </p>
                </div>

                <ul className="down_btns">
                    <li className="collect"><i className="iconfont icon-shoucang"></i> 收藏</li>
                    <li>在线咨询</li>
                    <li className="active"><a href="tel:400-618-4000">电话预约</a></li>
                </ul>
            </div>
        );
    }
}

export default Detail;