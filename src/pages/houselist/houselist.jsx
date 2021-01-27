import React, { Component } from 'react';
import Cityselect from '../../components/searchbar/searchbar';
import './houselist.css';

class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            ]
        }
    }

    // 定义显示弹框的方法
    fnShowPop = (sType) => {
        if (sType !== 'more') {
            this.setState({
                bShowPicker: true,
                bShowTags: false
            })
        } else {
            this.setState({
                bShowPicker: false,
                bShowTags: true
            })
        }
    }
    // 定义隐藏弹框的方法
    fnHidePop = () => {
        this.setState({
            bShowPicker: false,
            bShowTags: false
        })
    }

    render() {
        let {
            bShowPicker,
            bShowTags,
            aFilterBarData
        } = this.state
        return (
            <>
                {/* 过滤条结构 */}
                <ul className="filter_list">
                    {
                        aFilterBarData.map(item => (
                            <li key={item.type} onClick={() => this.fnShowPop(item.type)}>
                                <span>{item.title}</span>
                                <i className="iconfont icon-xialajiantouxiangxia"></i>
                            </li>
                        ))
                    }
                </ul>

                {/* 弹框一及背景 */}
                <div className={bShowPicker ? "slide_pannel pannel_in" : "slide_pannel pannel_out"}>
                    <div className="slide_comp">

                    </div>
                    <div className="slide_btns">
                        <span onClick={this.fnHidePop}>取消</span>
                        <b>确定</b>
                    </div>
                </div>
                <div className={bShowPicker ? "mask mask_in" : "mask mask_out"} onClick={this.fnHidePop}></div>

                {/* 弹框二和背景 */}
                <div className={bShowTags ? "tags_pannel tags_pannel_in" : "tags_pannel tags_pannel_out"}>
                    <div className="tags_list">
                        <h3>户型</h3>
                        <div className="ul_wrap">
                            <ul>
                                <li className="active">一室</li>
                                <li>二室</li>
                                <li>三室</li>
                                <li>四室</li>
                                <li>四室+</li>
                            </ul>
                        </div>
                        <h3>朝向</h3>
                        <div className="ul_wrap">
                            <ul>
                                <li>东</li>
                                <li>西</li>
                                <li>南</li>
                                <li>北</li>
                                <li>东南</li>
                                <li>东北</li>
                                <li>西南</li>
                                <li>西北</li>
                            </ul>
                        </div>
                        <h3>楼层</h3>
                        <div className="ul_wrap">
                            <ul>
                                <li>高楼层</li>
                                <li>中楼层</li>
                                <li>低楼层</li>
                            </ul>
                        </div>
                        <h3>房屋亮点</h3>
                        <div className="ul_wrap">
                            <ul>
                                <li>集中供暖</li>
                                <li>双卫生间</li>
                                <li>近地铁</li>
                                <li>近菜场</li>
                                <li>近公园</li>
                            </ul>
                        </div>
                    </div>
                    <div className="tags_btns">
                        <span onClick={this.fnHidePop} >取消</span>
                        <b>确定</b>
                    </div>
                </div>
                <div className={bShowTags ? "mask2 mask_in" : "mask2 mask_out"} onClick={this.fnHidePop}></div>
            </>
        )
    }
}

class Houselist extends Component {
    render() {
        return (
            <div>
                找房页面
                <div className="list_title">
                    <span className="back iconfont icon-prev" onClick={() => this.props.history.goBack()}></span>
                    <Cityselect />
                    <i className="iconfont icon-ic-maplocation-o tomap" onClick={() => this.props.history.push('/map')}></i>
                </div>
                <FilterBar />
            </div>
        );
    }
}

export default Houselist;