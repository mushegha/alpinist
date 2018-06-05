dev:
	@docker-compose -f ./dev/docker-compose.yml up -d
	@sleep 1

stop:
	@docker-compose -f ./dev/docker-compose.yml stop
	@sleep 1

logs:
	@docker-compose --file dev/docker-compose.yml \
		logs --follow


.PHONY: dev
