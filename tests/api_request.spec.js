import { test, expect } from "@playwright/test";

test.describe.serial("API request", () => {
  //
  let token = "";
  let bookingId = 0;

  test.beforeAll(async ({ request }) => {
    const response = await request.post("/auth", {
      data: {
        username: "admin",
        password: "password123",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    token = json.token;
  });

  test("Test1: Get Booking ids", async ({ request }) => {
    const response = await request.get("/booking");
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.length).toBeGreaterThan(0);
  });
  test("Test2: Create Booking", async ({ request }) => {
    const response = await request.post("/booking", {
      data: {
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
    });
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.booking.firstname).toBe("John Haris");
    bookingId = json.bookingid;
  });
  test("Test3: Get booking by id", async ({ request }) => {
    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.firstname).toBeTruthy();
    expect(json.lastname).toBe("Doe");
  });
  test("Test4: Update Booking", async ({ request }) => {
    const response = await request.put(`/booking/${bookingId}`, {
      data: {
        firstname: "John Fries",
        lastname: "Doe",
        totalprice: 1114,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
    });
    const json = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(json.firstname).toBe("John Fries");
  });
  test("Test5: Delete Booking", async ({ request }) => {
    const response = await request.delete(`/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });
    expect(response.status()).toBe(201);
  });
  // Get booking with a non existing id
  test.only("Test6: Get booking with a non existing id", async ({
    request,
  }) => {
    const response = await request.get(`/booking/0`);
    expect(response.status()).toBe(404);
  });
});
