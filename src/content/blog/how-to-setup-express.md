---
title : 'writing express projects in 2026'
description: 'how to write and set up express projects in the year of ai'
pubDate: 'Jun 24 2026'
heroImage: ''
---


# how can we set up a node js project in 2026

we first have to make a folder `mkdir new-project`

we cd into it 

now we isntall the essential typescript dependencies cause its 2026 and nobody uses javascript
we use pnpm as well

```bash
pnpm add --save-dev typescript @types/node tsx
```
these are dev dependencies cause they are just here to streamline development out 


now lets create a tsconfig file we can do this by 
```bash
tsc --init
```

lets go to the `.tsconfig` file and edit the outdir to be `build` folder

```tsconfig.json
outDir:"build"
```

now lets edit the package.json file and add a few scripts that will give us access 
to `pnpm run dev` `pnpm run start` commands 

```package.json
{
	"dependencies": {
		"typescript": "^6.0.3",
		"@types/node": "^26.0.0",
		"tsx": "^4.22.4"
	},
	"scripts":{
	   "dev":"tsx watch ./src/index.ts",
		"build": "tsc .",
		"start": "node ./build/main.js"
	}
}
```

tsx will restart our servers when something changes during dev  making it easy to test 


now we write a gitignore file to save nodemodules from going to github 

```.gitignore
node_modules/
.env

```

we are also add .env here so that we dont accidently push our api keys to git 

speaking of api keys lets also add dotenv to our project
```sh
pnpm add dotenv
```

now lets add express 


## adding express 

```sh
pnpm add express
pnpm add --save-dev @types/express
```

lets create now an `src` folder this is where our app will live
inside src folder we create `index.ts`

```ts

import express from "express"

let app = express();


app.get("/",(req,res)=>{
	 res.status(200).json({
		  message:"hello atoms!!"
	 })
})

app.listen(3000,()=>{
  console.log("server started")
})
```
lets now test if this app works 
now our server has started in 3000th port


currently we are hardcoding the port , instead lets move the port to the env so we can easily configure it 

```.env
PORT=3000
````

```index.ts
import express from "express"
import "dotenv/config"

let app = express();


app.get("/",(req,res)=>{
	 res.status(200).json({
		  message:"hello atoms!!"
	 })
})

app.listen(process.env.PORT,()=>{
  console.log("server started")
})
```
notice that we imported dotenv/config to get access to the process.env loading 
now lets rerun the server and see if it works 

# creating routers 

if we defined all our routes in one file that will just be difficult to maintain in the future so lets define the routes
in a seperate folder using express router 


```
src
|--routes
    |-index.ts
    |-authRoutes.ts
    |-userRoutes.ts
```

you could call them controllers or whatever i like it routes , and i also like to export the routers from each file then 
rexport them in index.ts file so that it can easily be imported by `import {authRoutes} from "./routes"` rather than individual file names
a fex extra steps for a bit of cleanliness 

each routes file will contain a router 


```ts

import express from "express"

let authRoutes = express.Router();

authRoutes.post("/signup",(req,res)=>{
  return res.json({
	  message:"work in progress"
  })
})

authRoutes.post("/signin",(req,res)=>{
  return res.json({
	 message:"work in progress"
  })
})

export {authRoutes}
```

they get imported and exported into the outer folders by routes/index.ts

```
import {authRoutes} from "./authRoutes"


export {authRoutes}
```

we import this in main.ts 

```

import express from "express"
import "dotenv/config"
import { authRoutes } from "./routes";

let app = express();

app.use(express.json())
app.use(authRoutes);

app.get("/",(req,res)=>{
...
})

app.listen(process.env.PORT,()=>{
})

```

and this is how we will structure all of our routes 

for my fellow hono users 
its app.route(); and there is no seperate router just create another app 

# lets authenticate 

before authentication we need schema validation 

schema validation is smth we want in almost all routes 
we can write our own middlewares to do this tasks 

lets create a middlewares folder to keep all our middlewares


```
src
|--routes
|-- middlewares
     |--
```

we are using zod for valdiating our end points lets just call it zodMiddleware 
or if we feel a bit formal smthn like schemaParserMiddleware
whatever floats your boat 


```ts
import { NextFunction, Request, Response } from "express";
import {z} from "zod"
function zodMiddleware(schema:z.ZodType){

return (req: Request, res: Response, next: NextFunction)=>{ 
          let result = schema.safeParse(req.body);
			 if(!result.success){
				 return res.status(400).json({
					 "success":false,
					 "errors":result.error.issues.flat()
				 })
			 }
			 req.body = result.data;
			 next();
	 }

}
export {zodMiddleware};
```


this is an example i wrote for express feel free to use this 
basically its using the factory pattern to create new middlewares when we attach them 

before that do run
`pnpm add zod`
to install zod 


## preparing auth schemas 
lets get our schemas ready i like to store them in a seperate folder named dtos
cause at the end of the day they are Data Transfer Objects 

```ts

import z from "zod"


let signUpDto = z.object({
  username: z.string().max(30).min(3),
  email:z.email(),
  password:z.string().min(8)
})

let signInDto = signUpDto.pick({
  email:true,
  password:true
})


export type SignUpDto= z.infer<typeof signUpDto>;
export type SignInDto = z.infer<typeof signInDto>;

export {signInDto,signUpDto}
```


and we can easily use it to any endpoint now 


```ts
import express from "express"
import {authService} from "../services"
import { signInDto, signUpDto } from "../dto/authDto";
import { zodMiddleware } from "../middlewares";


let authRouter = express.Router();

authRouter.post("/signup",zodMiddleware(signUpDto),(req,res)=>{
   authService.signUp(req.body); 
})

authRouter.get("/signin",zodMiddleware(signInDto),(req)=>{
  authService.signIn(req.body);
})

export {authRouter}
```


you can see i am jumping the gun and going towards services 
service layer is where our buisness logic lives to keep the controllers aka routes files organized 

we do this all the http related things such as response request parsing etc will be handled here 
business logic lives in teh service layer 
where we create services 



```
src
|-- dto
|-- routes
|-- middlewares
|-- services
```

this is how i like to structure my project 

now we get to hard authenication part there are two ways to do auth one is hand rolling it 
by using jwts bycrypt db this is something you should never do as its stupid and dangerous
works for small projects but too much of a headache to perform 
but u must know it neverthless so just keep them up 

## jwt middleware 

incase you are handlrolling install 

`pnpm add jsonwebtokens @types/jsonwebtokens`

so we get jwt 

```ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

	let authHeader = req.headers?.authorization?.split(" ");
	if (!authHeader) {
		return res.status(401).json({
			"success": false,
			"message": "authentication header not present"
		})
	}
	if (authHeader && authHeader[0] != "Bearer") {
		return res.status(401).json({
			"success": false,
			"message": "authenitcation header was not given, make sure Bearer <token> is present"
		})
	}
	let token = authHeader[1];

	try {
		let payload = jwt.verify(token, process.env.JWT_SECRET!);
		req.user = typeof payload != "string" ? payload : undefined;
	} catch (e) {
		return res.status(401).json({
			"success": false,
			"message": "authentication header is invalid"
		})
	}

	next();
}
```

keep this in the auth folder 
since it modifies the req payload we have to update express's type 

if you were using hono u could have just added it to context 

the way u do it, create another folder for cleanliness `types` and then extend type with express.d.ts

```ts
import { JwtPayload } from "jsonwebtoken";

declare global{
  namespace Express{
		interface Request {
        user?: JwtPayload
		}
  }

}
```
and there we go its done we have created a jwt middleware but our backend isnt done yet we need a 

we still have to set up our auth service 

before that we got something big to take care of our database 


# preparing database 

lets start our database by using a docker compose file so its easy to bring it up next time

```docker-compose.yaml
services:
  db:
    image: postgres:latest
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
```
and do docker compose up 

`docker-compose up -d`

add the database connection string to our env we need it later 


```
DATABASE_URL =postgres://<username>:<password>@<host>:<port>/<db-name>
```

since locally host = localhost or 127.0.0.1

do docker ps to see if your database is running 

`docker exec -it <container-name> bash` to enter bash shell 

then `psql -U <username> -d <database-name>`  to enter into psql shell 
do \dt see tables \db etc to see things 
even create tables if u want but the better approach is always to use schemas and migrations 


thats why we will use something like drizzle ORM 

## preparing ORM 
 
lets first install drizzle orm 

```
pnpm add drizzle-orm pg
```

well be using postgres driver by pg
and we will be using the drizzle-kit to make our migrations easier 

```
pnpm add --save-dev drizzle-kit
```

now we need to setup `drizzle.config.ts`
this is typically boiler plate stuff but its good to know 


```ts

import {defineConfig} from "drizzle-kit"
import "dotenv/config"

export default defineConfig({
   dialect:"postgresql",
   schema:"./src/db/schema.ts",
   out:"./migrations",
   dbCredentials:{
        url:process.env.DATABASE_URL!
   }
})
```

now we write our database schema in the db/schema.ts file we specified 

```ts
import { InferSelectModel } from "drizzle-orm";
import { InferInsertModel } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const usersTable = pgTable("user",{
  id:serial("id").primaryKey(),
  username:varchar("user_name").notNull(),
  password: varchar("password").notNull()
})

export type newUser = InferInsertModel<typeof usersTable>
export type User = InferSelectModel<typeof usersTable>

```

we gotta create a drizzle client which will be used to query our database
so we create `db/index.ts`

```ts

import {Pool} from "pg"
import "dotenv/config"
import {drizzle} from "drizzle-orm/node-postgres"

let pool = new Pool({
  connectionString:process.env.DATABASE_URL
})

export let db = drizzle(pool);
```

now we run `pnpm drizzle-kit push` to directly push our schema to database 
a better practice is to run 

`pnpm drizzle-kit generate` to generate a migration then 
apply `pnpm drizzle-kit push`


