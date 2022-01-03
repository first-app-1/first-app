import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { navigate } from "@reach/router";
import { Button } from "antd";
import { RightOutlined } from "@ant-design/icons";

import { Timer, AppVerified } from "../index";
import "./TemplatePage.scss";

import { nativeAds } from "../../ads";
import { APP_IMG_SHARING_STORIES, APP_ID, NAME_PROJECT } from "../../constants";

const TemplatePage = ({
  icon,
  header,
  title,
  description,
  buttonName,
  setTemplatePage,
  name,
  next,
  fn,
  appID,
  getGroupId,
  openAlert,
  fetchedUser,
  getRandomImg,
  getPlatform,
  appData,
}) => {
  const [timer, setTimer] = useState("");
  const time = new Date();
  time.setSeconds(time.getSeconds() + 7200);

  return (
    <div className="container">
      <div className="container__icon">{icon}</div>
      <div className="container__main">
        <div className="header">{header}</div>
        <div className="title">
          {fetchedUser.first_name}, {title}
        </div>
        <div className="description">{description}</div>
      </div>

      <Timer expiryTimestamp={time} />

      <div className="buttons">
        {buttonName && appData?.link ? (
          <Button href={appData?.link} target="_blank">
            {buttonName}
            <RightOutlined />
          </Button>
        ) : (
          <Button>
            {buttonName}
            <RightOutlined />
          </Button>
        )}
      </div>
    </div>
  );
};

export { TemplatePage };
