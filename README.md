# workers.sh

[![GitHub Actions Test](https://github.com/GregBrimble/cf-workers-dashboard/workflows/Test/badge.svg)](https://github.com/GregBrimble/cf-workers-dashboard/actions?query=workflow%3ATest)
[![GitHub Actions Deploy](https://github.com/GregBrimble/cf-workers-dashboard/workflows/Deploy/badge.svg)](https://github.com/GregBrimble/cf-workers-dashboard/actions?query=workflow%3ADeploy)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/g/GregBrimble/cf-workers-dashboard.svg?logo=lgtm&style=plastic)](https://lgtm.com/projects/g/GregBrimble/cf-workers-dashboard/alerts/)
[![LGTM Code Quality](https://img.shields.io/lgtm/grade/javascript/g/GregBrimble/cf-workers-dashboard.svg?logo=lgtm&style=plastic)](https://lgtm.com/projects/g/GregBrimble/cf-workers-dashboard/context:javascript)
[![Code Climate Maintainability](https://img.shields.io/codeclimate/maintainability/GregBrimble/cf-workers-dashboard.svg?style=plastic)](https://codeclimate.com/github/GregBrimble/cf-workers-dashboard/maintainability)
[![Codecov](https://img.shields.io/codecov/c/github/GregBrimble/cf-workers-dashboard?logo=codecov&style=plastic)](https://codecov.io/gh/GregBrimble/cf-workers-dashboard)
[![License](https://img.shields.io/github/license/GregBrimble/cf-workers-dashboard?style=plastic)](https://github.com/GregBrimble/cf-workers-dashboard/blob/master/LICENSE)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/GregBrimble/cf-workers-dashboard.svg?logo=github&style=plastic)](https://github.com/GregBrimble/)
[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=plastic)](https://lerna.js.org/)

A dashboard for managing [Cloudflare Workers](https://workers.cloudflare.com/).

## Prerequisites

- [Node.js](https://nodejs.org/en/)

- [`cloudflared`](https://developers.cloudflare.com/argo-tunnel/downloads/)

  (On MacOS with Homebrew: `brew install cloudflare/cloudflare/cloudflared`)

## Getting Started

1. `npm i`

## Scripts

These should all be self-explanatory:

- `npm run lint`

  - `npm run lint:fix`

- `npm run test`

  - `npm run test:client`
  - `npm run test:server`

- `npm run deploy`

To start a local version:

1. In one terminal window, run `npm run start:client`.

1. In another, run `npm run start` and navigate to [http://localhost:8787](http://localhost:8787).

## About

- `/packages/client` is simply a CRA created with `npx create-react-app . --template typescript --use-npm`.

- `/packages/server` an function which intercepts a request to the client. If it returns a 404, the request is passed through to the client.

- `/packages/worker` attempts to fetch from the server first, falling back on the client.
