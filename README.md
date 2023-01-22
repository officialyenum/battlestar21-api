
# Battle Star 21 API
This is the Api that powers Battle Star Game using AI21 language model for  AI21 Labs Hackathon which took place on the 13th-20th of January 2023


## Table of Contents

-   [Technologies](#technologies)
-   [Getting Started](#getting-started)
    -   [Installation](#installation)
    -   [Usage](#usage)
    -   [AI21 Models Used](#ai21-models-used)
    -   [Testing](#testing)
    -   [Documentation](#documentation)
    -   [Deployment](#deployment)
    -   [Limitations](#limitations)
-   [Frontend React App Repo Info](#frontend-react-app-repo-info)
-   [Contribute](#contribute)
-   [Support](#support)
-   [License](#license)

## Technologies

-   [Node JS](https://nodejs.org/) - Node.js® is an open-source, cross-platform JavaScript runtime environment.
-   [Express JS](https://expressjs.com/) - Runtime Environment
-   [Mongo DB](https://www.mongodb.com/) - The developer data platform for any workload.
-   [Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js
-   [AI21 LABS](https://studio.ai21.com/overview) - AI21 Labs is an AI lab & product company whose mission is to re-imagine the way we read and write by making the machine a thought partner to humans.

## Getting Started


### Installation

-   git clone [Battle Star 21 API](https://github.com/officialyenum/battlestar21-api.git)
-   Run `npm install` to install packages.
-   Run `npm run dev` to run the application in development mode.

### Usage

This is the basic flow of the application.
-   Generate Stage
Encompasses three generate endpoints contained in the Node Server and broken down into the three below:
    1. Generate character: A character is a game agent that is created by the A21 AI model and has two basic features [ name and bio]. Character name and       bio were generated using the 'j1-jumbo(178B)' model; character bio is generated based on player's profession, hand-to-hand combat, primary skill, and       special skills. This is an automated process based on data used to train the 'j1-jumbo (178B)' model. 
    2. Generate stage: the stage of play or battle is generated using the 'j1-grande-instruct(beta)(17B)' model.
    3. Generate battle or story: this is same as the story or battle narration that explains what happens in a given battle. AS a visual being, this       can be used to visualize how the game would be played in real life. The 'j1-large (7.5B)' model was used to generate narrations following successful        training; and the players are highlighted together with the battle stage, battle winner, and battle scenario.
          
-   Battle with other Characters through Simulations
    The battle simulation comes after the 'parameter generations' are done. Here, the user makes a prediction of the battle's winner (all generated characters are assigned [total wins] and [total losses] of 0 and if same characters are randomly generated and selected, this stage is terminated since same characters cannot fight themselves). 
    Once the battle is successfully simulated, the user is awarded the 'battle star token' [this will be implemented in future modifications due to time constraint in this stage] and the award will be based on users who fulfilled the 'proof of stake' concept of the application - that is they stake some 'eth' to play the simulation and if their prediction is correct, they are rewarded (after submitting their 'proof of work'). 
    
-   Get Results after simulations
    After the battle simulation, the user is awarded with a '+battle star token' or '-eth' - this originates from the 'proof of stake' and 'proof of work' blockchain-based concepts that would be implemented in our next build. However, in this build, the user is awarded with a point if their prediction goes right or no point if it goes wrong. Additionally, the character who wins the fight gets a '+1 win' and the loser, a '+1 loss'. 


### AI21 Models Used

- Please click here [BS_GENERATE_NAME](https://studio.ai21.com/playground/complete?promptShare=efc3ba0d-fee4-41e1-8d45-0a162fa2b665) to access the BS_GENERATE_NAME Model oon AI21 Playground

- Please click here [BS_GENERATE_BIO](https://studio.ai21.com/playground/complete?promptShare=ab7bf249-1845-4e11-a5f5-b3340fd4ac0f) to access the BS_GENERATE_BIO Model oon AI21 Playground

- Please click here [BS_GENERATE_STAGE](https://studio.ai21.com/playground/complete?promptShare=32bddf70-1217-402b-b600-c45196d575be) to access the BS_GENERATE_STAGE Model oon AI21 Playground

- Please click here [BS_GENERATE_BATTLE](https://studio.ai21.com/playground/complete?promptShare=db156f9b-0369-46a6-acbe-addd51cbd276) to access the BS_GENERATE_BATTLE Model oon AI21 Playground


### Testing
-   No Test Implemented


### Documentation
-   Please click [here](https://documenter.getpostman.com/view/8719009/2s8ZDVb48d) to access the Postman Collection

### Deployment

This project is hosted on [vercel](https://vercel.com/)

-   Please click [here](https://battlestar21.vercel.app/) to access the hosted application
-   Please click [here](https://battlestar21-api.vercel.app/) to access the hosted API

### Limitations
-   Authentication is not implemented
-   Rewards not Implemented
-   Battle Generation Model still doesn't finish some stories, this happens 1 in 20 tries

### Next Steps
-   Authentication will be implemented so players can have 1-5 characters dey can battle with
-   Probably Earn Points for every battle won (The battle star token)
-   Make it Multiplayer & Enable Different Kinds of Battle simulations asides 1v1 
-   Upgrade Character Power up with points 
-   Player Battle History
-   Allow Players Swap and trade their Characters 
-   Battle Leader board from top winners to lowest winners
-   Implement Image Generation to Visualize the Battle Simulations.

## Frontend React App Repo Info

- Please click here [Battle Star 21 UI](https://github.com/officialyenum/battlestar21.git) to access the React Frontend app Repository

## Contribute

- Issue Tracker: https://www.github.com/officialyenum/battlestar21-api/issues
- Source Code: https://www.github.com/officialyenum/battlestar21-api

## Support

If you are having issues, please let me know.
I have a mailing list located at: oponechukwuyenum@gmail.com OR oponechukwuyenum@icloud.com

## License

The project is licensed under the MIT license.
