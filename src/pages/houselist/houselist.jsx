import React, { Component } from 'react';
import './houselist.css'

import CitySelect from '../../components/searchbar/searchbar'

//SearchBar
class SearchBar extends Component{
    render() {
        return (
            <div className="list_title">
                <span className="back iconfont icon-prev"></span>
                <CitySelect />
                <i className="iconfont icon-ic-maplocation-o tomap"></i>
            </div>
        )
    }
}
class Filterlist extends Component {
    render() {
        return (
            <div>
                <ul className="filter_list">
                    <li className="active">
                        <span>区域</span>
                        <i className="iconfont icon-xialajiantouxiangxia"></i>
                    </li>
                    <li className="current">
                        <span>方式</span>
                        <i className="iconfont icon-xialajiantouxiangxia"></i>
                    </li>
                    <li>
                        <span>租金</span>
                        <i className="iconfont icon-xialajiantouxiangxia"></i>
                    </li>
                    <li>
                        <span>筛选</span>
                        <i className="iconfont icon-xialajiantouxiangxia"></i>
                    </li>
                </ul>
            </div>
        );
    }
}

class Houselist extends Component {
    render() {
        return (
            <div>
                <SearchBar/>
                <Filterlist/>
            </div>
        );
    }
}

export default Houselist;