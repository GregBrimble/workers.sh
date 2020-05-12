import React, { useState, useEffect, useRef, createRef } from "react";
import { Transition } from "../components/lib/Transition";
import { useWindowKey } from "../hooks/useWindowKey";
import { classNames } from "../utils/classNames";
import { useMouseOutside } from "../hooks/useMouseOutside";
import { Workers } from "./Workers";
import { Accounts } from "./Accounts";
import { Home } from "./Home";
import { Worker } from "./Worker";
import {
  Switch,
  Link,
  Route,
  useLocation,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import moment from "moment";
import { useQuery, gql } from "@apollo/client";
import { LazyRender } from "../components/LazyRender";
import { ProfilePicture } from "../components/ProfilePicture";
import { Settings } from "../components/Settings";
import { Heading } from "../components/headings";
import { Footer } from "../components/Footer";

const CONTAINER_QUERY = gql`
  {
    user {
      firstName
      lastName
    }
  }
`;

export const Container = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const { loading, error, data } = useQuery(CONTAINER_QUERY);

  const settingsRef = createRef() as any;
  const profileMenuRef = useRef(null); // TODO: Fix strict warnings

  useMouseOutside({
    target: profileMenuRef,
    callback: () => setProfileDropdownOpen(false),
  });

  useWindowKey({ key: "Escape", callback: () => setMobileMenuOpen(false) });

  return (
    <>
      <div className="bg-gray-100">
        <div>
          <div className="bg-gray-800 pb-32">
            <nav className="bg-gray-800">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                    <div className="flex items-center">
                      <Link to="/">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8"
                            src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                            alt="Workflow logo"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <button
                          className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                          aria-label="Notifications"
                        >
                          <svg
                            className="h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                          </svg>
                        </button>

                        {/* Profile dropdown */}
                        <div ref={profileMenuRef} className="ml-3 relative">
                          <div>
                            <button
                              onClick={() =>
                                setProfileDropdownOpen(!profileDropdownOpen)
                              }
                              className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                              id="user-menu"
                              aria-label="User menu"
                              aria-haspopup="true"
                              aria-expanded={profileDropdownOpen}
                            >
                              <ProfilePicture className="h-8 w-8 rounded-full" />
                            </button>
                          </div>
                          <Transition
                            show={profileDropdownOpen}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                              <div className="py-1 rounded-md bg-white shadow-xs">
                                <a
                                  href="#"
                                  onClick={() => {
                                    settingsRef.current.open();
                                    setProfileDropdownOpen(false);
                                  }}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Settings
                                </a>
                                <a
                                  href="https://github.com/GregBrimble/workers.sh/issues"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Report a Bug
                                </a>
                              </div>
                            </div>
                          </Transition>
                        </div>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                        aria-label={
                          mobileMenuOpen ? "Close main menu" : "Main menu"
                        }
                        aria-expanded={mobileMenuOpen}
                      >
                        <svg
                          className={classNames(
                            "h-6 w-6",
                            mobileMenuOpen ? "hidden" : "block"
                          )}
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                        <svg
                          className={classNames(
                            "h-6 w-6",
                            mobileMenuOpen ? "block" : "hidden"
                          )}
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={classNames(
                  "border-b border-gray-700 md:hidden",
                  mobileMenuOpen ? "block" : "hidden"
                )}
              >
                <div className="pt-4 pb-3">
                  {/* border-t border-gray-700 */}
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <ProfilePicture className="h-10 w-10 rounded-full" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        <LazyRender
                          loading={loading}
                          error={error}
                          name="user"
                          data={data}
                          render={(data) =>
                            `${data.user.firstName} ${data.user.lastName}`
                          }
                        />
                      </div>
                      <div className="mt-1 text-sm font-medium leading-none text-gray-400">
                        <LazyRender
                          loading={loading}
                          error={error}
                          name="user"
                          data={data}
                          render={(data) => data.user.email}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="mt-3 px-2"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="#"
                      onClick={() => {
                        settingsRef.current.open();
                        setProfileDropdownOpen(false);
                      }}
                      className="mt-1 first:mt-0 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                      role="menuitem"
                    >
                      Settings
                    </a>
                    <a
                      href="https://github.com/GregBrimble/workers.sh/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 first:mt-0 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                      role="menuitem"
                    >
                      Report a Bug
                    </a>
                  </div>
                </div>
              </div>
            </nav>
            <header className="py-10">
              <div className="p-8 bg-gray-800">
                <Heading />
              </div>
            </header>
          </div>

          <main className="-mt-32">
            <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/accounts/:accountID/workers/:workerID">
                  <Worker />
                </Route>
                <Route path="/accounts/:accountID/workers">
                  <Workers />
                </Route>
                <Route path="/accounts/:accountID">
                  <Redirect to={location.pathname + "/workers"} />
                </Route>
                <Route path="/accounts">
                  <Accounts />
                </Route>
                <Route path="/:find">
                  Let's find {location.pathname.substr(1)}
                </Route>
              </Switch>
            </div>
          </main>
        </div>
      </div>
      <Footer />

      <Settings ref={settingsRef} />
    </>
  );
};
