import React, { Component } from 'react';
import './searchbar.css'
//导进仓库管理中心
import store from '../../store'
class CitySelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oCurrentCity : store.getState()
        }
        //初始化时订阅
        this.unsubscrbe = store.subscribe(this.fnChangeCity)
    }
    //订阅获取最新值得方法
    fnChangeCity = () => {
        this.setState({
            oCurrentCity : store.getState()
        })
    }
    //卸载前取消订阅
    componentWillUnmount() {
        this.unsubscrbe()
    }
    render() {
        return (
            <div>
                 <div className="search_con">
                    <span className="city">{ this.state.oCurrentCity.label }</span>
                    <i className="iconfont icon-xialajiantouxiangxia"></i>
                    <span className="village"><i className="iconfont icon-fangdajing"></i> 请输入小区名</span>
                </div>
            </div>
        );
    }
}

export default CitySelect;