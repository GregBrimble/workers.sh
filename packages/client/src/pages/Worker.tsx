import React, { FC } from "react";
import moment from "moment";
import { gql, useQuery } from "@apollo/client";
import { LazyRender } from "../components/LazyRender";
import {
  useParams,
  useRouteMatch,
  useHistory,
  Switch,
  Route,
  Redirect,
  useLocation,
  Link,
} from "react-router-dom";
import { Analytics } from "../components/workers/Analytics";
import { Editor } from "../components/workers/Editor";
import { Peek } from "../components/workers/Peek";
import { WebSockets } from "../components/workers/WebSockets";
import { classNames } from "../utils/classNames";

const WORKERS_QUERY = gql`
  query($accountID: ID!, $scriptID: ID!) {
    account(id: $accountID) {
      script(id: $scriptID) {
        id
        createdOn
        modifiedOn
      }
    }
  }
`;

export const Worker: FC = () => {
  const { workerID: scriptID, accountID } = useParams();
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const { activeTabPath } = useRouteMatch("*/:activeTabPath")?.params as Record<
    string,
    any
  >;

  const tabs = [
    {
      path: `${url}/analytics`,
      label: "Analytics",
      icon: (
        <path
          fillRule="evenodd"
          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
          clipRule="evenodd"
        ></path>
      ),
    },
    {
      path: `${url}/editor`,
      label: "Editor",
      icon: (
        <path
          fillRule="evenodd"
          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      ),
    },
    {
      path: `${url}/peek`,
      label: "Peek",
      icon: (
        <>
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
          <path
            fillRule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clipRule="evenodd"
          ></path>
        </>
      ),
    },
    {
      path: `${url}/websockets`,
      label: "WebSockets",
      icon: (
        <>
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
        </>
      ),
    },
  ];
  const activeTab = tabs.find((tab) => tab.path.endsWith(activeTabPath));

  return (
    <div className="max-w-none mx-auto">
      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:pb-0 sm:pt-2">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-2">
              <div>
                <div className="sm:hidden">
                  <select
                    className="form-select block w-full"
                    onChange={(event) => {
                      history.push(event.target.value);
                    }}
                    defaultValue={activeTab?.path}
                  >
                    {tabs.map((tab) => (
                      <option value={tab.path} key={tab.label}>
                        {tab.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="hidden sm:block">
                  <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                      {tabs.map((tab) => {
                        const active = activeTab === tab;
                        return (
                          <Link
                            to={tab.path}
                            key={tab.label}
                            className={classNames(
                              "ml-8 first:ml-0 group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm leading-5 focus:outline-none",
                              active
                                ? "border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                            )}
                          >
                            <svg
                              className={classNames(
                                "-ml-0.5 mr-2 h-5 w-5",
                                active
                                  ? "text-indigo-500 group-focus:text-indigo-600"
                                  : "text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600  transition duration-150 ease-in-out"
                              )}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              {tab.icon}
                            </svg>
                            <span>{tab.label}</span>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="ml-4 mt-2 flex-shrink-0">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition ease-in-out duration-150"
                >
                  Create new script
                </button>
              </span>
            </div> */}
          </div>
        </div>
        <Switch>
          <Route exact path={path}>
            <Redirect to={`${url}/analytics`} />
          </Route>
          <Route path={`${path}/analytics`}>
            <Analytics />
          </Route>
          <Route path={`${path}/editor`}>
            <Editor />
          </Route>
          <Route path={`${path}/peek`}>
            <Peek />
          </Route>
          <Route path={`${path}/websockets`}>
            <WebSockets />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
