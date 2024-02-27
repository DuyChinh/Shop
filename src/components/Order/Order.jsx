import classes from "./Order.module.css"
import { useAuth0 } from "@auth0/auth0-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";
// import Location from "../Location/Location"
import Delivery from "../Delivery/Delivery";
import Loading from "../Loading/Loading"

function Order() {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  // const [addressUser, setAddressUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const addressUser = useSelector((state) => state.addressUser);
  const totalBill = useSelector((state) =>  state.totalBill);
  const showLocation = useSelector((state) => state.showLocation);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        try {
          const response = await axios.get(`${apiKey}/addresses/${user.sub}`);
          const data = response.data.data;
          dispatch({
            type: "SAVE_ADDRESS_ARR",
            payload: data,
          });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchData();
  });
  

  const handleExit = () => {
    dispatch({
      type: "SHOW_ORDER_STATUS",
      payload: false,
    });
    dispatch({
      type: "SHOW_LOCATION_STATUS",
      payload: false,
    });
    setShowForm(false);
  }

  const handleOrdered = () => {
    if(addressUser.length === 0) {
      toast.error("Bạn chưa thêm địa chỉ nhận hàng!");
      return;
    }
    setShowAlert(true);
    toast.success("Đặt hàng thành công!");
  }

  const handleShowAddForm = () => {
    setShowForm(true);
    dispatch({
      type: "SHOW_LOCATION_STATUS",
      payload: true,
    });
  }

  const handleChangeAddress = () => {
     dispatch({
       type: "SHOW_LOCATION_STATUS",
       payload: true,
     });
     setShowForm(true);
  }

  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className={classes.toggle}></div>

          {showAlert ? (
            <div className={classes.containerOrder}>
              <p style={{ fontSize: "4rem", textAlign: "center" }}>
                Cảm ơn quý khách đã đặt hàng!
              </p>
              <p style={{ fontSize: "1.8rem", textAlign: "center" }}>
                Chúng tôi sẽ giao hàng đến sớm nhất!
              </p>
              <button
                onClick={() => {
                  dispatch({
                    type: "SHOW_ORDER_STATUS",
                    payload: false,
                  });
                }}
                className={classes.btnOk}
              >
                Ok
              </button>
            </div>
          ) : showForm && showLocation ? (
            <Delivery />
          ) : (
            <div className={classes.containerOrder}>
              <div className="d-flex align-items-center justify-content-between p-3">
                <h2>Đặt hàng</h2>
                <p style={{ cursor: "pointer" }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="black"
                    fillOpacity="0.65"
                    className="exit"
                    onClick={handleExit}
                  >
                    <path d="M21.0001 4.14526L19.851 2.99609L11.9981 10.849L4.14526 2.99614L2.99609 4.14531L10.8489 11.9981L2.99647 19.8506L4.14564 20.9998L11.9981 13.1473L19.8506 20.9998L20.9998 19.8506L13.1473 11.9981L21.0001 4.14526Z"></path>
                  </svg>
                </p>
              </div>
              <div className={classes.addressRecieve}>
                <p style={{ color: "#FF512F" }}>
                  <FaMapMarkerAlt /> Địa chỉ nhận hàng
                </p>

                {addressUser.length > 0 ? (
                  addressUser.map((address, i) => {
                      if (address.delivery) {
                        return (
                          <div className="d-flex align-items-center gap-3" key={i}>
                            <p className={`${classes.infoUser}`}>
                              <strong>
                                {address.name} {address.phone}
                              </strong>{" "}
                              {address.address_detail}
                            </p>
                      
                            <p
                              className={`btn btn-info`}
                              style={{ fontSize: "1.3rem", color: "#fff" }}
                              onClick={() => {
                                handleChangeAddress()
                              }}
                            >
                              thay đổi
                            </p>
                          </div>
                        );
                      } else {
                        return null;
                      }
                  })
                ) : (
                  <button
                    onClick={() => {
                      handleShowAddForm();
                    }}
                    style={{ border: "1px solid #333", padding: "7px 10px" }}
                  >
                    <FaPlus /> Thêm địa chỉ
                  </button>
                )}
              </div>

              <div className={`${classes.pay}`}>
                <div className="d-flex align-items-center justify-content-between">
                  <p style={{ fontWeight: "500", color: "#ee4d2d" }}>
                    Phương thức thanh toán
                  </p>
                  <p style={{ fontSize: "1.6rem" }}>
                    <strong>Thanh toán khi nhận hàng</strong>
                  </p>
                </div>
                <hr />

                <div className="d-flex flex-column gap-1 align-items-start">
                  <div className="d-flex align-items-center gap-3">
                    <p>Tổng tiền hàng</p>
                    <p style={{ fontWeight: "500" }} className="">
                      {totalBill.toLocaleString("vi-VN")}
                      <span style={{ fontSize: "1.3rem", color: "#FF512F" }}>
                        đ
                      </span>
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <p>Phí vận chuyển</p>
                    <p style={{ fontWeight: "500" }} className="">
                      0
                      <span style={{ fontSize: "1.3rem", color: "#FF512F" }}>
                        đ
                      </span>
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <p>Tổng thanh toán</p>
                    <p style={{ fontWeight: "500" }} className="">
                      {totalBill.toLocaleString("vi-VN")}
                      <span style={{ fontSize: "1.3rem", color: "#FF512F" }}>
                        đ
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  handleOrdered();
                }}
                className={classes.btnOrder}
              >
                Đặt hàng
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Order