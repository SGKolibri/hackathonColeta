import { Drawer } from "@mui/material";

import Logo from "../../assets/logo.png";
import { sup } from "framer-motion/client";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";

const drawerWidth = 240;

export default function Sidebar() {
  const { role } = useAuth();

  const location = useLocation();

  const linkPages: { [key: string]: string } = {
    home: "DASHBOARD",
    points: "PONTOS DE COLETA",
  };

  if (role === "GESTOR") {
    linkPages.routes = "ROTAS E HORÁRIOS";
    linkPages.support = "SUPORTE";
  } else {
    linkPages.sustentability = "SUSTENTABILIDADE";
    linkPages.support = "SUPORTE";
  }

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#066C4A",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div className="w-full flex flex-col items-center py-10 gap-10">
          <img src={Logo} alt="Logo" className="h-20 w-20" />
          <div className="w-full flex flex-col items-center gap-4">
            {Object.keys(linkPages).map((key) => (
              <Link
                key={key}
                to={`/${key}`}
                className={`w-[85%] flex justify-center items-center text-md font-bold py-2.5 rounded-xl
                   text-${
                     location.pathname === `/${key}` ? "[#066C4A]" : "[#ECECEC]"
                   } 
                bg-${
                  location.pathname === `/${key}` ? "[#ECECEC]" : "[#066C4A]"
                } hover:bg-${
                  location.pathname === `/${key}` ? "[#ECECEC]" : "[#066C4A]"
                } hover:text-${
                  location.pathname === `/${key}` ? "[#066C4A]" : "[#ECECEC]"
                } transition duration-300 ease-in-out
                `}
              >
                {linkPages[key as keyof typeof linkPages]}
              </Link>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
}
