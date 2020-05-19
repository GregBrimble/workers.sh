import React from "react";
import Plot from "react-plotly.js";

export const ExampleAnalytics = () => (
  <Plot
    data={[
      {
        x: [0, 0.25, 0.5, 0.75, 0.9, 0.99, 0.999, 1],
        y: [380, 1054, 1535, 1843, 2303.4, 3113.2, 3638.56, 3815].map(
          (y) => y / 1000
        ),
        type: "scatter",
        name: "success",
        mode: "lines+markers",
        marker: { color: "rgb(5, 122, 85)" },
        line: { shape: "spline", smoothing: 1.3 },
      },
      {
        x: [0, 0.25, 0.5, 0.75, 0.9, 0.99, 0.999, 1],
        y: [201, 240.2, 609, 2800, 3732, 4678, 4800, 4900].map((y) => y / 1000),
        type: "scatter",
        name: "error",
        mode: "lines+markers",
        marker: { color: "rgb(208, 56, 1)" },
        line: { shape: "spline", smoothing: 1.3 },
      },
    ]}
    layout={{
      yaxis: {
        title: "CPU Time (ms)",
        range: [0, 5],
      },
      xaxis: { title: "Quantile" },
      showlegend: true,
    }}
    config={{ responsive: true, displaylogo: false }}
    style={{ width: "100%", height: 520 }}
  />
);
