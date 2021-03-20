import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../Main';
import Form from '../Form';


const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Main />
                </Route>
                <Route path='/create_invoice'>
                    <Form />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;