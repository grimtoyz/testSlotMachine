Notes / TODO commentaries / known issues:

1) Currently the reels do not have an infinite loop option, which is essential 
for a client/server implementation. A good way to go would be to refactor the code so
the slot machine would have states, such as 'accelerating', 'spinning', 'stopping', etc. The states
would be handled via finite state machine. When there's no response from server the reels should just keep
spinning. When there's a response, they start to decelerate. 

2) To achieve consistent reel speeds and to make each real stop after certain time, the index of model reel data 
should be offset while the reel is spinning fast. So the next symbols coming would be, for example, 10 symbols till
the desired one. This way every reel will have 10 symbols to scroll till the full stop.

3) Paytable class and its connection to the reward calculator are written poorly and need strong refactoring.
Also the layout of the paytable is mostly hardcoded and need to be redone to achieve responsiveness.

4) Current implementation does not support nice tranbsitions for the reels, such as rolling back at start and 
back easing on stop. This could be done via system described above in paragraph 1.

5) Reel Class could be separated into two classes, for example ReelView and ReelSpinner, currently its
messy. One of the classes would handle only showing symbols at given positions and the other one would handle all
the business logic and work with the model

6) Did not have time to create config files, which probably would be handy. All the reels 
settings, velocity, reel maps, rewards, etc. could be moved to JSON file, to make gameplay tweaking more
convenient.

7) blinking is currently duplicated in two classes. I would move this to a separate class



  
    