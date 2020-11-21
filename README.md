# Autocomplete demo

In order to run the demo, check out to root folder of the project and run the following command in the terminal:

```
yarn && yarn start
```

The autocomplete component will be displayed automatically at http://localhost:3000


### Notice

Apart from issues marked with `TODO` tags in the code, this project needs unit/integration tests at least for following cases:
- happy path (there is an input in the document, user is able to type in it and after providing some value, a list with matched customers appears in the document)
- in case of API error, error message is displayed in the document
- loading indicator is visible for the user while fetching data from the API
- users are able to choose a customer and after they click the button, proper message is shown