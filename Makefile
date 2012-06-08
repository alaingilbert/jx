test:
	mocha test

test-cov:
	mocha test -R html-cov > coverage.html

lib-cov:
	jscoverage --no-highlight lib lib-cov

.PHONY: site test
