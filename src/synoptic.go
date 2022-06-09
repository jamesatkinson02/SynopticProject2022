package main

import (
	"fmt"
	"os"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html"
	"github.com/joho/godotenv"

	"database/sql"
	_ "github.com/lib/pq"
)

func signUp(c *fiber.Ctx, db *sql.DB) error{

	/* json data */
	payload := struct{
		Username  string `json: "username"`
		Email string `json: "email"`
		Password string `json: "password"`
	}{}

	/* post request failed */
	if err := c.BodyParser(&payload); err != nil {
		return c.SendString("post request failed")
	}

	/* insert statement */
	sqlStatement := `
		insert into account (
			username,
			email,
			password
		)
		values ($1, $2, $3)`

	/* insert the data! */
	_, err := db.Exec(
		sqlStatement,
		payload.Username,
		payload.Email,
		payload.Password)

	/* sql insert failed */
	if err != nil {
		return c.SendString("account creation failed")
	}

	/* set cookie with username */
	c.Cookie(&fiber.Cookie{
		Name: "username",
		Value: payload.Username,
	})

	/* redirect to profile */
	return c.Redirect("/profile")
}

func logIn(c *fiber.Ctx, db *sql.DB) error{

	/* json data */
	payload := struct{
		Username  string `json: "username"`
		Password string `json: "password"`
	}{}

	/* post request failed */
	if err := c.BodyParser(&payload); err != nil {
		return c.SendString("post request failed")
	}

	/* select statement */
	sqlStatement := `
		select password
		from account
		where username = $1`

	/* query the database! */
	rows, err := db.Query(sqlStatement, payload.Username)

	/* sql select failed */
	if err != nil {
		return c.SendString("login failed")
	}

	/* close the rows */
	defer rows.Close()

	/* get password from database */
	var password string
	for rows.Next() {
		rows.Scan(&password)
	}

	/* password doesn't match */
	if password != payload.Password{
		return c.SendString("login failed")
	}

	/* set cookie with username */
	c.Cookie(&fiber.Cookie{
		Name: "username",
		Value: payload.Username,
	})

	/* redirect to profile */
	return c.Redirect("/profile")
}

func logOut(c *fiber.Ctx, db *sql.DB) error{

	/* clear username cookie */
	c.ClearCookie("username")

	/* redirect to index */
	return c.Redirect("/")
}

func profile(c *fiber.Ctx, db *sql.DB) error{

	/* if user isn't logged in */
	cookie := c.Cookies("username")
	if len(cookie) <= 0 {

		/* redirect to index */
		return c.Redirect("/")
	}

	/* select statement */
	sqlStatement := `
		select username, email
		from account
		where username = $1`

	/* query the database! */
	rows, err := db.Query(sqlStatement, cookie)

	/* sql select failed */
	if err != nil {
		return c.SendString("cannot get profile info")
	}

	/* close the rows */
	defer rows.Close()

	/* get username and email from database */
	var username string
	var email string
	for rows.Next() {
		rows.Scan(&username, &email)
	}

	/* set username and email on profile */
	return c.Render("profile", fiber.Map{
		"Username": username,
		"Email": email,
	})
}

func index(c *fiber.Ctx, db *sql.DB) error{

	/* if user is logged in */
	cookie := c.Cookies("username")
	if len(cookie) > 0 {

		/* redirect to profile */
		return c.Redirect("/profile")
	}

	return c.Render("index", fiber.Map{})

}

func main(){

	/* load env variables */
	godotenv.Load()

	/* connect to postgres db */
	dbConnStr := fmt.Sprintf(`
		host=%s
		port=%s
		user=%s
		password=%s
		dbname=%s
		sslmode=disable`,
		os.Getenv("PGHOST"),
		os.Getenv("PGPORT"),
		os.Getenv("PGUSER"),
		os.Getenv("PGPASSWORD"),
		os.Getenv("PGDATABASE"))

	db, err := sql.Open("postgres", dbConnStr)

	/* postgres connection failed */
	if err != nil{
		log.Fatal(err)
	}

	/* create a new template engine */
	engine := html.New("../public", ".html")

	/* create a new fiber app */
	app := fiber.New(fiber.Config{
		Views: engine,
	})

//	app.Static("/", "../public")

	/* webpages */
    app.Get("/", func(c *fiber.Ctx) error {
		return index(c, db)
    })

    app.Get("/profile", func(c *fiber.Ctx) error {
		return profile(c, db)
    })

	/* post requests */
	app.Post("/signup", func(c *fiber.Ctx) error{
		return signUp(c, db)
	})

	app.Post("/logout", func(c *fiber.Ctx) error{
		return logOut(c, db)
	})

	app.Post("/login", func(c *fiber.Ctx) error{
		return logIn(c, db)
	})

	/* listen on port 3000 */
	app.Listen(":3000")
}
