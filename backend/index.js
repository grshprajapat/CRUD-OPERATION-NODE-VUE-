const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const http = require('http'); // Import http module for socket.io
const socketIo = require('socket.io'); // Import socket.io module

const app = express();
const port = 3003;

const sequelize = new Sequelize('nodeCRUD', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contact: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

const httpServer = http.createServer(app); // Create an http server
const io = socketIo(httpServer); // Create a socket.io instance by passing the http server

// Define CRUD routes

// Create an item
app.post('/items', async (req, res) => {
  try {
    if(!req.body && req.body.name && req.body.age ){
    const newItem = await Item.create(req.body);
    io.emit('getRealTimeData', newItem); // Emit the event after item creation
    res.json(newItem);
    }
    else {
      res.send('Name and age is not filled')
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating item');
  }
});

// Read all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll();
    const filteredItems = items.filter(item => item.age !== 0 && item.name !== '');
    res.json(filteredItems);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching items');
  }
});

// Update an item
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Item.update(req.body, {
      where: { id },
    });
    if (updatedRows > 0) {
      const updatedItem = await Item.findByPk(id);
      io.emit('itemUpdated', updatedItem); // Emit the event after item update
    }
    res.json({ updatedRows });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating item');
  }
});

// Delete an item
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Item.destroy({
      where: { id },
    });
    io.emit('itemDeleted', id); // Emit the event after item deletion
    res.json({ message: 'Item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting item');
  }
});

// Socket.io connection handling

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for updates from clients and emit real-time updates
  socket.on('itemUpdated', async (updatedItem) => {
    try {
      const [updatedRows] = await Item.update(updatedItem, {
        where: { id: updatedItem.id },
      });
      if (updatedRows > 0) {
        io.emit('itemUpdated', updatedItem); // Emit the event to all connected clients
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('delete-item', async (id) => {
    try {
      await Item.destroy({
        where: { id },
      });
      io.emit('itemDeleted', id); // Emit the event after item deletion
      res.json({ message: 'Item deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting item');
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
