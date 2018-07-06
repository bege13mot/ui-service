build:
	npm run build

run:
	npm start

dockerPush:
	docker build -t bege13mot/ui-service:latest .
	docker push bege13mot/ui-service:latest

deploy:
	helm upgrade --install ui-service deployment-chart
