import React from "react";
import {
  ComposedChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

// 设置 Bar 图的形状
const CustomBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  return (
    <Rectangle
      {...props}
      radius={[20, 20, 0, 0]}
      fill={fill}
      x={x}
      y={y}
      width={width}
      height={height}
    />
  );
};

const AreaBarChart = ({ data }: { data: any }) => {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 80,
          bottom: 30,
          left: 20,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
            <stop offset="33%" stopColor="#818cf8" stopOpacity={0.4} />
            <stop offset="66%" stopColor="#60a5fa" stopOpacity={0.4} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.6} />
            <stop offset="33%" stopColor="#818cf8" stopOpacity={0.8} />
            <stop offset="66%" stopColor="#60a5fa" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" scale="point" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip contentStyle={{ color: "#94a3b8" }} />
        <Legend
          wrapperStyle={{
            fontSize: "24px",
            whiteSpace: "wrap",
          }}
          verticalAlign="top" // 设置图例垂直对齐方式为顶部
          align="right" // 设置图例水平对齐方式为右侧
        />
        <Area
          name="当日排产数量"
          dataKey="qutstanding" // 数据取决于哪个字段
          type="monotone"
          fill="url(#colorUv)"
          stroke="url(#colorUv)"
          strokeWidth={6}
        ></Area>
        <Bar
          name="当日完成数量"
          dataKey="completed" // 数据取决于哪个字段
          barSize={40}
          fill="url(#colorPv)"
          shape={<CustomBar></CustomBar>}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export { AreaBarChart };
