Image Processing API [Uadcity advanced track first project]

Step One (project structuring):

As the project is build using typescript and server side node js then compiled to a dist folder, and needs using of prettier, eslint and testing using Jasmine, :

- Creating src folder containing index.ts file for building localseerver and for the main directory.
- Inside the src folder also:
    - Creating routes folder containing api file as router.
    - Creating middleware folder containing middelwares.ts file for middlewares.
    - Creating utiles folder containing utiles files:
        - path.ts for image file path.
        - resize.ts for resinzing function.
    - Creating tests folder conatining:
        - indexSpec.ts file for testing index.ts codes.
        - helpers folder containing reportes.ts file with its congigurations.

- Creating spec folder containing support folder containing jasmine.jason file for directin jasmine to folders and files for testing.

- Creating image folder containing images needed to be published or resized.

- Creating resized folder for redirecting resized inages into it.


Step Two:

- Running node to my app throught npm init and making config. also package.json file apears.
- Creating proper scripts needed in the package.json file:
    - "lint": "eslint . --ext. ts",
    - "prettier": "prettier --config .prettierrc {,!(node_modules)/**/}*.ts --write",
    - "build": "npx tsc",
    - "jasmine": "jasmine",
    - "test": "npm run build && npm run jasmine",
    - "start": "nodemon src/index.ts"
- Creating tsconfig.json file for typescript config. using npx tsc --init 
- Installing needed dependencies and dev_dependencies and type definitions (as indicated in package.json file) from:
    - npm i dependancy name (in dependencies)
    - npm i --save-dev dependancy name (in dev_dependencies)
    - npm i --save-dev type definition name (in dev_dependencies)
- Creating .prettierrc, .eslintrc, .prettierignore, .eslintignore and .gitignore files for ignoring node_modules dist folders using echo {}> file name.


Step Three:
 - Building the server (as shown in index.ts file):
    - importing express
    - const app = express();
    - Creating a port and listening on it on a local host.
 - Creating the main api end point using get request. 


Step Four:

- As shown inthe code sequense runnung the code with the idea of:
    - Creating end point with its queries in the api.ts.
    - Creating middlewares (for queries checking using conditions) & utile function (for sharp resinzing)
    - Using export and import properly for modules.
    - Responding with:
        - Importing image found in the image folder if no width and height query parameters were assigned.
        - Resizied image from the image folder using sharp library and redirecting it to the resized folder (after checking that it is not included in the folder) if width and height parameters were assigned.
        - Importing already resized image from the resized folder (after checking that it is included in the folder {cashing}) if width and height parameters were assigned.
        - Proper error codes indicating error type.


Step Five:

- Making some code testing using Jasmine to test that the code is running properly.
    - Test endpoint responses at http://localhost:8000
        - Test if main route is working
        - Test /api without query parameters
        - Test /api with query: name: invalid
        - Test /api with query: name: valid
        - Test /api with query: name: valid, width / height: valid only
        - Test /api with query: name: valid, width: valid and height: valid
        - Test /api with query: name: valid, width: valid and height: invalid
        - Test /api with query: name: valid, width: invalid and height: valid
    - Resize function testing