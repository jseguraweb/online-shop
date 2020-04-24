import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import '../styles/App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import Cart from './Cart';
import Container from "./Container"
import Glasses from './Glasses';
import Sunglasses from './Sunglasses';

const App = () => {
    return (
        <Container>
            <BrowserRouter>
                <div className="app">
                    <header className="header">
                        <Link to="/"><h1 className="logo-blue">Mr <FontAwesomeIcon style={{ transform: `rotate(-90deg)`, marginRight: '-0.4rem' }} icon={faGlasses} />rilli</h1></Link>
                    </header>
                    <main>
                        <div className="dividing-box">
                            <div className="glasses">
                                <Link className="link-to-section" to="/glasses">
                                    <div className="circle circle-view">
                                        <h2>GLASSES</h2>
                                    </div>
                                </Link>
                            </div>
                            <div className="sunglasses">
                                <Link className="link-to-section" to="/sunglasses">
                                    <div className="light"></div>
                                    <div className="circle circle-sun">
                                        <h2>SUNGLASSES</h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
                <Switch>
                    <Route path="/glasses" component={Glasses} />
                    <Route path="/sunglasses" component={Sunglasses} />
                    <Route path="/cart" component={Cart} />
                </Switch>
            </BrowserRouter>
        </Container>
    );
}

export default App;