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
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useApi from "../hooks/useApi";
import { useAuth } from "../utils/AuthProvider";

export default function LoginPage() {
  const { post } = useApi();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await post("/api/admins/login", { email, password });
      console.log(response);
      if (response.accessToken) {
        login(response);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full h-[100vh] flex bg-[#066C4A] items-center justify-center">
        <div className="w-[40%] h-[90%] flex flex-col items-center px-24 bg-[#ECECEC] rounded-[20px]">
          <div className="flex py-10">
            <img src={Logo} className="w-[116px] h-[114px]" />
          </div>
          <div className="w-full flex flex-col items-center gap-10">
            <div className="w-full flex flex-col gap-1">
              <label>Email</label>
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
            <div className="w-full flex flex-col">
              <label>Senha</label>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#066C4A",
                    borderWidth: "3px",
                    borderRadius: "10px",
                  },
                }}
              />
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center text-sm">
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography sx={{ fontSize: "14px" }}>
                        Lembrar senha
                      </Typography>
                    }
                  />
                </div>
                <div>
                  <Link to="/forgot-password">
                    <Typography sx={{ fontSize: "14px" }}>
                      Esqueceu a senha?
                    </Typography>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-3/4 flex flex-col gap-4 justify-center items-center ">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-[#3BA824] text-2xl font-bold text-white rounded-lg shadow-sm"
                onClick={handleLogin}
              >
                ENTRAR
              </motion.button>
              <Link to="/register">
                <Typography sx={{ fontSize: "14px" }}>
                  Não tem uma conta?&nbsp;
                  <label className="text-[#066C4A] cursor-pointer">
                    Cadastre-se
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
