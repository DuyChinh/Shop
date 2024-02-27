import { useState, useEffect } from "react";
import PlacesAutocomplete, {
} from "react-places-autocomplete";
import { FaPlus } from "react-icons/fa6";
import classes from "./Delivery.module.css";
import { useDispatch, useSelector } from "react-redux";
import Address from "../Address/Address";
import { FaStar } from "react-icons/fa6";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
const apiKey = import.meta.env.VITE_API_KEY;

const Delivery = () => {
  const [address, setAddress] = useState("");
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [isInputEmpty, setInputEmpty] = useState(true);
  const showAddForm = useSelector((state) => state.showAddAddress);
  const infoUser = useSelector((state) => state.addressUser);

  // console.log(infoUser);
  const dispatch = useDispatch();

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
          // setLoading(false);
        }
      }
    }

    fetchData();
  }, [isAuthenticated]);

  const handleDeleteAddressItem = (id) => {
    dispatch({
      type: "REMOVE_FROM_ADDRESS",
      payload: id,
    });
    const url = `${apiKey}/addresses/${id}`;
    axios
      .delete(url)
      .then(() => {
        toast.success("Xóa thành công!");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleSelect = async (value) => {
    
    setAddress(value);
  };

  const handleChangeInput = (inputValue) => {
    setAddress(inputValue);
    if (inputValue.length > 0) {
      setInputEmpty(false);
    } else {
      setInputEmpty(true);
    }
  };

  const handleClick = () => {
    setInputEmpty(true);
  };

  const handleExit = () => {
    dispatch({
      type: "SHOW_LOCATION_STATUS",
      payload: false,
    })
  }


  const handleShowAddForm = () => {
    dispatch({
      type: "SHOW_ADD_FORM_STATUS",
      payload: true,
    });
  }

  const handleChooseAddressItem = async(index) => {
    console.log("infoUser", infoUser);
    console.log(infoUser[index]);
    let firstPos;
    let userAdd="";
    infoUser.map((user, index) => {
      if(user.delivery) {
        userAdd = user;
        firstPos = index;
      }
    });
    if(userAdd) {
      console.log(userAdd);
      userAdd.delivery = false;
      infoUser[index].delivery = true;
      infoUser[firstPos].delivery = false;
    }
    await axios.patch(`${apiKey}/addresses/${userAdd.id}`, userAdd);
    await axios.patch(
      `${apiKey}/addresses/${infoUser[index].id}`,
      infoUser[index]
    );


    
    dispatch({
      type: "SAVE_ADDRESS_ARR",
      payload: infoUser,
    });

    dispatch({
      type: "SHOW_LOCATION_STATUS",
      payload: false,
    });
  }

  return (
    <>
      <div onClick={handleClick}>
        <div className={classes.toggle}></div>

        {showAddForm ? (
          <Address />
        ) : (
          <div className={classes.location}>
            <div className={classes.headerLocation}>
              <p style={{ fontSize: "1.9rem" }}>Địa chỉ nhận hàng</p>
              {/* <GiCancel className={classes.exit}/> */}
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
            <PlacesAutocomplete
              value={address}
              onChange={handleChangeInput}
              onSelect={handleSelect}
            >
              {({ suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  {isAuthenticated ? (
                    <div className="mt-5" style={{ fontSize: "1.5rem" }}>
                      <p>Địa chỉ của tôi</p>

                      {infoUser.length > 0 &&
                        infoUser.map((user, index) => (
                          <div key={index} className={classes.addressItem}>
                            <p>
                              {user.delivery ? (
                                <FaStar style={{ color: "#FF512F" }} />
                              ) : (
                                <FaStar />
                              )}{" "}
                              {user?.name} || {user?.phone}
                            </p>
                            <p>{user?.address_detail}</p>
                            {user.delivery && (
                              <p
                                style={{
                                  width: "76px",
                                  padding: "3px 10px",
                                  border: "1px solid #F45C43",
                                  color: "#F45C43",
                                  fontSize: "1.3rem",
                                }}
                              >
                                Mặc định
                              </p>
                            )}
                            <button
                              style={{
                                color: "#fff",
                                background: "#EB3349",
                                padding: "5px 15px",
                                borderRadius: "5px",
                              }}
                              onClick={() => {
                                handleDeleteAddressItem(user?.id);
                              }}
                            >
                              <MdDelete /> Xóa
                            </button>
                            { user.delivery ? (
                              ""
                            ) : (
                              <button
                                style={{
                                  color: "#fff",
                                  background: "#3CD3AD",
                                  padding: "5px 15px",
                                  marginLeft: "10px",
                                  borderRadius: "5px",
                                }}
                                onClick={() => {
                                  handleChooseAddressItem(index);
                                }}
                              >
                                Chọn <FaStar style={{ color: "#FF512F" }} />
                              </button>
                            )}
                          </div>
                        ))}
                      <button
                        onClick={() => {
                          handleShowAddForm();
                        }}
                        style={{
                          border: "1px solid #333",
                          padding: "7px 10px",
                        }}
                      >
                        <FaPlus /> Thêm địa chỉ
                      </button>
                    </div>
                  ) : (
                    <p className="mt-5">
                      <button
                        style={{ color: "red" }}
                        onClick={() => loginWithRedirect()}
                      >
                        Đăng nhập
                      </button>{" "}
                      để thêm địa chỉ
                    </p>
                  )}
                  {isInputEmpty ? (
                    ""
                  ) : (
                    <div
                      className={classes.suggestionList}
                      onClick={handleClick}
                    >
                      {loading ? <div>...loading</div> : null}

                      {suggestions.map((suggestion, i) => {
                        return (
                          <div
                            className={classes.suggestionItem}
                            key={i + 1}
                            {...getSuggestionItemProps(suggestion)}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        )}
      </div>
    </>
  );
};

export default Delivery;
