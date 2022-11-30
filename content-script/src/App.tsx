/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import logo from "./logo.svg";
import "./App.css";
import { patternToRegExp } from "../../public/utils/helpers";

interface ITabWebsiteAccess {
  tabId: number;
  matchPattern: string;
  canAccess: boolean;
}

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
      <h1>Base Url2: {window.location.hostname} + {document.location.host}</h1>
    </div>
  );
}


function App() {
  const currentUrl = window.location.href;
  const instaMatcher = "https://*.instagram.com/*";
  const instaMatcherRegex = patternToRegExp(instaMatcher);
  const isInsta = instaMatcherRegex.test(currentUrl);
  console.log(isInsta);

  return <>{isInsta && getPageCover()}
  </>;

}

export default App;
