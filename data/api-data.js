import dotenv from "dotenv";

if (process.env.NODE_ENV !== "ci") {
  dotenv.config();
}
export const apidData = {
  username: process.env.API_USERNAME,
  password: process.env.API_PASSWORD,
  createBookingData: {
    firstname: "John Haris",
    lastname: "Doe",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  },
  updateBookingData: {
    firstname: "Simon Haris",
    lastname: "Peter",
    totalprice: 311,
    bookingdates: {
      checkin: "2019-01-01",
      checkout: "2020-01-01",
    },
    additionalneeds: "Breakfast",
  },
  invalidBookingData: {
    firstname: 1233,
    lastname: 1233,
    totalprice: "111",
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  },
  successfulStatusCode: 200,
  serverErrorStatusCode: 500,
  notFoundStatusCode: 404,
  unauthorizedStatusCode: 403,
  deleteBookingStatusCode: 201,
  invalidBookingId: 0,
  badRequestStatusCode: 400,
};
