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
});
