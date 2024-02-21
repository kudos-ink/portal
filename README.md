# Kudos Portal

Kudos is a platform designed to streamline the process of onboarding new developers to the Polkadot ecosystem. We make it simple to browse, search and filter open GitHub contributions across the entire ecosystem, allowing aspiring contributors to find projects and tasks, which match their skill level and interests. In addition, we provide project maintainers the ability to tag open contributions with custom incentives, ranging from native tokens, NFTs, POAPs and many more. Lastly, we are working with ecosystem teams to actively curate sets of high quality, context-rich issues which aspiring contributors can begin working on immediately.

> Read our full [intro post](https://forum.polkadot.network/t/kudos-unlocking-the-full-potential-of-polkadots-developer-community/6346) on the Polkadot forum

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
