import { getBaseURLMatchPattern } from "../utils/helpers";

async function removePage(pageMatcher: string) {
    const pages = await getPageList();
    const newPages = pages.filter((page: string) => page !== pageMatcher);
    const res = await setPageList(newPages);
    return res;
}

async function getPageList() {
    const res = await chrome.storage.sync.get("pageList");
    return res.pageList;
}

async function setPageList(pages: string[]) {
    const res = await chrome.storage.sync.set({ pageList: pages });
    return res;
}

async function addNewPage(url: string) {
    // get match pattern
    const matchPattern = getBaseURLMatchPattern(url);
    const pages = await getPageList();
    // don't add duplicates
    if (pages.includes(matchPattern)) {
        return;
    }
    const newPages = [...pages, matchPattern];
    const res = await setPageList(newPages);
    return res;
}

async function getCurrentTabURL() {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab.url;
}

export const PagesService = {
    removePage,
    getPageList,
    setPageList,
    addNewPage,
    getCurrentTabURL,
}