import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Header from "./componentes/Header";
import { Grid,Typography, Card, CardContent, CardActionArea, CardMedia, Button, CardActions } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import AnyChart from 'anychart-react';

const GET_POKEMON_INFO = gql`
{
  pokemons(first: 10) {
    id
    number
    name
    maxCP
  }
}`;


const GET_POKEMON_INFO2 = gql`
{
  pokemons(first: 10) {
    id
    number
    name
    attacks
    evolutions {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      attacks
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

  var lista = [];
  if(data){
    console.log(data);
    data.pokemons.map((pokemon, index) => (	  
      lista.push({'x': pokemon.name, 'value': pokemon.maxCP})
      ));
    const complexSettings = {
        width: 1200,
        height: 600,
        type: 'pie',
        data: lista,
        title: 'Máximo puntos de combate',
        legend: {
          title: 'CP',
          background: 'lightgreen 0.4',
          padding: 0
        },
        lineMarker: {
          value: 4.5
        }
      };
      const complexSettings2 = {
        width: 1200,
        height: 600,
        type: 'column',
        data: lista,
        title: 'Máximo puntos de combate',
        legend: {
          title: 'CP',
          background: 'lightgreen 0.4',
          padding: 0
        },
        lineMarker: {
          value: 4.5
        }
      };
      return (
        <React.Fragment>
          <Header />
          <AnyChart
            {...complexSettings}
          />
          <AnyChart
            {...complexSettings2}
          />
      </React.Fragment>
      );
  }
}
