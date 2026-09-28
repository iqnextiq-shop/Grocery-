import { test, expect } from "@playwright/test";
const mobile = (name: string) => name === "mobile";
test("Bengali home, category navigation, WhatsApp and images", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "প্রতিদিনের প্রয়োজন",
  );
  await expect(page.locator(".catgrid .cat")).toHaveCount(12);
  await expect(page.locator(".whatsapp")).toHaveAttribute(
    "href",
    /^https:\/\/wa.me\/8801876892958\?text=/,
  );
  await expect(page.locator(".whatsapp")).toContainText(
    "এই ধরনের সাইট তৈরি করতে এখনি মেসেজ দিন।",
  );
  await page.locator(".catgrid .cat").first().click();
  await expect(page).toHaveURL(/category\/rice/);
  await expect(page.locator(".product")).toHaveCount(11);
  if (mobile(testInfo.project.name)) {
    expect(
      await page
        .locator(".productgrid")
        .evaluate(
          (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
        ),
    ).toBe(2);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.locator(".product").last().scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  expect(
    await page
      .locator(".product img")
      .evaluateAll((imgs) =>
        imgs.every((img) => (img as HTMLImageElement).naturalWidth > 0),
      ),
  ).toBeTruthy();
  expect(errors).toEqual([]);
});
test("variant cart persistence, wishlist, quantity and removing", async ({
  page,
}) => {
  await page.goto("/product/product-10");
  await page.getByRole("button", { name: "500 g ৳৬৫", exact: true }).click();
  await page
    .locator(".detail-actions")
    .getByRole("button", { name: "কার্টে যোগ করুন", exact: true })
    .click();
  await expect(page.locator(".toast")).toContainText("পণ্যটি কার্টে যোগ হয়েছে");
  await page.getByRole("button", { name: "2 kg ৳২৩৫", exact: true }).click();
  await page
    .locator(".detail-actions")
    .getByRole("button", { name: "কার্টে যোগ করুন", exact: true })
    .click();
  await page
    .getByRole("button", { name: "পছন্দের তালিকা", exact: true })
    .click();
  await page.goto("/cart");
  await expect(page.locator(".cartrow")).toHaveCount(2);
  await expect(page.locator(".summary .total")).toContainText("৳৩৭০");
  await page.reload();
  await expect(page.locator(".cartrow")).toHaveCount(2);
  await page
    .locator(".cartrow")
    .first()
    .getByRole("button", { name: "চিনি বাড়ান" })
    .click();
  await expect(page.locator(".summary .total")).toContainText("৳৪৩৫");
  await page
    .locator(".cartrow")
    .first()
    .getByRole("button", { name: "চিনি সরান" })
    .click();
  await expect(page.locator(".cartrow")).toHaveCount(1);
  await page.goto("/wishlist");
  await expect(page.locator(".product")).toHaveCount(1);
  await page.locator(".heart").click();
  await expect(
    page.getByText("আপনার পছন্দের পণ্যগুলো এখানে সংরক্ষণ করুন।"),
  ).toBeVisible();
});
test("search, empty state, sorting, budget, real filters and mobile sheet", async ({
  page,
}, testInfo) => {
  await page.goto("/shop?q=চাল");
  await expect(page.locator(".product")).toHaveCount(3);
  await page.getByRole("combobox", { name: "পণ্য সাজান" }).selectOption("low");
  await expect(page.locator(".pname").first()).toHaveText("বাসমতি চাল");
  await page
    .getByRole("textbox", { name: "তালিকায় পণ্য খুঁজুন" })
    .fill("zzzzz");
  await expect(
    page.getByText("দুঃখিত, আপনার খোঁজা পণ্যটি পাওয়া যায়নি।"),
  ).toBeVisible();
  await page
    .locator(".empty-results")
    .getByRole("button", { name: "ফিল্টার মুছুন", exact: true })
    .click();
  await expect(page.locator(".product")).toHaveCount(67);
  if (mobile(testInfo.project.name)) {
    await page.getByRole("button", { name: "ফিল্টার", exact: true }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  }
  const filters = page.locator(
    mobile(testInfo.project.name) ? ".mobile-filters" : ".filters",
  );
  await filters
    .getByLabel(
      mobile(testInfo.project.name) ? "মোবাইল ব্র্যান্ড" : "ডেস্কটপ ব্র্যান্ড",
      { exact: true },
    )
    .selectOption("স্নিগ্ধা");
  await expect(page.locator(".product")).toHaveCount(9);
  await filters
    .getByLabel(
      mobile(testInfo.project.name) ? "মোবাইল স্টকে আছে" : "ডেস্কটপ স্টকে আছে",
      { exact: true },
    )
    .check();
  await expect(page.locator(".product")).toHaveCount(8);
  await filters
    .getByLabel(
      mobile(testInfo.project.name)
        ? "মোবাইল সর্বোচ্চ দাম"
        : "ডেস্কটপ সর্বোচ্চ দাম",
      { exact: true },
    )
    .fill("100");
  await expect(page.locator(".product")).toHaveCount(4);
  if (mobile(testInfo.project.name)) await page.keyboard.press("Escape");
  await page.goto("/shop?budget=0");
  const prices = await page.locator(".product .price").allTextContents();
  expect(prices.length).toBeGreaterThan(10);
  for (const price of prices) {
    const match = price.match(/৳([০-৯,]+)/)!;
    const n = Number(
      match[1]
        .replace(/,/g, "")
        .replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d).toString()),
    );
    expect(n).toBeLessThanOrEqual(100);
  }
});
test("combo contents and savings, free delivery and disabled stock", async ({
  page,
}) => {
  await page.goto("/product/combo-101");
  await expect(page.locator(".detail-price")).toContainText("৳৬৯৮");
  await expect(page.locator(".detail-price .old")).toContainText("৳৭৬৮");
  await expect(page.locator(".thumbnails button")).toHaveCount(4);
  await page
    .locator(".detail-actions")
    .getByRole("button", { name: "কার্টে যোগ করুন", exact: true })
    .click();
  await page.goto("/cart");
  await page
    .getByRole("button", { name: "পরিবারের সাপ্তাহিক বাজার বাড়ান" })
    .click();
  await page
    .getByRole("button", { name: "পরিবারের সাপ্তাহিক বাজার বাড়ান" })
    .click();
  await expect(page.locator(".delivery-progress")).toContainText(
    "ডেলিভারি ফ্রি",
  );
  await expect(page.locator(".summary .total")).toContainText("৳২,০৯৪");
  await page.goto("/product/product-59");
  await expect(
    page
      .locator(".detail-actions")
      .getByRole("button", { name: "কার্টে যোগ করুন", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "এখনই অর্ডার করুন", exact: true }),
  ).toBeDisabled();
});
test("location selection, quick order, validation, COD confirmation and cleared cart", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/product/product-10");
  await page
    .locator(
      mobile(testInfo.project.name) ? ".mobile-location button" : ".delivery",
    )
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("button", { name: "চট্টগ্রাম ৳১৩০", exact: true })
    .click();
  await page.getByRole("button", { name: "500 g ৳৬৫", exact: true }).click();
  await page
    .getByRole("button", { name: "এখনই অর্ডার করুন", exact: true })
    .click();
  await expect(page).toHaveURL("/checkout");
  await expect(page.locator(".summary .total")).toContainText("৳১৯৫");
  await page.getByLabel("নাম *", { exact: true }).fill("ডেমো ক্রেতা");
  await page.getByLabel("মোবাইল নম্বর *").fill("12345678901");
  await page.getByLabel("এলাকা *", { exact: true }).fill("পাঁচলাইশ");
  await page.getByLabel("সম্পূর্ণ ঠিকানা *").fill("ডেমো বাড়ি ১২, রোড ৪");
  await page.getByRole("button", { name: /অর্ডার নিশ্চিত করুন/ }).click();
  await expect(page.locator(".form-error")).toContainText("সঠিক ১১ সংখ্যার");
  await page.getByLabel("মোবাইল নম্বর *").fill("০১৭১২৩৪৫৬৭৮");
  await page.getByRole("button", { name: /অর্ডার নিশ্চিত করুন/ }).click();
  await expect(page).toHaveURL("/order-confirmation");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "সফলভাবে গ্রহণ",
  );
  await expect(page.locator(".order-details")).toContainText("500 g");
  await expect(page.locator(".order-details .total")).toContainText("৳১৯৫");
  await expect(page.locator(".cartpill b")).toHaveText("০");
  await page.reload();
  await expect(page.locator(".order-details")).toContainText("ডেমো ক্রেতা");
  await page.goto("/cart");
  await expect(page.getByText("আপনার কার্ট এখনো খালি।")).toBeVisible();
  expect(errors).toEqual([]);
});
test("all main routes render with no horizontal overflow or browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of [
    "/",
    "/shop",
    "/offers",
    "/fresh",
    "/collections/combos",
    "/collections/breakfast",
    "/category/healthy",
    "/wishlist",
    "/cart",
    "/checkout",
    "/about",
    "/faq",
    "/contact",
    "/account",
    "/policies",
    "/product/product-29",
  ]) {
    const res = await page.goto(route);
    expect(res?.status(), route).toBe(200);
    await page.waitForLoadState("networkidle");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBeTruthy();
  }
  expect(errors).toEqual([]);
});
