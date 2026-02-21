.PHONY: docker-build docker-run docker-stop docker-logs

IMAGE ?= pulse-dashboard:local
CONTAINER ?= pulse-dashboard
PORT ?= 8080
PULSE_API_BASE_URL ?=

docker-build:
	docker build -t $(IMAGE) .

docker-run: docker-stop
	@if [ -n "$(PULSE_API_BASE_URL)" ]; then \
		echo "Starting $(CONTAINER) on :$(PORT) with PULSE_API_BASE_URL=$(PULSE_API_BASE_URL)"; \
		docker run -d --name $(CONTAINER) -p $(PORT):8080 -e PULSE_API_BASE_URL="$(PULSE_API_BASE_URL)" $(IMAGE); \
	else \
		echo "Starting $(CONTAINER) on :$(PORT)"; \
		docker run -d --name $(CONTAINER) -p $(PORT):8080 $(IMAGE); \
	fi

docker-stop:
	-@docker rm -f $(CONTAINER) >/dev/null 2>&1 || true

docker-logs:
	docker logs -f $(CONTAINER)
