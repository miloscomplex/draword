An application to play a game where user one draws to communicate the word not revealed to guessing user one (or more). User two can see what user one is drawing live and submits guesses via a text form. If user two can guess it in the allotted time, they win. If not, they lose.

REFERENCE https://codepen.io/yananas/pen/rwvZvY

### MVP

- [ ] No longer going to win screen?

- [ ] Add timer just do web sockets to guessers 

- [x] Fix game flow logic to avoid stuck state in phraseSelector

- [ ] May need to add a true/false statement b/c currently drawer_id can be false and it displays

- [ ] Implement a server-side user tracker

- [ ] Broadcast to users if drawer leaves or enters the room

- [ ] Refactor code to and include checks and reloads of server data

- [ ] Implement the waiting state for Thunk

- [x] Build out the Rails backend

- [x] Create Landing Page component

- [~] (need to verify) Add validation and limit unused routes

- [x] Use the correct design patterns to build frontend

- [x] Build Canvas component

- [x] Verification of Room URL

- [x] Build Chat component

- [x] Build PhraseSelector component

- [x] Integrate API check/setter for selected_phrase_id

- [ ] Build Leaderboard component

- [x] Utilize Router to switch out content

- [x] ChatArea auto scrolls to bottom

- [ ] Define role assignment for the rooms

- [ ] one drawer per room

- [ ] unlimited guessers

- [x] The application contains a canvas that you can draw on with mousing down while in the canvas's constraints.

- [ ] A list of 3 words appears to the drawing user to choose one to draw, the three words are selected from a preexisting list

- [ ] A timer starts once the word is selected.

- [ ] For the drawee, the chat box is disabled, but you can see everyone's messages.

- [ ] The word array is filtered not to repeat words per session.

- [ ] Guessing user observes Drawing user draw and guesses the word via a text input box.

- [ ] The guesses are logged to a chatbox, so other users and the drawing user can see them.

- [ ] The game is won when the word is guessed.

- [ ] The game is lost if time expires.

- [ ] They can try another word if they win or lose.

- [ ] Have a congratulations box and allow the score to be submitted (Word and elapsed time).

- [x] Utilize web-sockets to show the drawings live.

- [ ] Scores can be submitted with name and initials.

### Stretch Goals

- [ ] Give message bubbles colors per user.

- [ ] Setup action-cable for swapping the buttons on the room page

- [ ] Make the canvas a flex size instead of static

- [ ] Add color shift to text when time changes or points are reduced

- [ ] Gallery of guessed phrases

- [ ] There's an UNDO button ** look at ctx.save()

- [ ] There are users accounts and authentication.

- [ ] The score is accumulated with additional rounds
With every guess points are deducted

- [ ] Elapsed time decrements points

- [ ] There are users and authentication

- [ ] The score is accumulated for the session

- [ ] The list of phrases should have a difficulty rating, easy, medium, and hard.

- [ ] The drawing tools include various brush sizes and colors and a clear function.

- [ ] The drawing tools include an eraser.

- [ ] The drawing user can fill in the background.

- [ ] Your account keeps track of words you have encountered.

- [ ] Your account will display your past performance.

https://dev.to/satansdeer/lets-build-a-drawing-application-using-react-and-canvas-api-2alj
