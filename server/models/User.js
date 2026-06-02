const db = require("../Database/connect")

class Login {
    constructor({ id, name, username, form, password }) {
        this.id = id
        this.name = name
        this.username = username
        this.form = form
        this.password = password
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM student WHERE id = $1;", [id])
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.")
        }
        return new Login(response.rows[0])
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM student WHERE username = $1;", [username])
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.")
        }
        return new Login(response.rows[0])
    }

    static async create(data) {
        const { username, password, name, form } = data

        if (!username || !password || !name || !form) {
            throw new Error("Missing required fields.")
        }

        const response = await db.query("INSERT INTO student (username, password, name, form) VALUES ($1, $2, $3, $4) RETURNING *;", [username, password, name, form])
        const newId = response.rows[0].id
        const newUser = await Login.getOneById(newId)

        return new Login (newUser)
    }
}

module.exports = Login