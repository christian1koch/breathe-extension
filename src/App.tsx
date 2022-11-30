/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import "./App.css";
import { getBaseURLMatchPattern } from "../utils/helpers";
import { useEffect, useState } from "react";
import { UrlList } from "./components/UrlList";
import { PagesService } from "../services/pages.service";
import { Button } from "antd";
import { FileAddOutlined } from "@ant-design/icons";

const PAGELIST = "pageList";

function App() {
  const [pageList, setPageList] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  // create a listener that listens to a new tab being selected
  chrome.tabs.onActivated.addListener(async () => {
    console.log("tab activated");
    const res = await PagesService.getCurrentTabURL();
    if (res) {
      setCurrentUrl(res);
    }
  });

  async function addPageToStorage() {
    await PagesService.addNewPage(currentUrl);
    await fetchPageList();
  }

  useEffect(() => {
    fetchPageList();
    PagesService.getCurrentTabURL().then((res) => {
      console.log(pageList);
      if (res) {
        setCurrentUrl(res);
      }
    });
  }, []);

  async function fetchPageList() {
    const res = await PagesService.getPageList();
    res && setPageList(res);
  }

  function renderPageList() {
    return (
      <div className="page-list">
        <h1>
          Page List{" "}
          <Button
            type="default"
            onClick={addPageToStorage}
            icon={<FileAddOutlined />}
          ></Button>
        </h1>
        <UrlList pageList={pageList} />
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>{renderPageList()}</div>
      </header>
    </div>
  );
}

export default App;
