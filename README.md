
# Free-the-tiger

A small app where you try to free a tiger from a cage.


## Run Locally

Make sure to have a version of Node.js installed prior so that npm commands work.

Clone the project

```bash
  git clone https://github.com/tWard-BD/Free-the-tiger.git
```

Go to the project directory

```bash
  cd Free-the-tiger
```

Install dependencies

```bash
  npm install
```

Compile the typescript

```bash
  tsc
```

Start the app (with this it should start vite)

```bash
  npm run start
```

This will most probably generate two links. One is the local link which you will need for debugging.


## Debugging

To better debug on Visual Studio Code. Through the "Run" menu, then select "Add Configuarion". From there select a "Web app" option with your preffered browser.

There will be a ".vscode" folder generated with the configuration that you have selected. There you only need to swap the local link for the one that is generated from the "npm run start" command.