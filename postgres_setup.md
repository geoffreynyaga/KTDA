
# SETUP

```bash
sudo apt-get update
sudo apt-get install python-dev libpq-dev postgresql postgresql-contrib
sudo apt install postgis postgresql-12-postgis-3 postgresql-12-postgis-3-scripts postgresql-client-12

sudo service postgresql start
sudo service postgresql status
```

```bash

sudo -u postgres psql
CREATE DATABASE ktda;
CREATE USER ktda_user WITH PASSWORD 'ktda_password';
ALTER ROLE ktda_user SET client_encoding TO 'utf8';
ALTER ROLE ktda_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE ktda_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE ktda TO ktda_user;

\q
```

```bash
sudo -i -u postgres;
psql -d ktda;
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_raster;
\q
exit
```

```bash
sudo systemctl enable postgresql
sudo systemctl start postgresql

```

```bash
sudo apt-get install software-properties-common
sudo apt-add-repository ppa:ubuntugis/ubuntugis-unstable
sudo apt-get update
sudo apt-get install libgdal-dev

sudo apt-get install binutils libproj-dev gdal-bin


export CPLUS_INCLUDE_PATH=/usr/include/gdal
export C_INCLUDE_PATH=/usr/include/gdal

pip install pygdal=="`gdal-config --version`.*"
```

``` bash
#weasyprint
apt install python3-pip libpango-1.0-0 libharfbuzz0b libpangoft2-1.0-0 libffi-dev libjpeg-dev libopenjp2-7-dev
```
