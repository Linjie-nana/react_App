import React, { Component } from 'react';
import './city.css'
import store from '../../store'

function fnFormatTitle(data) {
    if (data === '#') {
        return '当前定位'
    } else if (data === 'hot') {
        return '热门城市'
    } else {
        //转化大小
        return data.toUpperCase()
    }
}
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

        this.setState({
            oCityList,
            aCityKey
        })
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
        let { oCityList, aCityKey } = this.state;
        return (
            <div className={this.props.sClass}>
                <div className="city_title">
                    <span className="shutoff iconfont icon-shut" onClick={() => this.props.fnSwitch('city_wrap')}></span>
                    <h3>选择城市</h3>
                </div>

                <div className="group_con">
                    {aCityKey.map(item => (
                        <div className="city_group" key={item}>
                            <h4>{fnFormatTitle(item)}</h4>
                            <ul>
                                {oCityList[item].map(val =>
                                    <li key={val.value}>{val.label}</li>
                                )}

                            </ul>
                        </div>
                    ))}


                </div>
                <ul className="city_index">
                    {
                        aCityKey.map(item => <li key={item}><span>{(item === 'hot') ? '热' : item.toUpperCase()}</span></li>)
                    }


                    <li className="active"><span>A</span></li>

                </ul>
            </div>
        );
    }
}

export default City;