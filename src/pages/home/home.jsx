import React, { Component } from 'react';
//导入轮播图组件需要得资源
import { Carousel } from 'antd-mobile';
import { Link } from 'react-router-dom'
import './home.css'
import { BASE_URL } from '../../utils'
import CitySelect from '../../components/searchbar/searchbar'
import store from '../../store'
//searchbar
class SearchBar extends Component {
    componentDidMount() {
        //优化请求次数，判断本地有没有定位当前城市信息，有就不用请求，否则就请求
        let sCurrentCity = sessionStorage.getItem("haoke_current_city")
        //判断
        if (sCurrentCity) {
            console.log(11111111111111111111111111111111);
            //如果有就不请求，把数据存到redux数据中心
            //创建工单并提交
            store.dispatch({
                type: "change_current_city",
                value: JSON.parse(sCurrentCity)
            })
        } else {
            //否则就请求
            let BMap = window.BMap
            let myCity = new BMap.LocalCity();
            myCity.get(async result => {
                let cityName = result.name;
                //把定位得位置作为参数传给请求地址
                let oRes = await this.axios.get("/area/info?name=" + cityName)
                //把获取得地址对象存储在sessionStorage
                sessionStorage.setItem("haoke_current_city", JSON.stringify(oRes.data.body))
                store.dispatch({
                    type: "change_current_city",
                    value: oRes.data.body
                })
            });
        }
    }
    render() {
        return (
            <div className="search_bar">
                <CitySelect />
                <Link to='/map'> <i className="iconfont icon-ic-maplocation-o tomap"></i></Link>
            </div>
        );
    }
}

//定义一个轮播图组件
class Slide extends Component {
    //构造函数可以简写
    state = {
        data: [],
    }
    //组件初始化完成之后发送请求
    componentDidMount() {
        this.fnGetdata()
    }
    fnGetdata = async () => {
        let oRes = await this.axios.get("/home/swiper")
        console.log(oRes);
        this.setState({
            data: oRes.data.body
        })
    }
    render() {
        return (
            <div className="slide_con">
                {
                    this.state.data.length > 0 && <Carousel
                        autoplay={true}
                        infinite
                    >
                        {this.state.data.map(item => (
                            <a
                                key={item.id}
                                href="http://www.alipay.com"
                                style={{ display: 'inline-block', width: '100%', height: "10.6rem" }}
                            >
                                <img
                                    src={BASE_URL + item.imgSrc}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                />
                            </a>
                        ))}
                    </Carousel>
                }

            </div>
        );
    }
}
//菜单栏组件
class Menu extends Component {
    render() {
        return (
            <div>
                <ul className="menu_con">
                    <li>
                        <Link href="#"><i className="iconfont icon-zufang1"></i></Link>
                        <h4>整租</h4>
                    </li>
                    <li>
                        <Link href="#"><i className="iconfont icon-usergroup"></i></Link>
                        <h4>合租</h4>
                    </li>
                    <li>
                        <Link href="#"><i className="iconfont icon-ic-maplocation-o"></i></Link>
                        <h4>地图找房</h4>
                    </li>
                    <li>
                        <Link href="#"><i className="iconfont icon-zufang"></i></Link>
                        <h4>去出租</h4>
                    </li>
                </ul>
            </div>
        );
    }
}
//Group组件
class Group extends Component {
    //构造函数可以简写
    state = {
        data: [],
    }
    //组件初始化完成之后发送请求
    componentDidMount() {
        this.fnGetdata()
    }
    fnGetdata = async () => {
        let oRes = await this.axios.get("/home/groups?area=AREA%7C88cff55c-aaa4-e2e0")
        console.log(oRes);
        this.setState({
            data: oRes.data.body
        })
    }
    render() {
        return (
            <div className="model2">
                <div className="title_con">
                    <h3>租房小组</h3>
                    <Link to="/" className="iconfont icon-next"></Link>
                </div>
                <ul className="house_list">
                    {this.state.data.map(item => (
                        <li key={item.id}>
                            <p className="fl">{item.title}</p>
                            <img src={BASE_URL + item.imgSrc} alt="" className="fr" />
                            <span className="fl">{item.desc}</span>
                        </li>
                    ))}
                </ul>
                {/* 
                desc: "归属的感觉"
                id: 1
                imgSrc: "/img/groups/1.png"
                title: "家住回龙观" */}
            </div>
        )
    }
}
//资讯组件
class News extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        this.fnGetdata()
    }
    fnGetdata = async () => {
        let oRes = await this.axios.get("/home/news?area=AREA%7C88cff55c-aaa4-e2e0")
        console.log(oRes);
        this.setState({
            data: oRes.data.body
        })
    }
    render() {
        return (
            <div className="model mb120">
                <div className="title_con">
                    <h3>最新资讯</h3>
                    <Link href="#" className="iconfont icon-next"></Link>
                </div>
                <ul className="list">
                    {
                        this.state.data.map(item => (
                            <li key={item.id}>
                                <Link to="/"><img src={BASE_URL + item.imgSrc} alt="" /></Link>
                                <div className="detail_list">
                                    <h4>{item.title}</h4>
                                    <div className="detail">
                                        <span>{item.from}</span>
                                        <em>{item.date}</em>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

class Home extends Component {
    render() {
        return (
            <div>
                <SearchBar />
                <Slide />
                <Menu />
                <Group />
                <News />
            </div>
        );
    }
}

export default Home;