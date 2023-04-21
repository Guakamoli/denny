import { Browser, Page } from "puppeteer";
import { PRIVATE_KEY } from "../data";
import { login, createBrowserAndPage, createGroupChat, updateGroupChatMeta } from "../utils";
describe("test private group change roon metadata", () => {
    let browser: Browser;
    let page: Page;
    beforeAll(async () => {
        const result = await createBrowserAndPage();
        browser = result.browser;
        page = result.page;
        await login(page, PRIVATE_KEY);
    });
    afterAll(async () => {
        await browser.close();
    });
    it(
        "create private group room",
        async () => {
            const roomName = `private room ${new Date().toISOString()}`;
            await createGroupChat(page, roomName, true);
        },
        900 * 1000,
    );
    it(
        "update private room meta",
        async () => {
            const roomName = `private new room name ${new Date().toISOString()}`;
            await updateGroupChatMeta(page, roomName);
        },
        9000 * 1000,
    );
});
