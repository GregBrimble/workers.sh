import React, { useState } from "react";
import Plot from "react-plotly.js";
import { BigStatus } from "../BigStatus";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { LazyRender } from "../LazyRender";

const DEFAULT_HIDDEN_SERIES = ["p25", "p75", "p99", "p999"];

const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

const analyticsToSeries = (analytics: any, interval: string) => {
  const min = {
    x: [] as Date[],
    y: [] as number[],
    type: "scatter",
    name: "min",
    mode: "lines+markers",
    line: { shape: "spline", smoothing: 1.3 },
  };
  const p25 = {
    x: [] as Date[],
    y: [] as number[],
    type: "scatter",
    name: "p25",
    mode: "lines+markers",
    line: { shape: "spline", smoothing: 1.3 },
  };
  const p50 = {
    x: [] as Date[],
    y: [] as number[],
    type: "scatter",
    name: "p50",
    mode: "lines+markers",
    line: { shape: "spline", smoothing: 1.3 },
  };
  const p75 = {
    x: [] as Date[],
    y: [] as number[],
    type: "scatter",
    name: "p75",
    mode: "lines+markers",
    line: { shape: "spline", smoothing: 1.3 },
  };
  const p90 = {
    x: [] as Date[],
    y: [] as number[],
    type: "scatter",
    name: "p90",
    mode: "lines+markers",
    line: { shape: "spline", smoothing: 1.3 },
  };
  const p99 = {
    x: [] as Date[],
    y: [] as number[],
    type: "scatter",
    name: "p99",
    mode: "lines+markers",
    line: { shape: "spline", smoothing: 1.3 },
  };
  const p999 = {
    x: [] as Date[],
    y: [] as number[],
    type: "scatter",
    name: "p999",
    mode: "lines+markers",
    line: { shape: "spline", smoothing: 1.3 },
  };
  const max = {
    x: [] as Date[],
    y: [] as number[],
    type: "scatter",
    name: "max",
    mode: "lines+markers",
    line: { shape: "spline", smoothing: 1.3 },
  };
  const errors = {
    x: [] as Date[],
    y: [] as number[],
    type: "bar",
    yaxis: "y2",
    name: "errors",
    marker: {
      opacity: "0.4",
    },
  };
  const requests = {
    x: [] as Date[],
    y: [] as number[],
    type: "bar",
    yaxis: "y2",
    name: "requests",
    marker: {
      opacity: "0.4",
    },
  };
  const subrequests = {
    x: [] as Date[],
    y: [] as number[],
    type: "bar",
    yaxis: "y2",
    name: "subrequests",
    marker: {
      opacity: "0.4",
    },
  };
  const series = [
    min,
    p25,
    p50,
    p75,
    p90,
    p99,
    p999,
    max,
    errors,
    requests,
    subrequests,
  ];

  for (const analytic of analytics.sort(
    (a: any, b: any) =>
      new Date(a.dimensions[interval]).getTime() -
      new Date(b.dimensions[interval]).getTime()
  )) {
    min.y.push(analytic.min.cpuTime / 1000);
    p25.y.push(analytic.quantiles.cpuTimeP25 / 1000);
    p50.y.push(analytic.quantiles.cpuTimeP50 / 1000);
    p75.y.push(analytic.quantiles.cpuTimeP75 / 1000);
    p90.y.push(analytic.quantiles.cpuTimeP90 / 1000);
    p99.y.push(analytic.quantiles.cpuTimeP99 / 1000);
    p999.y.push(analytic.quantiles.cpuTimeP999 / 1000);
    max.y.push(analytic.max.cpuTime / 1000);
    errors.y.push(analytic.sum.errors);
    requests.y.push(analytic.sum.requests);
    subrequests.y.push(analytic.sum.subrequests);

    series.map((series) => series.x.push(analytic.dimensions[interval]));
  }

  for (const serie of series) {
    if (DEFAULT_HIDDEN_SERIES.includes(serie.name)) {
      (serie as any).visible = "legendonly";
    }
  }

  return series;
};

const maxTime = (analytics: any[]) =>
  Math.ceil(
    Math.max(
      ...analytics.map((analytic: any) => analytic.max.cpuTime / 1000),
      5
    )
  );

export const Analytics = () => {
  const { workerID: scriptID, accountID } = useParams();

  const now = new Date();
  const defaultDateFrom = new Date(now);
  defaultDateFrom.setDate(now.getDate() - 7);
  const [dateFrom, setDateFrom] = useState(defaultDateFrom);
  const [dateTo, setDateTo] = useState(now);
  const [interval, setInterval] = useState("date");
  const [hoveredInterval, setHoveredInterval] = useState(now);

  const { loading, error, data } = useQuery(
    gql`
  query($accountID: ID!, $scriptID: ID!, $filter: AnalyticsFilterInput!) {
    account(id: $accountID) {
      script(id: $scriptID) {
        analytics(filter: $filter, limit: 10000) {
          dimensions {
            ${interval}
          }
          min {
            cpuTime
          }
          quantiles {
            cpuTimeP25
            cpuTimeP50
            cpuTimeP75
            cpuTimeP90
            cpuTimeP99
            cpuTimeP999
          }
          max {
            cpuTime
          }
          sum {
            errors
            requests
            subrequests
          }
        }
      }
    }
  }
`,
    {
      variables: {
        accountID,
        scriptID,
        filter: {
          date_geq: dateFrom.toISOString().split("T")[0],
          date_lt: dateTo.toISOString().split("T")[0],
        },
      },
    }
  );

  const {
    loading: loadingCPUTime,
    error: errorCPUTime,
    data: dataCPUTime,
  } = useQuery(
    gql`
      query($accountID: ID!, $scriptID: ID!, $filter: AnalyticsFilterInput!) {
        account(id: $accountID) {
          script(id: $scriptID) {
            analytics(filter: $filter, limit: 10000) {
              dimensions {
                status
              }
              min {
                cpuTime
              }
              quantiles {
                cpuTimeP25
                cpuTimeP50
                cpuTimeP75
                cpuTimeP90
                cpuTimeP99
                cpuTimeP999
              }
              max {
                cpuTime
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        accountID,
        scriptID,
        filter: {
          date: hoveredInterval.toISOString().split("T")[0],
        },
      },
    }
  );

  return (
    <div className="w-full">
      <div className="px-12 pt-4 pb-8 bg-gray-50">
        <div className="grid grid-cols-1 col-gap-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="dateFrom"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              From
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="dateFrom"
                className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                type="date"
                value={dateFrom.toISOString().split("T")[0]}
                onChange={(event) => {
                  if (event.target.value) {
                    const duration =
                      dateTo.getTime() - new Date(event.target.value).getTime();
                    if (duration < SEVEN_DAYS && duration > 0)
                      setDateFrom(new Date(event.target.value));
                  }
                }}
                required={true}
              />
            </div>
          </div>
          <div className="mt-2 sm:mt-0 sm:col-span-3">
            <label
              htmlFor="dateTo"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              To
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="dateTo"
                className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                type="date"
                value={dateTo.toISOString().split("T")[0]}
                onChange={(event) => {
                  if (event.target.value) {
                    const duration =
                      new Date(event.target.value).getTime() -
                      dateFrom.getTime();
                    if (duration < SEVEN_DAYS && duration > 0)
                      setDateTo(new Date(event.target.value));
                  }
                }}
                required={true}
              />
            </div>
          </div>
          <div className="mt-2 sm:col-span-6">
            <label
              htmlFor="interval"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Interval
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <select
                id="interval"
                className="block form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                value={interval}
                onChange={(event) => {
                  if (event.target.value) {
                    setInterval(event.target.value);
                  }
                }}
                required={true}
              >
                <option value="date">Date</option>
                <option value="datetimeHour">Date {"&"} Hour</option>
                <option value="datetime">Timestamp</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <LazyRender
        loading={loading}
        error={error}
        data={data}
        render={(data) => {
          const { analytics } = data.account.script;

          const series = analyticsToSeries(
            JSON.parse(JSON.stringify(analytics)),
            interval
          ) as any;
          return (
            <Plot
              data={series}
              layout={{
                title: "CPU Time, Errors, Requests and Subrequests over Time",
                yaxis: {
                  title: "CPU Time (ms)",
                  range: [0, maxTime(analytics)],
                },
                yaxis2: {
                  title: "Count",
                  overlaying: "y",
                  side: "right",
                },
                barmode: "group",
                legend: { orientation: "h" },
              }}
              config={{ responsive: true }}
              style={{ width: "100%", height: 500 }}
              onClick={(click) => {
                if (click.points[0].x)
                  setHoveredInterval(new Date(click.points[0].x));
              }}
            />
          );
        }}
        name="Analytics"
      />
      <div className="px-12 pt-4 pb-8 bg-gray-50">
        <div className="grid grid-cols-1 col-gap-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="interval"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Date
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="dateTo"
                className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                type="date"
                value={hoveredInterval.toISOString().split("T")[0]}
                onChange={(event) => {
                  if (event.target.value) {
                    setHoveredInterval(new Date(event.target.value));
                  }
                }}
                required={true}
              />
            </div>
          </div>
        </div>
      </div>
      <LazyRender
        loading={loadingCPUTime}
        error={errorCPUTime}
        data={dataCPUTime}
        render={(data) => {
          const { analytics } = data.account.script;

          const series = analytics.map((analytic: any) => ({
            x: [0, 0.25, 0.5, 0.75, 0.9, 0.99, 0.999, 1],
            y: [
              analytic.min.cpuTime / 1000,
              analytic.quantiles.cpuTimeP25 / 1000,
              analytic.quantiles.cpuTimeP50 / 1000,
              analytic.quantiles.cpuTimeP75 / 1000,
              analytic.quantiles.cpuTimeP90 / 1000,
              analytic.quantiles.cpuTimeP99 / 1000,
              analytic.quantiles.cpuTimeP999 / 1000,
              analytic.max.cpuTime / 1000,
            ],
            type: "scatter",
            name: analytic.dimensions.status,
            mode: "lines+markers",
            line: { shape: "spline", smoothing: 1.3 },
          })) as any;

          return (
            <Plot
              data={series}
              layout={{
                title: `CPU Time by Status on ${
                  hoveredInterval.toISOString().split("T")[0]
                }`,
                yaxis: {
                  title: "CPU Time (ms)",
                  range: [0, maxTime(analytics)],
                },
                xaxis: { title: "Quantile" },
                showlegend: true,
              }}
              config={{ responsive: true }}
              style={{ width: "100%", height: 500 }}
            />
          );
        }}
        name="CPU Time"
      />
    </div>
  );
};
