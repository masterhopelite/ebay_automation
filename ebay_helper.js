import { expect } from "@playwright/test";

export class EbayHelper {
  constructor(page) {
    this.page = page;
  }

  /**
   * @param goto To invoke website ebay on browser
   */
  async invokeWebsite() {
    await this.page.goto("http://www.ebay.com/");
  }
  /**
   * Shopping through searching by category
   */
  async searchByCategory() {
    await this.page.locator("//button[@id='gh-shop-a']").click();
    await this.page.locator("//a[text()='Cell phones & accessories']").click();
    await this.page.locator("//a[text()='Cell Phones & Smartphones']").click();

    await this.page.waitForTimeout(5000);
    await this.page.locator("(//button[contains(@type,'button')])[2]").click();
  }
  /**
   * Adding filters to refine the search results
   */
  async addingFilter() {
    await this.page.waitForTimeout(5000);
    await this.page.locator("//span[text()='Screen Size']").click();
    await this.page
      .locator(
        "//input[@id='c3-subPanel-Screen%20Size_6%20in%20or%20More_cbx']"
      )
      .click();
    await this.page.locator("//div[@id='c3-mainPanel-price']").click();
    await this.page
      .locator("//input[@aria-label='Minimum Value, US Dollar']")
      .fill("50");
    await this.page
      .locator("//input[@aria-label='Maximum Value, US Dollar']")
      .fill("500");
    await this.page.locator("//span[text()='Item Location']").click();
    await this.page.locator("//input[@value='US Only']").click();
    await this.page.locator("//button[text()='Apply']").click();
  }
  /**
   * Verifying filters to assert the search results
   */
  async assertingFilter() {
    await this.page.locator("(//button[@type='button'])[5]").click();
    await expect(
      this.page.locator("(//span[@class='brm__item-label'])[1]")
    ).toContainText("Screen Size: 6 in or More");
    await expect(
      this.page.locator("(//span[@class='brm__item-label'])[2]")
    ).toContainText("Price: $50.00 to $500.00 filter applied");
    await expect(
      this.page.locator("(//span[@class='brm__item-label'])[3]")
    ).toContainText("Item Location: US Only filter applied");
  }
  /**
   * Change category and input the search
   */
  async inputSearchBar() {
    await this.page.locator("//input[@id='gh-ac']").fill("macbook");
    await this.page.locator("//select[@id='gh-cat']").click();
    await this.page.waitForTimeout(5000);
    await this.page.keyboard.press("ArrowDown");
    await this.page.locator("//input[@id='gh-btn']").click();
  }
  /**
   * Assert result name of the first search
   */
  async assertResultName() {
    await expect(
      this.page.locator("(//div[@class='s-item__info clearfix'])[2]")
    ).toContainText("Macbook");
  }
}
