import { test, expect } from "@playwright/test";

test.describe("API request", () => {
  //
  let token = "";
  test("Test1:Create Authorization Token", async ({ request }) => {
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

  test("Test2: Get Booking ids", async ({ request }) => {
    const response = await request.get("/booking");
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    console.log(json);
    expect(json.length).toBeGreaterThan(0);
  });
  test("Test3: Get booking by id", async ({ request }) => {
    const response = await request.get(`/booking/714`);
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    console.log(json);
  });
  test.only("Test4: Create Booking", async ({ request }) => {
    const response = await request.post("/booking", {
      data: {
        firstname: "John",
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
    console.log(json);
  });
});
