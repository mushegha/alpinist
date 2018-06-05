### Install Docker 

Install Docker

```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt update

sudo apt install -y docker-ce
```

Setup root-less use

```sh
sudo usermod -aG docker ${USER}
```

Install docker-compose

```sh
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

### Setup services

Get source

```sh
git clone gitlab.com/dekanat/alpinist

cd alpinist
```

Acquire license for Lenses

- Register at <http://www.landoop.com/downloads/lenses/>
- Check email for license url

```sh
wget https://dl.lenses.stream/d/?id=YOUR_LICENSE_ID -O
containers/lenses/license.json
```

Boot up

```sh
docker-compose up
```

