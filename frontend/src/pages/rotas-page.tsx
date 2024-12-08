import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  InputBase,
  TextField,
} from "@mui/material";
import Layout from "../components/layout/layout";
import { SetStateAction, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { rotasData as data } from "../data/rotasData";
import { useAuth } from "../utils/AuthProvider";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineAddBox } from "react-icons/md";
import MapComponent from "../components/map/map";
import Swal from "sweetalert2";

const darkishGrey = "#3E3E3E";

export default function RotasPage() {
  const { role } = useAuth();

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [pageSize, setPageSize] = useState(10);

  const [area, setArea] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [horario, setHorario] = useState("");
  const [editing, setEditing] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (row: {
    area: SetStateAction<string>;
    diaSemana: SetStateAction<string>;
    horario: SetStateAction<string>;
  }) => {
    if (editing) {
      setArea(row.area);
      setDiaSemana(row.diaSemana);
      setHorario(row.horario);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    filterData();
  }, [search]);

  const filterData = async () => {
    setFilteredData(
      data.filter((row) =>
        row.area.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "area",
      headerName: "Área/area",
      flex: 1,
    },
    {
      field: "inicio",
      headerName: "Início",
      flex: 0.5,
    },
    {
      field: "termino",
      headerName: "Término",
      flex: 0.5,
    },
    {
      field: "diaSemana",
      headerName: "diaSemana da Semana",
      flex: 0.5,
    },
    {
      field: "pontosColeta",
      headerName: "Pontos de coleta",
      flex: 0.5,
    },
  ];

  if (role === "GESTOR") {
    console.log("GESTOR");
    columns.push({
      field: "actions",
      headerName: "",
      flex: 0.5,
      renderCell: (params) => (
        <div className="h-full flex justify-center items-center  ">
          <Button
            onClick={() => {
              setEditing(true);
              handleClickOpen(params.row);
            }}
          >
            <FaEdit fontSize={"24px"} color={darkishGrey} />
          </Button>
          <Button
            onClick={() => {
              Swal.fire({
                title: "Tem certeza?",
                text: "Você não poderá reverter isso!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#066C4A",
                cancelButtonColor: "#3E3E3E",
                confirmButtonText: "Sim, deletar!",
                cancelButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    "Deletado!",
                    "O ponto de coleta foi deletado.",
                    "success"
                  );
                }
              });
            }}
          >
            <MdDelete fontSize={"24px"} color={darkishGrey} />
          </Button>
        </div>
      ),
    });
  }

  const handleEdit = () => {
    console.log("Edit");
  };

  const handleSave = () => {
    console.log("Save");
  };

  return (
    <>
      <Layout>
        <div className="w-full h-full flex flex-col items-center font-sans tracking-wide">
          <div className="w-full flex justify-center items-center pt-16 gap-2">
            <InputBase
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              endAdornment={<IoIosSearch style={{ fontSize: "30px" }} />}
              className="w-[60%] py-2 bg-[#f4f4f4] rounded-[10px] px-4 border-2 border-[#3E3E3E]"
            />
            {role === "GESTOR" && (
              <Button
                onClick={() => {
                  setEditing(false);
                  handleClickOpen({ area: "", diaSemana: "", horario: "" });
                }}
              >
                <MdOutlineAddBox fontSize={"36px"} color={darkishGrey} />
              </Button>
            )}
          </div>
          <div className="w-[90%] flex justify-center py-10">
            <DataGrid
              rows={filteredData}
              columns={columns}
              paginationModel={{ pageSize, page: 0 }}
              onPaginationModelChange={(model) => setPageSize(model.pageSize)}
              pageSizeOptions={[10, 20, 30]}
            />
          </div>
        </div>
      </Layout>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <DialogContentText>
            <div className="w-full px-4 flex flex-col items-center gap-5 text-[#3E3E3E]">
              <h1 className="text-3xl font-semibold">Rotas e Horários</h1>
              <div className="w-full flex flex-col">
                <label className="font-semibold">Área/Bairro</label>
                <TextField
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
              <div className="w-full flex gap-2">
                <div className="w-full flex flex-col">
                  <label className="font-semibold">Início</label>
                  <TextField
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label className="font-semibold">Término</label>
                  <TextField
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex gap-2">
                <div className="w-full flex flex-col">
                  <label className="font-semibold">Dia da semana</label>
                  <TextField
                    value={diaSemana}
                    onChange={(e) => setDiaSemana(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label className="font-semibold">Horário</label>
                  <TextField
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex justify-center">
                <MapComponent />
              </div>
            </div>
          </DialogContentText>
          <DialogActions>
            <div className="w-full flex items-center justify-center py-1">
              <Button
                variant="contained"
                color="success"
                sx={{
                  padding: "10px 20px",
                }}
              >
                {editing ? "Salvar rota" : "Adicionar rota"}
              </Button>
            </div>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
