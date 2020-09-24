import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import {
  setDrinkOnUpdate,
  setDishOnUpdate,
  setBookingType,
  setBookingId,
  setDate,
  setStep,
  setPeopleAmount,
} from "../actions/actions";
import { useHistory } from "react-router-dom";
import "./BookingsPage.scss";

function BookingsPage({
  reducer,
  setDrinkOnUpdate,
  setDishOnUpdate,
  setBookingType,
  setBookingId,
  setDate,
  setStep,
  setPeopleAmount,
}) {
  let history = useHistory();

  const [numberOfBookings, setNumberOfBookings] = useState("");
  const [loadNewAmount, setLoadNewAmount] = useState(5);
  const [bookings, setBookings] = useState([]);
  const [bookingsToOutput, setBookingsToOutput] = useState([]);
  const [offlineBookings, setOfflineBookings] = useState([]);
  const [hasOfflineBookings, setHasOfflineBookings] = useState(false);

  useEffect(() => {
    if (reducer.offlineBookings.length > 0) {
      setOfflineBookings(reducer.offlineBookings);
      setHasOfflineBookings(true);
    }

    setNumberOfBookings(reducer.multipleBookings.length);
    setBookings(reducer.multipleBookings);
    setBookingsToOutput(reducer.multipleBookings.slice(0, 5));
  }, []);

  const handleBookingSelect = (data) => {
    console.log(data);
    data.drinks.map((drink) => setDrinkOnUpdate(drink.drink_info));
    setDishOnUpdate(data.dishes[0].externalDishId);
    setBookingId(data.id);
    setDate(data.startTime);
    setBookingType("updateBooking");
    setPeopleAmount(data.numberOfPeople);

    setStep(2);
    history.push("/order/dish");
  };

  const handleBookingDetails = async (id, obj) => {
    console.log(id);

    await fetch(
      `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${id}/dishes?dishes[0][dishId]=${obj.dish.idMeal}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      },
    );

    const drinksToPost = obj.drinks
      .map((drink, index) => `drinks[${index}][drinkId]=${drink}`)
      .join("&");

    await fetch(
      `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${id}/drinks?${drinksToPost}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      },
    )
      .then((res) => res.json())
      .then(() => {
        const offlineBookingsArr = JSON.parse(
          localStorage.getItem("offlineBookings"),
        );

        const filteredArr = offlineBookingsArr.filter(
          (booking) => booking.id !== obj.id,
        );

        localStorage.setItem("offlineBookings", JSON.stringify(filteredArr));

        setTimeout(async () => {
          setOfflineBookings(
            offlineBookings.filter((booking) => booking.id !== obj.id),
          );

          if (offlineBookings.length === 1) {
            setHasOfflineBookings(false);
          }

          await fetch(
            `
        https://krh-sundown.dev.dwarf.dk/api/bookings?filter[email]=${obj.email}&include=drinks,dishes,drinks.drinkInfo&sort=startTime`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
              },
            },
          )
            .then((res) => res.json())
            .then((data) => setBookingsToOutput(data));
        }, 540);
      });
  };

  const handleOfflineBookingSelect = async (obj) => {
    await fetch("https://krh-sundown.dev.dwarf.dk/api/user/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
      body: JSON.stringify({
        startTime: obj.startTime,
        numberOfPeople: obj.peopleAmount,
        email: obj.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleBookingDetails(data.bookingId, obj);
      });
  };

  const loadMoreBookings = () => {
    setTimeout(() => {
      if (loadNewAmount < numberOfBookings) {
        setLoadNewAmount(loadNewAmount + 3);
        setBookingsToOutput(bookings.slice(0, loadNewAmount));
      } else {
        setBookingsToOutput(bookings);
      }
    }, 2000);
  };

  return (
    <div className="page-wrapper pt-70">
      <div className="p-1">
        <h3>
          Bookings by <span className="red-text">{reducer.bookingEmail}</span>
        </h3>
      </div>

      {hasOfflineBookings ? (
        <div>
          <h5 className="red-text mt-1">
            <i className="fa fa-exclamation-triangle px-1" />
            You have incomplete bookings!
          </h5>
          <div className="p-1 offline-bookings-container">
            {offlineBookings.map((booking) => {
              return (
                <div className="offline-booking-entry">
                  <p>
                    {booking.peopleAmount} x {booking.dish.strMeal}
                  </p>
                  <p>{booking.drinks.length} drinks</p>
                  <p>{booking.peopleAmount} people</p>
                  <p>
                    <b>{booking.email}</b> <br /> {booking.startTime}
                  </p>
                  <div className="text-center">
                    <button
                      className="primary-home-btn"
                      onClick={() => handleOfflineBookingSelect(booking)}
                    >
                      SEND
                      <i className="fa fa-envelope" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="divider px-1" />
        </div>
      ) : (
        <></>
      )}

      <div className="p-1">
        <div className="table-header">
          <p class="id red-text">
            <b>Booking ID</b>
          </p>
          <p class="red-text">Start</p>
          <p class="red-text">End</p>
          <p class="red-text">People</p>
        </div>
        <InfiniteScroll
          pageStart={0}
          threshold={-50}
          loadMore={loadMoreBookings}
          hasMore={bookingsToOutput.length < numberOfBookings}
          loader={
            <div className="text-center" key={0}>
              <i className="fa fa-spinner mini-animation red-text"></i>
            </div>
          }
        >
          {bookingsToOutput.map((booking) => {
            return (
              <div className="booking-entry mt-2">
                <p className="logo-text booking-id">
                  <b>#{booking.id}</b>
                </p>
                <p>{booking.startTime}</p>
                <p>{booking.endTime}</p>
                <p>{booking.numberOfPeople}</p>
                <div className="text-center">
                  <button
                    onClick={() => handleBookingSelect(booking)}
                    className="primary-home-btn"
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  reducer: state.reducer,
});

export default connect(mapStateToProps, {
  setDrinkOnUpdate,
  setDishOnUpdate,
  setBookingType,
  setBookingId,
  setDate,
  setPeopleAmount,
  setStep,
})(BookingsPage);
