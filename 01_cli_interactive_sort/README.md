Your first task is to write a small CLI application without any external dependencies that expects the user to enter a few words or numbers separated by a space. Next, the program should ask how to sort the user's input.

The complete flow should look like this:

Wait for user’s input
Ask what the user would like to see in the output - what operation to do with words and numbers, namely:
Sort words alphabetically
Show numbers from lesser to greater
Show numbers from bigger to smaller
Display words in ascending order by number of letters in the word
Show only unique words
Display only unique values from the set of words and numbers entered by the user
To exit the program, the user need to enter exit, otherwise the program will repeat itself again and again, asking for new data and suggesting sorting
** NOTE: Please make sure you’re not using any external npm or yarn dependencies. You should only use NodeJS built-in modules. Also, the execution of your application takes place strictly in the console. **