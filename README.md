# tennis-scoring-challenge

## Overview
This *tennis-scoring-challenge* code is written in node.js - so please make sure that you have nodejs installed.
Alternatively, you can run this project using docker as described below

## Environment Variables
`NUMBER_OF_SETS` This will set the total sets required to play a match  
(Currently tested for 1 set ONLY)

## Using Docker
- Clone the project
- type `./run.sh .env` or you can create your own environment variable


## Using npm 
### Setup
- Clone the project 
- Type `npm install`

### TEST
- Type `npm test`

### Run 
- Type `npm start`

## Some Notes
- Original Project Requirement should have all been addressed :)
- Ideally project should have 100% test coverage, here I put all the basic to near completion test coverage just to demonstrate the use of jest as a unit test
- This Project does not include any CLI or GUI - it is more toward how it is designed in such a way so that it could be extend to a bigger project if necessary
- Some codes (ie. support multiple sets) has not been tested properly. It is there to give an idea on how that can be implemented for the next stage. (although i think lots of the function should work with multiple sets)
- the use of tsnd (ts-node-dev) is unnecessary for this project, but i purposely left it there as it is good for ts type project in future.