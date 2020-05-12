import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";
import { LazyRender } from "../components/LazyRender";
import { Link, useLocation, Redirect, useRouteMatch } from "react-router-dom";

const ACCOUNTS_QUERY = gql`
  {
    accounts {
      id
      name
    }
  }
`;

export const Accounts: FC<{}> = ({}) => {
  const { url } = useRouteMatch();
  const { state: { autoSelect } = { autoSelect: false } } = useLocation();
  const { loading, error, data } = useQuery(ACCOUNTS_QUERY);

  if (autoSelect && data?.accounts?.length === 1) {
    return <Redirect to={`/accounts/${data.accounts[0].id}`}></Redirect>;
  }

  return (
    <div className="max-w-none mx-auto">
      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-2">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Accounts
              </h2>
            </div>
          </div>
        </div>
        <LazyRender
          loading={loading}
          error={error}
          name="accounts"
          data={data}
          render={(data) => (
            <ul>
              {data.accounts.map((account: any) => (
                <li
                  className="first:border-t-0 border-t border-gray-200"
                  key={account.id}
                >
                  <Link
                    to={`${url}/${account.id}`}
                    className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                            {account.name}
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
          )}
        />
      </div>
    </div>
  );
};
