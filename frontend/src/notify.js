import React from "react";

export const notificationSettings = (message, type, icon = "ui-1_bell-53") => {
  const options = {
    place: "tc",
    message: (
      <div>
        <div>{message}</div>
      </div>
    ),
    type: type,
    icon: "now-ui-icons " + icon,
    autoDismiss: 7,
  };

  return options;
};
