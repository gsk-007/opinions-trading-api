import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

import app from "./server.js";

app.listen(port, () => {
  console.log(`hello on http://localhost:${port}`);
});
