FROM ubuntu
MAINTAINER Bradley Scott <bradley.scott@xero.com>

# Download wget
RUN apt-get update && apt-get install -y wget

# Download and Install Multichain
RUN cd /tmp \
	&& wget http://www.multichain.com/download/multichain-1.0-alpha-13.tar.gz \
	&& tar -xvzf multichain-1.0-alpha-13.tar.gz \
	&& cd multichain-1.0-alpha-13 && mv multichaind multichain-cli multichain-util /usr/local/bin

# Create and configure Blockchain
RUN multichain-util create bonusd \
	&& sed -i 's/anyone-can-connect = false/anyone-can-connect = true/g' /root/.multichain/bonusd/params.dat \
	&& sed -i 's/anyone-can-send = false/anyone-can-send = true/g' /root/.multichain/bonusd/params.dat \
	&& sed -i 's/anyone-can-receive = false/anyone-can-receive = true/g' /root/.multichain/bonusd/params.dat \
	&& sed -i 's/default-network-port = /default-network-port = 6501 #/g' /root/.multichain/bonusd/params.dat \
	&& sed -i 's/default-rpc-port /default-rpc-port = 6502 #/g' /root/.multichain/bonusd/params.dat

# Create volume for persistant storage
VOLUME /root/.multichain/bonusd
CMD echo "Storage container for bonusd"
