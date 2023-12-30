# Kudos Portal

Find collaborations, collect kudos within the Substrate, Polkadot & Kusama ecosystem.

## Project Architecture

Folder structure

```
portal/
├── assets/             # images, fonts files, ...
├── app/                # routing purpose only, specific components/layouts
├── context/            # React context API providers/reducers
├── components/         # base components
├── data/               # data assets (JSON files) & constants
    └── constants.ts    # app constants
├── hooks/              # custom hooks
├── lib/                # lib/API overtop & connectors (e.g. fetch, notions)
├── public/             # static files/assets
├── services/           # app API interfaces
├── styles/             # global css, theming variables
├── types/              # common types
└── utils/              # utility js functions (e.g. formatters)
```
