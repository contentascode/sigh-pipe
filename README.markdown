# sigh-pipe

[![Build Status](https://travis-ci.org/contentascode/sigh-pipe.svg?branch=master)](https://travis-ci.org/contentascode/sigh-pipe)

Sigh plugin to pipe events through a shell command

## Example

`npm install --save-dev sigh-pipe` then add something like this to your `sigh.js`:
```javascript
  pipelines['build-hercule'] = [
    merge(
      glob({ basePath: 'content' }, '**/*.*')
    ),
    debounce(500),
    pipe('cat')
  ]
```

This will pipe everyfile through the unix `cat` command which is basically not doing anything to any file. 