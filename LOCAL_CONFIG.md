# Local API Configuration

This project uses a local configuration system to handle changing IP addresses during local development.

## Setup

1. **Copy the example configuration:**
   ```bash
   cp _data/local_config.example.yml _data/local_config.yml
   ```

2. **Update your IP address:**
   Edit `_data/local_config.yml` and change the IP address to match your current network:
   ```yml
   local_api:
     ip_address: "192.168.1.105"  # Your current local IP
     port: "7071"
   ```

3. **Find your current IP address:**
   - **Mac/Linux:** `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - **Windows:** `ipconfig | findstr IPv4`
   - **Or check your router's admin panel**

## Usage

- **Local Development:** The API calls will use your configured IP address
- **Production/GitHub Pages:** Uses hardcoded production URLs automatically
- **No Build Issues:** GitHub Pages ignores the local config file safely

## Notes

- `_data/local_config.yml` is git-ignored, so your local IP won't be committed
- `_data/local_config.example.yml` is tracked as a template for other developers
- If no local config exists, it falls back to `192.168.1.100:7071`
- Production URLs remain hardcoded and don't need configuration

## When Moving Networks

Simply update the `ip_address` in `_data/local_config.yml` and restart your Jekyll server:

```bash
# Update the IP in _data/local_config.yml
# Then restart Jekyll
bundle exec jekyll serve
```