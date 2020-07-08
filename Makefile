install:
	npm install

start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon --exec npx babel-node server/bin/slack.js

start-frontend:
	npx webpack-dev-server

build:
	rm -rf dist

test:
	npm test -s

test-coverage:
	npm test -- --coverage

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

deploy:
	git push heroku

fix:
	eslint --fix .

.PHONY: test
