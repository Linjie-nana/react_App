import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//全局样式重置
import './assets/css/reset.css'

//全局导入设置html文字大小的js,以便项目中使用rem单位
import './assets/js/set_root'

//全局导入iconfont文件
import './assets/css/iconfont.css'
//全局引入antd-mobile样式
import 'antd-mobile/dist/antd-mobile.css';

//导入axios
import axios from 'axios'

//导入基准路径
import { BASE_URL } from '../src/utils'
axios.defaults.baseURL=BASE_URL
//把axios对象实例挂载到组件原型
Component.prototype.axios = axios

ReactDOM.render( <App />,document.getElementById('root')
);

