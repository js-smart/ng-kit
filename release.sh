#!/bin/bash

# Get the first argument
next_version=$1

# Path to the package.json file
PACKAGE_JSON_FILE="projects/ng-kit/package.json"

# Update the version in package.json
jq --arg v "$next_version" '.version = $v' "$PACKAGE_JSON_FILE" > "tmp.json" && mv "tmp.json" "$PACKAGE_JSON_FILE"

# Build the commit message
commit_message="chore: bump version to $next_version"

# Set the git user
git config  user.name "Pavan Kumar Jadda"
git config  user.email 17564080+pavankjadda@users.noreply.github.com

# Make the git commit with the message
git add .
git commit -m "$commit_message"

# Push the commit
git push
