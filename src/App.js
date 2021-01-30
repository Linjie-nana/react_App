import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import Layout from './pages/layout/layout'
import Map from './pages/map/map'
import Detail from './pages/detail/detail'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/layout" component={Layout} />
        <Route path="/map" component={Map} />
        <Route path="/detail/:houseCode" component={Detail} />

        {/* 重定向 */}
        <Redirect from="/" to="/layout" />
      </Switch>
    </HashRouter>
  )
}

export default App;
