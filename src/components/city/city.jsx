import React, { Component } from 'react';
import './city.css'
class City extends Component {
    render() {
        return (
            <div className={this.props.sClass}>
                <div className="city_title">
                    <span className="shutoff iconfont icon-shut" onClick={() => this.props.fnSwitch('city_wrap')}></span>
                    <h3>选择城市</h3>
                </div>

                <div className="group_con">
                    <div className="city_group">
                        <h4>当前定位</h4>
                        <ul>
                            <li>深圳</li>
                        </ul>
                    </div>
                    <div className="city_group">
                        <h4>热门城市</h4>
                        <ul>
                            <li>北京</li>
                            <li>上海</li>
                            <li>广州</li>
                        </ul>
                    </div>
                    <div className="city_group">
                        <h4>A</h4>
                        <ul>
                            <li>安庆</li>
                        </ul>
                    </div>
                    <div className="city_group">
                        <h4>B</h4>
                        <ul>
                            <li>北京</li>
                            <li>北海</li>
                            <li>宝鸡</li>
                            <li>保定</li>
                            <li>保亭</li>
                        </ul>
                    </div>
                    <div className="city_group">
                        <h4>C</h4>
                        <ul>
                            <li>成都</li>
                            <li>重庆</li>
                            <li>长沙</li>
                            <li>常德</li>
                            <li>常州</li>
                            <li>澄迈</li>
                            <li>承德</li>
                            <li>滁州</li>
                            <li>长春</li>
                        </ul>
                    </div>
                </div>
                <ul className="city_index">
                    <li><span>#</span></li>
                    <li><span>热</span></li>
                    <li className="active"><span>A</span></li>
                    <li><span>B</span></li>
                    <li><span>C</span></li>
                    <li><span>D</span></li>
                    <li><span>F</span></li>
                    <li><span>G</span></li>
                    <li><span>H</span></li>
                    <li><span>J</span></li>
                    <li><span>K</span></li>
                    <li><span>L</span></li>
                    <li><span>M</span></li>
                    <li><span>N</span></li>
                    <li><span>Q</span></li>
                    <li><span>S</span></li>
                    <li><span>T</span></li>
                    <li><span>W</span></li>
                    <li><span>X</span></li>
                    <li><span>Y</span></li>
                    <li><span>Z</span></li>
                </ul>
            </div>
        );
    }
}

export default City;