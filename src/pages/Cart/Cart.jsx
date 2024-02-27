import {useSelector, useDispatch } from "react-redux"
import classes from "./Cart.module.css"
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { PiCarThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import Header from "../../components/Header/Header";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";
const apiKey = import.meta.env.VITE_API_KEY;
import Login from "../Login/Login";
import Order from "../../components/Order/Order";

function Cart() {
  const { user, isAuthenticated } = useAuth0();

  const [loadingFetch, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const carts = useSelector((state) => state.carts);
  const showOrder = useSelector((state) => state.showOrder);

  // useEffect(() => {
  //   console.log(carts);
  //    for(const product of carts) {
  //     axios
  //       .patch(`${apiKey}/carts/${product.id}`, product)
  //       .then(() => {
  //         // console.log(response.data);
  //       })
  //       .catch((error) => {
  //         // console.error(error);
  //       });
  //    }
  // }, [carts]);

  useEffect(() => {
    const updateCarts = async () => {
      for (const product of carts) {
        try {
          await axios.patch(`${apiKey}/carts/${product.id}`, product);
          // console.log(response.data);
        } catch (error) {
          // console.error(error);
        }
      }
    };

    updateCarts();
  }, [carts]);

  useEffect(() => {
    async function fetchData() {
      try {
        if(isAuthenticated) {
          const response = await axios.get(`${apiKey}/carts/${user.sub}`);
          const data = response.data.data;
          dispatch({
              type: "UPDATE_CARTS_DATA",
              payload: data,
          });
        }
      } catch (error) {
        console.error(error);
      } 
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isAuthenticated]);

   useEffect(() => {
     getTotal();
   }, [carts]);
  
  const deleteCartItem = async(productId) => {
    const url = `${apiKey}/carts/${productId}`;
    await axios
      .delete(url)
      .then(() => {
        toast.success("Xóa thành công!");
      })
      .catch((error) => {
        console.error(error);
      });
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
  }

  const increaseAmount = (product) => {
  
    dispatch({
      type: "INCREASE_AMOUNT",
      payload: product.id,
    });

  };

  const decreaseAmount = (product) => {
    if(product.amount > 1) {
      product.amount -= 1;
      dispatch({
        type: "DECREASE_AMOUNT",
        payload: product.id,
      });
    }
    // getTotalMoney();

  };

  const getTotal = () => {
    let total = 0;
    carts.map((product) => {
      if(checkedItems.includes(product.id)) {
        total += product.price*product.amount;
      }
    });
    setTotal(total);
  }

  const getTotalMoney = (price) => {
    setTotal(total + price);
  }

  const handleChecking = (itemId, price, amount) => {
    if (checkedItems.includes(itemId)) {
      const updatedItems = checkedItems.filter((id) => id !== itemId);
      setCheckedItems(updatedItems);
      getTotalMoney(-price*amount);
    } else {
      setCheckedItems([itemId, ...checkedItems]);
      getTotalMoney(price*amount);
    }
  };

  const handleCheckAll = () => {
    setIsCheckedAll(!isCheckedAll);
  }

  useEffect(() => {
    let total = 0;
    if(isCheckedAll) {
      const arrChecked = carts.map((product) => {
        total += product.price*product.amount;
        return product.id;
      });
      setTotal(total);
      setCheckedItems(arrChecked);
    } else {
      setTotal(0);
      setCheckedItems([]);
    }
  }, [isCheckedAll]);

  const handleDeleteItem = async() => {
    await checkedItems.map((id) => {
      if(id) {
        deleteCartItem(id);
      }
    });
  }

  const handleOrder = () => {
    if(checkedItems.length === 0) {
      toast.error("Bạn chưa chọn sản phẩm nào!");
      return;
    }
    dispatch({
      type: "SHOW_ORDER_STATUS",
      payload: true,
    });
    const productsOrder = carts.filter((product) => checkedItems.includes(product.id));
    // console.log(productsOrder);
    dispatch({
      type: "ADD_PRODUCTS_ORDER",
      payload: productsOrder,
    });

    dispatch({
      type: "GET_TOTAL_BILL",
      payload: total,
    });
  }
    
  return (
    <div>
      {showOrder ? <Order /> : ""}
      {isAuthenticated ? (
        <div>
          {loadingFetch ? (
            <Loading />
          ) : (
            <div>
              <Header />
              {carts.length > 0 ? (
                <div className="">
                  <div className={`${classes.cartContainer}`}>
                    <input
                      type="checkbox"
                      className=""
                      checked={isCheckedAll}
                      onChange={() => {
                        handleCheckAll();
                      }}
                    />{" "}
                    Sản phẩm
                  </div>
                </div>
              ) : (
                ""
              )}
              {carts.map((product) => (
                <div key={product.id} className={classes.productItem}>
                  <div className={`${classes.cartContainer}`}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className={classes.mark}
                      checked={checkedItems.includes(product.id)}
                      onChange={() =>
                        handleChecking(
                          product.id,
                          product.price,
                          product.amount
                        )
                      }
                    />
                    <div className={`col-1 ${classes.cartImg}`}>
                      <Link to={`/products/${product.product_id}`}>
                        <img
                          src={product.src}
                          alt="product-img"
                          className={classes.productImg}
                        />
                      </Link>
                    </div>

                    <p className={`col-3 ${classes.title}`}>
                      <Link to={`/products/${product.product_id}`}>
                        {product.title}
                      </Link>
                    </p>

                    <div className={`col-2 ${classes.price}`}>
                      <p style={{ fontWeight: "500" }} className="">
                        {product.price.toLocaleString("vi-VN")}
                        <span style={{ fontSize: "1.3rem", color: "#FF512F" }}>
                          đ
                        </span>
                      </p>

                      <p
                        style={{
                          marginLeft: "8px",
                          fontSize: "1.5rem",
                          textDecoration: "line-through",
                        }}
                        className=""
                      >
                        {product.price_old.toLocaleString("vi-VN")}
                        <span
                          style={{
                            color: "#FF512F",
                          }}
                        >
                          đ
                        </span>
                      </p>
                    </div>

                    <div className={`col-2 ${classes.controls}`}>
                      <button
                        onClick={() => {
                          decreaseAmount(product);
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={product.amount}
                        readOnly={true}
                      />
                      <button
                        onClick={() => {
                          increaseAmount(product);
                        }}
                      >
                        +
                      </button>
                    </div>

                    <p
                      style={{ fontWeight: "500" }}
                      className={`col-2 ${classes.cartTotal}`}
                    >
                      {(product.price * product.amount).toLocaleString("vi-VN")}
                      <span style={{ fontSize: "1.3rem", color: "#FF512F" }}>
                        đ
                      </span>
                    </p>

                    <button
                      className={`col-1 ${classes.btnRemove}`}
                      onClick={() => {
                        deleteCartItem(product.id);
                      }}
                    >
                      <MdDelete />
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ height: "100px" }}></div>
              {carts.length !== 0 ? (
                <div className={classes.totalBill}>
                  <div className={`mx-auto ${classes.billContainer}`}>
                    <div
                      className={`d-flex aligns-item-center gap-3 text-white ${classes.billAction}`}
                    >
                      <p
                        onClick={() => {
                          handleCheckAll();
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        Chọn tất cả({carts.length})
                      </p>
                      <button
                        className="text-white"
                        onClick={() => {
                          handleDeleteItem();
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <p style={{ fontWeight: "500" }}>
                        Tổng thanh toán ({checkedItems.length} sản phẩm):{" "}
                        {total.toLocaleString("vi-VN")}
                        <span style={{ fontSize: "1.2rem", color: "" }}>đ</span>
                      </p>
                      <button
                        onClick={() => {
                          handleOrder();
                        }}
                        className={classes.billButton}
                      >
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={classes.totalEmpty}>
                  <AiOutlineShoppingCart style={{ fontSize: "6rem" }} />
                  <p className={classes.titleEmpty}>Giỏ hàng trống</p>
                  <Link to={"/"} className={classes.btnBack}>
                    <PiCarThin
                      style={{ marginRight: "7px", fontSize: "1.9rem" }}
                    />
                    MUA NGAY
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Cart