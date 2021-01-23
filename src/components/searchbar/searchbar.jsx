import React, { Component } from 'react';
import './searchbar.css'
//导进仓库管理中心
import store from '../../store'
import City from '../city/city'
class CitySelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oCurrentCity: store.getState(),
            sClass: 'city_wrap'
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

    fnSwitch = (sClass) => {
        this.setState({
            sClass
        })
    }
    render() {
        return (
            <div>
                <div className="search_con">
                    <span className="city" onClick={() => this.fnSwitch('city_wrap slideUp')}>{this.state.oCurrentCity.label}</span>
                    <i className="iconfont icon-xialajiantouxiangxia"></i>
                    <span className="village"><i className="iconfont icon-fangdajing"></i> 请输入小区名</span>
                    <City sClass={this.state.sClass} fnSwitch={this.fnSwitch} />
                </div>
            </div>
        );
    }
}

export default CitySelect;