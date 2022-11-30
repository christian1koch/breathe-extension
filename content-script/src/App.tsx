/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import logo from "./logo.svg";
import "./App.css";
import { patternToRegExp } from "../../utils/helpers";
import { useEffect, useState } from "react";

interface ITabWebsiteAccess {
  [tabId: number]: string[]; //matchPattern
}
function ignoreMatchPatternInTab(tabId: number, matchPattern: string) {
  chrome.storage.local.get(["tabWebsiteAccess"]).then((res) => {
    const tabWebsiteAccess: ITabWebsiteAccess = res.tabWebsiteAccess || {};
    const matchPatterns = tabWebsiteAccess[tabId] || [];
    const newMatchPatterns = matchPatterns.filter(
      (pattern) => pattern !== matchPattern
    );
    tabWebsiteAccess[tabId] = newMatchPatterns;
    chrome.storage.local.set({ tabWebsiteAccess });
  });
}

//TODO: think about moving this to a service 

function setShouldAccessWebsiteValue() {
  chrome.storage.session
    .set({ shouldAccessWebsite: true })
    .then(() => console.log("Value has been set to true"));
}
function getShouldAccessWebsiteValue() {
  chrome.storage.session
    .get(["shouldAccessWebsite"])
    .then((res) => console.log("Value in the session is: ", res));
}

function getPageCover() {
  return (
    <div className="page-cover">
      <button onClick={setShouldAccessWebsiteValue}>
        ShouldAccessWebsiteValue
      </button>
      <button onClick={getShouldAccessWebsiteValue}>Get Value</button>
      <h1>
        Base Url2: {window.location.hostname} + {document.location.host}
      </h1>
    </div>
  );
}

function App() {
  const url = window.location.href;
  const [pageList, setPageList] = useState<string[]>([]);

  useEffect(() => {
    fetchPageList();
  }, []);

  function fetchPageList() {
    chrome.storage.sync.get(["pageList"]).then((res) => {
      if (res.pageList) {
        setPageList(res.pageList);
      }
    });
  }
  function isUrlInPageList() {
    console.log("pageList: ", pageList);
    console.log("url: ", url);
    return pageList.some((pattern) => patternToRegExp(pattern).test(url));
  }

  return <>{isUrlInPageList() && getPageCover()}</>;
}

export default App;
