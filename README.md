<img width="350" height="350" alt="posta-logo" src="https://github.com/user-attachments/assets/7d21cd19-e7be-4bc1-a72f-222d2b28e8ec" />

# Posta Social

This repo contains the frontend/backend code for my social media app "Posta Social"

# How to run locally

> [!NOTE]
> **NodeJS and NPM are required!**

**1. Enter a valid PostgreSQL Database URL in `/posta-api/.env --> DATABASE_URL` (the DB should be emtpy)**  
**2. Run `npx prisma migrate dev --name init` in `/posta-api`**  
**3. Run `node app.js` in "/posta-api" to start up the server**  
**4. Run `npm run dev` in "/posta-frontend" to start up the frontend**  
**5. You're done!**

If you are having issues with setting up the DB, please consult the [Prisma Postgres Starter Guide](https://www.prisma.io/docs/getting-started/quickstart-prismaPostgres).

## Features

### User related features
- Account creation
- Basic account customization
- User authentication via JWTs
- Follow/Unfollow functionality

### Profile related features
- Posts tab
- Followers/Following tab
- Comments tab
- Liked posts/comments tab

### Post related features
- Post/Comment creation
- Post/Comment deletion
- Post/Comment likes
- Post comments

### Notes
- JWTs/Cookies expire after 24 hours
- This is mainly a portfolio project
