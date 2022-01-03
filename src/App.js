import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import bridge from "@vkontakte/vk-bridge";
import { Snackbar, Avatar } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "antd/dist/antd.css";
import { Icon16Done } from "@vkontakte/icons";
import { Icon16Cancel } from "@vkontakte/icons";

import "./styles/reset.sass";
import "./styles/panels.sass";
import "./styles/img.sass";

//constants
import { APP_ID } from "./constants";

import { Home, AdminPanel } from "./panels";
import axios from "axios";

window.globalURLSharing = {
  url: 0,
};

const App = () => {
  const [activePanel, setActivePanel] = useState("result-panel");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState();
  const [IMGresult, setIMGresult] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [getPlatform, setGetPlatform] = useState("");
  const [gotToken, setGotToken] = useState(false);
  const [getGroupId, setGetGroupId] = useState({});
  const [getButtonStats, setGetButtonStats] = useState({});
  const [appID, setAppID] = useState(APP_ID);
  const [templatePage, setTemplatePage] = useState("/");
  const [imgIndex, setImgIndex] = useState(null);
  const [appData, setAppData] = useState(null);
  const [allAppsData, setAllAppsData] = useState(null);
  const url = new URLSearchParams(document.location);

  const getAllApps = () => {
    axios
      .get("https://ods-studio.ru/apps/get")
      .then(function (response) {
        console.log("getAllApps response", response);
        setAllAppsData(response.data);
      })
      .catch(function (error) {});
  };

  const getAppById = () => {
    axios
      .get(`https://ods-studio.ru/apps/get/${APP_ID}`)
      .then(function (response) {
        console.log("getAppById response", response);
        setAppData(response.data);
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  // получение группы с сервера
  useEffect(() => {
    getAppById();
    getAllApps();
  }, []);

  useEffect(() => {
    // Определение ОС
    bridge.send("VKWebAppGetClientVersion").then((result) => {
      setGetPlatform(result.platform);
    });
  }, []);

  function openAlert(text, backgroundColor = "green") {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        duration="1000"
        layout="horizontal"
        onClose={() => setSnackbar(null)}
        before={
          <Avatar size={24} style={{ backgroundColor }}>
            {backgroundColor === "green" ? (
              <Icon16Done fill="#fff" width={14} height={14} />
            ) : (
              <Icon16Cancel fill="#fff" width={14} height={14} />
            )}
          </Avatar>
        }
      >
        {text}
      </Snackbar>
    );
  }

  function getRandomImg(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается

    globalURLSharing.url = result;
    setIMGresult(<div className={`icon${result}`}></div>);
    setImgIndex(result);
  }

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <Router>
      {fetchedUser && (
        <Home
          path="/landing"
          // path="/"
          fetchedUser={fetchedUser}
          go={go}
          setIMGresult={setIMGresult}
          getRandomImg={getRandomImg}
          getPlatform={getPlatform}
          openAlert={openAlert}
          snackbar={snackbar}
          templatePage={templatePage}
          setTemplatePage={setTemplatePage}
          appID={appID}
          getButtonStats={getButtonStats}
          getGroupId={getGroupId}
          imgIndex={imgIndex}
          appData={appData}
        />
      )}

      <AdminPanel
        path="/admin-panel"
        fetchedUser={fetchedUser}
        go={go}
        нфк
        openAlert={openAlert}
        snackbar={snackbar}
        getButtonStats={getButtonStats}
        getPlatform={getPlatform}
        getGroupId={getGroupId}
        allAppsData={allAppsData}
        getAllApps={getAllApps}
      />
    </Router>
  );
};

export default App;
