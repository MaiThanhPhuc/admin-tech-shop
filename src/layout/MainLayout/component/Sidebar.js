import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
var listSideBar = [
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: <DashboardOutlinedIcon />,
  },
  {
    name: 'Category',
    link: '/category',
    icon: <Inventory2OutlinedIcon />,
    open: true,
    subMenu: [
      {
        name: 'Add Category',
        link: '/add-category',
      },
      {
        name: 'List Category',
        link: '/list-category',
      },
    ],
  },
  {
    name: 'Quản lí sản phẩm',
    link: '/product',
    icon: <ShoppingCartOutlinedIcon />,
    open: true,
    subMenu: [
      {
        name: 'Thêm sản phẩm',
        link: '/add-product',
      },
      {
        name: 'Tất cả sản phẩm',
        link: '/list-product',
      },
      {
        name: 'Thống kê sản phẩm',
        link: '/report-product',
      },
    ],
  },
  {
    name: 'Cửa hàng',
    link: '/store',
    icon: <StorefrontOutlinedIcon />,
    open: false,
    subMenu: [
      {
        name: 'Thêm cửa hàng',
        link: '/add-store',
      },
      {
        name: 'Tất cả cửa hàng',
        link: '/list-store',
      },
      {
        name: 'Thống kê cửa hàng',
        link: '/report-store',
      },
    ],
  },
  {
    name: 'Tài chính',
    link: '/summary',
    icon: <AssessmentOutlinedIcon />,
    open: false,
    subMenu: [
      {
        name: 'Doanh thu',
        link: '/add-store',
      },
      {
        name: 'Phương thức thanh toán',
        link: '/list-store',
      },
    ],
  },
  {
    name: 'Phân tích bán hàng',
    link: '/summary',
    icon: <AssessmentOutlinedIcon />,
  },
  {
    name: 'Marketing',
    link: '/banner',
    icon: <TableChartOutlinedIcon />,
  },
  {
    name: 'Banner',
    link: '/banner',
    icon: <TableChartOutlinedIcon />,
  },
  {
    name: 'Người dùng',
    link: '/user',
    open: true,
    icon: <GroupOutlinedIcon />,
    subMenu: [
      {
        name: 'Thêm người dùng',
        link: '/add-user',
      },
      {
        name: 'Danh sách người dùng',
        link: '/list-user',
      },
    ],
  },
];

export default function Sidebar({ drawOpen }) {
  const [data, setData] = useState(listSideBar);

  useEffect(() => {
    const newData = data.map((obj) => {
      if (!drawOpen) {
        return { ...obj, open: false };
      }
      return obj;
    });
    setData(newData);
  }, [drawOpen]);

  const updateStatus = (index) => {
    if (!drawOpen) return;
    const newData = data.map((obj, index2) => {
      if (index === index2) {
        const temp = obj.open && drawOpen;
        return { ...obj, open: !temp };
      }
      return obj;
    });
    setData(newData);
  };

  return (
    <List
      sx={{
        padding: 0,
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        height: 'calc(100vh - 67px)',
      }}
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
                <Link to={item.link + sub?.link}>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>{sub?.icon}</ListItemIcon>
                      <ListItemText primary={sub?.name} style={{ fontSize: 12 }} />
                    </ListItemButton>
                  </List>
                </Link>
              ))}
            </Collapse>
          </div>
        ),
      )}
    </List>
  );
}
