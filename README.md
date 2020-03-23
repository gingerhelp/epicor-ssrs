# Epicor SSRS REST Example
This project will eventaually be turned into a blog post, but for the time being it is a repository set to show you how you can use the Epicor REST API via example of loading and submitting reports to the system task agent.

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

## Setup
You need to input an API key when you pull this up.  You generate that from API Key Maintenance within Epicor.  Ensure that the Access Scope that yuo configure has access to the ERP.Rpt.SalesOrderAck service.  Then add the SubmitToAgent method.
