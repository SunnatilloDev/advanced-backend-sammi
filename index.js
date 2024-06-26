let express = require("express");
const { PORT } = require("./config/settings");
const errorHandler = require("./errors/errorHandler");
const cookieParser = require("cookie-parser");
require("./config/connectToDB");
let app = express();

app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/user", require("./routes/user.route"));
app.use("/api/product", require("./routes/product.route"));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
