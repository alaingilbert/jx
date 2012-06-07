# Install

```
svn checkout http://closure-library.googlecode.com/svn/trunk/ closure-library
curl -O http://closure-compiler.googlecode.com/files/compiler-latest.zip
unzip compiler-latest.zip
git clone git@github.com:alaingilbert/jx.git project
```

# Dependency file

```
./bin/depswritter
```

# Lint

```
sudo easy_install http://closure-linter.googlecode.com/files/closure_linter-latest.tar.gz
```


```
gjslint -r ./lib/ --strict
```

# Compiling

```
./bin/deploy
```
