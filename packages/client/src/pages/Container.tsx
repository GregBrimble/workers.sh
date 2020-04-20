import React, { useState, useEffect, useRef, createRef } from "react";
import { Transition } from "../components/lib/Transition";
import { useWindowKey } from "../hooks/useWindowKey";
import { classNames } from "../utils/classNames";
import { useMouseOutside } from "../hooks/useMouseOutside";
import { Workers } from "./Workers";
import { Worker } from "./Worker";
import {
  Switch,
  Link,
  Route,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import moment from "moment";
import { useQuery, gql } from "@apollo/client";
import { LazyRender } from "../components/LazyRender";
import { ProfilePicture } from "../components/ProfilePicture";
import { Settings } from "../components/Settings";
import { MainHeading } from "../components/MainHeading";
import { WorkersHeading } from "../components/WorkersHeading";

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
  const menuItems = [
    { path: "/workers", label: "Workers" },
    { path: "/elsewhere", label: "Elsewhere" },
  ];
  const location = useLocation();
  const onWorkersPage = useRouteMatch({
    path: "/workers/*",
  });

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
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline">
                          {menuItems.map(({ path, label }) => {
                            const ref = createRef<any>();

                            return (
                              <Link
                                key={path}
                                innerRef={ref}
                                to={() => {
                                  if (ref.current) ref.current.blur();
                                  return path;
                                }}
                                className={classNames(
                                  "ml-4 first:ml-0 px-3 py-2 rounded-md text-sm font-medium",
                                  location.pathname.startsWith(path)
                                    ? "text-white bg-gray-900"
                                    : "text-gray-300 hover:text-white hover:bg-gray-700",
                                  "focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
                                )}
                              >
                                {label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
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
                <div className="px-2 py-3 sm:px-3">
                  {menuItems.map(({ path, label }) => (
                    <Link
                      key={path}
                      to={path}
                      className={classNames(
                        "mt-1 first:mt-0 block px-3 py-2 rounded-md text-base font-medium",
                        location.pathname.startsWith(path)
                          ? "text-white bg-gray-900"
                          : "text-gray-300 hover:text-white hover:bg-gray-700",
                        "focus:outline-none focus:text-white focus:bg-gray-700"
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
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
                      href="/"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                      role="menuitem"
                    >
                      Your Profile
                    </a>
                    <a
                      href="/"
                      className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                      role="menuitem"
                    >
                      Settings
                    </a>
                    <a
                      href="/"
                      className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </div>
            </nav>
            <header className="py-10">
              <div className="p-8 bg-gray-800">
                {onWorkersPage ? (
                  <WorkersHeading match={onWorkersPage} />
                ) : (
                  <MainHeading />
                )}
              </div>
            </header>
          </div>

          <main className="-mt-32">
            <Switch>
              <Route exact path="/">
                <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                  Home
                </div>
              </Route>
              <Route path="/workers/:workerID">
                <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                  <Worker />
                </div>
              </Route>
              <Route path="/workers">
                <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                  <Workers />
                </div>
              </Route>
              <Route path="/elsewhere">
                <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                  Elsewhere
                </div>
              </Route>
            </Switch>
          </main>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center md:order-2">
            <a
              href="https://github.com/GregBrimble/cf-workers-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-6 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base leading-6 text-gray-400">
              Cloudflare Workers Dashboard by{" "}
              <a
                href="https://gregbrimble.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-500"
              >
                Greg Brimble
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <Settings ref={settingsRef} />
    </>
  );
};
