import { Fragment, useEffect } from "react";
import { Route } from 'react-router-dom'
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export const HomeTemplate = (props) => {
    const { Component, ...restProps } = props;
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const background = {
        backgroundImage: `url(${require('../../assets/Background/background.jpg')})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <Header {...propsRoute} />
            <div style={background} className="text-white body-font bg-slate-800">
                <Component {...propsRoute} />
            </div>
            <hr />
            <Footer {...propsRoute} />
        </Fragment>
    }} />
}