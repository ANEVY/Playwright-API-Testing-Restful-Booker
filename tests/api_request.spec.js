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
  test.only("Test3: Get booking by id", async ({ request }) => {
    const response = await request.get(`/booking/714`);
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    console.log(json);
  });
});
