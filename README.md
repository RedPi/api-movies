# Api Movies

NodeJs

### Project Install

Clone the project :

    git clone https://github.com/RedPi/api-movies.git

#### Dependencies install
    
In the *root directory*, tape this command on your terminal :

    npm install
    
#### Launch application

Tape this command on your terminal to launch the application :

    npm start
    
The application will be launch at this url :

    http://localhost:3000/
    

### Routes

Search on OMDB :

    GET /search?title=titre_de_film
    
Generate movies files :

    GET /moviesFiles
   
Get all movies :

    GET /movies
   
Get one movie :

    GET /movie/:id
   
Create movie :

    POST /movie
   
Update movie :

    PUT /movie
   
Delete movie :

    DELETE /movie/:id

