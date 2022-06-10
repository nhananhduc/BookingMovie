import { Fragment, useEffect } from "react";
import { Redirect, Route } from 'react-router-dom'
import { USER_LOGIN } from "../../util/settings/config";
import Footer from "../HomeTemplate/Layout/Footer/Footer";
import HeaderCheckout from "./Layout/HeaderCheckout";


const CheckOutTemplate = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const { Component, ...restProps } = props;
    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login' />
    }

    const background = {
        backgroundImage: `url(${require('../../assets/Background/background.jpg')})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <HeaderCheckout {...propsRoute} />
            <div style={background} className="text-white body-font bg-slate-800">
                <Component {...propsRoute} />
            </div>
            <hr />
            <Footer {...propsRoute} />
        </Fragment>
    }} />
}

export default CheckOutTemplate;