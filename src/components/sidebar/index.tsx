/* eslint-disable */

import { HiX } from "react-icons/hi";
import {
  Sidebar,
  Menu,
  MenuItem,
  MenuItemStyles,
  menuClasses,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";

import {
  MdHome,
} from "react-icons/md";
import React from "react";

const SidebarContainer = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
  toggled: boolean;
  setToggled: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const { open, onClose, toggled, setToggled } = props;
  const menuItemStyles: MenuItemStyles = {
    root: {
      // fontSize: "13px",
      // fontWeight: 400,
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({}),
    button: {
      [`&.${menuClasses.disabled}`]: {
      },
      "&:hover": {
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };
  const [openSubMenu, setOpenSubMenu] = React.useState(null);

  const handleSubMenuClick = (menuKey: string) => {
    if (openSubMenu === menuKey) {
      setOpenSubMenu(null); // Close the submenu if it's already open
    } else {
      setOpenSubMenu(menuKey); // Open the new submenu
    }
  };

  return (

    <Sidebar
      collapsed={open}
      toggled={toggled}
      breakPoint="md"
    >
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        className="bg-white dark:!bg-navy-800 dark:text-white"
      >
        <div className={`mx-[20px] mb-[50px] mt-[30px] flex items-center`}>
          <span
            className="absolute right-4 top-4 block cursor-pointer md:hidden"
            onClick={setToggled}
          >
            <HiX />
          </span>
          {!open && (
            <div className="ml-1 mt-1 h-2.5 font-poppins text-[22px] font-bold uppercase text-navy-700 dark:text-white">
              Buyerzcart
            </div>
          )}
        </div>
        <div style={{ flex: 1, marginBottom: "32px" }}>
      
          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem
              icon={<MdHome className="h-6 w-6" />}
              className="font-medium hover:bg-navy-200 hover:dark:text-brand-500"
              component={<Link to="/admin/default" />}
              onClick={() => handleSubMenuClick(null)}
            >
              Products
            </MenuItem>
          </Menu>

          <div
            style={{
              padding: "0 24px",
              marginBottom: "8px",
              marginTop: "32px",
            }}
          >
            {/* <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}
            >
              Extra
            </Typography> */}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default SidebarContainer;
