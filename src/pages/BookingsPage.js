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

  useEffect(() => {
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
                <button
                  onClick={() => handleBookingSelect(booking)}
                  className="primary-home-btn"
                >
                  Update
                </button>
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
