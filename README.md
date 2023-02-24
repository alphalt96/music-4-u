# Simple music web application `music-4-u`
## Features

- Can listen the music but for now it's just only use mock data from api
- Can add the song from recommended list to track list
- Repeat track list or repeat the song it self
- Full control to the audio controller (except shuffling song button)

## Features on developing
- Authentication
- Search song
- Like song
- Shuffle songs
- Remove a song from tracklist

## Tech uses
- Reactjs
- Tailwindcss
- React-router-dom

## How to run it

Install the dependencies and devDependencies and start the server.

Clone the source code from repository and install the dependencies

```sh
cd music-4-u
npm i
```

Run the backend service, you can click to the repository link bellow and follow the instructor
```
https://github.com/alphalt96/music-4-u-backend
```

After the backend service is run, create the .env file
```sh
cp .env.exmple .env
```

Set the variables for the `.env` file, replace the `REACT_APP_API_ENDPOINT` by the address of your backend service, it should be similar to the example bellow for now
```sh
REACT_APP_API_ENDPOINT=http://localhost:3001
```

Then, run the the app
```sh
npm start
```
