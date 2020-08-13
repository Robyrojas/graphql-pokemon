import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Header from "./componentes/Header";
import { Grid,Typography, Card, CardContent, CardActionArea, CardMedia, Button, CardActions } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const GET_POKEMON_INFO = gql`
{
    pokemons(first: 150) {
      id
      number
      name,
      image,
      evolutions {
        id,
        number,
        name,
        image
      }
    }
  }`;

  const useStyles = makeStyles({
    root: {
      height: 480,
      maxWidth: 345,
    },
    media: {
      height: 250,
    },
    contenido: {
      height: 180,
    },
  });

export default function Lista() {

  const { data, loading, error } = useQuery(GET_POKEMON_INFO);
  const classes = useStyles();

  if (loading) return (
    <React.Fragment>
      <Header />
      <Container maxWidth="md">
        <p>Cargando...</p>
      </Container>
    </React.Fragment>
  );
  if (error) return (
    <React.Fragment>
      <Header />
      <Container maxWidth="md">
        <p>Servicio no disponible</p>
      </Container>
    </React.Fragment>
  );


  return (
    <React.Fragment>
      <Container maxWidth="md">
      <Header />
      <h1>Pokemon</h1>
      <div className="container">
        <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
          {data &&
            data.pokemons &&
            data.pokemons.map((pokemon, index) => (
              
                <Grid item xs={4}>
                  <Card className={classes.root}>
                    <CardActionArea >
                      <CardMedia
                        className={classes.media}
                        src={pokemon.image} 
                        image={pokemon.image} 
                        title={index}
                      />
                      <CardContent className={classes.contenido}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {pokemon.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        <p>
                      {pokemon.evolutions && pokemon.evolutions.length !== 0 && (
                        <p>
                              {" "}
                              Evoluciones:
                              <ul>
                                  {pokemon.evolutions.map((e, indx) => {
                                      return <li key={indx}> {e.name} </li>;
                                    })}
                              </ul>
                            </p>
                          )}
                        </p>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Ver
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              
            ))}

        </Grid>
      </div>
      </Container>
    
  </React.Fragment>
  );
}
