import { CentralLimitGraph } from './CentralLimitGraph'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export const App = () => (
    <Router>
        <div>
            <h1>Graphs</h1>
            <div className="container">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/central-limit-theorem">Central Limit Theorem</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="container">
                <Route exact path="/" component={Home} />
                <Route path="/central-limit-theorem" component={CentralLimitGraph} />
            </div>
        </div>
    </Router>
)

const Home = () => (
    <h1>Home!</h1>
)
