import React, { Component } from 'react';
import Cityselect from '../../components/searchbar/searchbar';
import './houselist.css';
import { PickerView, Toast } from 'antd-mobile';
import store from '../../store'
import { BASE_URL } from '../../utils'
import { List, AutoSizer, InfiniteLoader } from 'react-virtualized';
import notfound from '../../assets/images/not-found.png'

class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //在数据中心选中当前选中的城市
            oCurrentCity: store.getState(),

            // 控制弹框一个及背景的显示和隐藏
            bShowPicker: false,
            // 控制弹框二及背景的显示和隐藏
            bShowTags: false,
            // 循环出过滤条结构的数组
            aFilterBarData: [
                { title: '区域', type: 'area' },
                { title: '方式', type: 'mode' },
                { title: '租金', type: 'price' },
                { title: '筛选', type: 'more' }
            ],
            // 存储当前点击的过滤条按钮类型
            sType: '',

            //所有的过滤数据
            allFilterData: {},
            // 存储当前PickerView的过滤数据
            currentPickData: [],
            //存储当前PicerView的列数
            cols: 1,

            //储存右侧弹框数据
            aTagsData: [],

            // 存储PicerView三个类型选中的值
            oPickerVal: {
                area: ['area', 'null'],
                mode: ['null'],
                price: ['null']
            },
            // 存储右侧弹框的值
            aTagsVal: [],

            //控制文字导航栏文字高亮
            filterBarState: {
                area: false,
                mode: false,
                price: false,
                more: false
            }
        }
        this.unsubscribe = store.subscribe(this.fnStoreChange)
    }
    // 订阅数据和销毁订阅
    componentWillUnmount() {
        this.unsubscribe()
    }

    fnStoreChange = () => {
        this.setState({
            oCurrentCity: store.getState()
        }, () => {
            //如果城市发生改变，则重新发送数据，并且将获取的数据初始化

            this.fnGetData();
            this.setState({
                oPickerVal: {
                    area: ['area', 'null'],
                    mode: ['null'],
                    price: ['null']
                },
                aTagsVal: [],
                oFilterBarState: {
                    area: false,
                    mode: false,
                    price: false,
                    more: false
                }
            })
        })
    }
    //开篇就加载的东西
    componentDidMount() {
        this.fnGetData()
    }
    fnGetData = async () => {
        // let oRes = await this.axios.get('/houses/condition?id=' + this.state.oCurrentCity.value)
        // console.log(oRes);
        // 将发送获取到的导航栏数据存入永久储存
        let sFilterData = localStorage.getItem('haoke_filter_data_' + this.state.oCurrentCity.value);
        let aFilterData = [];
        if (sFilterData) {
            aFilterData = JSON.parse(sFilterData)
        } else {
            let oRes = await this.axios.get('/houses/condition?id=' + this.state.oCurrentCity.value)
            localStorage.setItem('haoke_filter_data_' + this.state.oCurrentCity.value, JSON.stringify(oRes.data.body))
            aFilterData = oRes.data.body
        }
        this.setState({
            allFilterData: aFilterData
        }, () => {
            let { characteristic, floor, oriented, roomType } = this.state.allFilterData;
            this.setState({
                aTagsData: [
                    { title: '户型', data: roomType },
                    { title: '朝向', data: oriented },
                    { title: '楼层', data: floor },
                    { title: '房屋亮点', data: characteristic }
                ]
            })
        })
    }
    // 定义显示弹框的方法
    fnShowPop = (sType) => {
        if (sType !== 'more') {
            let { area, subway, rentType, price } = this.state.allFilterData;
            let currentPickData = []
            let cols = 1

            if (sType === 'area') {
                currentPickData = [area, subway]
                cols = 3
            } else if (sType === 'mode') {
                currentPickData = rentType
            } else {
                currentPickData = price
            }
            this.setState({
                bShowPicker: true,
                bShowTags: false,
                //选中时更改类型
                sType,
                currentPickData,
                cols
            })
        } else {
            this.setState({
                bShowPicker: false,
                bShowTags: true,
                sType
            })
        }
    }
    // 定义隐藏弹框的方法
    fnHidePop = () => {
        this.setState({
            bShowPicker: false,
            bShowTags: false,
            // 存储当前点击的过滤条按钮类型
            sType: ''
        })
    }

    // 定义获取PickerView值的方法
    // 插件返回一个val，让style与val绑定数组，完成储存
    fnGetPickerVal = (val) => {
        this.setState(state => {
            let oNowPickerVal = state.oPickerVal;
            oNowPickerVal[state.sType] = val;
            return {
                oPickerVal: oNowPickerVal
            }
        }, () => {
            console.log(this.state.oPickerVal)
            this.fnSetFilterState()
        })
    }

    // 定义获取弹框二值的方法
    fnGetTagsVal = (val) => {
        this.setState(state => {
            let aNowTagsVal = state.aTagsVal;
            // 判断数组aNowTagsVal中是否包含传入的val的值
            if (aNowTagsVal.includes(val)) {
                aNowTagsVal = aNowTagsVal.filter(item => item !== val)
            } else {
                aNowTagsVal.push(val)
            }

            return {
                aTagsVal: aNowTagsVal
            }
        }, () => {
            console.log(this.state.aTagsVal);
            this.fnSetFilterState()
        })
    }

    //判断是否已经选择了数据的方法
    fnSetFilterState = () => {
        this.setState(state => {
            //拿到储存选择的两个最新值
            let PickerVal = state.oPickerVal;
            let TagsVal = state.aTagsVal;

            let FilterBarState = state.filterBarState;

            //判断
            if (PickerVal.area[0] === 'area' && PickerVal.area[1] === 'null') {
                FilterBarState.area = false;
            } else {
                FilterBarState.area = true;
            }

            if (PickerVal.mode[0] === 'null') {
                FilterBarState.mode = false;
            } else {
                FilterBarState.mode = true;
            }

            if (PickerVal.price[0] === 'null') {
                FilterBarState.price = false;
            } else {
                FilterBarState.price = true;
            }

            if (TagsVal.length === 0) {
                FilterBarState.more = false;
            } else {
                FilterBarState.more = true;
            }

            return {
                filterBarState: FilterBarState
            }

        })
    }

    fnFormatParams = () => {
        this.setState(state => {
            // 拿到oPickerVal最新的值
            let oNowPickerVal = state.oPickerVal;
            // 拿到aTagsVal最新的值
            let aNowTagsVal = state.aTagsVal;

            let oParams = {};

            // 放area对应的数据到oParams中
            if (oNowPickerVal.area.length === 2) {
                oParams[oNowPickerVal.area[0]] = oNowPickerVal.area[1]
            } else if (oNowPickerVal.area[2] === 'null') {
                oParams[oNowPickerVal.area[0]] = oNowPickerVal.area[1]
            } else {
                oParams[oNowPickerVal.area[0]] = oNowPickerVal.area[2]
            }

            // 放mode对应的数据到oParams中
            oParams.rentType = oNowPickerVal.mode[0]


            // 放price对应的数据到oParams中
            if (oNowPickerVal.price[0] === 'null') {
                oParams.price = 'null'
            } else {
                oParams.price = oNowPickerVal.price[0].split('|')[1]
            }

            // 放more对应的数据到oParams中
            oParams.more = aNowTagsVal.join(',');

            // 将最终的过滤参数传给父组件
            this.props.fnGetData(oParams);


            return {
                bShowPicker: false,
                bShowTags: false,
                sType: ''
            }

        })
    }

    render() {
        let {
            bShowPicker,
            bShowTags,
            aFilterBarData,
            sType,
            currentPickData,     //选择组件的数据
            cols,           //行数
            aTagsData,      //储存弹框二的数据
            oPickerVal,    // PicerView中三个类型选中值
            aTagsVal,       //侧边弹框的储存变量
            filterBarState   //控制文字高亮的变量
        } = this.state
        return (
            <>
                {/* 过滤条结构 */}
                <ul className="filter_list">
                    {
                        aFilterBarData.map(item => (
                            <li key={item.type} onClick={() => this.fnShowPop(item.type)} className={((sType === item.type) ? "current " : "") + ((filterBarState[item.type]) ? "active" : "''")}>
                                <span>{item.title}</span>
                                <i className="iconfont icon-xialajiantouxiangxia" ></i>
                            </li>
                        ))
                    }
                </ul>

                {/* 弹框一及背景 */}
                <div className={bShowPicker ? "slide_pannel pannel_in" : "slide_pannel pannel_out"}>
                    <div className="slide_comp">
                        <PickerView
                            data={currentPickData}
                            cascade={true}
                            cols={cols}
                            onChange={this.fnGetPickerVal}
                            value={oPickerVal[sType]}
                        />
                    </div>
                    <div className="slide_btns">
                        <span onClick={this.fnHidePop}>取消</span>
                        <b onClick={this.fnFormatParams}>确定</b>
                    </div>
                </div>
                <div className={bShowPicker ? "mask mask_in" : "mask mask_out"} onClick={this.fnHidePop}></div>

                {/* 弹框二和背景 */}
                <div className={bShowTags ? "tags_pannel tags_pannel_in" : "tags_pannel tags_pannel_out"}>
                    <div className="tags_list">
                        {
                            aTagsData.map((item, i) => (
                                <div key={i}>
                                    <h3>{item.title}</h3>
                                    <div className="ul_wrap">
                                        <ul>
                                            {
                                                item.data.map(val => <li className={(aTagsVal.includes(val.value)) ? "active" : ""} key={val.value} onClick={() => this.fnGetTagsVal(val.value)}>{val.label}</li>)
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="tags_btns">
                        <span onClick={this.fnHidePop} >取消</span>
                        <b onClick={this.fnFormatParams}>确定</b>
                    </div>
                </div>
                <div className={bShowTags ? "mask2 mask_in" : "mask2 mask_out"} onClick={this.fnHidePop}></div>
            </>
        )
    }
}

class Houselist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oCurrentCity: store.getState(),
            aHouseList: [{}],
            count: 0
        }
        this.unsubscribe = store.subscribe(this.fnStoreChange)
    }
    componentWillUnmount() {
        this.unsubscribe();
        this.setState = (state, callback) => {
            return;
        }
    }
    fnStoreChange = () => {
        this.setState({
            oCurrentCity: store.getState()
        }, () => {
            this.fnGetData({})
        })
    }
    componentDidMount() {
        this.fnGetData({})
        //这个值给下面无缝下拉用
        this.params = {};
    }
    fnGetData = async (params) => {
        // 存储传入的参数到this.params上
        this.params = params;
        Toast.loading('加载中...', 0)
        let oRes = await this.axios.get('/houses', {
            params: {
                ...params,
                cityId: this.state.oCurrentCity.value,
                start: 1,
                end: 20
            }
        });
        Toast.hide();
        this.setState({
            aHouseList: oRes.data.body.list,
            count: oRes.data.body.count
        }, () => {
            //在数据存放等操作成功后，在调用list组件中的方法
            this.list.scrollToRow(0);
        })
    }
    rowRenderer = ({ key, index, style }) => {
        // 通过传入的索引值index去到aCityKey数组中拿到对应的字母
        let item = this.state.aHouseList[index];

        // 如果item是undefined( 如果数据还没请求回来 )
        if (!item) {
            return <div className="reload" key={key} style={style}><div>加载中...</div></div>
        }

        return (
            <div className="house_wrap" key={key} style={style} onClick={() => this.props.history.push('/detail/' + item.houseCode)}>
                <div className="house_item">
                    <div className="imgWrap">
                        <img className="img" src={BASE_URL + item.houseImg} />
                    </div>
                    <div className="content">
                        <h3 className="title">{item.title}</h3>
                        <div className="desc">{item.desc}</div>
                        <div>
                            {
                                item.tags.map((val, i) => <span key={i} className={"tag tag" + i}>{val}</span>)
                            }
                        </div>
                        <div className="price">
                            <span className="priceNum">{item.price}</span> 元/月
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //({ index: number }): boolean
    isRowLoaded = ({ index }) => {
        return !!this.state.aHouseList[index];
    }

    // 定义列表滚动时加载更多行的方法,
    loadMoreRows = ({ startIndex, stopIndex }) => {
        // 组件传回来的数值再发送请求，数据在原始基础上再覆盖
        return this.axios.get('/houses', {
            params: {
                ...this.params,
                cityId: this.state.oCurrentCity.value,
                start: startIndex,
                end: stopIndex
            }
        }).then(data => {
            // console.log(data);
            this.setState(state => {
                return {
                    aHouseList: [...state.aHouseList, ...data.data.body.list]
                }
            })
        })
    }

    render() {
        let { count } = this.state;
        return (
            <div>
                <div className="list_title">
                    <span className="back iconfont icon-prev" onClick={() => this.props.history.goBack()}></span>
                    <Cityselect />
                    <i className="iconfont icon-ic-maplocation-o tomap" onClick={() => this.props.history.push('/map')}></i>
                </div>
                {/* 子组件调用父组件的时候，定义方法让子组件调用 */}
                <FilterBar fnGetData={this.fnGetData} />


                <div className="house_list_con">

                    <InfiniteLoader
                        isRowLoaded={this.isRowLoaded}
                        loadMoreRows={this.loadMoreRows}
                        rowCount={count}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <AutoSizer>
                                {({ height, width }) => (
                                    <List
                                        onRowsRendered={onRowsRendered}
                                        //list组件对象要拿出来放入this中，如果再次发送数据请求，则外部函数可调用list对象中的scrollToRow(0)达到返回第一条的效果
                                        ref={(list) => {
                                            // 将list对象绑定到this上
                                            this.list = list;
                                            // 将list对象通过registerChild方法也给到InfiniteLoader组件使用
                                            registerChild(list);
                                        }}
                                        width={width}
                                        height={height}
                                        rowCount={count}
                                        rowHeight={120}
                                        rowRenderer={this.rowRenderer}
                                    />
                                )}
                            </AutoSizer>
                        )}
                    </InfiniteLoader>
                    {
                        this.state.aHouseList.length === 0 && <div className="notfound">
                            <img src={notfound} alt="未找到" />
                            <p>啥都美优啊~</p>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Houselist;