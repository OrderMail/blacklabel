#One-click Install Script for BlackLabel
#---------------------------------------

#Check for curl and install if not present
curlexists=`which curl|wc -c`
#echo "curlexists" $curlexists
if [ $curlexists -ge 0 ]
then
        echo "curl exists"
		else
		echo "Installing curl..."
		sudo apt-get install curl
fi

# Check for G++ and install if not present
gccexists=`which g++|wc -c`
#echo "gccexists" $gccexists
if [ $gccexists -ge 0 ]
then
        echo "g++ exists"
		else
		echo "Installing build essentials tools..."
		sudo apt-get update
		sudo apt-get install build-essential
fi


#Install Git
sudo apt-get install git
#Install Mongodb
sudo apt-get install mongodb
sudo rm /var/lib/mongodb/mongod.lock   
sudo -u mongodb mongod -f /etc/mongodb.conf --repair 
sudo service mongodb start

#Install Node and NPM
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
. ~/.bashrc
mkdir ~/local
mkdir ~/node-latest-install
cd ~/node-latest-install
curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
./configure --prefix=~/local
make install # ok, fine, this step probably takes more than 30 seconds...
curl -k -L https://www.npmjs.org/install.sh | bash
#For more details- https://gist.github.com/isaacs/579814

#Install Grunt
npm install -g grunt-cli

#Set up project
cd ~
git clone https://github.com/OrderMail/blacklabel.git
cd blacklabel
npm install
bower install
bower install boostrap
#test the server now
grunt


