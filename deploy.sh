#!/usr/bin/env bash

export AWS_PROFILE=default
export DEPLOY_ENVIRONMENT=$1

if [ $1 = "stg" ]; then
  export TODOS_TABLE="Todos"
  export TODOS_PKEY="id"
  export SHOPIFY_ACCESS_TOKEN=""
fi

if [ $1 = "prd" ]; then
  export TODOS_TABLE="Todos"
  export TODOS_PKEY="id"
fi

cdk deploy --all
