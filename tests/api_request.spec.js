import { test, expect } from "@playwright/test";
import { apidData } from "../data/api-data.js";

test.describe.serial("API request", () => {
  let token = "";
  let bookingId = 0;

  test.beforeAll(async ({ request }) => {
    const response = await request.post("/auth", {
      data: {
        username: apidData.username,
        password: apidData.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    console.log("===============BEFORE ALL==================");
    console.log("password:", apidData.password, apidData.username);

    console.log(json);

    token = json.token;
  });
  // Get Bookings
  test("Test1: Get Booking ids", async ({ request }) => {
    const response = await request.get("/booking");
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.length).toBeGreaterThan(0);
  });
  // Create Booking
  test("Test2: Create Booking", async ({ request }) => {
    const response = await request.post("/booking", {
      data: apidData.createBookingData,
    });
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.booking.firstname).toBe(apidData.createBookingData.firstname);
    bookingId = json.bookingid;
  });
  // Get Booking
  test("Test3: Get booking by id", async ({ request }) => {
    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(apidData.successfulStatusCode);
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.firstname).toBeTruthy();
    expect(json.lastname).toBe(apidData.createBookingData.lastname);
  });
  // Update Booking
  test("Test4: Update Booking", async ({ request }) => {
    console.log("=================================");

    console.log(bookingId);
    console.log(token);
    const response = await request.put(`/booking/${bookingId}`, {
      data: apidData.updateBookingData,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
    });
    const json = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(apidData.successfulStatusCode);
    expect(json.firstname).toBe(apidData.updateBookingData.firstname);
  });
  // Delete Booking
  test("Test5: Delete Booking", async ({ request }) => {
    const response = await request.delete(`/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });
    expect(response.status()).toBe(apidData.deleteBookingStatusCode);
  });
  // Get booking with a non existing id
  test("Test6: Get booking with a non existing id", async ({ request }) => {
    const response = await request.get(`/booking/${apidData.invalidBookingId}`);
    expect(response.status()).toBe(apidData.notFoundStatusCode);
  });
  // Update a booking that does not exist
  test("Test7: Update a booking that does not exist", async ({ request }) => {
    const response = await request.put(
      `/booking/${apidData.invalidBookingId}`,
      {
        data: {
          firstname: apidData.updateBookingData.firstname,
        },
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      }
    );
    expect(response.status()).toBe(apidData.badRequestStatusCode);
  });
  // Update existing booking without setting cookie or authorisation token
  test("Test8: Update existing booking without setting cookie or authorisation token", async ({
    request,
  }) => {
    const response = await request.put(`/booking/${bookingId}`, {
      data: {
        firstname: "John Fries",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response.status()).toBe(apidData.unauthorizedStatusCode);
  });
  //create new booking setting firstname to an integer rather than a string
  test("Test9: Create new booking setting firstname to an integer rather than a string", async ({
    request,
  }) => {
    const response = await request.post("/booking", {
      data: {
        firstname: apidData.invalidBookingData.firstname,
        lastname: apidData.createBookingData.lastname,
        totalprice: apidData.createBookingData.totalprice,
        depositpaid: apidData.createBookingData.depositpaid,
        bookingdates: {
          checkin: apidData.createBookingData.bookingdates.checkin,
          checkout: apidData.createBookingData.bookingdates.checkout,
        },
        additionalneeds: apidData.createBookingData.additionalneeds,
      },
    });
    expect(response.status()).toBe(apidData.serverErrorStatusCode);
  });
  //create new booking with an empty payload
  test("Test10: Create new booking with an empty payload", async ({
    request,
  }) => {
    const response = await request.post("/booking", {
      data: {},
    });
    expect(response.status()).toBe(apidData.serverErrorStatusCode);
  });
  //create new booking setting lastname to a number rather than a string
  test("Test11: Create new booking setting lastname to a number rather than a string", async ({
    request,
  }) => {
    const response = await request.post("/booking", {
      data: {
        firstname: apidData.createBookingData.firstname,
        lastname: apidData.invalidBookingData.lastname,
        totalprice: apidData.createBookingData.totalprice,
        depositpaid: apidData.createBookingData.depositpaid,
        bookingdates: {
          checkin: apidData.createBookingData.bookingdates.checkin,
          checkout: apidData.createBookingData.bookingdates.checkout,
        },
        additionalneeds: apidData.createBookingData.additionalneeds,
      },
    });
    expect(response.status()).toBe(apidData.serverErrorStatusCode);
  });
  // Create booking setting totalprice to a string rather than a number
  test("Test12: Create booking setting totalprice to a string rather than a number", async ({
    request,
  }) => {
    const response = await request.post("/booking", {
      data: {
        firstname: apidData.createBookingData.firstname,
        lastname: apidData.createBookingData.lastname,
        totalprice: apidData.invalidBookingData.totalprice,
        depositpaid: apidData.createBookingData.depositpaid,
        bookingdates: {
          checkin: apidData.createBookingData.bookingdates.checkin,
          checkout: apidData.createBookingData.bookingdates.checkout,
        },
        additionalneeds: apidData.createBookingData.additionalneeds,
      },
    });
    expect(response.status()).toBe(apidData.successfulStatusCode);
  });
});
