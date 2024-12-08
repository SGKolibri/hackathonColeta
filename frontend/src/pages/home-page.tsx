import Navbar from "../components/navbar/navbar";
import Home from "../assets/home.png";
import MapComponent from "../components/map/map";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center font-montserrat bg-[#ECECEC]">
        <div className="w-[80%] h-[100vh] gap-10 flex items-center justify-center ">
          <div className="w-full flex flex-col px-10 gap-5">
            <h1 className="text-4xl font-bold text-[#3E3E3E]">
              Bem-vindo ao EcoPonto.
            </h1>
            <label className="text-lg text-balance tracking-wide">
              Aqui, oferecemos uma maneira fácil de conectar você aos pontos de
              coleta de resíduos na sua cidade. Encontre locais próximos,
              aprenda a separar corretamente o lixo e faça parte de um movimento
              global por um planeta mais limpo e sustentável. Explore o mapa
              interativo, descubra dicas práticas e transforme sua atitude em um
              impacto positivo no meio ambiente.
            </label>
          </div>
          <div className="w-full flex">
            <img
              src={Home}
              alt="Home"
              className="w-[580px] h-[460px] shadow-md"
            />
          </div>
        </div>

        <div className="w-[100%] h-[100vh] bg-[#066C4A] flex flex-col items-center">
          <div className="w-3/4 text-[#ECECEC] py-10 gap-5 flex flex-col items-center tracking-wide">
            <h1 className="text-4xl font-semibold">
              Encontre pontos de coleta próximos a você
            </h1>
            <label className="text-lg text-center font-semibold">
              Utilize nosso mapa interativo para localizar pontos de coleta.
              Nossa plataforma é atualizada regularmente para garantir
              informações precisas e acessíveis.
            </label>
            <MapComponent />
          </div>
        </div>
      </div>
    </>
  );
}
