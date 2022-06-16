#!/bin/sh

# create a random username
RANDUSER=$(openssl rand -hex 20)
RANDPASS=$(openssl rand -hex 20)

# server urls
SIGNUPURL="http://127.0.0.1:3000/sign-up"
LOGINURL="http://127.0.0.1:3000/login"

# create an empty account
echo "--- creating an account with no username ---"
curl -X POST -H "Content-Type: application/json" -d '{"username": "", "fname": "test", "lname": "user", "password": "", "phone": "12345678901"}' "$SIGNUPURL"
echo "\n\n\n"

# create a new account
echo "--- creating a new test account ---"
curl -X POST -H "Content-Type: application/json" -d '{"username": "'"$RANDUSER"'", "fname": "test", "lname": "user", "password": "'"$RANDPASS"'", "phone": "123456789031"}' "$SIGNUPURL"
echo "\n\n\n"

# create the same account
echo "--- creating the same test account ---"
curl -X POST -H "Content-Type: application/json" -d '{"username": "'"$RANDUSER"'", "fname": "test", "lname": "user", "password": "'"$RANDPASS"'", "phone": "12345678901"}' "$SIGNUPURL"
echo "\n\n\n"

# log in an empty account
echo "--- logging in to an empty account ---"
curl -X POST -H "Content-Type: application/json" -d '{"username": "", "password": ""}' "$LOGINURL"
echo "\n\n\n"

# log in to the same account
echo "--- logging in to the same account ---"
curl -X POST -H "Content-Type: application/json" -d '{"username": "'"$RANDUSER"'", "password": "'"$RANDPASS"'"}' "$LOGINURL"
echo "\n\n\n"

# log in to the same account with incorrect password
echo "--- logging in to the same account with an incorrect password ---"
curl -X POST -H "Content-Type: application/json" -d '{"username": "'"$RANDUSER"'", "password": "invalidpass"}' "$LOGINURL"
echo "\n\n\n"
