# Advent of Code - CLI
A simple and intuitive client for creating, solving and submitting solutions to *[AdventOfCode](https://www.adventofcode.com)* . 

## Getting Started

These instructions will get you the CLI up and running on your local machine.

### Prerequisites

To run the CLI and your own AOC solutions with it, make sure you have git node, npm and your own language of choice in installed and in PATH. 

To cehck that, run in your Terminal:

```
git --version
node --version
npm --version
<language of choice> --version
```

### Installing

A step by step series of examples that tell you how to get Advent of Code CLI running

Navigate to your directory of choice for the CLI

1) Clone the repo.
```
git clone https://github.com/dragosv99/Advent-of-Code-CLI.git
```

2) Install NPM dependencies of the project.

```
npm install
```

3) Create .env for the Environment Variables need for the project to run correctly.

```
touch .env
```

4) Copy and paste this to .env .

```
COOKIE='yourcookie'
YEAR=2020
URL=https://adventofcode.com
```

5) (Optional) Get your Advent of Code cookie.

 - `navigate in your browser of choice` 
 - `open development tools, network tab` 
 - `open adventofcode.com, login, and inspect the HTTP Request Headers`
 - `copy Cookie header` 
 - `paste it in the .env`.  

Note: ***This step enables submit command. Your cookie will only be visible to you, locally***

6) (Optional) Activate .env .

Open index.js and replace `AbsolutePathToEnv` string with the absolute path to your .env. To get the path you can run in the Terminal, from the root of the project: 
```
pwd
``` 

Note: ***This step enables use of .env. If followed step 5, this step is necessary***

7) Activate AdventOfCode CLI

In the terminal, run the following command, from the root of the project:
```
npm link
```

8) Test it works !

In the terminal, run the following command, from any directory:
```
advent -h
```


## Built With

* [Commander](https://www.npmjs.com/package/commander) - CLI interface 
* [Husky](https://www.npmjs.com/package/husky) - Git Hooks
* [Advent Of Code](https://adventofcode.com) - Advent of Code
> Calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like - Advent of Code

## Contributing

Feel welcomed to pick up an issue, create issues, make a suggestion or contribute in any way you feel like.

## Disclaimer 

This is a *For Fun* project, and there exists not affiliation between this project and [Advent Of Code](https://adventofcode.com). This project was designed and built to automate user's interactions with Advent of Code and save important seconds when submitting a solution. Please do not abuse [Advent Of Code](https://adventofcode.com) with automated requests.

## Authors

* **Dragos Paul Vecerdea** - *Initial work* - [DragosGithub](https://github.com/dragosv99)

See also the list of [contributors](https://github.com/dragosv99/Advent-of-Code-CLI/graphs/contributors) who participated in this project.

## Aknwoledgements

This project would have been impossbile without the great effort put in creating *[AdventOfCode](https://www.adventofcode.com)* and making of it a great success.


