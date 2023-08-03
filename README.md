# OCAT - ITSC Internship Project

In this project, you will have the opportunity to explore the basics of testing a web-based application as carried out at the ITSC. You will learn about some of the core technologies we use to build tests such as [cypress](https://docs.cypress.io/guides/overview/why-cypress) and other libraries. Below, you'll find a comprehensive list of all the technologies used in this project.

This project uses a minified system of a the ORAS system as the Application under Test (AUT), a project used by probation officers to assess the offender's likelihood of recommitting a crime (recidivism) and the factors in an offender's life that are directly related to recidivism (criminogenic needs). You'll be building a testing suite that mimics a user creating and deleting assessments.

Make sure you review the [Guidelines section](#guidelines) to learn about when and how you should seek help.

Good luck!

## About Web Development and Testing

At a high-level, every web application is composed of different elements:

- **Front-end**: that's the code the runs on the user's browser. It interfaces with the user's interactions, captures their input and sends it to the application server or the backend.
  - We use React.js to build the user interface. It allows us to combine HTML, CSS, and JavaScript to build UI components and pages.
- **Back-end**: This code runs on the server, it receives the user requests and inputs, processes it, stores it in a database and sends it back to the user when needed.
- **Database**: This is where the data is stored. It's a collection of tables that store information about the users, the application, and the interactions between them.

Each one of those layers will need to communicate with the others. For example, the front-end will need to send requests to the back-end to get data from the database. The back-end will need to send requests to the database to store data. The database will need to send requests to the back-end to retrieve data. And so on.

- **Testing**: Cypress is an end-to-end testing tool, meaning that it tests the integration between all these layers at once by mimicking a user's actions. Other testing types isolate each of these layers and test only that part, but Cypress tests them all at once.

You'll find that we need to use a number of other libraries and tools to compliment our work. For example, we will need to create test data for our tests that make each test run unique. We will need to use a version control system like Git/GitHub to keep track of our code and collaborate with others. And so on.

## Technologies

- Version Control
  - [git](https://git-scm.com/) and [Github](https://github.com/)
- Package Manager (for Node.js)
  - [npm](https://www.npmjs.com/)
- Testing tool
  - [cypress](https://docs.cypress.io/guides/overview/why-cypress)

## Application Under Test

To be able to test an application, one needs to understand the AUT's business logic, i.e. why and how a user uses the application and how the application is built.

### Application explanation
This application allows users to log in, create assessments on different cats that will track the score and risk level as follows:
  - 0-1: Low
  - 2-3: Medium
  - 4-5: High

As the user goes through the assessment, the risk level and score should automatically update in the form and show correctly in the list.

This application allows users to delete assessments as well. When an assessment is deleted, it should immediately be removed from the list and not show again when they revisit the list.

### Architecture of AUT
- Client: User interface for interacting with the API (the "front-end" of the application)
- API: layer that receives requests from the front-end or a 3rd party and processes the request with the database. Allows for outside integration.
  - [Basic API explanation](https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/)
  - [CRUD Basics](https://www.codecademy.com/articles/what-is-crud)

# 🏁 Let's Get Started

## Tasks/Milestones

We will need to complete the following tasks to complete the project. Each task will be broken down into smaller milestones. You will be able to track your progress using the provided Project Board template.

1. [Project Setup](#a-project-setup)
2. [Setup Development Environment](#b-setup-development-environment)
3. [Build the Tests](#c-features)

### A. Project Setup

1. Copy the Template Repository
NOTE: You can name this whatever you want, just make certain that you leave it "Public" so that others can view your code
    - Template:
        - [OCAT_Intern_Template](https://github.com/zinkjm/OCAT-QA-Template)
    - Resources:
        - [Creating a Repository from a Template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)
1. Copy the Template Project Board
    - NOTE: This is something you should keep constantly up-to-date. It is how we will track your progress, and it will facilitate code review and collaboration with your OCAT internship peers.
        - Template:
            - [OCAT Project Board](https://github.com/zinkjm/OCAT-QA-Template/projects/1) TODO change this to QA template
        - Resources:
            - [Copying a Project Board](https://docs.github.com/en/github/managing-your-work-on-github/copying-a-project-board)
2. Add the Provided Issues to your Project Board
    - Issues:
        - [OCAT Issues](./docs/issues.md)
    - Resources:
        - [Creating an Issue](https://docs.github.com/en/github/managing-your-work-on-github/creating-an-issue)
        - [Adding Issues to a Project Board](https://docs.github.com/en/github/managing-your-work-on-github/adding-issues-and-pull-requests-to-a-project-board#adding-issues-and-pull-requests-to-a-project-board-from-the-sidebar)

### B. Setup Development Environment


#### Navigating the OCAT File Structure

We have created some CodeTours for you to help you understand the first couple tasks.

Make sure you have installed the recommended extensions, then see the [Starting CodeTours Documentation](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour#starting-tours) for instructions on viewing our tours

1. Clone your new repository
    - [Cloning a Repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
2. [Install NodeJS 16.x](docs/install_nodejs.md) on your computer
3.  Install a PostgreSQL database and setup a local database instance. See [this guide](docs/install_postgres.md) for instructions.
4. Running the project and cypress
    - Navigate into the packages/client/ directory ``cd packages/client/``
    - ``npm install``
        - [npm install](https://docs.npmjs.com/cli/install#:~:text=npm%20install%20(in%20package%20directory,directory)%20as%20a%20global%20package.)
    - ``npm start``
    - Open a second terminal window and navigate into the packages/api/ directory ``cd packages/api/``
    - ``npm install``
    - ``npm start``
    - Navigate into the packages/cypress/ directory ``cd packages/cypress/``
    - ``npm install``
    - ``npm run cypress``

5. Verify that all recommended extensions are installed
    - [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [formulahendry.auto-rename-tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
    - [mgmcdermott.vscode-language-babel](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
    - [visualstudioexptteam.vscodeintellicode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
    - [streetsidesoftware.code-spell-checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
    - [gruntfuggly.todo-tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)
    - [vsls-contrib.codetour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour)
    - [herrmannplatz.npm-dependency-links](https://marketplace.visualstudio.com/items?itemName=herrmannplatz.npm-dependency-links)
    - [christian-kohler.path-intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
6. Start the "Task 1" CodeTour
    - [Starting Tours](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour#starting-tours)
7. Happy Coding!

### C. Tests

- NOTE: These are the general requirements for tests 1, 2 and 3. For specific instructions, see the code tours.
- NOTE: All work should be done on a separate "branch" so that it can be code reviewed. Below are instructions on how to create a new branch:
  - [Creating a branch](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/managing-branches#creating-a-branch)

1. Create test for user creating an assessment based on the use case report: [use case report](./docs/create_assessment_use_case.md)
   - Create a way for the user to log in
   - Create a cypress.env.json to enter login credentials for the user
   - Add data-testids to the client page
   - Organize the test
   - Create tests for the flow and post-conditions
   - Delete the created through the API afterward

2. Create a test for deleting an assessment
   - Create a use case report using the following template [use case template](./docs/use_case_report.md)
   - Add data-testids to the assessment list page
   - Organize the test
   - Create tests for flows and postconditions

3. Create a test for login functionality
    - This should have alternate flows and exceptions for wrong credentials input

4. critical test suite
   - Critical test suites are a subset of the full testing suite, only including tests that are most valuable features and user workflows.
   - Add the most important tests to the critical test suite and run the suite to see if they pass

6. Prepare your presentation!

## Guidelines

- Setup
  - PLEASE ask if you're having trouble setting up your project repository, project board, first branch, or development environment. The mentors are here to help you! We want to make sure you get off to a great start and this part is often the most challenging, so please don't hesitate to come to us immediately with any setup concerns!
- Hour/Day Policy
  - If you've been stuck on something for two hours, ask a fellow intern!
  - If you've been stuck on something for a full day, ask a mentor!
- Process for Getting Unstuck
    1. Search through the available resources in this document (located at the bottom of the page and throughout)
    2. Google! This is your most valuable resource and learning how to search the internet for your answer is going to be your most valuable skill moving forward! Forum resources like StackOverflow can be extremely helpful. In web development, there's almost always someone who has encountered your problem before. The trick lies in finding that answer!
    3. Ask an OCAT internship peer
       1. We encourage that you help each other, but please do not just copy each other's code. This is a collaborative process, and asking questions when you're confused is an important part of learning! On the flip-side of that, teaching someone else or helping them through a problem is the best way to further cement that knowledge in your own mind. So ask questions when you're stuck and help point your fellow teammates in the right direction!
    4. Ask an OCAT mentor
- [Code Review](./docs/code_review.md) Guidelines
  - Please follow the code review guidelines when submitting your code for review. This will help ensure that your code is reviewed in a timely manner and that you get the most out of your code review experience.

## Resources

- **Cypress**
- [Main Page](https://docs.cypress.io/guides/overview/why-cypress)
- [Command Guide](https://docs.cypress.io/api/table-of-contents)
- [Writing your first test](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)

- **Faker**
- [Documentation](https://fakerjs.dev/api/)

- **PostgreSQL**
  - [Documentation](https://www.postgresql.org/)
  - Access the Database
    - Windows developers should use -> [pgAdmin](https://www.pgadmin.org/download/)
    - Mac developers should use -> [postico](https://eggerapps.at/postico/)

## Advanced Resources
