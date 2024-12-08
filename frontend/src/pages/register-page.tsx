import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="w-full h-[100vh] flex bg-[#066C4A] items-center justify-center">
        <div className="w-[40%] h-[90%] flex flex-col items-center px-24 bg-[#ECECEC] rounded-[20px]">
          <div className="flex pt-10 pb-3">
            <img src={Logo} className="w-[116px] h-[114px]" />
          </div>
          <div className="w-full flex flex-col items-center gap-6">
            <div className="w-full flex flex-col gap-1">
              <label className="font-semibold">Nome</label>
              <TextField
                type="name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#066C4A",
                    borderWidth: "3px",
                    borderRadius: "10px",
                  },
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="font-semibold">Email</label>
              <TextField
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#066C4A",
                    borderWidth: "3px",
                    borderRadius: "10px",
                  },
                }}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full flex flex-col">
                <label className="font-semibold">Senha</label>
                <TextField
                  type="password"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#066C4A",
                      borderWidth: "3px",
                      borderRadius: "10px",
                    },
                  }}
                />
              </div>
              <div className="w-full flex flex-col">
                <label className="font-semibold">Confirmar senha</label>
                <TextField
                  type="password"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#066C4A",
                      borderWidth: "3px",
                      borderRadius: "10px",
                    },
                  }}
                />
              </div>
            </div>
            <div className="w-3/4 flex flex-col gap-4 justify-center items-center ">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-[#3BA824] text-2xl font-bold text-white rounded-lg shadow-sm"
              >
                CADASTRAR
              </motion.button>
              <Link to="/login">
                <Typography sx={{ fontSize: "14px" }}>
                  Já possui uma conta?&nbsp;
                  <label className="text-[#066C4A] cursor-pointer">
                    Entrar
                  </label>
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
