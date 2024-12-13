import React, { useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
// import Footer from "components/footer/Footer";
import routes from "routes";
import { Alert, Snackbar } from "@mui/material";
import { AlertContext } from "controller/context/alertContext";

export default function Admin(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [toggled, setToggled] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const { active, message, type } = useContext(AlertContext);

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const getActiveRoute = (routes: RoutesType[]): string | boolean => {
    let activeRoute = "Main Dashboard";
    routes.forEach((route) => {
      const path = `${route.layout}/${route.path}`;
      const match = matchPath({ path, end: true }, location.pathname);

      if (match) {
        setCurrentRoute(route.name);
      }
    });
    return activeRoute;
  };

  const getActiveNavbar = (routes: RoutesType[]): string | boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-screen w-full">
      <div
        className={`hide-scrollbar h-screen  overflow-y-auto ${
          !open && "md:min-w-[250px]"
        }`}
      >
        <Sidebar
          open={open}
          onClose={() => setOpen(!open)}
          toggled={toggled}
          setToggled={() => setToggled(!toggled)}
        />
      </div>
      {/* Navbar & Main Content */}
      <div className="h-screen w-full overflow-y-auto bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:pr-2`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(!open)}
              ontoggleSidenav={() => setToggled(!toggled)}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            {/* <div className="p-3">
              <Footer />
            </div> */}
          </div>
        </main>
      </div>
      <Snackbar
        open={active}
        autoHideDuration={3000}
        onClose={() => {}}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert
          severity={type}
          className="mx-3 my-3"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
