# Server Setup

./manage.py dumpdata --exclude auth.permission > db.json
./manage.py loaddata db.json

```bash
sudo apt update
sudo apt install python3-pip python3-dev python3-venv libpq-dev nginx curl zsh

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions


nano ~/.zshrc

plugins=( [plugins...] history zsh-syntax-highlighting zsh-autosuggestions)

alias sba="source venv/bin/activate"
alias rs="python3 manage.py runserver 0.0.0.0:8000"
alias migrate="python3 manage.py migrate"
alias makemigrations="python3 manage.py makemigrations"
alias collectstatic="python3 manage.py collectstatic"
alias resg="sudo systemctl restart gunicorn"


source ~/.zshrc


```

```bash
see postgres_setup.md

```

## Creating a Python Virtual Environment for your Project

```bash
sudo -H pip3 install --upgrade pip


cd /home/geoff/KTDA
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

```





```bash
sudo ufw allow 8000
python manage.py runserver 0.0.0.0:8000

python manage.py createsuperuser
python manage.py collectstatic
```

```bash
http://server_domain_or_IP:8000

```

```bashp
pip install gunicorn
gunicorn --bind 0.0.0.0:8000 KTDA.wsgi

```

```bash
deactivate
```

## Creating systemd Socket and Service Files for Gunicorn

```bash
sudo nano /etc/systemd/system/gunicorn.socket
```

```CONF
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/home/geoff/KTDA/gunicorn.sock

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
WorkingDirectory=/home/geoff/KTDA
ExecStart=/home/geoff/KTDA/venv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/home/geoff/KTDA/gunicorn.sock \
          KTDA.wsgi:application

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
sudo systemctl status gunicorn

```

```bash
sudo nano /etc/nginx/sites-available/KTDA
```

``` conf
server {
    listen 80;
    server_name 20.68.145.54;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/geoff/KTDA;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/geoff/KTDA/gunicorn.sock;
    }
}


```

```bash
sudo ln -s /etc/nginx/sites-available/KTDA /etc/nginx/sites-enabled

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

and the GeoServer will run on the following URL:
http://example.com/geoserver

