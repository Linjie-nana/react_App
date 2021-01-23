import React, { Component } from 'react';
import './city.css'
import store from '../../store'
class City extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oCityList: [],
            aCityKey: [],
            oCurrentCity: store.getState()
        }
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
        this.fnGetData()
    }
    fnGetData = async () => {
        let Res = await this.axios.get('/area/city', {
            params: {
                level: 1
            }
        })
        let { oCityList, aCityKey } = this.fnFormatData(Res.data.body);

        //在原来数据的基础上添加 热门hot 城市
        let Res2 = await this.axios.get('/area/hot');
        oCityList.hot = Res2.data.body;
        aCityKey.unshift('hot');

        //在数据上添加 #当前城市
        oCityList['#'] = [this.state.oCurrentCity]
        aCityKey.unshift('#')

        console.log(oCityList);
        console.log(aCityKey);
    }

    fnFormatData(list) {
        let oCityList = {}
        list.forEach(item => {
            let sLetter = item.short.substr(0, 1);
            if (sLetter in oCityList) {
                oCityList[sLetter].push(item)
            } else {
                oCityList[sLetter] = [item]
            }
        })
        let aCityKey = Object.keys(oCityList).sort();
        return {
            aCityKey, oCityList
        }
    }

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