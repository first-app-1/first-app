import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { AdminPanelMain } from "/";
import { NAME_PROJECT, NAME_PROJECT_LOWER_CASE } from "../../constants";

const AdminPanel = ({
  openAlert,
  snackbar,
  getButtonStats,
  getPlatform,
  getGroupId,
  allAppsData,
  getAllApps,
}) => {
  const [appId, setAppId] = useState("");
  const [btnUrl, setBtnUrl] = useState("");
  const [radioValue, setRadioValue] = useState(0);

  function editLinkGroup() {
    axios
      .post("https://ods-studio.ru/apps/edit", {
        appID: appId,
        link: btnUrl,
        snow: Boolean(radioValue),
      })
      .then(function (response) {
        if (response.data.error) {
          openAlert(response.data.error.message, "red");
        } else {
          openAlert("Вы успешны! >_<", "green");
          getAllApps();
        }
      })
      .catch(function (error) {});
  }

  function onChangeAction(e, type) {
    const value = e.target.value.trim();

    switch (type) {
      case "app-id":
        setAppId(value);
        break;
      case "btn-url":
        setBtnUrl(value);
        break;
      default:
        break;
    }
  }

  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    setRadioValue(e.target.value);
  };

  return (
    <div>
      <AdminPanelMain
        onChangeAction={onChangeAction}
        editLinkGroup={editLinkGroup}
        getButtonStats={getButtonStats}
        getPlatform={getPlatform}
        getGroupId={getGroupId}
        radioValue={radioValue}
        onChangeRadio={onChangeRadio}
        allAppsData={allAppsData}
      />
      {snackbar}
    </div>
  );
};

export { AdminPanel };
