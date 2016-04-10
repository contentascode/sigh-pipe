import _ from 'lodash'
import Promise from 'bluebird'
import { Bacon } from 'sigh-core'
import Event from 'sigh/lib/Event'

import pipe from '../'

var assert = require('chai').assert

describe('sigh-pipe', () => {
  it('Does not modify data when used with "cat"', () => {
    var stream = Bacon.constant([ new Event({ path: 'src/test.js', type: 'add', data: 'hi!' }) ]);

    return pipe({ stream }, 'cat').toPromise(Promise).then(events => {
      assert.equal(events[0].data,'hi!')
    })

  })
})
