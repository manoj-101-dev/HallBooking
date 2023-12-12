import express from "express";
import {
  createRoom,
  getRooms,
  createBooking,
  getAllRoomsWithBookings,
  getAllCustomersWithBookings,
  getCustomerBookingDetails,
} from "./roomController.js";

const app = express();

app.use(express.json());

app.post("/createRoom", createRoom);
app.get("/getRooms", getRooms);
app.post("/createBooking", createBooking);
app.get("/getAllRoomsWithBookings", getAllRoomsWithBookings);
app.get("/getAllCustomersWithBookings", getAllCustomersWithBookings);
app.get("/getCustomerBookingDetails", getCustomerBookingDetails);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
