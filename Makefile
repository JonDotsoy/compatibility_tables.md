build: build@esm build@types

build@esm:
	rm -rf ./lib/esm/
	bunx tsc --project tsconfig.esm.json --outdir ./lib/esm/
	echo '{ "type": "module" }' > ./lib/esm/package.json

build@types:
	rm -rf ./lib/types/
	bunx tsc --project tsconfig.types.json --outdir ./lib/types/
	echo '{ "type": "module" }' > ./lib/types/package.json
