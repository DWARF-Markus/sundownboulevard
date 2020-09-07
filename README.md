# SUNDOWN BOULEVARD

Below you'll find information on installation along with a list of specs of this applicatoin.

## Installation
1) Clone repository
2) Change directory to the root of the project
3) Run 'npm install' to install all dependencies
4) Run 'cp .env.example .env' to create your environment file
5) Fill out the REACT_APP_API_TOKEN in .env with a valid token
6) Run 'npm run start' to run application as in dev mode / Run 'npm run build' to build the application


## Specs
### CREATE
1) Create a new booking (with datetime for booking, along with people amount and email).
2) Apply dish to the given booking (generated from a random-dish-generator API) (NOTE: This dish will now be served in the quantity of the people in the booking).
3) Select drinks to the given booking (generated from a beer API) (NOTE: You can only select as many drinks as there are people in the booking) .

### READ & UPDATE
4) Get your booking by entering your email on the landing page, if the application recognize the given email it will fill out all the data in the flow.
5) Update the given booking by entering and overwriting with new data.

### DELETE
6) As you have entered your email you're now also given the possibility to delete the booking.
