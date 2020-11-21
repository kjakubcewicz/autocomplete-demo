1. What is the difference between Component and PureComponent? give an
example where it might break my app.

`PureComponent` has a built-in lifecycle method `shouldComponentUpdate`. This method performs a shallow check of the component's state, so if a property changes deep in the state tree, such `PureComponent` might be not re-rendered.


2. Context + ShouldComponentUpdate might be dangerous. Can you think of
why is that?

Manually checking if the component should update might lead to errors in case when the update is not needed for a particular component, but the udpated value is needed in one its child components.


3. Describe 3 ways to pass information from a component to its PARENT.

- By passing a callback function from parent to child component. Such function should contain logic responsible for changing parent component state and it might accept some parameters from the child component.
- By using Context API. When parent and child component are wrapped with the same Context Provider and it provides a method to udpate its state. In such situation, child component can update Context's state and this will trigger re-renders of components which are reading values from this Context.
- By using external state management library like Redux. In case of update triggered by the child component, update event will be dispatched and parent component can react to that.


4. Give 2 ways to prevent components from re-rendering.

- Using `React.memo()` wisely
- Using `useMemo`, `useCallback` and `useEffect` with properly defined dependency arrays


5. What is a fragment and why do we need it? Give an example where it
might break my app.

Each React Component can return one element only, so React Fragment allows us to wrap and render multiple elements coming from the same component. React Fragment isn't visible in the DOM. In some cases this is an advantage, as we can reduce the HTML bloat with obsolete, non-semantic elements (`div` elements in most of the cases). However, because of that it cannot be, for example, styled. I cannot think of any case when it might break the app at the moment, unfortunately.


6. Give 3 examples of the HOC pattern.

HOC allow to extend functionalities of components. HOC pattern also allows to wrap React Class Components with multiple Contexts. Other examples might be:

- `withRouter` of `react-router` passing router properties to the component
- `withTranslation` of `react-i18next` passing internationalization methods to React Class Components
- `withTracking` of `react-tracking` library, which allows to inject tracking and analytics methods to components


7. what's the difference in handling exceptions in promises, callbacks and async...await.


8. How many arguments does setState take and why is it async.

`setState` is async, because React batches internally udpates of components' states. It takes two arguments, where the first one updates the state and the second serves as a callback, which can be used to trigger some logic after the update.


9. List the steps needed to migrate a Class to Function Component.

- Changing `class Component extends React.Component` to function `const component = () => {}`
- Deleting constructor and moving initial state to `useState` hooks (if applicable)
- Accepting `props` explicitly as parameter
- Rewriting class methods to functions (`getCustomer(params) {}` -> `const getCustomers = (params) => {}`)
- Returning component's markup in the return statement, without render method
- Moving logic from lifecycle methods to hooks (f.e. `useEffect`, `useReducer`, `useLayoutEffect`)
- Using `useState`'s tuple values to interact with component's state instead of reading it with `this.state` and udpating it with `this.setState()`
- Correcting all references using `this` (class methods, `this.props`, `this.state` etc.)
- Making sure all DOM interactions are still properly binded


10. List a few ways styles can be used with components.

- Using CSS modules and referring to elements with class names
- Using template tags containing styles (the way `styled-components`, `emotion` work)
- Using inline styles by adding `style` property to the markup (f.e. `style={{ borderColor: 'green' }}`)


11. How to render an HTML string coming from the server.

- Request the string from the API endpoint
- Check if the response isn't malformed, parse it
- Pass it to the component and make sure it will be re-rendered with new data

It works the same way with error messages coming from the server.
