
# Project Setup Instructions

Follow the steps below to set up the project on your local environment.

---

## Prerequisites
1. **Node.js (v20)** - Ensure you have Node Version Manager (NVM) installed.
2. **PostgreSQL** - Ensure PostgreSQL is installed on your system.
3. **Google Places API Key** - Ensure you have access to the Google Cloud Console.
4. **Git** - Ensure Git is installed for cloning the repository.
5. **PM2** - For managing Node.js processes.
6. **Nginx or Apache** - For reverse proxy configuration.

---

## Step-by-Step Guide

### 1. Install Node.js (v20) Using NVM

Install NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm list-remote

```


Run the following commands to install Node.js v20:
```bash
nvm install v20.18.0
nvm list
nvm use v20.18.0
```
Verify the installation:
```bash
node -v
```

### 2. Install PostgreSQL and Create a Local Database
1. Install PostgreSQL:
   - **Ubuntu**:  
     ```bash
     sudo apt update
     sudo apt install postgresql postgresql-contrib
     ```
   - **Mac** (via Homebrew):  
     ```bash
     brew install postgresql
     ```

2. Start the PostgreSQL service:
   ```bash
   sudo service postgresql start
   ```
   
3. Access the PostgreSQL shell:
   ```bash
   sudo -u postgres psql
   ```

4. Create a new database:
   ```sql
   CREATE DATABASE my_database_name;
   CREATE USER my_user WITH PASSWORD 'my_password';
   GRANT ALL PRIVILEGES ON DATABASE my_database_name TO my_user;
   ```

### 3. Set Up Google Places API Key
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Enable the **Places API**:
   - Navigate to `APIs & Services > Library`.
   - Search for "Places API" and click `Enable`.
4. Create API credentials:
   - Navigate to `APIs & Services > Credentials`.
   - Click `Create Credentials` and choose `API Key`.
5. Copy the generated API key and add it to the `.env` file under `GOOGLE_PLACES_API_KEY`.

### 4. Clone the Git Project
Clone the repository to your local machine:
```bash
git clone <repository_url>
cd <project_directory>
```

### 5. Install Project Dependencies & Build the project
Install all required dependencies:
```bash
npm install

npm run build
```

### 6. Create `.env` File in project folder

Create and Update the `.env` file with your database and environment details:
   ```plaintext
   DATABASE_URL=postgres://my_user:my_password@localhost:5432/my_database_name
   NEXT_PUBLIC_GOOGLE_API_KEY=<your_google_places_api_key>
   ```

### 7. Setup Database 

We have to run the project's database migrations to create the table

```bash
npm run db:generate

npm run db:push
   ```

### 8. Install PM2 and Start the Project
1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```
2. Start the Next.js project using PM2:
   ```bash
   pm2 start npm --name "landcare-app" -- start
   ```
3. Check the PM2 process status:
   ```bash
   pm2 status
   ```

### 9. Add Admin/Login User 

For any new user, we have to insert through hitting the API

```bash
curl -X POST http://localhost:3000/api/v1.0/users/signup \
     -H "Content-Type: application/json" \
     -d '{"name": "AdminUser", "email": "admin@landcare.com", "password": "admin@1234*"}'
   ```


### 10. Connect Port with Domain Using Nginx or Apache
#### Configure Nginx
1. Install Nginx:
   ```bash
   sudo apt install nginx
   ```

2. Configure Nginx to proxy requests:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

   Add the following:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:<port>;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

#### [Or] Configure Apache
1. Install Apache:
   ```bash
   sudo apt install apache2
   ```

2. Enable proxy modules:
   ```bash
   sudo a2enmod proxy proxy_http
   ```

3. Configure the virtual host:
   ```bash
   sudo nano /etc/apache2/sites-available/000-default.conf
   ```

   Add the following:
   ```apache
   <VirtualHost *:80>
       ServerName yourdomain.com
       ProxyPass / http://localhost:<port>/
       ProxyPassReverse / http://localhost:<port>/
   </VirtualHost>
   ```

4. Restart Apache:
   ```bash
   sudo systemctl restart apache2
   ```

---

## Additional Resources
- [Node.js Documentation](https://nodejs.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Apache Documentation](https://httpd.apache.org/docs/)
- [Google Cloud Console](https://console.cloud.google.com/)
