# Hyperfine installation instructions

First - make sure you have a modern version of nodejs installed.
For example:

```nvm use v20.14.0```

Next -  follow the instructions in the root README (yarn config, yarn install)

```
yarn config set workspaces-experimental true
yarn install
```

Then - in the `./hyperfine/OpenResty-Orthanc-CarePMR/` directory
```docker-compose build```
and to launch
```docker-compose -f docker-compose.yml up -d```

The images are visible at address http://127.0.0.1. The Orthanc admin page is visible at http://127.0.0.1/pacs-admin/app/explorer.html.
