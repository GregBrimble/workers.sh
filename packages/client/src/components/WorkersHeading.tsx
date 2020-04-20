import React, { FC } from "react";
import { match, useLocation, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { LazyRender } from "./LazyRender";

const MINIMENU_QUERY = gql`
  {
    account {
      name
      subdomain
      createdOn
    }
  }
`;

export const WorkersHeading: FC<{ match: match<any> }> = ({ match }) => {
  const { loading, error, data } = useQuery(MINIMENU_QUERY);
  const workerID = match.params[0].split("/")[0];

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <nav className="sm:hidden">
          <Link
            to={`/workers`}
            className="flex items-center text-sm leading-5 font-medium text-gray-400 hover:text-gray-200 transition duration-150 ease-in-out"
          >
            <svg
              className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </Link>
        </nav>
        <nav className="hidden sm:flex items-center text-sm leading-5 font-medium">
          <Link
            to="/"
            className="text-gray-400 hover:text-gray-200 transition duration-150 ease-in-out"
          >
            <LazyRender
              loading={loading}
              error={error}
              name="account"
              data={data}
              render={(data) => data.account.name}
            />
          </Link>
          <svg
            className="flex-shrink-0 mx-2 h-5 w-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <Link
            to="/workers"
            className="text-gray-400 hover:text-gray-200 transition duration-150 ease-in-out"
          >
            Workers
          </Link>
          {/* <svg
            className="flex-shrink-0 mx-2 h-5 w-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <a
            href="/"
            className="text-gray-400 hover:text-gray-200 transition duration-150 ease-in-out"
          >
            Back End Developer
          </a> */}
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
            {workerID}
          </h2>
        </div>
        {/* <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
          <span className="shadow-sm rounded-md">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:shadow-outline-gray focus:border-gray-700 active:bg-gray-700 transition duration-150 ease-in-out"
            >
              Edit
            </button>
          </span>

          <span className="ml-3 shadow-sm rounded-md">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-600 active:bg-indigo-600 transition duration-150 ease-in-out"
            >
              Publish
            </button>
          </span>
        </div> */}
      </div>
    </div>
  );
};
