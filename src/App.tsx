/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import logo from "./logo.svg";
import "./App.css";
import { getBaseURLMatchPattern } from "../public/utils/helpers";
import { useEffect, useState } from "react";

const PAGELIST = "pageList";

function getLogo() {
  if (window.chrome) {
    return window.chrome.runtime.getURL(logo.toString());
  }
  return logo;
}

function addPageToStorage() {
  let currentUrl: string | undefined;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    //Be aware that `tab` is an array of Tabs
    currentUrl = tab[0].url;
  });
  let pageList: string[] = [];
  chrome.storage.sync.get([PAGELIST]).then((res) => {
    if (currentUrl) {
      if (res.pageList) {
        const newMatchPattern = getBaseURLMatchPattern(currentUrl);
        pageList = res.pageList;
        pageList.push(newMatchPattern);
      }
      pageList.push(getBaseURLMatchPattern(currentUrl));
      chrome.storage.sync.set({ pageList: pageList }).then(() => {
        console.log("new page list: ", pageList);
      });
    }
  });
}

function App() {
  const [pageList, setPageList] = useState<string[]>([]);

  useEffect(() => {
    fetchPageList();
  });

  function fetchPageList() {
    chrome.storage.sync.get([PAGELIST]).then((res) => {
      if (res.pageList) {
        setPageList(res.pageList);
      }
    });
  }

  function renderPageList() {
    return (
      <div className="page-list">
        <h1>Page List</h1>
        {pageList.map((page) => (
          <div className="page-item">{page}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>{renderPageList()}</div>
        <button onClick={addPageToStorage}>Add Page to Script</button>
      </header>
    </div>
  );
}

export default App;
