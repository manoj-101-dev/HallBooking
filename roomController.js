// Declarations for rooms and bookings arrays
let rooms = [];
let bookings = [];

// Sample data for rooms and bookings
rooms = [
  {
    roomId: "Room101",
    seatsAvailable: 10,
    amenities: ["Projector", "Whiteboard"],
    pricePerHour: 50,
    roomName: "Executive Suite",
    bookings: [
      {
        bookingId: generateId(),
        customerName: "David",
        date: "2023-12-10",
        startTime: "10:00 AM",
        endTime: "12:00 PM",
      },
    ],
  },
];

bookings = [
  {
    bookingId: generateId(), // Generating a unique booking ID
    customerName: "Chethan",
    date: "2023-12-12",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    roomId: rooms[0].roomId, // Linking the booking to a room using roomI
  },
];

// Function to generate a unique ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// API endpoint to create a room
export function createRoom(req, res) {
  const { seatsAvailable, amenities, pricePerHour } = req.body;
  const room = {
    roomId: generateId(),
    seatsAvailable,
    amenities,
    pricePerHour,
    bookings: [],
  };
  rooms.push(room);
  res.status(201).json(room);
}

// API endpoint to retrieve all rooms
export function getRooms(req, res) {
  res.json(rooms);
}
// API endpoint to create a booking
export function createBooking(req, res) {
  const { customerName, date, startTime, endTime, roomId } = req.body;
  const room = rooms.find((room) => room.roomId === roomId);

  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  const booking = {
    bookingId: generateId(),
    customerName,
    date,
    startTime,
    endTime,
  };

  room.bookings.push(booking);
  bookings.push(booking);
  res.status(201).json(booking);
}

// API endpoint to get all rooms with their bookings
export function getAllRoomsWithBookings(req, res) {
  const roomsWithBookings = rooms.map((room) => ({
    roomId: room.roomId,
    bookings: room.bookings.map((booking) => ({
      bookingId: booking.bookingId,
      customerName: booking.customerName,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookedStatus: "Booked", // Assuming a static status for all bookings
    })),
  }));

  res.json(roomsWithBookings);
}

// API endpoint to get all customers with their bookings
export function getAllCustomersWithBookings(req, res) {
  const customersWithBookings = bookings.map((booking) => ({
    customerName: booking.customerName,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
    roomId: booking.roomId,
  }));

  res.json(customersWithBookings);
}
// API endpoint to get customer booking details
export function getCustomerBookingDetails(req, res) {
  const customerBookingDetails = [];

  bookings.forEach((booking) => {
    const room = rooms.find((r) => r.roomId === booking.roomId);

    if (room) {
      customerBookingDetails.push({
        customerName: booking.customerName,
        roomName: room.roomName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking.bookingId,
        bookingDate: new Date().toISOString(), // Replace with actual booking date
        bookingStatus: "Confirmed", // Replace with actual booking status
      });
    }
  });

  res.json(customerBookingDetails);
}
