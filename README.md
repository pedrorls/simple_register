## Contents

1. [Getting started](#getting-started)
2. [Endpoints](#endpoints)

---

## Getting started <a name="getting-started"></a>
### Installation

- Install required system packages
```sh
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev libffi-dev libpq-dev liblzma-dev python-openssl git libxmlsec1-dev pkg-config
```

- Install pyenv
```sh
curl https://pyenv.run | sh
```

- Restart your shell

- Install the project's python version
```
pyenv install 3.7.3
```

- Install pipenv
```sh
pip install --user pipenv==2018.10.13
```
If the pipenv command is not recognized, try installing as root (with `sudo`)

- Install yarn
```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install yarn
```

- Go to project folder and activate environment
```sh
cd [project root]
pipenv shell
```

- Install backend dependencies
```sh
cd [project root]/api
pipenv sync -d
```

- Install frontend dependencies
```sh
cd [project root]/frontend
yarn
```

### Create databse  
```sh
cd [project root]/api
python manage.py migrate
```

### Create admin
- ps: you can use this admin user to login trough api
```sh
cd [project root]/api
python manage.py createsuperuser
```

### Run server
- run backend server
```sh
cd [project root]/api
python manage.py runserver
```
- run frontend server
```sh
cd [project root]/front
yarn start
```

## Endpoints <a name="endpoints"></a>
- PS: For any request jwt token most be include in the request headers
### Login/Get jwt Token
- URL
```sh
/token/get/
```
- Method
```sh
Post
```
- Form data
```sh
username
password
```
- Response
```
{ 
    token: code,
    user: { username: "user" }
}
```

### Refresh token
- URL
```sh
/token/refresh/
```
- Method
```sh
Post
```
- Form data
```sh
token
```
- Response
```
{ 
    token: code,
    user: { username: "user" }
}
```

### Verify token
- URL
```sh
POST /token/verify/
```
- Form data
```sh
token
```
- Response
```
{ 
    token: code,
    user: { username: "user" }
}
```

### Patient
- URL
```sh
- List and create patient
GET: /token/patient/
POST: /token/patient/
- Get or Update single patient 
GET: /token/patient/:patien_id/
PATCH: /token/patient/:patien_id/
```
- Form data
```sh
- POST/PATH
"id": 7,
"name": "Paciente 0",
"email": "paciente0@email.com",
"cpf": "12345678999",
"birth_date": "2020-09-13",
"phone": "12345678",
"address": {
    "id": 7,
    "street": "abc abc",
    "number": 12,
    "additional_adress": "abc1",
    "zip_code": "12345678",
    "city": "CE",
    "state": "CE"
}
```
- Response
```
-POST/PATCH/GET
{
    "id": 7,
    "name": "Paciente 0",
    "email": "paciente0@email.com",
    "cpf": "12345678999",
    "birth_date": "2020-09-13",
    "phone": "12345678",
    "address": {
        "id": 7,
        "street": "abc abc",
        "number": 12,
        "additional_adress": "abc1",
        "zip_code": "12345678",
        "city": "CE",
        "state": "CE"
    }
}
```
```
-GET(LIST)
[{
    "id": 7,
    "name": "Paciente 0",
    "email": "paciente0@email.com",
    "cpf": "12345678999",
    "birth_date": "2020-09-13",
    "phone": "12345678",
    "address": {
        "id": 7,
        "street": "abc abc",
        "number": 12,
        "additional_adress": "abc1",
        "zip_code": "12345678",
        "city": "CE",
        "state": "CE"
    }
}]
```
### Address
- URL
```sh
- List addresses
GET: /token/address/
GET: /token/address/:address_id/
```
- Response
```
[{
        "id": 7,
        "street": "abc abc",
        "number": 12,
        "additional_adress": "abc1",
        "zip_code": "12345678",
        "city": "CE",
        "state": "CE"
    }]
```
### Accounts
- URL
```sh
- List users
GET: /token/accounts/
GET: /token/accounts/:accounts_id/
```
- Response
```
[
    {
        "username": "pedro"
    }
]
```
