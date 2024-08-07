# Server Setup

```bash
sudo apt update
sudo apt install python3-pip python3-dev python3-venv libpq-dev nginx curl
```

```bash
see postgres_setup.md

```

## Creating a Python Virtual Environment for your Project

```bash
sudo -H pip3 install --upgrade pip


cd /home/geoff/Bursary
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

```

```bash
. . .
# The simplest case: just add the domain name(s) and IP addresses of your Django server
# ALLOWED_HOSTS = [ 'example.com', '203.0.113.5']
# To respond to 'example.com' and any subdomains, start the domain with a dot
# ALLOWED_HOSTS = ['.example.com', '203.0.113.5']
ALLOWED_HOSTS = ['your_server_domain_or_IP', 'second_domain_or_IP', . . ., 'localhost']

```

```bash
python manage.py migrate
python manage.py runserver
python manage.py createsuperuser
python manage.py collectstatic
```

```bash
- from gis
sudo apt install openssh-server
sudo systemctl status ssh

sudo ufw enable
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow 8080
sudo ufw allow 8000
sudo ufw allow from any to any port 80

sudo ufw status
```

```bash
from gis

1. Basic server setup
2. Installation of essential tools
3. PostGIS database setup
4. Geoserver installation
5. Django project implementation
6. Nginx and gunicorn configuration

sudo apt update
sudo apt upgrade

# Installation of gdal
sudo apt install -y gdal-bin libgdal-dev libgeos-dev libproj-dev





```bash
sudo ufw allow 8000
python manage.py runserver 0.0.0.0:8000
```

```bash
http://server_domain_or_IP:8000

```

```bashp
pip install gunicorn
gunicorn --bind 0.0.0.0:8000 BursaryMashinani.wsgi

```

```bash
deactivate
```

## Creating systemd Socket and Service Files for Gunicorn

```bash
sudo nano /etc/systemd/system/gunicorn.socket
```

```nano
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/home/geoff/Bursary-Mashinani/gunicorn.sock

[Install]
WantedBy=sockets.target
```

```bash
sudo nano /etc/systemd/system/gunicorn.service
```

```bash
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target

[Service]
User=geoff
Group=www-data
WorkingDirectory=/home/geoff/Bursary-Mashinani
ExecStart=/home/geoff/Bursary-Mashinani/venv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/home/geoff/Bursary-Mashinani/gunicorn.sock \
          Bursary.wsgi:application

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
sudo systemctl status gunicorn.socket

```

```bash
sudo journalctl -u gunicorn.socket
sudo systemctl status gunicorn
sudo journalctl -u gunicorn

```

```bash
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
```

```bash
sudo nano /etc/nginx/sites-available/Bursary
```

```
server {
    listen 80;
    server_name 20.90.102.57;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/geoff/Bursary-Mashinani;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/geoff/Bursary-Mashinani/gunicorn.sock;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/Bursary /etc/nginx/sites-enabled

```

```bash
sudo rm -rf /etc/nginx/sites-available/default
sudo rm -rf /etc/nginx/sites-enabled/default
```

```bash
sudo nginx -t
```

```bash
sudo systemctl restart nginx
```

Finally, we need to open up our firewall to normal traffic on port 80. Since we no longer need access to the development server, we can remove the rule to open port 8000 as well:

```bash
sudo ufw delete allow 8000
sudo ufw allow 'Nginx Full'
```

http://example.com

