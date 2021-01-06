CREATE DATABASE perntodo;

CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
/*open postgresql inside the heroku */
//heroku pg:psql -a yubi-pern-todo 
//heroku addons:create heroku-postgresql:hobby-dev -a yubi-pern-todo
/* this creates postgresql addons */