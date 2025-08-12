
# Getting Started

```bash
git clone https://github.com/sebastianjnuwu/enem
```

```bash
cd enem/back-end
```

```bash
npm install
```

```bash
npx prisma migrate dev --name migrate --create-only
```

```bash
npm run start
```

## Configure environment variables

```env
# Node environment (development, production)
NODE_ENV=production

# Database connection string
DATABASE_URL="file:./db/dev.db"

# the port number where the server will run 
PORT=8080
```