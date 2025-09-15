#!/bin/bash

# Helper script to update local IP address configuration
# Usage: ./update_local_ip.sh [IP_ADDRESS]

IP_ADDRESS=$1
CONFIG_FILE="_data/local_config.yml"

if [ -z "$IP_ADDRESS" ]; then
    echo "Usage: $0 <IP_ADDRESS>"
    echo ""
    echo "Example: $0 192.168.1.105"
    echo ""
    echo "Current local IPs found on this machine:"
    if command -v ifconfig > /dev/null; then
        ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print "  " $2}'
    elif command -v ip > /dev/null; then
        ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print "  " $2}' | cut -d/ -f1
    else
        echo "  Could not detect network interfaces"
    fi
    echo ""
    exit 1
fi

# Validate IP format
if [[ ! $IP_ADDRESS =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
    echo "Error: Invalid IP address format. Expected format: xxx.xxx.xxx.xxx"
    exit 1
fi

# Create config file if it doesn't exist
if [ ! -f "$CONFIG_FILE" ]; then
    echo "Creating $CONFIG_FILE..."
    cat > "$CONFIG_FILE" << EOF
# Local configuration - this file is ignored by git
# Update the IP address below to match your current local network

local_api:
  ip_address: "$IP_ADDRESS"
  port: "7071"
EOF
else
    # Update existing file
    sed -i.bak "s/ip_address: \".*\"/ip_address: \"$IP_ADDRESS\"/" "$CONFIG_FILE" && rm "$CONFIG_FILE.bak"
fi

echo "✅ Updated local IP address to: $IP_ADDRESS"
echo "📝 Config file: $CONFIG_FILE"
echo "🔄 Restart your Jekyll server to apply changes:"
echo "   bundle exec jekyll serve --host 0.0.0.0"