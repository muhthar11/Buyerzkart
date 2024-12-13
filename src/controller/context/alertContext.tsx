import React, { createContext } from "react";

export const AlertContext = createContext(null);
export function AlertProvider({ children }: any) {
  const [alert, setAlert] = React.useState<any>({
    active: false,
    type: "error",
    message: "",
  });
  const { active, type, message } = alert;

  React.useEffect(() => {
    setTimeout(() => {
      if (alert.active) {
        setAlert((prevAlert: any) => ({
          ...prevAlert,
          active: false,
        }));
      }
    }, 2000);
  }, [alert]);

  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert,
        active,
        type,
        message,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}
