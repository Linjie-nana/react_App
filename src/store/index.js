//导入创建数据管理中心
import { createStore } from 'redux'
import reducer from './reducer'

let store = createStore(reducer)
export default store