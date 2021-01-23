import { HashRouter, Route ,Redirect , Switch} from 'react-router-dom'
import Layout from './pages/layout/layout'
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/layout" component={Layout} />
        {/* 重定向 */}
        <Redirect from="/" to="/layout" />
      </Switch>
    </HashRouter>
  )
}

export default App;
