import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { data } from "../restApi.json"

const Reservation = () => {

  const [dishOptions, setDishOptions] = useState(data[0].dishes)

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState();
  const [dishes, setDishes] = useState([{ name: "", quantity: 0 }]);
  const navigate = useNavigate();

  const handleDishChange = (index, field, value) => {
    const newDishes = [...dishes];
    newDishes[index][field] = value;
    setDishes(newDishes);
  };

  const addDish = () => {
    if (dishes.length < dishOptions.length) {
      setDishes([...dishes, { name: "", quantity: 0 }]);
    } else {
      toast.error("You've reached the maximum number of dishes.");
    }
  };

  const resetDishes = () => {
    setDishes([{ name: "", quantity: 0 }]);
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    console.log(dishes);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/reservation/send",
        { firstName, lastName, email, phone, date, time, dishes },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setPhone(0);
      setEmail("");
      setTime("");
      setDate("");
      setDishes([{ name: "", quantity: 0 }]);
      navigate("/success");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="res" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>
            <p>For Further Questions, Please Call</p>
            <form onSubmit={handleReservation}>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="date"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="time"
                  placeholder="Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="email_tag"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div style={{
                display: "flex",
                flexDirection: "column"
              }}>
                {dishes.map((dish, index) => (
                  <div key={index}>
                    <select name="Dishes"
                      style={{
                        outline: 'none',
                        border: '1px solid #3E2723',
                        borderRadius: '14px',
                        padding: '8px',
                        paddingRight: '11px',
                      }}
                      onChange={(e) => handleDishChange(index, "name", e.target.value)}
                      value={dish.name} // Set the value to the current dish name
                    >
                      <option value="" disabled>Choose a dish</option> {/* Disabled initial option */}
                      {dishOptions.map((option) => (
                        <option key={option.id} value={option.title}>{option.title}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={dish.quantity}
                      style={{ marginBottom: "0px" }}
                      onChange={(e) => handleDishChange(index, "quantity", e.target.value)}
                    />
                  </div>
                ))}
                <div>
                  <button
                    style={{
                      marginTop: "0px",
                    }}
                    type="button" onClick={addDish}>
                    Add Another Dish
                  </button>
                  <button style={{ marginTop: "0px" }} type="button" onClick={resetDishes}>
                    Reset Dishes
                  </button>
                </div>
              </div>
              <button type="submit">
                RESERVE NOW{" "}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div >
    </section >
  );
};

export default Reservation;
