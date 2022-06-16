package main

import (
	"fmt"
	"os"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/omeid/pgerror"
	"golang.org/x/crypto/bcrypt"
	"github.com/dgrijalva/jwt-go"

	"database/sql"
	_ "github.com/lib/pq"
)

func signup(c *fiber.Ctx, db *sql.DB) error{

	/* json data */
	payload := struct{
		Username  string `json: "username"`
		Forename string `json: "fname"`
		Surname string `json: "lname"`
		Password string `json: "password"`
		Phone string `json: "phone"`
	}{}

	/* post request failed */
	if err := c.BodyParser(&payload); err != nil {
		return c.JSON(&fiber.Map{"err": "Failed to send data to server..."});
	}

	/* username is empty */
	if len(payload.Username) < 0 {
		return c.JSON(&fiber.Map{"err": "Please enter a username..."});
	}

	/* password is empty */
	if len(payload.Password) < 0 {
		return c.JSON(&fiber.Map{"err": "Please enter a password..."});
	}

	/* forename is empty */
	if len(payload.Forename) < 0 {
		return c.JSON(&fiber.Map{"err": "Please enter a first name..."});
	}

	/* surname is empty */
	if len(payload.Surname) < 0 {
		return c.JSON(&fiber.Map{"err": "Please enter a last name..."});
	}

	/* hash password */
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(&fiber.Map{"err": "Failed to send data to server..."});
	}

	/* create access token */
	accToken := jwt.New(jwt.SigningMethodHS256)
	accClaims := accToken.Claims.(jwt.MapClaims)
	accClaims["username"] = payload.Username
	accClaims["exp"] = time.Now().Add(time.Hour * 1).Unix() /* 1 hour */
	accTokenString, err := accToken.SignedString([]byte(os.Getenv("JWTKEY")))
	if err != nil {
		return c.JSON(&fiber.Map{"err": "Failed to send data to server..."});
	}

	/* create refresh token */
	refToken := jwt.New(jwt.SigningMethodHS256)
	refClaims := refToken.Claims.(jwt.MapClaims)
	refClaims["username"] = payload.Username
	refClaims["exp"] = time.Now().Add(time.Hour * 24 * 15).Unix() /* 15 days */
	refTokenString, err := refToken.SignedString([]byte(os.Getenv("JWTKEY")))
	if err != nil {
		return c.JSON(&fiber.Map{"err": "Failed to send data to server..."});
	}

	/* insert statement */
	sqlStatement := `
		insert into accounts(
			username,
			first_name,
			last_name,
			password,
			phone_number
		)
		values ($1, $2, $3, $4, $5)`

	/* insert the data! */
	_, err = db.Exec(
		sqlStatement,
		payload.Username,
		payload.Forename,
		payload.Surname,
		hashedPassword,
		payload.Phone)

	/* sql insert failed */
	if err != nil {

		/* duplicate username */
		if e := pgerror.UniqueViolation(err); e != nil {
			return c.JSON(&fiber.Map{"err": "Username already exists..."});
		}

		/* something else went wrong */
		return c.JSON(&fiber.Map{"err": "Failed to write to database..."});
	}

	/* sign up success */
	return c.JSON(&fiber.Map{
		"accessToken": accTokenString,
		"refreshToken": refTokenString,
		"username": payload.Username});
}

func login(c *fiber.Ctx, db *sql.DB) error{

	/* json data */
	payload := struct{
		Username string `json: "username"`
		Password string `json: "password"`
	}{}

	/* post request failed */
	if err := c.BodyParser(&payload); err != nil {
		return c.JSON(&fiber.Map{"err": "Failed to send data to server..."});
	}

	/* username is empty */
	if len(payload.Username) < 0 {
		return c.JSON(&fiber.Map{"err": "Please enter a username..."});
	}

	/* password is empty */
	if len(payload.Password) < 0 {
		return c.JSON(&fiber.Map{"err": "Please enter a password..."});
	}

	/* create access token */
	accToken := jwt.New(jwt.SigningMethodHS256)
	accClaims := accToken.Claims.(jwt.MapClaims)
	accClaims["username"] = payload.Username
	accClaims["exp"] = time.Now().Add(time.Hour * 1).Unix() /* 1 hour */
	accTokenString, err := accToken.SignedString([]byte(os.Getenv("JWTKEY")))
	if err != nil {
		return c.JSON(&fiber.Map{"err": "Failed to send data to server..."});
	}

	/* create refresh token */
	refToken := jwt.New(jwt.SigningMethodHS256)
	refClaims := refToken.Claims.(jwt.MapClaims)
	refClaims["username"] = payload.Username
	refClaims["exp"] = time.Now().Add(time.Hour * 24 * 15).Unix() /* 15 days */
	refTokenString, err := refToken.SignedString([]byte(os.Getenv("JWTKEY")))
	if err != nil {
		return c.JSON(&fiber.Map{"err": "Failed to send data to server..."});
	}

	/* select statement */
	sqlStatement := `
		select password
		from accounts
		where username = $1`

	/* query the database! */
	rows, err := db.Query(sqlStatement, payload.Username)

	/* sql select failed */
	if err != nil {
		return c.JSON(&fiber.Map{"err": "Oops! Something went wrong..."});
	}

	/* close the rows */
	defer rows.Close()

	/* get password from database */
	var password string
	for rows.Next() {
		rows.Scan(&password)
	}

	/* password doesn't match */
	if err := bcrypt.CompareHashAndPassword([]byte(password), []byte(payload.Password)); err != nil {
		return c.JSON(&fiber.Map{"err": "Invalid username or password..."});
	}

	/* select statement */
	sqlStatement = `
		select device_id, type
		from devices
		where owner = $1`

	/* query the database! */
	rows, err := db.Query(sqlStatement, payload.Username)

	/* sql select failed */
	if err != nil {
		return c.JSON(&fiber.Map{"err": "Oops! Something went wrong..."});
	}

	defer rows.Close()

	/* struct and array to store devices */
	type device struct {
		Id string `json:"id"`
		Category string `json:"type"`
	}

	var devices []device

	/* iterate through rows */
	for rows.Next() {

		/* device struct for current row */
		var d device

		/* something went wrong */
		err = rows.Scan(&d.Id, &d.Category)
		if err != nil {
			return c.JSON(&fiber.Map{"err": "Oops! Something went wrong..."});
		}

		/* add current device to array */
		devices = append(devices, d)
	}

	/* something went wrong */
	err = rows.Err()
	if err != nil {
		return c.JSON(&fiber.Map{"err": "Oops! Something went wrong..."});
	}

	/* sign up success */
	return c.JSON(&fiber.Map{
		"accessToken": accTokenString,
		"refreshToken": refTokenString,
		"username": payload.Username,
		"devices": devices});
}

func registerdevice(c *fiber.Ctx, db *sql.DB) error{

	/* json data */
	payload := struct{
		DeviceId  string `json: "deviceId"`
		Username string `json: "username"`
	}{}

	/* post request failed */
	if err := c.BodyParser(&payload); err != nil {
		return c.JSON(&fiber.Map{"err": "Failed to send data to server..."});
	}

	/* device id is empty */
	if len(payload.DeviceId) < 0 {
		return c.JSON(&fiber.Map{"err": "Please enter a username..."});
	}

	/* insert statement */
	sqlStatement := `
		select device_id, type
		from devices
		where device_id = $1`

	/* insert the data! */
	rows, err = db.Exec(
		sqlStatement,
		payload.DeviceId)

	/* close the rows */
	defer rows.Close()

	/* sql insert failed */
	if err != nil {

		/* duplicate username */
		if e := pgerror.NoDataFound(err); e != nil {
			return c.JSON(&fiber.Map{"err": "Device ID does not exist..."});
		}

		/* something else went wrong */
		return c.JSON(&fiber.Map{"err": "Failed to write to database..."});
	}
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
		dbname=%s`,
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

	/* create a new fiber app */
	app := fiber.New()

	/* post requests */
	app.Post("/sign-up", func(c *fiber.Ctx) error{
		return signup(c, db)
	})

	app.Post("/login", func(c *fiber.Ctx) error{
		return login(c, db)
	})

	app.Post("/register-device", func(c *fiber.Ctx) error{
		return registerdevice(c, db)
	})

	/* listen on port 3000 */
	app.Listen(":3000")
}
