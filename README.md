# Social media practice as Twitter clone with Typescript, nextJs, prisma, mongoDB, nextAuth and deploy through vercel

live address at:

(Do not use project name with any words like twitter or other famous website's name while deploy through vercel, which will leads to the website be warned as fishing website.)

---

Initialise:

npx create-next-app --typescript
=> Eslint "Yes" => tailwind "Yes" => src directory "No" => experimental app directory "No" => import alias ->press enter

---

Other packages to install:

npm install react-icons zustand bcrypt next-auth @next-auth/prisma-adapter swr axios => npm install -D @types/bcrypt => npm install react-hot-toast => npm install react-spinners date-fns

=> npm install -D prisma => npx prisma init => write model format inside "shema.prisma" file and then run => npx prisma db push => to publish shema inside mongodb => npm install @prisma/client

---

Steps:

=> Layout: main pages layout and sidebar items, logo, icons

=> login or sign up modal

=> link with prisma and mongodb and setup next auth, homepage can be public for everyone, but notification and profile page need to be login before open it. so click those two button to open login modal if there's no current user logged in.

=> Users and single user profile: 1.create pages and async function handler to find users and followersCount; 2. add hook as userUsers.ts and fetch users data, and also another hook as useSpecificUser.ts to get single user data; 3. add Avatar details and profile page(create "users" folder under "pages" to and "[userId].tsx" to show user profile);

=> user to edit personal profile
