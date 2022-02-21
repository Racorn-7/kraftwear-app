## Video playlist about anything KraftWear development related:
### https://www.youtube.com/playlist?list=PL2kzWpyQvtaqdlNtfNyr03QMA40aEPnh5

## Steps to follow at first launch (one time only):

0.  ### Set Up VS Code (recommended)
    Download and install VS Code:<br />
    https://code.visualstudio.com <br />
    Open the folder containing the code in VSCode.<br />
    Navigate to the folder you want to keep a local copu of the code in.<br />
    Open a terminal inside VSCode: View > Terminal  (or CTRL + ` ) <br />
    

1.  Check if npm is installed already:<br />
    #### `npm -v`
    If not, then download and install Node.js (including npm): <br /> 
    https://www.npmjs.com/get-npm <br />

2.  Clone the repository into a local folder you want to keep your local version of the code <br />
    https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository
    #### `git clone https://github.research.its.qmul.ac.uk/ec18270/kraftwear.git`
    This will only work if your are added to the contributors (if not, send your ec-number to Mate).
    
3.  Make sure you are in the kraftwear folder (pwd), if not type cd kratwear
    #### `cd kraftwear`

4.  Then run 
    #### `npm install`
    from terminal. <br />
    This will install all the node dependencies needed for the server side (might take a while).<br />
    
5.  Then go inside client folder
    #### `cd client`
    
6.  Then install node dependecies for the client too
    #### `npm install`

7.  ### Set your creditentials
    You will need your password for it (sent in that research github email).<br />
    
    Set your username:<br />
    #### git config --global user.name "QMUL-USERNAME"
    where the QMUL-USERNAME is your ec number (mine is ec18270 for example). <br />
    This is needed so your commits will be attached to your name. <br /> 
    
    Set your email address:<br />
    #### git config --global user.email "MY_NAME@example.com"
    using your QMUL email address that is registered on github research<br />
    
    To check if changes are done type:<br />
    #### git config user.name
    #### git config user.email

## Steps to follow every time you want to make changes from terminal (or use VSCode - recommended)

1.  ### Run development preview:
    Make sure you are in the root (kraftwear) folder and type in the same terminal (console):
    #### `npm run dev`
    and hit enter. This will open a browser window with address localhost:3000<br />
    (and also start the server on port 5000) shows you a live preview of the site. <br />
    Live means, any changes you make to the code, <br />
    once you hit save it refreshes the browser page so you don't have to.<br />
    
    ### If you are using VSCode you do not need to use the following commands (see video 2).
    
2.  ### To stage the changes:
    Means adding your changes to a list of files to commit.<br />
    #### `git add --a`
    where the --a part stands for all changes made

3.  ### To commit the added changes:
    type
    #### `git commit -m”meaningful commit message”`

4.  ### To push from local to remote repo
    Meaning you send your changes to the remote repository for everyone to see and use (to gitHub)
    #### `git push origin master`
    
5.  ### To pull from remote to your local repo
    Meaning you update to see the latest version of the project
    #### `git pull origin master`


********************************************************************************************************************


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
