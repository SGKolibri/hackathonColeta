import { ResponsiveBar } from "@nivo/bar";
import PropTypes from "prop-types";

interface BarChartProps {
  isDashboard?: boolean;
  data: any[]; // Replace 'any' with the appropriate type if known
}

function BarChart({ isDashboard = false, data }: BarChartProps) {
  console.log(data);

  const aggregateDataByDay = (data: any) => {
    const aggregated = data.reduce(
      (
        acc: { [x: string]: any },
        curr: { diaSemana: any; pontosColeta: any }
      ) => {
        const { diaSemana, pontosColeta } = curr;
        acc[diaSemana] = (acc[diaSemana] || 0) + pontosColeta;
        return acc;
      },
      {}
    );

    return Object.keys(aggregated).map((day) => ({
      day,
      pontosColeta: aggregated[day],
    }));
  };

  const barChartData = aggregateDataByDay(data);

  return (
    <ResponsiveBar
      data={barChartData}
      keys={["pontosColeta"]}
      indexBy="day"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={() => "#066C4A"}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Dia da semana",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Pontos de coleta",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
    />
  );
}

BarChart.propTypes = {
  isDashboard: PropTypes.bool,
};

export default BarChart;
