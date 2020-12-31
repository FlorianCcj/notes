JS - Redux Style Guide
######################

:source: https://redux.js.org/style-guide/style-guide/

Priority A: Essential
*********************

* do not mutate state
* reducers must not have side effect
* Do Not Put Non-Serializable Values in State or Actions
* Only One Redux Store Per App

Priority B: Strongly recommended
********************************

* Use Redux Toolkit for Writing Redux Logic
* Use Immer for Writing Immutable Updates
* Structure Files as Feature Folders or Ducks
* Put as Much Logic as Possible in Reducers
* Reducers Should Own the State Shape
* Name State Slices Based On the Stored Data
* Treat Reducers as State Machines
* Normalize Complex Nested/Relational State
* Model Actions as Events, Not Setters
* Write Meaningful Action Names
* Allow Many Reducers to Respond to the Same Action
* Avoid Dispatching Many Actions Sequentially
* Evaluate Where Each Piece of State Should Live
* Connect More Components to Read Data from the Store
* Use the Object Shorthand Form of mapDispatch with connect
* Call useSelector Multiple Times in Function Components
* Use Static Typing
* Use the Redux DevTools Extension for Debugging

Priority C: Recommended
***********************

* Write Action Types as domain/eventName
* Write Actions Using the Flux Standard Action Convention
* Use Action Creators
* Use Thunks for Async Logic
* Move Complex Logic Outside Components
* Use Selector Functions to Read from Store State
* Avoid Putting Form State In Redux
