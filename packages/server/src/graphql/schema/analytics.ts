import gql from "graphql-tag";
import {
  GraphQLResolveInfo,
  DocumentNode,
  FieldNode,
  ValueNode,
  SelectionNode,
} from "graphql";
import { GraphQLOptions } from "../cloudflare";

export type Analytics = {
  avg?: {
    sampleInterval: number;
  };
  dimensions?: {
    date: Date;
    datetime: Date;
    datetimeHour: Date;
    scriptName: string;
    status: string;
  };
  max?: {
    cpuTime: number;
  };
  min?: {
    cpuTime: number;
  };
  quantiles?: {
    cpuTime25: number;
    cpuTime50: number;
    cpuTime75: number;
    cpuTime90: number;
    cpuTime99: number;
    cpuTime999: number;
  };
  sum?: {
    errors: number;
    requests: number;
    subrequests: number;
  };
};

type AnalyticsFilter = {
  AND?: AnalyticsFilter[];
  OR?: AnalyticsFilter[];
  date: Date;
  date_geq: Date;
  date_gt: Date;
  date_in: Date[];
  date_leq: Date;
  date_lt: Date;
  date_neq: Date;
  datetime: Date;
  datetime_geq: Date;
  datetime_gt: Date;
  datetime_in: Date[];
  datetime_leq: Date;
  datetime_lt: Date;
  datetime_neq: Date;
  datetimeHour: Date;
  datetimeHour_geq: Date;
  datetimeHour_gt: Date;
  datetimeHour_in: Date[];
  datetimeHour_leq: Date;
  datetimeHour_lt: Date;
  datetimeHour_neq: Date;
  status: string;
  status_geq: string;
  status_gt: string;
  status_in: string[];
  status_leq: string;
  status_like: string;
  status_lt: string;
  status_neq: string;
  status_notlike: string;
};

export type AnalyticsArguments = {
  filter: AnalyticsFilter;
  limit: number;
  orderBy: (
    | "avg_sampleInterval_ASC"
    | "avg_sampleInterval_DESC"
    | "date_ASC"
    | "date_DESC"
    | "datetimeHour_ASC"
    | "datetimeHour_DESC"
    | "datetime_ASC"
    | "datetime_DESC"
    | "max_cpuTime_ASC"
    | "max_cpuTime_DESC"
    | "min_cpuTime_ASC"
    | "min_cpuTime_DESC"
    | "quantiles_cpuTimeP25_ASC"
    | "quantiles_cpuTimeP25_DESC"
    | "quantiles_cpuTimeP50_ASC"
    | "quantiles_cpuTimeP50_DESC"
    | "quantiles_cpuTimeP75_ASC"
    | "quantiles_cpuTimeP75_DESC"
    | "quantiles_cpuTimeP90_ASC"
    | "quantiles_cpuTimeP90_DESC"
    | "quantiles_cpuTimeP999_ASC"
    | "quantiles_cpuTimeP999_DESC"
    | "quantiles_cpuTimeP99_ASC"
    | "quantiles_cpuTimeP99_DESC"
    | "scriptName_ASC"
    | "scriptName_DESC"
    | "stableId_ASC"
    | "stableId_DESC"
    | "status_ASC"
    | "status_DESC"
    | "sum_errors_ASC"
    | "sum_errors_DESC"
    | "sum_requests_ASC"
    | "sum_requests_DESC"
    | "sum_subrequests_ASC"
    | "sum_subrequests_DESC"
  )[];
};

export const typeDefs = gql`
  input AnalyticsFilterInput {
    AND: [AnalyticsFilterInput!]
    OR: [AnalyticsFilterInput!]
    date: Date
    date_geq: Date
    date_gt: Date
    date_in: [Date!]
    date_leq: Date
    date_lt: Date
    date_neq: Date
    datetime: DateTime
    datetime_geq: DateTime
    datetime_gt: DateTime
    datetime_in: [DateTime!]
    datetime_leq: DateTime
    datetime_lt: DateTime
    datetime_neq: DateTime
    datetimeHour: DateTime
    datetimeHour_geq: DateTime
    datetimeHour_gt: DateTime
    datetimeHour_in: [DateTime!]
    datetimeHour_leq: DateTime
    datetimeHour_lt: DateTime
    datetimeHour_neq: DateTime
    status: String
    status_geq: String
    status_gt: String
    status_in: [String!]
    status_leq: String
    status_like: String
    status_lt: String
    status_neq: String
    status_notlike: String
  }

  enum AnalyticsOrderByInput {
    avg_sampleInterval_ASC
    avg_sampleInterval_DESC
    date_ASC
    date_DESC
    datetimeHour_ASC
    datetimeHour_DESC
    datetime_ASC
    datetime_DESC
    max_cpuTime_ASC
    max_cpuTime_DESC
    min_cpuTime_ASC
    min_cpuTime_DESC
    quantiles_cpuTimeP25_ASC
    quantiles_cpuTimeP25_DESC
    quantiles_cpuTimeP50_ASC
    quantiles_cpuTimeP50_DESC
    quantiles_cpuTimeP75_ASC
    quantiles_cpuTimeP75_DESC
    quantiles_cpuTimeP90_ASC
    quantiles_cpuTimeP90_DESC
    quantiles_cpuTimeP999_ASC
    quantiles_cpuTimeP999_DESC
    quantiles_cpuTimeP99_ASC
    quantiles_cpuTimeP99_DESC
    scriptName_ASC
    scriptName_DESC
    stableId_ASC
    stableId_DESC
    status_ASC
    status_DESC
    sum_errors_ASC
    sum_errors_DESC
    sum_requests_ASC
    sum_requests_DESC
    sum_subrequests_ASC
    sum_subrequests_DESC
  }

  type AnalyticsAvg {
    sampleInterval: Float!
  }

  type AnalyticsDimensions {
    date: Date!
    datetime: DateTime!
    datetimeHour: DateTime!
    status: String!
  }

  type AnalyticsMax {
    cpuTime: Float!
  }

  type AnalyticsMin {
    cpuTime: Float!
  }

  type AnalyticsQuantiles {
    cpuTimeP25: Float!
    cpuTimeP50: Float!
    cpuTimeP75: Float!
    cpuTimeP90: Float!
    cpuTimeP99: Float!
    cpuTimeP999: Float!
  }

  type AnalyticsSum {
    errors: Int!
    requests: Int!
    subrequests: Int!
  }

  type Analytics {
    avg: AnalyticsAvg
    dimensions: AnalyticsDimensions
    max: AnalyticsMax
    min: AnalyticsMin
    quantiles: AnalyticsQuantiles
    sum: AnalyticsSum
  }
`;

const getVariable = (value: ValueNode, info: GraphQLResolveInfo) => {
  switch (value.kind) {
    case "Variable":
      return info.variableValues[value.name.value];
    case "NullValue":
      return null;
    case "ListValue":
      return value.values.map((value) => getVariable(value, info));
    case "ObjectValue":
      const objectValue = {};
      for (const field of value.fields) {
        objectValue[field.name.value] = getVariable(field.value, info);
      }
      return objectValue;
    case "IntValue":
    case "FloatValue":
    case "StringValue":
    case "BooleanValue":
      return value.value;
  }
};

const getVariables = (fieldNode: FieldNode, info: GraphQLResolveInfo) => {
  const variables = {};
  for (const argument of fieldNode.arguments) {
    variables[argument.name.value] = getVariable(argument.value, info);
  }
  return variables;
};

const getFields = (
  selections: readonly SelectionNode[],
  info: GraphQLResolveInfo
): FieldNode[] => {
  const fields: FieldNode[] = [];
  for (const selection of selections) {
    switch (selection.kind) {
      case "FragmentSpread":
        fields.push(
          ...getFields(
            info.fragments[selection.name.value].selectionSet.selections,
            info
          )
        );
        break;
      case "InlineFragment":
        fields.push(...getFields(selection.selectionSet.selections, info));
        break;
      case "Field":
        fields.push(selection);
        break;
    }
  }
  return fields;
};

const badDateTypes = [
  "date",
  "date_geq",
  "date_gt",
  "date_in",
  "date_leq",
  "date_lt",
  "date_neq",
];
const fixDate = (date: Date): string => date.toISOString().split("T")[0];

export const generateQuery = (
  { limit, filter, orderBy }: AnalyticsArguments,
  info: GraphQLResolveInfo,
  { accountID, scriptID }: { accountID: string; scriptID: string }
): [DocumentNode, GraphQLOptions] => {
  const analytics = info.fieldNodes.find(
    (field) => field.name.value === "analytics"
  );
  const fields = getFields(analytics.selectionSet.selections, info);
  let dimensionFieldNames = [];
  const dimensions = fields.find((field) => field.name.value === "dimensions");
  if (dimensions) {
    dimensionFieldNames = getFields(
      dimensions.selectionSet.selections,
      info
    ).map((field) => field.name.value);
  }

  (filter as any).scriptName = scriptID;

  const filterVariables = Object.keys(filter);
  for (const filterVariable of badDateTypes) {
    if (filterVariables.includes(filterVariable)) {
      filter[filterVariable] = fixDate(filter[filterVariable]);
    }
  }

  return [
    gql`
    query(
      $accountID: string!
      $filter: AccountWorkersInvocationsAdaptiveFilter_InputObject!
      $limit: uint64!
      $orderBy: [AccountWorkersInvocationsAdaptiveOrderBy!]
    ) {
      viewer {
        accounts(filter: { accountTag: $accountID }) {
          workersInvocationsAdaptive(filter: $filter, limit: $limit, orderBy: $orderBy) {
            avg {
              sampleInterval
            }
            dimensions {
              scriptName
              ${dimensionFieldNames.join(" ")}
            }
            max {
              cpuTime
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
    { variables: { accountID, filter, limit, orderBy } },
  ];
};
