import React, { Component } from 'react';
import { Route,Link } from "react-router-dom";
import './layout.css'
//导入自定义组件
import Home from "../home/home"
import Houselist from '../houselist/houselist'
import News from '../news/news'
import User from '../user/user'
class Layout extends Component {
    render() {
        return (
            <div>
                {/* 定义子路由组件 */}
                <Route exact path="/layout" component={Home} />
                <Route path="/layout/houselist" component={Houselist} />
                <Route path="/layout/news" component={News} />
                <Route path="/layout/user" component={User} />
                <footer>
                    <ul>
                        {/* <li className="active">
                            <Link to="/layout" className="iconfont icon-home1"></Link>
                            <h4>首页</h4>
                        </li>
                        <li>
                            <Link to="/layout/houselist" className="iconfont icon-ziyuan"></Link>
                            <h4>找房</h4>
                        </li>
                        <li>
                            <Link to="/layout/news" className="iconfont icon-zixun"></Link>
                            <h4>资讯</h4>
                        </li>
                        <li>
                            <Link to="/layout/user" className="iconfont icon-wode"></Link>
                            <h4>我的</h4>
                        </li> */}
                        <CustomList to="/layout" exact={ true } label="首页" sClass="icon-home1" />
                        <CustomList to="/layout/houselist"  label="找房" sClass="icon-ziyuan" />
                        <CustomList to="/layout/news"  label="资讯" sClass="icon-zixun" />
                        <CustomList to="/layout/user"  label="我的" sClass="icon-wode" />
                    </ul>
                </footer>
            </div>
        );
    }
}

//自定义路由组件
function CustomList({to,exact,label,sClass}){
    return <Route
        path={to}
        exact={exact}
        children={({match}) => {
           return <li className={match?"active":""}>
                 <Link to={to} className={"iconfont "+sClass}></Link>
                 <h4>{label}</h4>
             </li>
        }}
    />
}
export default Layout;