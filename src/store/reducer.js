let reducer = (state={},action) => {
    //修改工单传进来得值
    if (action.type === "change_current_city") {
        //将最新得对象返回出去，替换原来得state
        return action.value
    }
    return state
}
export default reducer