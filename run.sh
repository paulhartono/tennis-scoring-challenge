#!/bin/bash -x
env_file=$1

docker build -t phartono:tennis-scoring-challenge .

docker run --rm -it --name tennis-scoring-challenge --env-file=${env_file} phartono:tennis-scoring-challenge