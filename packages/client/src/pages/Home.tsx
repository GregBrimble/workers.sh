import React from "react";
import { Link, Redirect } from "react-router-dom";
import { ExampleEditor } from "../components/home/ExampleEditor";
import { ExampleAnalytics } from "../components/home/ExampleAnalytics";
import { ExamplePeek } from "../components/home/ExamplePeek";
import { useSettings } from "../contexts/SettingsContext";

export const Home = () => {
  const { hasToken, hasKey } = useSettings();

  if (hasKey || hasToken) return <Redirect to="/accounts" />;

  return (
    <div className="max-w-none mx-auto">
      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="bg-white px-4 py-5 sm:px-6">
          <div className="py-16 overflow-hidden">
            <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
              <div className="relative">
                <h3 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                  workers.sh
                </h3>
                <p className="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
                  workers.sh is a featureful dashboard for managing Cloudflare
                  Workers.{" "}
                  <span className="font-bold">
                    It is under active development, so please do not rely on it
                    for production-ready use
                  </span>
                  .
                </p>
              </div>

              <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div className="relative">
                  <h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                    Analytics
                  </h4>
                  <p className="mt-3 text-lg leading-7 text-gray-500">
                    Observe trends in historic data for your Worker.
                  </p>

                  <ul className="mt-10">
                    <li>
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            <svg
                              className="h-6 w-6"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            >
                              <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h5 className="text-lg leading-6 font-medium text-gray-900">
                            No code required
                          </h5>
                          <p className="mt-2 text-base leading-6 text-gray-500">
                            workers.sh queries Cloudflare directly, so there is
                            no need to add tracking snippets to your Worker
                            script and therefore, no development overhead. And
                            with no calls to external services, your Worker can
                            respond to user requests faster!
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="mt-10">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            <svg
                              className="h-6 w-6"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            >
                              <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h5 className="text-lg leading-6 font-medium text-gray-900">
                            Detailed reports
                          </h5>
                          <p className="mt-2 text-base leading-6 text-gray-500">
                            Get data you can't see anywhere else. View the
                            complete breakdown of CPU time, errors and
                            subrequests for your Workers.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="mt-10">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            <svg
                              className="h-6 w-6"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            >
                              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h5 className="text-lg leading-6 font-medium text-gray-900">
                            Ready to use, right now
                          </h5>
                          <p className="mt-2 text-base leading-6 text-gray-500">
                            Cloudflare keeps three months of logs for all
                            Workers requests, so unlike if you were to setup a
                            traditional logging service, historic data is
                            available for you to peruse, right now.
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-10 -mx-4 relative lg:mt-0">
                  <ExampleAnalytics />
                </div>
              </div>

              <div className="relative mt-12 sm:mt-16 lg:mt-24">
                <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                  <div className="lg:col-start-2">
                    <h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                      Editor
                    </h4>
                    <p className="mt-3 text-lg leading-7 text-gray-500">
                      Create and edit Workers, on-the-fly, in the browser.
                    </p>

                    <ul className="mt-10">
                      <li>
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                              <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              >
                                <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h5 className="text-lg leading-6 font-medium text-gray-900">
                              Visual Studio Code-ish
                            </h5>
                            <p className="mt-2 text-base leading-6 text-gray-500">
                              Use Monaco (Visual Studio Code's editor) in the
                              browser for a fully-fledged development
                              experience.
                            </p>
                          </div>
                        </div>
                      </li>

                      <li className="mt-10">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                              <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              >
                                <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h5 className="text-lg leading-6 font-medium text-gray-900">
                              High-quality templates
                            </h5>
                            <p className="mt-2 text-base leading-6 text-gray-500">
                              Use Cloudflare Workers immediately, by deploying
                              one of our templates.
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                    <ExampleEditor />
                  </div>
                </div>
              </div>

              <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div className="relative">
                  <h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                    Peek
                  </h4>
                  <p className="mt-3 text-lg leading-7 text-gray-500">
                    Diagnose issues live, with all the information.
                  </p>

                  <ul className="mt-10">
                    <li>
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            <svg
                              className="h-6 w-6"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            >
                              <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h5 className="text-lg leading-6 font-medium text-gray-900">
                            Live request data
                          </h5>
                          <p className="mt-2 text-base leading-6 text-gray-500">
                            See all the requests as your Worker responds. View
                            HTTP request information, as well as Cloudflare's
                            internal headers.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="mt-10">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            <svg
                              className="h-6 w-6"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            >
                              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h5 className="text-lg leading-6 font-medium text-gray-900">
                            In-built logging and exception capturing
                          </h5>
                          <p className="mt-2 text-base leading-6 text-gray-500">
                            Unlike traditional logging services, workers.sh
                            doesn't need an SDK or API call to capture your
                            exceptions.{" "}
                            <code className="text-sm">console.log()</code> and{" "}
                            <code className="text-sm">throw new Error()</code>{" "}
                            work natively, with no additional code.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="mt-10">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                            <svg
                              className="h-6 w-6"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            >
                              <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h5 className="text-lg leading-6 font-medium text-gray-900">
                            Visualized traffic
                          </h5>
                          <p className="mt-2 text-base leading-6 text-gray-500">
                            Internet showing you too much love? See where the
                            traffic is coming from so you can implement firewall
                            rules.
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-10 -mx-4 relative lg:mt-0">
                  <ExamplePeek />
                </div>
              </div>

              <div className="relative mt-12 sm:mt-16 lg:mt-24">
                <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                  <div className="lg:col-start-2">
                    <h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                      WebSockets
                    </h4>
                    <p className="mt-3 text-lg leading-7 text-gray-500">
                      Add the missing piece to Cloudflare Workers.
                    </p>

                    <ul className="mt-10">
                      <li>
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                              <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              >
                                <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h5 className="text-lg leading-6 font-medium text-gray-900">
                              Instant communication
                            </h5>
                            <p className="mt-2 text-base leading-6 text-gray-500">
                              No more polling and putting unnecessary load on
                              your Worker. Experience ~3x less latency by
                              opening a WebSocket and listening for pushes
                              direct from your API.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="mt-10">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                              <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              >
                                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h5 className="text-lg leading-6 font-medium text-gray-900">
                              End-to-end encryption
                            </h5>
                            <p className="mt-2 text-base leading-6 text-gray-500">
                              Rest easy knowing workers.sh can't see the content
                              of your WebSocket messages. Securely send client
                              information, in full compliance with GDPR.
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                    <div className="text-center text-2xl font-extrabold">
                      Coming soon!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              Ready to dive in?
            </h2>
            <div className="mt-8 flex lg:flex-shrink-0 lg:mt-0">
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="/accounts"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
