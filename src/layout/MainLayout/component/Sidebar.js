import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

var listSideBar = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <SendIcon />,
  },
  {
    name: "Product",
    link: "/product",
    icon: <SendIcon />,
    open: true,
    subMenu: [
      {
        name: "Add Product",
        link: "/add-product",
        icon: <SendIcon />,
      },
      {
        name: "Dashboard",
        link: "/dashboard",
        icon: <SendIcon />,
      },
    ],
  },
  {
    name: "User",
    link: "/user",
    open: false,
    icon: <SendIcon />,
  },
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <SendIcon />,
  },
];

export default function Sidebar({drawOpen}) {
  const [data, setData] = useState(listSideBar);

  useEffect(() => {
    const newData = data.map((obj) => {
      if (!drawOpen) {
        return {...obj, open: false};
      }
      return obj;
    });
    setData(newData);
  }, [drawOpen]);

  const updateStatus = (index) => {
    const newData = data.map((obj, index2) => {
      if (index === index2) {
        const temp = obj.open && drawOpen;
        return {...obj, open: !temp};
      }
      return obj;
    });
    setData(newData);
  };

  return (
    <List
      sx={{width: "100%", maxWidth: 360, bgcolor: "background.paper"}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {data.map((item, index) =>
        !item?.subMenu ? (
          <Link key={index} to={item?.link}>
            <ListItemButton>
              <ListItemIcon>{item?.icon}</ListItemIcon>
              <ListItemText primary={item?.name} />
            </ListItemButton>
          </Link>
        ) : (
          <div key={index}>
            <ListItemButton onClick={() => updateStatus(index)}>
              <ListItemIcon>{item?.icon}</ListItemIcon>
              <ListItemText primary={item?.name} />
              {item?.open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={item?.open} timeout="auto" unmountOnExit>
              {item?.subMenu.map((sub) => (
                <Link to={sub?.link}>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                      <ListItemIcon>{sub?.icon}</ListItemIcon>
                      <ListItemText primary={sub?.name} />
                    </ListItemButton>
                  </List>
                </Link>
              ))}
            </Collapse>
          </div>
        )
      )}
    </List>
  );
}
