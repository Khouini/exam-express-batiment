const express = require('express');
const http = require('http');
const NiveauModel = require('./models/Niveau');
const app = express();
const UserRouter = require('./routes/user');
const BatimentRouter = require('./routes/batiment');
const dbConfig = require('./config/db.json');
const { default: mongoose } = require('mongoose');
const BatimentModel = require('./models/Batiment');
var path = require('path');

app.use(express.json());
app.use('/users', UserRouter);
app.use('/batiments', BatimentRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('User connected');
  socket.on('getNiveauxNonBati', async () => {
    const data = await getNiveauxNonBati();
    console.log('🚀 ~ socket.on ~ data:', data);
    socket.emit('niveauxNonBatiData', JSON.stringify(data));
  });

  socket.on('contruire', async data => {
    console.log('recived data foe contruire', data);
    const constr = await construction(data.id);
    console.log('🚀 ~ constr:', constr);
    const dataRS = await getNiveauxNonBati();
    console.log('🚀 ~ socket.on ~ data:', dataRS);
    socket.emit('niveauxNonBatiData', JSON.stringify(dataRS));
  });
  socket.on('getSomme', async data => {
    const sommeData = await getSomme();
    console.log('🚀 ~ socket.on ~ data:', sommeData);
    socket.emit('sommeData', sommeData.toString());
  });
  socket.on('disconnect', () => {
    io.emit('msg', 'An user is diconnected');
  });
});

async function main() {
  try {
    console.log('connecting to db');
    await mongoose.connect(dbConfig.url);
    console.log('db connected');
    const rs = await getSomme();
    console.log('🚀 ~ main ~ rs:', rs);
    server.listen(3000, () => {
      console.log('Server is listening on port 3000');
    });
  } catch (error) {
    console.log('🚀 ~ main ~ error:', error);
  }
}

main();

async function getNiveauxNonBati() {
  const niveaux = await NiveauModel.find({
    etat_construction: false,
  });
  console.log('🚀 ~ getNiveauxNonBati ~ niveaux:', niveaux);
  return niveaux;
}

async function getSomme() {
  let count = 0;
  const batiemts = await BatimentModel.find();
  for (const batiment of batiemts) {
    console.log('🚀 ~ getSomme ~ batiment:', batiment);
    // const niveau = NiveauModel.findById(batiment._id);
    // console.log('🚀 ~ getSomme ~ niveau:', niveau);
    if (batiment.nbr_niveau > 5 && batiment.adresse === 'Tunis') {
      count++;
    }
  }
  return count;
}

async function construction(idNiveau) {
  try {
    const niveau = await NiveauModel.findById(idNiveau);
    console.log('🚀 ~ construction ~ niveau:', niveau);
    if (!niveau) {
      throw new Error('niveau not found!');
    }
    const batiment = await BatimentModel.findById(niveau.id_batiment);
    if (!batiment) {
      throw new Error('batiment not found!');
    }
    const response = {};

    if (niveau.etat_construction === false) {
      batiment.nbr_niveau = batiment.nbr_niveau + 1;
      const savedBatiment = await batiment.save();
      console.log('🚀 ~ construction ~ savedBatiment:', savedBatiment);
      response.savedBatiment = savedBatiment;
    }
    niveau.etat_construction = true;

    const savedniveau = await niveau.save();
    console.log('🚀 ~ construction ~ savedniveau:', savedniveau);
    response.savedNiveau = savedniveau;
    return response;
  } catch (error) {
    console.log('🚀 ~ router.get ~ error:', error.message);
    return false;
  }
}
