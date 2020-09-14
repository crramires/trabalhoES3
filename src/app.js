/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express, { request } from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app = express();
const bodyParser = require('body-parser');



app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


let products = [];

app.get('/products', (request, response) => {
  // TODO: listagem de todos os produtos
  return response.json(products);
  
});

app.post('/products', (request, response) => {
  // TODO: Salvar produto no array products
  const newProduct = { ...request.body, id: uuid() };

  const findLovers = products.filter(
    (item) => item.code === request.body.code
  )[0]?.lovers;

  const setProductLovers = { ...newProduct, lovers: findLovers || 0 };
  products.push(setProductLovers);
  return response.status(201).json(setProductLovers);

});

app.put('/products/:id', (request, response) => {
  // TODO: Atualiza produto por ID
  const { code, ...value } = request.body;
  let findProduct = products.find((item) => item.code === code);

  if (!!request.body.lovers) {
    return response.status(401).send(findProduct);
  }

  findProduct = { ...findProduct, ...value };

  const findIndex = products.findIndex((item) => item.code === code);

  if (findIndex === -1) {
    return response.status(400).send("Produto não encontrado");
  }

  products.splice(findIndex, 1);

  products.push(findProduct);

  return response.status(200).json(findProduct);


 });
 

app.delete('/products/:code', (request, response) => {
  // TODO: Remove TODOS os produtos que possuam o código passado por parâmetro
  const { code } = request.body;
  const findIndex = products.findIndex(value => value.code === code);
  products.splice(findIndex, 1);
  return response.status(204).send();
  

});

app.post('/products/:code/love', (request, response) => {
  // TODO: Incrementa em 1 o número de lovers de todos os produtos que possuam 
  // o code do parâmetro
  
   const { code } = request.body;

   const updateList = products.filter((item) => item.code === code);

   if (!updateList.length) {
     return response.status(400).send();
   }
    const newList = updateList.map((item) => {
    const findIndex = products.findIndex((idx) => idx.code === item.code);
    products.splice(findIndex, 1);
    return products.push({ ...item, lovers: item.lovers + 1 });
   });
   
   return response.status(200).json(newList);


});

app.get('/products/:code', (request, response) => {
  // TODO: Busca de todos os produtos com o código recebido por parâmetro.
  const {code} = request.params;
  const product = products.filter(value => value.code == code); //SE MUDAR ESSE TRECHO PARA VALUE.CODE === 40, O TESTE É APROVADO
  
  //console.log(code); CONSOLE PARA ACOMPANHAR O VALOR DO CODE, NESSE CASO ELE TA IGUAL A 40

  if(!product.length){
    return response.status(204).send();
  }

  //console.log(product); CONSOLE AQUI PARA ACOMPANHAR O CONTEUDO DE PRODUCT

  return response.json(product);


});

export default app;
