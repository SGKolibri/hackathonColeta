import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  InputBase,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Layout from "../components/layout/layout";
import { SetStateAction, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { pontosData as data } from "../data/pontosData";
import { useAuth } from "../utils/AuthProvider";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineAddBox } from "react-icons/md";
import MapComponent from "../components/map/map";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";

const darkishGrey = "#3E3E3E";

const transformedData = data.flatMap((day, dayIndex) =>
  day.Horários.flatMap((horario, horarioIndex) =>
    horario.Bairros.map((bairro, bairroIndex) => ({
      id: `${dayIndex}-${horarioIndex}-${bairroIndex}`,
      bairro,
      dia: day["Dia da Semana"],
      horario: horario.Horário,
    }))
  )
);

export default function PointsPage() {
  const { role } = useAuth();

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(transformedData);
  const [pageSize, setPageSize] = useState(10);

  const [bairro, setBairro] = useState("");
  const [dia, setDia] = useState("");
  const [horario, setHorario] = useState("");
  const [editing, setEditing] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (row: {
    bairro: SetStateAction<string>;
    dia: SetStateAction<string>;
    horario: SetStateAction<string>;
  }) => {
    if (editing) {
      setBairro(row.bairro);
      setDia(row.dia);
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
      transformedData.filter((row) =>
        row.bairro.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const columns: GridColDef[] = [
    {
      field: "bairro",
      headerName: "Bairro",
      flex: 1,
    },
    {
      field: "dia",
      headerName: "Dia da Semana",
      flex: 0.5,
    },
    {
      field: "horario",
      headerName: "Horário",
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
        <div className="h-full flex justify-center items-center">
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
                  handleClickOpen({ bairro: "", dia: "", horario: "" });
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
              sx={{
                border: "2px solid #3E3E3E", // Same border color as InputBase
                borderRadius: "10px", // Optional: same border radius as InputBase
                "& .MuiDataGrid-cell": {
                  borderColor: "#3E3E3E", // Same border color for cell borders
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderColor: "#3E3E3E", // Same border color for column headers
                },
              }}
            />
          </div>
        </div>
      </Layout>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <DialogContentText>
            <div className="w-full px-4 flex flex-col items-center gap-5 text-[#3E3E3E]">
              <h1 className="text-3xl font-semibold">Ponto de coleta</h1>
              <div className="w-full flex flex-col">
                <label className="font-semibold">Bairro</label>
                <TextField
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col">
                <label className="font-semibold">Dia da semana</label>
                <Select value={dia} onChange={(e) => setDia(e.target.value)}>
                  <MenuItem value="Segunda">Segunda</MenuItem>
                  <MenuItem value="Terca">Terça</MenuItem>
                  <MenuItem value="Quarta">Quarta</MenuItem>
                  <MenuItem value="Quinta">Quinta</MenuItem>
                  <MenuItem value="Sexta">Sexta</MenuItem>
                  <MenuItem value="Sabado">Sábado</MenuItem>
                  <MenuItem value="Domingo">Domingo</MenuItem>
                </Select>
              </div>
              <div className="w-full flex flex-col">
                <label className="font-semibold">Horário</label>
                <InputMask
                  mask="99h99"
                  value={horario}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setHorario(e.target.value)}
                >
                  {() => <TextField />}
                </InputMask>
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
                {editing
                  ? "Salvar ponto de coleta"
                  : "Adicionar ponto de coleta"}
              </Button>
            </div>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
