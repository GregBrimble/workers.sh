import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  createRef,
  useRef,
  useEffect,
} from "react";
import { classNames } from "../utils/classNames";
import { Transition } from "./lib/Transition";
import { useSettings } from "../contexts/SettingsContext";
import { client } from "../client";
import { useFocus } from "../hooks/useFocus";
import { useRouteMatch } from "react-router-dom";

export const Settings = forwardRef((props, ref) => {
  const homeMatch = useRouteMatch({
    path: "/",
    exact: true,
  }) as Record<string, any>;
  const {
    authentication: defaultAuthentication,
    setAuthentication: saveAuthentication,
    hasToken,
    hasKey,
  } = useSettings();
  const [open, setOpen] = useState(!homeMatch && !(hasKey && hasToken));
  const [authentication, setAuthentication] = useState(defaultAuthentication);
  const [tokenInputRef, setTokenInputFocus] = useFocus();

  const [token, setToken] = useState(authentication.token);
  const [emailAddress, setEmailAddress] = useState(authentication.emailAddress);
  const [key, setKey] = useState(authentication.key);

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  useEffect(() => {
    if (open) setTokenInputFocus();
  }, [open]);

  // TODO: Validate authentication on save

  return (
    <div
      className={classNames(
        "fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center pointer-events-none",
        open ? "block" : "hidden"
      )}
    >
      <Transition
        show={open}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 transition-opacity pointer-events-auto">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
      </Transition>

      <Transition
        show={open}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <form>
          <div className="w-full sm:w-120 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all pointer-events-auto">
            <div className="max-w-7xl mx-auto pt-5 pb-4 sm:p-6 sm:pb-6 px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Settings
                    </h3>
                  </div>
                  <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <div>
                        <label
                          htmlFor="api_token"
                          className="block text-sm font-medium leading-5 text-gray-700"
                        >
                          Cloudflare API Token
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                          <input
                            id="api_token"
                            type="text"
                            ref={tokenInputRef}
                            className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 font-mono"
                            value={token}
                            onChange={(event) => setToken(event.target.value)}
                          />
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <ol className="list-decimal list-inside">
                            <li className="mt-1">
                              Navigate to the{" "}
                              <a
                                href="https://dash.cloudflare.com/profile/api-tokens"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-500 hover:underline"
                              >
                                API Tokens tab
                              </a>{" "}
                              on Profile page of the official Cloudflare
                              dashboard.
                            </li>
                            <li className="mt-1">
                              Click{" "}
                              <span className="font-bold">Create Token</span>{" "}
                              and select the{" "}
                              <span className="font-bold">
                                Edit Cloudflare Workers
                              </span>{" "}
                              template.
                            </li>
                            <li className="mt-1">
                              Fill out the rest of the fields and then click{" "}
                              <span className="font-bold">
                                Continue to summary
                              </span>
                              , where you can click{" "}
                              <span className="font-bold">Create Token</span>.
                              Copy the token, and paste in the box above.
                            </li>
                          </ol>

                          <details>
                            <summary className="mt-4 cursor-pointer">
                              Permissions
                            </summary>
                            <div className="ml-4">
                              The following permissions are required:
                              <dl className="list-disc list-inside mt-2">
                                <dt className="font-medium mt-2 first:mt-0">
                                  Account → Workers KV Storage → Edit
                                </dt>
                                <dd>Required to interact with Workers KV</dd>
                                <dt className="font-medium mt-2 first:mt-0">
                                  Account → Workers Scripts → Edit
                                </dt>
                                <dd>Required to deploy Workers scripts</dd>
                                <dt className="font-medium mt-2 first:mt-0">
                                  Zone → Workers Routes → Edit
                                </dt>
                                <dd>
                                  Required to deploy Workers scripts to a given
                                  route
                                </dd>
                                <dt className="font-medium mt-2 first:mt-0">
                                  Account → Account Settings → Read
                                </dt>
                                <dd>Required to read workers.dev subdomain</dd>
                                <dt className="font-medium mt-2 first:mt-0">
                                  User → User Details → Read
                                </dt>
                                <dd>
                                  Required to fetch basic user information
                                </dd>
                              </dl>
                            </div>
                          </details>
                        </div>
                      </div>
                      <div className="mt-8 border-t border-gray-200 pt-8">
                        <label
                          htmlFor="api_token"
                          className="block text-sm font-medium leading-5 text-gray-700"
                        >
                          Cloudflare Account Email Address
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                          <input
                            id="email_address"
                            type="email"
                            className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 font-mono"
                            value={emailAddress}
                            onChange={(event) =>
                              setEmailAddress(event.target.value)
                            }
                          />
                        </div>
                        <label
                          htmlFor="api_token"
                          className="mt-2 block text-sm font-medium leading-5 text-gray-700"
                        >
                          Cloudflare Global API Key
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                          <input
                            id="key"
                            type="text"
                            className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5 font-mono"
                            value={key}
                            onChange={(event) => setKey(event.target.value)}
                          />
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <ol className="list-decimal list-inside">
                            <li className="mt-1">
                              Navigate to the{" "}
                              <a
                                href="https://dash.cloudflare.com/profile/api-tokens"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-500 hover:underline"
                              >
                                API Tokens tab
                              </a>{" "}
                              on Profile page of the official Cloudflare
                              dashboard.
                            </li>
                            <li className="mt-1">
                              Next to{" "}
                              <span className="font-bold">Global API Key</span>,
                              click <span className="font-bold">View</span>.
                              Confirm your password, copy the key, and paste in
                              the box above.
                            </li>
                          </ol>
                        </div>
                      </div>
                      <div className="mt-8 border-t border-gray-200 pt-8">
                        <h4 className="text-base leading-6 font-medium text-gray-900">
                          Security
                        </h4>
                        <p className="mt-2 text-sm text-gray-500">
                          Unfortunately, due to Cloudflare API limitations,
                          workers.sh requires both an API Token and your email
                          address {"&"} Global API Key. We hope to transition to
                          API Token only soon.
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          Your API Token and Key are stored on your device, and
                          sent as an HTTP headers only to communicate with the
                          Cloudflare API.{" "}
                          <span className="font-bold">
                            Your authentication settings are not stored anywhere
                            other than on your device
                          </span>
                          . This application is{" "}
                          <a
                            href="https://github.com/GregBrimble/cf-workers-dashboard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-500 hover:underline"
                          >
                            open-source
                          </a>
                          .
                        </p>
                        {/* <div className="mt-4 relative flex items-start">
                          <div className="absolute flex items-center h-5">
                            <input
                              id="candidates"
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                              required={true}
                            />
                          </div>
                          <div className="pl-7 text-sm leading-5">
                            <label
                              htmlFor="candidates"
                              className="font-medium text-gray-700"
                            >
                              Email consent
                            </label>
                            <p className="text-gray-500">
                              Do you give us permission to store your email
                              address and email you with account information?
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  onClick={() => {
                    saveAuthentication({
                      token,
                      emailAddress,
                      key,
                    });
                    setOpen(false);
                  }}
                  type="submit"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Save
                </button>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  onClick={() => {
                    setAuthentication(defaultAuthentication);
                    setOpen(false);
                  }}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Cancel
                </button>
              </span>
            </div>
          </div>
        </form>
      </Transition>
    </div>
  );
});
