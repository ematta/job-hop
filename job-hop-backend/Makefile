migrate:
	@-source .venv/bin/activate && python -m src.scripts.migrate ${COMMAND}

.PHONY: migrate-init
migrate-init:
	$(MAKE) migrate COMMAND="init"

.PHONY: migrate-drop
migrate-drop:
	$(MAKE) migrate COMMAND="drop"

.PHONY: sync
sync:
	$(MAKE) migrate COMMAND="sync"
