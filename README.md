# health-cloud-app

A Firebase Cloud Functions repository for Heart Rate Monitor cloud project, as part of the Software Development for the Cloud course at HKR.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Set up Node.js 8 or later on your local environment. Once you have npm installed, install the Firebase CLI via npm

```
npm install -g firebase-tools
firebase login
```

## How to run functions locally

All functions are authenticated except register, so first of all, you will need an auth token. For that, you can run a local login server using
```
npm run serve
```

Log in, and copy your authentication token. Then, run

```
npm run shell
```
to run the Firebase Shell. From there you can execute your functions, the documentation on how to craft your request is [here](https://www.npmjs.com/package/request).
What follows is an example. If you would like to test the 'get all users data' function, in the shell you would enter

```
data.get().auth(null, null, true, 'your auth token');
```

You can also use Postman, just add your token in your bearer authentication header, and run this instead of the shell.

```
npm run serve:functions
```

## Author

Abdulrahman Alassadi

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
