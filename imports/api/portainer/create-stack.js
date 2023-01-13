export default async function createRasaStack({ name }) {
    const dockerComposeFile = `
version: "3.9"
networks:
  private:
  dbinterface:
    external: true
    name: common_dbinterface
  common:
    external: true
    name: common_public
  ingress:
    external: true
    name: traefik_net
  cms:
    external: true
    name: common_cms
 
volumes:
  rasa_data:
  rasa_actions_data:
  filebrowser_data:

services:
  filebrowser:
    image: hurlenko/filebrowser
    labels:
      com.docker.stack.service.path: ""
      traefik.enable: "true"
    environment:
      FB_BASEURL: "/${name}"
    volumes:
      #- rasa_data:/data/${name}_rasa_models
      - rasa_actions_data:/data
      - filebrowser_data:/config
    networks:
      - ingress
      
  setup:
    image: alpine:latest
    volumes:
      - rasa_data:/rasa/models
      - rasa_actions_data:/rasa/actions
    command: 'chown --recursive 1001 /rasa'
    
  actions:
    image: alexanderditzend/actionserver:2.0.0
    networks:
      - private
      - dbinterface
      - cms
    volumes:
      - rasa_actions_data:/app/actions

    command:
      - start
      - --debug
      - --actions
      - actions
    environment:
      BF_URL: http://bottrainer:3000/graphql
      CMS_API_URL: http://cms:8055
      DB_API_URL: http://dbinterface:3333}
      EMAIL_API_URL: ACTIONS_EMAIL_API_URL
      EMAIL_FROM: ACTIONS_EMAIL_FROM
      EMAIL_API_KEY: ACTIONS_EMAIL_API_KEY
      TIMEZONE: America/Argentina/Buenos_Aires
      VOICEBOT_API_URL: 
        
  rasa:
    image: botfront/rasa-for-botfront:v2.3.3-bf.3
    labels:
      traefik.enable: "true"
      traefik.http.routers.${name}-router.rule: PathPrefix('/${name}/rasa')
      traefik.http.routers.${name}-router.middlewares: ${name}-sp
      traefik.http.middlewares.${name}-sp.stripprefix.prefixes: /${name}/rasa
    networks:
      - private
      - common
      - ingress
    ports:
      - :5005
    volumes:
      - rasa_data:/app/models
    environment:
      - BF_PROJECT_ID={{ index .Service.Labels 'com.docker.stack.namespace'}}
      - BF_URL=http://bottrainer:3000/graphql
      - AUGMENTATION_FACTOR=50
      - MONGO_URL=mongodb://mongo:27017/bt}
      `;
    console.log('Creating stack', dockerComposeFile);
}
