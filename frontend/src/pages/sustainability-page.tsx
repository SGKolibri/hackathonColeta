import Layout from "../components/layout/layout";
import RecycleBg from "../assets/green_recycle.png";

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, content }) => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
      {icon} {title}
    </h2>
    <div className="text-gray-700 text-lg leading-relaxed">{content}</div>
  </div>
);

export default function SustentabilityPage() {
  console.log("RecycleBg", RecycleBg);

  return (
    <>
      <Layout>
        <div className="w-full min-h-screen flex flex-col items-center font-sans tracking-wide">
          {/* Add your content here */}
          <div className="w-full h-full flex flex-col items-center justify-center pt-16">
            <h1 className="text-4xl font-bold text-center mb-6">
              Reduza, Reutilize e Recicle
            </h1>
            <div className="w-[80%] space-y-6">
              <Section
                title="Reduza, Reutilize e Recicle"
                icon="♻️"
                content="Evite desperdícios e adote os 3Rs: Reduza o consumo, reutilize embalagens e objetos sempre que possível, e recicle materiais como papel, plástico, vidro e metal."
              />
              <Section
                title="Economize Energia"
                icon="💡"
                content={
                  <>
                    <p>
                      Desligue aparelhos eletrônicos quando não estiverem em
                      uso.
                    </p>
                    <p>
                      Troque lâmpadas incandescentes por{" "}
                      <span className="font-semibold">LED</span>, que consomem
                      menos energia e duram mais.
                    </p>
                  </>
                }
              />
              <Section
                title="Economize Água"
                icon="💧"
                content={
                  <>
                    <p>
                      Feche a torneira enquanto escova os dentes ou lava louça.
                    </p>
                    <p>Instale redutores de vazão em torneiras e chuveiros.</p>
                  </>
                }
              />
              <Section
                title="Prefira Produtos Duráveis"
                icon="🛠️"
                content="Evite descartáveis, como talheres e copos plásticos. Opte por itens que tenham maior durabilidade, mesmo que custem um pouco mais."
              />
              <Section
                title="Priorize Transporte Sustentável"
                icon="🚴‍♂️"
                content={
                  <>
                    <p>
                      Use transporte público, bicicleta ou caminhe sempre que
                      possível.
                    </p>
                    <p>
                      Considere compartilhar caronas para reduzir a emissão de
                      gases poluentes.
                    </p>
                  </>
                }
              />
              <Section
                title="Consuma de Forma Consciente"
                icon="🛒"
                content={
                  <>
                    <p>Prefira produtos locais e de pequenos produtores.</p>
                    <p>
                      Reduza o consumo de carne e opte por alimentos orgânicos,
                      que têm menor impacto ambiental.
                    </p>
                  </>
                }
              />
              <Section
                title="Composte Resíduos Orgânicos"
                icon="🌿"
                content="Transforme restos de alimentos em adubo, reduzindo o volume de lixo enviado a aterros sanitários."
              />
              <Section
                title="Use Sacolas Reutilizáveis"
                icon="🛍️"
                content="Substitua sacolas plásticas por ecobags ao fazer compras."
              />
              <Section
                title="Cuide do Verde"
                icon="🌳"
                content="Plante árvores e cuide de áreas verdes. Apoie iniciativas de preservação ambiental na sua comunidade."
              />
              <Section
                title="Informe-se e Engaje-se"
                icon="📚"
                content={
                  <>
                    <p>
                      Aprenda mais sobre sustentabilidade e compartilhe
                      informações com amigos e familiares.
                    </p>
                    <p>
                      Participe de campanhas e ações ambientais na sua cidade.
                    </p>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
