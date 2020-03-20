# Epicor SSRS REST Example
This project was intended to serve as the basis for a blog post I am working on at my website (gingerhelp.com) regarding the use of the Epicor REST API.  At the moment you can see how it allows you to pull up your reports from system monitor and view any of them.  I was also hoping to show how a report request could be submitted (i.e. generate a sales order acknowledgement) but I am finding that Epicor Cloud MT customers seem to access the SubmitToAgent method (unless I am doing it wrong).  Regardless, I am publishing this in case any of the work here is helpful to anybody.

## Installation
This is a Node.JS project so to run this project you will need to do the following:

1. Ensure you have installed the latest LTS version of Node.JS from https://nodejs.org/.
2. Check out the code from this repository from a command line in the directory where you wish to check out the code:

```
git clone https://github.com/gingerhelp/epicor-ssrs.git
```

3. Change into the newly created directory and execute the following command:

```
npm install
```

4. Start the server using the following command:

```
npm run start
```

5. Now navigate to http://localhost:3000 to test it out.
