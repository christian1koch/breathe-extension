/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import "./App.css";
import { getBaseURLMatchPattern } from "../utils/helpers";
import { useEffect, useState } from "react";
import { UrlList } from "./components/UrlList";
import { PagesService } from "../services/pages.service";
import { Button, ConfigProvider, Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

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
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#87e8de",
          },
        }}
      >
        <div className="header">
          <Collapse activeKey={"1"} style={{ minWidth: "300px" }}>
            <Panel
              showArrow={false}
              collapsible="icon"
              className="panel"
              header="Page List"
              key="1"
              extra={
                <Button
                  type="primary"
                  onClick={addPageToStorage}
                  icon={<PlusOutlined />}
                ></Button>
              }
            >
              <UrlList
                pageList={pageList}
                onRemoveTag={(page: string) => {
                  const newPageList = pageList.filter((p) => p !== page);
                  setPageList(newPageList);
                }}
              />
            </Panel>
          </Collapse>
        </div>
      </ConfigProvider>
    );
  }

  return <div className="popover-container">{renderPageList()}</div>;
}

export default App;
