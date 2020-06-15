import { strictEqual as equal } from 'assert'
import fetch from 'node-fetch'
import DOMParser from 'dom-parser'

import {
  instance,
  isObject,
  isString,
  isNumber,
} from '../jsweb-packs/unpkg/truetype.js'
import * as asyncs from './index.js'

// Fetch API
Object.defineProperty(global, 'fetch', { value: fetch })

// FormData Mock
class FormData {
  #data = {}
  append(key, val) {
    this.#data[key] = val
  }
}
Object.defineProperty(global, 'FormData', { value: FormData })

// DOMParser
Object.defineProperty(global, 'DOMParser', { value: DOMParser })

const P = 'Promise'
const I = 'Immediate'

const fnNoArgs = () => null
const fnWithArgs = (...args) => args.join(',')
const tasks = [1, fnWithArgs(2, 3), asyncs.exec(fnNoArgs)]

const html = 'https://unpkg.com/'
const json = 'https://unpkg.com/@jsweb/asyncs/package.json'

describe('@jsweb/asyncs', () => {
  describe('exec(fn, ...args)', () => {
    it(`should return a ${P}`, () => {
      const p1 = asyncs.exec(fnNoArgs)
      const p2 = asyncs.exec(fnWithArgs, 1, 2, 3)
      equal(instance(p1), P)
      equal(instance(p2), P)
    })
  })

  describe('asap(fn, ...args)', () => {
    it('should async execute "fn(...args)", As Soon As Possible', () => {
      const asap1 = asyncs.asap(fnNoArgs)
      const asap2 = asyncs.asap(fnWithArgs, 1, 2, 3)
      equal(instance(asap1), I)
      equal(instance(asap2), I)
    })
  })

  describe('task(any)', () => {
    it(`should return a ${P}`, () => {
      const prom = asyncs.task('msg')
      equal(instance(prom), P)
    })
  })

  describe('execAll([])', () => {
    it(`should return a ${P}.all`, () => {
      const all = asyncs.execAll(tasks)
      equal(instance(all), P)
    })
  })

  describe('execRace([])', () => {
    it(`should return a ${P}.race`, () => {
      const race = asyncs.execRace(tasks)
      equal(instance(race), P)
    })
  })

  describe('request(url)', () => {
    it(`should execute HTTP fetch and return a ${P}`, () => {
      const req = asyncs.request(html)
      equal(instance(req), P)
    })
  })

  describe('requestAll(url)', () => {
    it(`should execute requests and return a ${P}.all`, () => {
      const req = asyncs.requestAll([html, json])
      equal(instance(req), P)
    })
  })

  describe('requestRace(url)', () => {
    it(`should execute requests and return a ${P}.race`, () => {
      const req = asyncs.requestRace([html, json])
      equal(instance(req), P)
    })
  })

  describe('requestJSON', () => {
    it(`should execute a request and return a ${P}`, () => {
      const req = asyncs.requestJSON(json)
      equal(instance(req), P)
    })

    it(`should parse result as JSON`, async () => {
      const resp = await asyncs.requestJSON(json)
      equal(isObject(resp), true)
    })
  })

  describe('requestText', () => {
    it(`should execute a request and return a ${P}`, () => {
      const req = asyncs.requestText(html)
      equal(instance(req), P)
    })

    it(`should parse result as text`, async () => {
      const resp = await asyncs.requestText(html)
      equal(isString(resp), true)
    })
  })

  describe('requestBlob', () => {
    it(`should execute a request and return a ${P}`, () => {
      const req = asyncs.requestBlob(json)
      equal(instance(req), P)
    })

    it(`should parse result as blob`, async () => {
      const resp = await asyncs.requestBlob(json)
      equal(instance(resp), 'Blob')
    })
  })

  describe('requestBoolean', () => {
    it(`should execute a request and return a ${P}`, () => {
      const req = asyncs.requestBoolean(json)
      equal(instance(req), P)
    })

    it(`should parse result as boolean`, async () => {
      const resp = await asyncs.requestBoolean(json)
      equal(resp, true)
    })
  })

  describe('requestNumber', () => {
    it(`should execute a request and return a ${P}`, () => {
      const req = asyncs.requestNumber(json)
      equal(instance(req), P)
    })

    it(`should parse result as number`, async () => {
      const resp = await asyncs.requestNumber(json)
      equal(isNumber(resp), true)
    })
  })

  describe('requestXML', () => {
    it(`should execute a request and return a ${P}`, () => {
      const req = asyncs.requestXML(html)
      equal(instance(req), P)
    })

    it(`should parse result as XML Dom`, async () => {
      const resp = await asyncs.requestXML(html)
      equal(instance(resp), 'Dom')
    })
  })

  describe('requestHTML', () => {
    it(`should execute a request and return a ${P}`, () => {
      const req = asyncs.requestHTML(html)
      equal(instance(req), P)
    })

    it(`should parse result as HTML Dom`, async () => {
      const resp = await asyncs.requestHTML(html)
      equal(instance(resp), 'Dom')
    })
  })
})
