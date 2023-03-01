const express = require("express");
const sequelize = require("./config/connection");
const goalsRoute = require("./controllers/api/goalRoutes");
const commentsRoute = require("./controllers/api/commentRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/goal", goalsRoute);
app.use("/api/comment", commentsRoute);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
