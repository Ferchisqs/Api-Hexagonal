let express =require('express')
const cors = require('cors');

import indexRouter from "./src/shared/infraestructure/index.router";
import { db } from "./src/shared/application/mysqlConnection"

let exemple = express();
exemple.disable("x-powered-by");

let corsOptions = {
  origin: 'trustedwebsite.com' 
};

let app = express();

app.use((cors(corsOptions)))
const PORT = "3000";

app.use(cors());
app.use(express.json());

app.use("/", indexRouter);

db.connect()
  .then(() => console.log("Database connected"))
  .catch((err:any) => console.error("Error connecting to database: " + err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});