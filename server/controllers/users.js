const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = require("../models/User");

async function show(req, res) {
  try {
    const name = req.params.name;
    const user = await Login.getOneByUsername(name);
    res.status(200).send({ data: user });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const data = req.body;

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    data["password"] = await bcrypt.hash(data.password, salt);

    const result = await Login.create(data);

    res.status(201).send({ data: result });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

async function login(req, res) {
  const data = req.body;

  try {
    const user = await Login.getOneByUsername(data.username);

    if (!user) {
      throw new Error("No user with this username");
    }

    const match = await bcrypt.compare(data.password, user.password);

    if (match) {
      const payload = {
        username: user.username,
        student_id: user.id,
        form: user.form,
      };

      const sendToken = (err, token) => {
        if (err) {
          throw new Error("Error in token generation");
        }

        res.status(200).json({
          success: true,
          token: token,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            form: user.form,
          },
        });
      };

      jwt.sign(
        payload,
        process.env.SECRET_TOKEN,
        { expiresIn: 3600 },
        sendToken,
      );
    } else {
      throw new Error("User could not be authenticated");
    }
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
}

module.exports = {
  show,
  create,
  login,
};