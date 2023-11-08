<h1 align="center">Building APIs doing Outside-In TDD in Node and Typescript</h1>

This project was taken as part of learning task.

In this course I have learned to implement a REST API in Node with express and typescript. I have stored data in a mongodb database using mongoose. In order to implement this REST API, I have used an OpenAPI Specification (OAS) file which was the base to design and build our application.

The API created is a clone of the One Time Secret site. I have learned to create an application that stores our secrets and provides us a URL to access them later, but with the condition that we can access that URL one time only. Whenever we attempt to retrieve the same secret again, hitting the same URL for a second time, we will receive an error.


I have learned to use Test Driven Development (TDD) but following an Outside-In approach, also known as mockist approach or London School TDD. I have learned to write the acceptance criteria tests, keeping them in red, started the double cycle and wrote unit tests for the inner components. In this approach I have learned to make way inside the application, one level at a time until I made the acceptance test completely pass. While coding, even though I had a quite clear direction of our application design, I got inspired with DDD, Hexagonal Architecture and CQRS.

## Learned Topics

- [x] Build REST API in Node and TypeScript
- [x] Test with Jest framework
- [x] Outside-in TDD approach a.k.a. mockist a.k.a. London school TDD
- [x] Test doubles, mocks, spies, stubs, fakes and dummies
- [x] Mongo MongoDB Mongoose
- [x] Node and Express

## Certificate

- [Udemy Certificate for this course](https://www.udemy.com/certificate/UC-8f841fba-df81-403d-8866-021d34fdb8db/)