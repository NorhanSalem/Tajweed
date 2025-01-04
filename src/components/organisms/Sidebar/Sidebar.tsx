import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  sidebarClasses,
  useProSidebar,
} from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuItem_TP, sideBarItems } from "../../../data/sidebar";
import { useIsRTL } from "../../../hooks/useIsRTL";

type OpenMenus_TP = {
  [key: string]: boolean;
  openSide: boolean;
};

export const SideBar = ({ isSidebarCollapsed, handleClickItem }: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = useIsRTL();
  const [opened, setOpened] = useState<OpenMenus_TP>({});
  const { collapseSidebar, collapsed } = useProSidebar();

  const path = location.pathname;

  const handleClickItemNavbr = () => {
    handleClickItem();
  };

  const goTo = (e: any, link: string) => {
    e.preventDefault();
    if (e.button === 0) {
      if (e.ctrlKey) {
        window.open(link, "_blank");
      } else {
        navigate(link);
      }
    } else if (e.button === 1) {
      window.open(link, "_blank");
    }
  };

  const findPathParentMenu = (path: string) => {
    var opened: OpenMenus_TP = {};
    sideBarItems.forEach((item: MenuItem_TP) => {
      if (item.link) {
        if (item.link === path) {
          opened[item.id] = true;
        }
      }
      if (item.items) {
        item.items.forEach((innerItem) => {
          if (innerItem.link) {
            if (innerItem.link === path) {
              opened[item.id] = true;
            }
          } else if (innerItem.items) {
            innerItem.items.forEach((innerInnerItem) => {
              if (innerInnerItem.link) {
                if (innerInnerItem.link === path) {
                  opened[item.id] = true;
                  opened[innerItem.id] = true;
                }
              }
            });
          }
        });
      }
    });
    return opened;
  };

  useEffect(() => {
    setOpened(findPathParentMenu(path));
  }, [path]);

  const isOpen = (id: string) => {
    if (collapsed) return false;
    return opened[id];
  };

  let activeSubmenuId: string | null = null;

  const handleMouseEnter = (id: string) => {
    // Get the submenu with the specified id
    const submenuContent = document.querySelector(`#submenu-${id}`);

    // Check if the submenu exists
    if (submenuContent) {
      // Add the "visible" class to the next sibling of the currently hovered submenu
      submenuContent.nextElementSibling?.classList.add("!visible");

      // Set the currently active submenu id
      activeSubmenuId = id;
    }

    // Get all submenus
    const submenus = document.querySelectorAll(`[id^=submenu-]`);

    // Iterate over all submenus to remove the "visible" class from the next siblings that are not the currently active submenu's next sibling
    submenus.forEach((submenu) => {
      if (
        submenu.id !== `submenu-${id}` &&
        submenu.id !== `submenu-${activeSubmenuId}`
      ) {
        submenu.nextElementSibling?.classList.remove("!visible");
      }
    });
  };

  const handleMouseLeave = (id: string) => {
    const submenuContent = document.querySelector(`#submenu-${id}`);

    if (submenuContent && id !== activeSubmenuId) {
      submenuContent.nextElementSibling?.classList.remove("!visible");
    }
  };

  const resetActiveSubmenu = () => {
    activeSubmenuId = null;
    const submenus = document.querySelectorAll(`[id^=submenu-]`);
    submenus.forEach((submenu) => {
      submenu.nextElementSibling?.classList.remove("!visible");
    });
  };

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown")) {
      resetActiveSubmenu();
    }
  });

  const generateItem = (Item: MenuItem_TP) => {
    if (Item?.heading) {
      return (
        <div className="sidebar-heading text-white">
          {!isSidebarCollapsed && t(Item.heading)}
        </div>
      );
    }
    return Item.items ? (
      <SubMenu
        defaultOpen={isOpen(Item.id)}
        key={Item.id}
        label={t(Item.label)}
        icon={<Item.icon size={15} />}
        id={`submenu-${Item.id}`}
        className="sherif ashraf"
        onMouseEnter={() => handleMouseEnter(Item.id)}
        onMouseLeave={() => handleMouseLeave(Item.id)}
        active={location.pathname === Item.link}
      >
        {Item.items.map((innerItem) => generateItem(innerItem))}
      </SubMenu>
    ) : (
      <>
        {Item.heading && (
          <div className="sidebar-heading">
            {!isSidebarCollapsed && t(Item.heading)}
          </div>
        )}

        <Link to={`${Item.link}`}>
          <MenuItem
            className={
              location.pathname === Item.link
                ? "font-bold text-white "
                : "font-bold text-mainBlack "
            }
            key={Item.id}
            onClick={(e) => {
              goTo(e, Item.link!);
              handleClickItemNavbr();
            }}
            icon={<Item.icon />}
            active={location.pathname === Item.link}
          >
            {t(Item.label)}
          </MenuItem>
        </Link>
      </>
    );
  };

  return (
    <Sidebar
      rtl={isRTL}
      collapsed={isSidebarCollapsed}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "red",
          transition: "all 250ms linear",
        },
      }}
    >
      <Menu>
        {sideBarItems.map((Item) =>
          Item.items ? (
            <SubMenu
              defaultOpen={isOpen(Item.id)}
              className={
                location.pathname === Item.link
                  ? "bg-LightGreen font-bold text-mainOrange"
                  : "font-bold text-mainBlack"
              }
              key={Item.id}
              label={t(Item.label)}
              icon={<Item.icon size={15} />}
              id={`submenu-${Item.id}`}
              onMouseEnter={() => handleMouseEnter(Item.id)}
              onMouseLeave={() => handleMouseLeave(Item.id)}
              active={location.pathname === Item.link}
            >
              {Item.items.map((innerItem) => generateItem(innerItem))}
            </SubMenu>
          ) : (
            generateItem(Item)
          )
        )}
      </Menu>
    </Sidebar>
  );
};
