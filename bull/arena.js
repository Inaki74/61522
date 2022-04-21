const express   = require('express');
const Arena = require('bull-arena');
const router = express.Router();
const Bull = require('bull');
const app       = express();
const port      = 3001;

const arena = Arena({   
    Bull,
    queues: [
        {
        name:'queue-test',
        //hostId para identificar la queue en la UI de arena.
        hostId:'cualquier nombre queue-test'
        },
        {
        name:'queue-test-2',
        hostId:'cualquier nombre queue-test-2'
        },
        {
        name:'queue-test-3',
        hostId:'cualquier nombre queue-test-3'
        },
    ],
});

router.use('/', arena);


app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`);
});