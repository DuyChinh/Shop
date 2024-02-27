import { useState } from "react";

import classes from "./Address.module.css";
import { useAuth0 } from "@auth0/auth0-react";

import { useDispatch } from "react-redux";
import axios from "axios";
import DOMPurify from "dompurify";
import PlacesAutocomplete from "react-places-autocomplete";
import toast from "react-hot-toast";
const apiKey = import.meta.env.VITE_API_KEY;


function Address() {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [province, setProvince] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [isInputEmpty, setInputEmpty] = useState(true);
  const [isInputDetailEmpty, setInputDetailEmpty] = useState(true);

  const [address, setAddress] = useState("");


  const handleBack = () => {
    dispatch({
      type: "SHOW_ADD_FORM_STATUS",
      payload: false,
    });
  };

  const handleSubmit = () => {
    if(!phone) {
      toast.error("Số điện thoại là bắt buộc phải điền!");
      return;
    }
    if (!addressDetail) {
      toast.error("Địa điểm cụ thể là bắt buộc phải điền!");
      return;
    }
    const info = {
      customer_id: user.sub,
      name: DOMPurify.sanitize(name),
      phone: DOMPurify.sanitize(phone),
      province: DOMPurify.sanitize(address),
      address_detail: DOMPurify.sanitize(addressDetail),
      delivery: false,
    };
    dispatch({
      type: "SAVE_ADDRESS",
      payload: info,
    });
    axios
      .post(`${apiKey}/addresses`, info)
      .then(() => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    dispatch({
      type: "SHOW_ADD_FORM_STATUS",
      payload: false,
    });
    dispatch({
      type: "SHOW_LOCATION_STATUS",
      payload: false,
    });
    toast.success("Thêm địa chỉ thành công!");
  };


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

  const handleSelectDetail = async (value) => {
    setAddressDetail(value);
    setInputDetailEmpty(true);
  };

  const handleChangeInputDetail = (inputValue) => {
    setAddressDetail(inputValue);
    if (inputValue.length > 0) {
      setInputDetailEmpty(false);
    } else {
      setInputDetailEmpty(true);
    }
  };

  const handleClick = () => {
    setInputEmpty(true);
    setInputDetailEmpty(true);
  };

  return (
    <div className={classes.formAdd}>
      <h3>Địa chỉ mới</h3>
      <form>
        <div
          className={`${classes.infoUser} d-flex align-items-center gap-3 mt-5`}
        >
          <input
            type="text"
            name="name"
            placeholder="Họ và tên..."
            className="w-45"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại..."
            className="w-45"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <PlacesAutocomplete
          value={address}
          onChange={handleChangeInput}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <div className={classes.locationAction}>
                <input
                  className={classes.locationInput}
                  {...getInputProps({
                    placeholder: "Phường/Xã, Quận/Huyện, Tỉnh/ Thành phố, ...",
                  })}
                />
                {/* <div className={classes.deleteAll} onClick={handleDelete}>
                <MdCancel />
              </div> */}
              </div>
              {isInputEmpty ? (
                ""
              ) : (
                <div className={classes.suggestionList} onClick={handleClick}>
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

        <PlacesAutocomplete
          value={addressDetail}
          onChange={handleChangeInputDetail}
          onSelect={handleSelectDetail}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <div className={classes.locationAction}>
                <input
                  className={`${classes.locationInput} mt-5 p-4`}
                  {...getInputProps({
                    placeholder: "Địa chỉ cụ thể...",
                  })}
                  required
                />
                {/* <div className={classes.deleteAll} onClick={handleDelete}>
                <MdCancel />
              </div> */}
              </div>
              {isInputDetailEmpty ? (
                ""
              ) : (
                <div className={classes.suggestionList} onClick={handleClick}>
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
        <div className={`mt-5 d-flex align-items-center gap-5`}>
          <button onClick={() => handleBack()}>Trở về</button>
          <button
            type="submit"
            style={{ background: "#3CA55C" }}
            onClick={() => handleSubmit()}
          >
            Hoàn thành
          </button>
        </div>
      </form>
    </div>
  );
}

export default Address;
