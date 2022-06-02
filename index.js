require("dotenv").config();

// import express from "express";
// import path from "path";

const express = require('express');
const path = require('path');
const app = express();






app.use(express.urlencoded({extended: true})); // O corpo (body) da requisição
app.use(express.json()); // converter para JSON

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});

let message;

let pokedex = [
  {
    id: 1,
    numero: 656,
    nome: "Froakie",
    tipo: 'Agua',
    altura:"0,3 m",
    peso:"7 kg",
    categoria:'Sapo Bolha',
    habilidade:'Torrente',
    descricao:"Estatísticas HP Ataque Defesa Ataque especial Defesa Especial Velocidade> Ele secreta bolhas flexíveis de seu peito e costas. As bolhas reduzem o dano que levaria quando atacado",
    img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/656.png",
  },
  {
    id: 2,
    numero: 657,
    nome: "Frogadier",
    tipo: 'Agua',
    altura:"0,6 m",
    peso:"10,9 kg",
    categoria:'Sapo Bolha',
    habilidade:'Torrente',
    descricao:"Ele pode lançar pedrinhas cobertas de bolhas com controle preciso, atingindo latas vazias a até 30 metros de distância.",
    img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/657.png",
  },
  {
    id: 3,
    numero: 658,
    nome: "Greninja ",
    tipo: 'Agua e Escuridão',
    altura:"1,5 m",
    peso:"40,0 kg",
    categoria:'Ninja',
    habilidade:'Torrente',
    descricao:"Aparece e desaparece com a graça de um ninja. Ele brinca com seus inimigos usando movimentos rápidos, enquanto os corta com estrelas de arremesso de água mais afiada.",
    img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/658.png",
  }

 
];

app.get("/", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);
  res.render("index.ejs", {
    pokedex, message
  });
});

app.get("/detalhes/:id", (req, res) => {
  let pokemons
  pokedex.filter((element) =>{
    if( element.id == req.params.id){
      pokemons = element
    } 
  });
  res.render("detalhes.ejs",{
    pokemons, message
  }); 
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro.ejs', {
      message
  });
});

app.post('/cadastro', (req, res) => {
  const valor = pokedex[pokedex.length-1].id + 1;
  const {numero,nome,tipo,altura,peso,categoria,habilidade,descricao,img} = req.body;
  pokedex.push({id: valor,numero,nome,tipo,altura,peso,categoria,habilidade,descricao,img});
  message = `Pokémon cadastrado!`;
  res.redirect("/");
});