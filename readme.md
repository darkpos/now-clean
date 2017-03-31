# now-clean

Helps you automate [now](https://zeit.co/now) deployments.

Removes/deletes/cleans/purges stale now deployments; a stale deployment is all deployments except the last one.

## Install

```sh
npm install now-clean -g
```

## List all deployments for all apps and mark those to be removed:

```sh
now-clean
```

## List all deployments for a specific app and mark those to be removed:

```sh
now-clean -n my-dark-app
```

## Remove all stale deployments for all apps:

```sh
now-clean -r
```

## Arguments

Run `now-clean` on the command-line with -h and you will see:

```
-t  --token
  (will use your local one like the now cli, if available)

-n  --name
  (my-dark-app)

-r  --remove
  (will remove the marked deployments)
```
