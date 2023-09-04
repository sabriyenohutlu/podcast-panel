import { NavLink } from "react-router-dom";
import "./SidebarItem.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { IconButton } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const SidebarItem = ({ i }) => {
  //const [open, setOpen] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);

  /* const arrowClickHandler = () => {
    setOpen(true);
  };*/

  const nestLinkClickHandler = () => {
    setLinkClicked(false);
  };

  return (
    <div className="sidebarItem">
      <NavLink
        to={i.to}
        className={({ isActive }) =>
          isActive ? "sidebarItem-link active " : "sidebarItem-link "
        }
      >
        <div className="sidebarItem-link__icon">{i.icon}</div>
        <div className="sidebarItem-link__label">{i.label}</div>
      </NavLink>
      <div className="sidebarItem-nests">
        {open &&
          i.nested &&
          i.nest.map((i, idx) => {
            return (
              <div className="sidebarItem-nests__nest" key={idx}>
                <NavLink
                  onClick={nestLinkClickHandler}
                  className={({ isActive }) =>
                    isActive ? "nest-link active " : "nest-link"
                  }
                  to={i.to}
                >
                  <FiberManualRecordIcon className="icon"/>
                  {i.label}
                </NavLink>{" "}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SidebarItem;
