import React, { useState } from "react";
import { navigate } from "@reach/router";
import { Panel, PanelHeader, Button } from "@vkontakte/vkui";

import { TemplatePage, AppVerified, Reviews } from "../../components";
import "./Home.scss";
import { dataTemplatePages } from "../../helpers";
import { AdminPanel } from "../index";
import { LoveIcon, SnowIcon } from "../../icons";
import { admins } from "../../constants";

const Home = ({
  id,
  go,
  snackbar,
  fetchedUser,
  setTemplatePage,
  templatePage,
  appID,
  openAlert,
  getButtonStats,
  getGroupId,
  getRandomImg,
  gotToken,
  getPlatform,
  appData,
}) => {
  const arrRainWeb = [20, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550];
  const arrRainMobile = [20, 50, 80, 110, 140, 170, 210, 240, 270, 300, 330];
  const arrResult = getPlatform === "web" ? arrRainWeb : arrRainMobile;

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается

    return result;
  }

  const rainItems = (number) =>
    arrResult.map((item) => {
      return (
        <span
          style={{
            position: "absolute",
            left: `${item}px`,
            top: `-${getRandomInt(20)}px`,
            animation: `${getRandom(6, 10)}s rain linear infinite`,
            opacity: "0.9",
          }}
        >
          <SnowIcon key={item} className="rain-anim" />
        </span>
      );
    });

  return (
    <div className="home">
      {appData?.snow && <div className="rain-container">{rainItems(1000)}</div>}

      {fetchedUser && (
        <>
          {admins.includes(fetchedUser.id) ? (
            <Button
              onClick={() => navigate("/admin-panel")}
              className="admin-btn"
            >
              Админ панель
            </Button>
          ) : (
            ""
          )}
        </>
      )}
      <div>
        {dataTemplatePages.map((item, index) => {
          if (item.name === templatePage) {
            return (
              <TemplatePage
                key={index}
                icon={item.icon}
                header={item.header}
                title={item.title}
                description={item.description}
                buttonName={item.buttonName}
                next={item.next}
                setTemplatePage={setTemplatePage}
                fn={item.fn && item.fn}
                name={item.name}
                appID={appID}
                getGroupId={getGroupId}
                openAlert={openAlert}
                fetchedUser={fetchedUser}
                getRandomImg={getRandomImg}
                gotToken={gotToken}
                getPlatform={getPlatform}
                appData={appData}
              />
            );
          }
        })}
      </div>

      <AppVerified />

      <Reviews />
    </div>
  );
};

export { Home };
