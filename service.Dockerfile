FROM ubuntu
MAINTAINER Bradley Scott <bradley.scott@xero.com>

# Download wget
RUN apt-get update && apt-get install -y wget

# Download and Install Multichain
RUN cd /tmp \
	&& wget http://www.multichain.com/download/multichain-1.0-alpha-13.tar.gz \
	&& tar -xvzf multichain-1.0-alpha-13.tar.gz \
	&& cd multichain-1.0-alpha-13 && mv multichaind multichain-cli multichain-util /usr/local/bin

# Start the Multichain service
CMD multichaind bonusd

EXPOSE 6501
EXPOSE 6502

