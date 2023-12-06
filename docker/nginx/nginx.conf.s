upstream loadbalancer {
# server HOST:PORT weight=5; Ejemplo con preferencia

server 192.168.0.248:3001;
server 192.168.0.248:3002;
server 192.168.0.248:3003;
server 192.168.0.248:3004;
}
server {
location / {
proxy_pass http://loadbalancer;
}}