#!/usr/bin/env bash

npm run lint

if [ $? != 0 ]; then
    echo "Lint failed. — Exiting."

    exit 1
fi

echo "Everything is awesome!"
