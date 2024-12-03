# SIS++ Class Selection System

[![codecov](https://codecov.io/github/SWEN-746-Group-1/SIS-Plus-Plus/graph/badge.svg?token=MA1PYH0M67)](https://codecov.io/github/SWEN-746-Group-1/SIS-Plus-Plus)

Design Docs are in [docs/README.md](docs/README.md)

## Team Information

-   Team name: 0++
-   Team members
    -   Daniel Arcega
    -   Dan Corcoran
    -   Reid Taylor
    -   Ryan Yocum

## Executive Summary

RIT's SIS (Student Information System) has a reputation among students and staff alike of being slow, clunky, and confusing. It has a large range of uses, including enrolling in courses, viewing grades, tracking program progress, and managing personal information. The scope of the system as a whole is too large for a team of four to tackle in a few months, so we have selected course enrollment and related activities to focus on, as it is the most common reason students find themselves using this software.

Our main goals are to streamline the current workflow for enrollment by providing relevant information in a clear way, and minimizing the number of actions needed to a few intuitive steps. We plan to introduce features that directly connect the program requirements and progress to the enrollment system as well as enabling students to make more informed choices about the courses the enroll in.

## Development Stack
* [Node.js](https://nodejs.org/en)
* [Next.js 14](https://nextjs.org/docs/14/getting-started)
* PostgreSQL
* [NextAuth 5](https://authjs.dev/) (For handling auth/sessions)
* [Prisma](https://www.prisma.io/docs/getting-started) (Database ORM)
* [Shadcn UI](https://ui.shadcn.com/) (UI Component Library. Basically just a bunch of premade components, but customizable)
* [Tailwind CSS](https://tailwindcss.com/) (Basically CSS but utility classes)

### Setup
1. Clone repo 
```bash
git clone git@github.com:SWEN-746-Group-1/SIS-Plus-Plus.git # SSH, need to have keys setup
git clone https://github.com/SWEN-746-Group-1/SIS-Plus-Plus.git # HTTP
```

2.  Install dependencies
```bash
npm install
```

3. Ensure you have PostgreSQL and PgAdmin (management tool for PostgresSQL) installed and running. Create a user (give it superuser access otherwise Prisma will complain in a dev environment). Create a database then with the user as the owner

4. Copy the `.env.example` to `.env` and modify to your needs. The database url will need to be changed to match what you created in the previous step.
5. Start the development server. You should be able to see the app on port 3000.
```bash
npm run dev
```

## Development Flow
This app should be built Database up, as that is the issues we encountered the first time. Start with how you would model it in a SQL data, create a database schema for it, then create the page logic for it.
The main git branch is blocked by default. When you are done, create a PR against main. There is a GitHub Actions CI to ensure the application builds. If the build passes, you can merge it, otherwise, the merge will be blocked.

## Some intro to the dev stack

### DB Schema (Prisma)
The database schema is contained in the `prisma/schema.prisma` file. A basic model looks like this
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  role    Role     @default(USER)
  posts   Post[]
  profile Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique
}

model Post {
  id         Int        @id @default(autoincrement())
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
  title      String
  published  Boolean    @default(false)
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int
  categories Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]
}

enum Role {
  USER
  ADMIN
}
```

Don't worry about the datasource or the generator, those won't change. Each model is a table. You have the name, the type, and then any extra flags, such as defaults, relations, unique, etc, which are defined with an @ symbol. Fields can also be relations to other tables. For more information on how to define a schema, go take a look at [the documentation.](https://www.prisma.io/docs/orm/prisma-schema/data-model/models) They've got some really good examples with some diagrams to show how the relations work.

You might ask why? This is also in the docs, but lets say we have data structure above, and we want to create a user, with a post, and create some categories for the post. With normal ORM's, that is multiple operations, but in Prisma, you can do it in just one:
```ts
const user = await prisma.user.create({
  data: {
    email: 'ariadne@prisma.io',
    name: 'Ariadne',
    posts: {
      create: [
        {
          title: 'My first day at Prisma',
          categories: {
            create: {
              name: 'Office',
            },
          },
        },
        {
          title: 'How to connect to a SQLite database',
          categories: {
            create: [{ name: 'Databases' }, { name: 'Tutorials' }],
          },
        },
      ],
    },
  },
})
```
Prisma also generates its client after you migrate the database, meaning you get full typescript support in these operations.

### Next.js ([Docs](https://nextjs.org/docs/14/getting-started/installation))
Next.js is defined as a full stack framework. It uses React for development, but also has access to backend operations, such as database queries. First, lets talk about how the split between Server and Client works.
#### Client vs Server
Next.js has 2 different types of components, Server Components, and Client Components. The difference, is that Server Components are rendered on the server, and have access to anything on the backend, such as the database, etc. By default, any component that is not explicitly defined as a client component is a server component. This is to ensure your app is as efficient and secure as it can be. There are a few features you miss out though with server components, the largest being `onClick` handlers. Because `onClick` runs in the browser, it is incompatible with server components. An alternative if you need this functionality in a server component is to use a form.
```jsx
<form action={async () => {
	"use server"
	// run some function
}}>
{/* Rest of form */}
<button>Submit</button>
</form>
```
This method submits an HTTP form instead, and runs the action function on the backend. Overall though, if server components are possible, they should be used by default. They are good for non-interactive elements of a page.

There are some reasons though that  server components cannot be used. Anything that is heavily reliant on frontend javascript, such as animations, such as the current application's sidebar pretty much is required to be a client component. These are defined by using `"use client"` at the top of the file. Do be aware that once a client component, all children are also client components. It is essentially a boundary, and anything under will be client rendered. Here you can use `onClick` handlers and every other frontend JS react function you normally would. Now, how do we access server resources from a client component. One example is logging in from a button on the sidebar. We can actually use a similar approach to above

`Client Component`
```jsx
<form action={actionFunc}>
{/* Rest of form */}
<button>Submit</button>
</form>
```

`Actions`
```ts
'use server'
 
export async function actionFunc() {
	{/* Some backend function */}
}
```

The only difference, is that the actionFunc must be defined elsewhere. These functions can be defined and imported from another file, or even passed down as props

#### Routing
All routes are defined in the `app` directory in the `src` folder. The folder structure defines the path, and within that path a few files can determine how the page looks:
* layout.tsx - The layout. This is independent of routes, and effects everything underneath unless it was overridden by another layout later in the directory structure
* page.tsx - What the page looks like. This component is a child of layout.tsx. It will appear wherever {children} is inside of the layout. This is specific to a route.

There are way more, these are the basics to get started. Look [here](https://nextjs.org/docs/14/app/building-your-application/routing) for more info.

#### Rendering
This section really only applies to server components.

Server components can be rendered 2 different ways. Statically at build time, or dynamically at runtime. By default Next.js tries to statically generate all server components, unless you either manually opt out, explicitly not cache requests, or use a dynamic function as defined [here](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components).

There is many more to Next.js, I can't explain it all here, but feel free to ask questions, or consult the [docs](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components), [google](https://www.google.com/), [chatgpt](https://chatgpt.com/), or your other favorite way to gather information.

### Next Auth ([Docs](https://authjs.dev/getting-started/installation))
Next Auth essentially manages sessions, user tokens, credential providers, all that for you. You can read the docs or ask if you want more info, but there are only a few things of note, mostly with integration of it.

There are 2 places to import packages from, `lib/auth.ts` and `next-auth/react`, with 2 distinct key differences.
* lib/auth.ts - Only backend calls can go here. You can't call this from a client component. Here is a basic example on how to use it.
```ts
const { data: session } =  await  auth(); // Gets info about current logged in user
signIn('whateverprovideryouuse') // Signs the user in
signOut() // Signs the user out
```
* next-auth/react - For frontend calls. Uses hooks. Don't call from a server component.
```ts
const { data: session } =  useSession(); // Gets info about current logged in user
signIn('whateverprovideryouuse') // Signs the user in
signOut() // Signs the user out
```

The only difference is one uses hooks and one doesn't. They look similar don't swap them by accident.

### shadcn/ui ([Docs](https://ui.shadcn.com/))
This is a component library, very heavily integrates into Next.js. You have to install the components. This is because it reduces the dependency on this library. Once you install them, you will see them appear in the components/ui folder, available for you to see, edit, and change if needed. This allows flexibility if you need some action on a component they provide, that would be impossible without otherwise changing their library. The docs are pretty good, just install, and use based on their guide. I would just look at the docs if you plan on using any of them.

The only thing worth note, is that there are a few utility classes defined (go look at the globals.css file) for colors.
* primary
* secondary
* accent
* ... a few more i forgot

Essentially, you can use them in a tailwind css fashion with something like
```jsx
<p className="text-primary"></p>
```
This will set the text color to the primary theme color, in our case orange, keeps the colors all standard, so prefer using one of the predefined colors.
### Tailwind CSS ([Docs](https://ui.shadcn.com/))
Not gonna spend too long on this, if you know css, you know tailwind. They have classes for every CSS3 feature. If you don't know the class go google it and it usually shows up on their docs


Hopefully these docs are enough to get you started, lets get this done!!
