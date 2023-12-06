version: "3"
services:
  vue_production_build:
    container_name: vue_prod
    image: httpd:latest
    ports:
      - 2999:80
    volumes:
      - ../frontend--check/dist:/usr/local/apache2/htdocs

  node_server_1:
    container_name: node-1
    build:
      context: ../backend
      dockerfile: Dockerfile.dev
    ports:
      - "3001:5500"
    volumes:
      - ../backend:/usr/app/
    networks:
      front-tier:
        ipv4_address: 10.10.10.10

  node_server_2:
    container_name: node-2
    build:
      context: ../backend
      dockerfile: Dockerfile.dev
    ports:
      - "3002:5500"
    volumes:
      - ../backend:/usr/app/
    networks:
      front-tier:
        ipv4_address: 10.10.10.11

  node_server_3:
    container_name: node-3
    build:
      context: ../backend
      dockerfile: Dockerfile.dev
    ports:
      - "3003:5500"
    volumes:
      - ../backend:/usr/app/
    networks:
      front-tier:
        ipv4_address: 10.10.10.12

  node_server_4:
    container_name: node-4
    build:
      context: ../backend
      dockerfile: Dockerfile.dev
    ports:
      - "3004:5500"
    volumes:
      - ../backend:/usr/app/
    networks:
      front-tier:
        ipv4_address: 10.10.10.13

  redis:
    image: redis
    container_name: redis
    # restart: always
    volumes:
      - redis_volume_data:/data
    ports:
      - 6379:6379
    networks:
      front-tier:
        ipv4_address: 10.10.10.3

  mongo:
    image: mongo:4.4.26
    # restart: always
    ports:
      - 27017:27017
    networks:
      front-tier:
        ipv4_address: 10.10.10.4
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password

  nginx:
    build: ./nginx
    ports:
      - "3000:80"
    networks:
      front-tier:
        ipv4_address: 10.10.10.5
    depends_on:
      - node_server_1
      - node_server_2

networks:
  front-tier:
    ipam:
      driver: default
      config:
        - subnet: "10.10.10.0/24"

volumes:
  redis_volume_data:
