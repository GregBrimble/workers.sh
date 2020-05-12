import React, { FC } from "react";
import moment from "moment";
import { gql, useQuery } from "@apollo/client";
import { LazyRender } from "../components/LazyRender";
import { Link, useParams, useRouteMatch } from "react-router-dom";

const WORKERS_QUERY = gql`
  query($accountID: ID!) {
    account(id: $accountID) {
      scripts {
        id
        modifiedOn
      }
    }
  }
`;

export const Workers: FC<{}> = ({}) => {
  const { url } = useRouteMatch();
  const { accountID } = useParams();
  const { loading, error, data } = useQuery(WORKERS_QUERY, {
    variables: { accountID },
  });

  return (
    <div className="max-w-none mx-auto">
      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-2">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Workers
              </h2>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition ease-in-out duration-150"
                >
                  Create new script
                </button>
              </span>
            </div>
          </div>
        </div>
        <LazyRender
          loading={loading}
          error={error}
          name="scripts"
          data={data}
          render={(data) => {
            const scripts = [...data.account.scripts];

            scripts
              .sort(
                (a: any, b: any) =>
                  new Date(a.modifiedOn).getTime() -
                  new Date(b.modifiedOn).getTime()
              )
              .reverse();

            return (
              <ul>
                {scripts.map((script: any) => (
                  <li
                    className="first:border-t-0 border-t border-gray-200"
                    key={script.id}
                  >
                    <Link
                      to={`${url}/${script.id}`}
                      className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      <div className="px-4 py-4 flex items-center sm:px-6">
                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                              {script.id}
                            </div>
                            <div className="mt-2 flex">
                              <div className="flex items-center text-sm leading-5 text-gray-500">
                                <span>
                                  <time
                                    dateTime={script.modifiedOn}
                                    title="Last modified"
                                  >
                                    {moment(script.modifiedOn).fromNow()}
                                  </time>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-5 flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            );
          }}
        />
      </div>
    </div>
  );
};
