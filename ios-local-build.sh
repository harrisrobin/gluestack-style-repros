 #!/usr/bin/env bash

# Check if EAS_LOCAL_BUILD_WORKINGDIR is set and is not empty
if [[ -z "${EAS_LOCAL_BUILD_WORKINGDIR}" ]]; then
  EAS_LOCAL_BUILD_WORKINGDIR=/Users/harris/workspace/palestine/palsandboxtemp/local-builds-dump
fi

# check if profile is set and is not empty
if [[ -z "${PROFILE}" ]]; then
  PROFILE=preview
fi

# clean up local build directory
rm -rf $EAS_LOCAL_BUILD_WORKINGDIR

# build for local ios
EAS_LOCAL_BUILD_SKIP_CLEANUP=1 EAS_LOCAL_BUILD_WORKINGDIR=$EAS_LOCAL_BUILD_WORKINGDIR eas build --platform ios --profile $PROFILE --local