import React, { FC } from "react";
import { useQuery, gql } from "@apollo/client";
import { LazyRender } from "../LazyRender";
import moment from "moment";

const ACCOUNT_QUERY = gql`
  query($accountID: ID!) {
    account(id: $accountID) {
      name
      subdomain
      createdOn
    }
  }
`;

export const AccountHeading: FC<{ accountID: string }> = ({ accountID }) => {
  console.log(accountID);
  const { loading, error, data } = useQuery(ACCOUNT_QUERY, {
    variables: { accountID },
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold flex leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
            <LazyRender
              loading={loading}
              error={error}
              name="account"
              data={data}
              render={(data) => data.account.name}
            />
          </h1>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
            <div className="mt-2 flex items-center text-sm leading-5 text-gray-300 sm:mr-6">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <LazyRender
                loading={loading}
                error={error}
                name="subdomain"
                data={data}
                render={(data) =>
                  data.account.subdomain
                    ? `${data.account.subdomain}.workers.dev`
                    : "Unclaimed workers.dev subdomain!"
                }
              />
            </div>
            <div className="mt-2 flex items-center text-sm leading-5 text-gray-300">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <LazyRender
                  loading={loading}
                  error={error}
                  name="account"
                  data={data}
                  render={(data) => (
                    <>
                      Created in{" "}
                      <time dateTime={data.account.createdOn}>
                        {moment(data.account.createdOn).format("MMMM YYYY")}
                      </time>
                    </>
                  )}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
