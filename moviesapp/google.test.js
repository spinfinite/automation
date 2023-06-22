const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {

    driver = await new Builder().forBrowser(Browser.CHROME).build();

});

afterAll(async () => {

    await driver.quit();

})

describe('Test the Movie App', () => {

    const addMovie = async (movieTitle) => {
        await driver
            .findElement(By.css('input[name="movieTitle"]'))
            .sendKeys(movieTitle);
        await driver.findElement(By.css('button[type="submit"]')).click();
    };
    // call the function to create a movie as well as the test
    test("can mark a movie as watched", async () => {
        await driver.get("http://localhost:3000/");
        await addMovie("Mario Movie");
        const addedMovie = await driver.wait(
            until.elementLocated(By.css('#movies-list li')),1000
        );
        await addedMovie.findElement(By.css('input[type="checkbox"]')).
        click();

    });

    test('Test checkbox works', async () => {
        await driver.get('http://localhost:3000/')
        await driver.findElement(By.name('movieTitle')).sendKeys('Mario Movie', Key.RETURN);
        await driver.findElement(By.css('#movies-list li input')).click()
        await driver.sleep(1000)

    });

    test("can remove a movie", async () => {
        await driver.get("http://localhost:3000/");
        await addMovie("Mario Movie");
        const addedMovie = await driver.wait(
          until.elementLocated(By.css("#movies-list li")),
          1000
        );
        await addedMovie.findElement(By.css("button.delete-btn")).click();
        await driver.wait(until.stalenessOf(addedMovie), 1000);
      });




    //test()


        //const message = await driver.wait(until.elementLocated(By.id('message hide')))

        // expect(await message.innerHTML()).toBe("Watched Mario Movie")

        // const message = await driver.findElement(By.id('message')).isDisplayed()
        // await driver.sleep(2000)

        // expect(message).toBe(true)



    //})

})