.PHONY: dev

dev:
		source $(HOME)/.nvm/nvm.sh ;\
		nvm use && yarn dev
