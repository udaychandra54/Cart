import Cart from "./components/Cart/Cart";
import React from 'react';
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial=true;
function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending",
          message: "Sending cart Data",
        })
      );
      const response = await fetch(
        "https://react-http-7af79-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
      // const responseData = response.json();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success",
          message: "Sending cart Data success",
        })
      );
    };
    if(isInitial){
      isInitial=false;
      return;
    }
    sendCartData().catch((err) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: 'error',
          message: "Sending cart Data error",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {showCart && <Cart />}

        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
