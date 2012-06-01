# Install

```
svn checkout http://closure-library.googlecode.com/svn/trunk/ closure-library
curl -O http://closure-compiler.googlecode.com/files/compiler-latest.zip
unzip compiler-latest.zip
git clone git@github.com:alaingilbert/jx.git
```

# Dependency file

```
./depswritter
```

# Lint

```
gjslint -r ./ --strict
```

# Compiling

```
./deploy
```
