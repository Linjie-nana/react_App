import React, { Component } from 'react';
import './city.css'
import store from '../../store'
import { AutoSizer, List } from 'react-virtualized'
import { Toast } from 'antd-mobile'
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
            oCurrentCity: store.getState(),
            iNow: 0
        }
        this.unsubscrbe = store.subscribe(this.fnChangeCity)
        this.oMyRef = React.createRef()
        this.bIsScroll = true

    }
    //卸载前取消订阅
    componentWillUnmount() {
        this.unsubscrbe()
    }
    //订阅获取最新值得方法
    fnChangeCity = () => {
        this.setState({
            oCurrentCity: store.getState()
        }, () => {
            this.setState(state => {
                let newCityList = state.oCityList;
                //在成功修改城市后，回调中修改#当前城市
                newCityList['#'] = [state.oCurrentCity];
                return {
                    //返回修改当前城市后的城市列表
                    oCityList: newCityList
                }
            })
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


    //列表优化
    rowRenderer = ({ key, index, style, }) => {
        let item = this.state.aCityKey[index]
        return (
            <div className="city_group" key={key} style={style}>
                <h4>{fnFormatTitle(item)}</h4>
                <ul>
                    {this.state.oCityList[item].map(val =>
                        <li key={val.value} onClick={() => this.checkCity(val.label)}>{val.label}</li>
                    )}
                </ul>
            </div>
        );
    }

    //计算每一行高度的方法
    rouHight = ({ index }) => {
        // index是引用时自带的参
        let item = this.state.aCityKey[index];
        let iLen = this.state.oCityList[item].length;
        return 40 + 58 * iLen
    }

    //滚动方法
    onRowsRendered = ({ startIndex }) => {
        if (this.bIsScroll) {
            this.setState({
                iNow: startIndex
            })
        }

    }

    //点击滚动到某处
    fnScrollToRow = (i) => {
        this.bIsScroll = false
        this.oMyRef.current.scrollToRow(i)
        this.setState({
            iNow: i
        })
        setTimeout(() => {
            this.bIsScroll = true
        }, 200)

    }
    //选择城市
    checkCity = async sName => {
        if (sName === this.state.oCurrentCity.label) {
            Toast.info('已选中该城市', 2)
        }
        let res = await this.axios.get('/area/info?name=' + sName);
        if (sName !== '上海' && res.data.body.label === '上海') {
            Toast.info('当前城市不在服务区', 2)
        } else {
            sessionStorage.setItem('haoke_current_city', JSON.stringify(res.data.body))

            store.dispatch({
                type: "change_current_city",
                value: res.data.body
            });
            this.props.fnSwitch('city_wrap')
            //刷新数据
            // this.fnGetData()
            //但是要多发送多一次请求
        }
    }


    render() {
        let { aCityKey, iNow } = this.state;
        return (
            <div className={this.props.sClass}>
                <div className="city_title">
                    <span className="shutoff iconfont icon-shut" onClick={() => this.props.fnSwitch('city_wrap')}></span>
                    <h3>选择城市</h3>
                </div>

                <div className="group_con">
                    <AutoSizer>
                        {/* 自动高度 */}
                        {({ height, width }) => (
                            <List
                                width={width}
                                height={height}
                                rowCount={aCityKey.length}
                                //每个模块的高度
                                rowHeight={this.rouHight}
                                //输出结构
                                rowRenderer={this.rowRenderer}
                                //滚动时的方法
                                onRowsRendered={this.onRowsRendered}

                                //点击右侧滚动要需要的内容的操作
                                //ref定向到这个组件
                                ref={this.oMyRef}
                                //设置List组件的滚动对齐方式：顶部对齐
                                scrollToAlignment='start'
                            />
                        )}
                    </AutoSizer>
                </div>
                <ul className="city_index">
                    {
                        aCityKey.map((item, i) =>
                            <li className={(i === iNow) ? 'active' : ''} key={item} onClick={() => this.fnScrollToRow(i)}>
                                <span>{(item === 'hot') ? '热' : item.toUpperCase()}</span>
                            </li>)
                    }
                </ul>
            </div>
        );
    }


}

export default City;