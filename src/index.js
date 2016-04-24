import _ from 'lodash'
import Promise from 'bluebird'
import path from 'path'
import { Bacon } from 'sigh-core'
import { mapEvents } from 'sigh-core/lib/stream'

export default function(op, cmd) {
  return mapEvents(op.stream, function(event) {
    if (event.type !== 'add' && event.type !== 'change')
      return event

    // console.log(event.type + ": " + event.path)
    // console.log(path.dirname(event.path))

    var pipe = function(cmd, evt) { 
      return new Promise(function(resolve, reject) {
        var bufs = [];
        var spawn = require('child_process').spawn;
        var child = spawn(cmd, [], {cwd: path.dirname(event.path)});

        child.stdin.write(evt.data)
        child.stdin.end()
        // child.stdout.pipe(process.stdout)

        child.stdout.on('data', function(d){ bufs.push(d);});
        child.stderr.on('data', reject);

        child.on('close', (code, signal) => {
          var output = Buffer.concat(bufs).toString();
          resolve(_.set(evt, 'data', output))
        });
        
      });
    }

    return pipe(cmd, event)
  })
}
