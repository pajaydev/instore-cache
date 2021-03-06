'use strict';

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const { ExpirableCache } = require('./index');

describe('test ExpirableCache', () => {

    let timer;
    beforeEach(() => {
        timer = sinon.useFakeTimers();
    });

    afterEach(() => {
        timer.restore();
    });

    it('test setting and getting values', () => {
        const expirableCache = new ExpirableCache();
        expirableCache.set('SAMPLE_KEY', "121241323qweerttyysdf");
        expirableCache.set('SAMPLE_KEY_EXPIRY', "121241323qweerttyysdf", 10);
    });

    it('test setting value without expiry', () => {
        const expirableCache = new ExpirableCache();
        expirableCache.set('SAMPLE_KEY', "121241323qweerttyysdf");
        expect(expirableCache.get('SAMPLE_KEY')).equals('121241323qweerttyysdf');
    });

    it('test setting value with expiry', () => {
        const expirableCache = new ExpirableCache();
        expirableCache.set('SAMPLE_KEY', "Sample121241323qweerttyysdf");
        expirableCache.set('SAMPLE_KEY_EXPIRY', "Expiry121241323qweerttyysdf", 500);
        expect(expirableCache.get('SAMPLE_KEY_EXPIRY')).equals('Expiry121241323qweerttyysdf');
        timer.tick(510);
        // after the cache expired.
        expect(expirableCache.get('SAMPLE_KEY')).equals('Sample121241323qweerttyysdf');
        expect(expirableCache.get('SAMPLE_KEY_EXPIRY')).equals(undefined);
    });

    it('test setting value with less expiry', () => {
        const expirableCache = new ExpirableCache();
        expirableCache.set('SAMPLE_KEY', "Sample121241323qweerttyysdf");
        expirableCache.set('SAMPLE_KEY_EXPIRY', "Expiry121241323qweerttyysdf", 700);
        expect(expirableCache.get('SAMPLE_KEY_EXPIRY')).equals('Expiry121241323qweerttyysdf');
        timer.tick(510);
        // after the cache expired.
        expect(expirableCache.get('SAMPLE_KEY')).equals('Sample121241323qweerttyysdf');
        expect(expirableCache.get('SAMPLE_KEY_EXPIRY')).equals('Expiry121241323qweerttyysdf');
        timer.tick(210);
        expect(expirableCache.get('SAMPLE_KEY_EXPIRY')).equals(undefined);
    });

    it('test expiry by setting globally', () => {
        const expirableCache = new ExpirableCache({ expireTime: 500 });
        expirableCache.set('SAMPLE_KEY', "Sample121241323qweerttyysdf");
        expect(expirableCache.get('SAMPLE_KEY')).equals('Sample121241323qweerttyysdf');
        timer.tick(510);
        // after the cache expired.
        expect(expirableCache.get('SAMPLE_KEY')).equals(undefined);
    });

    it('test calling the callback', () => {
        function _callback() { };
        const callbackSpy = sinon.spy(_callback)
        expect(callbackSpy.calledOnce).to.be.false;
        const expirableCache = new ExpirableCache({ expireTime: 500, callback: callbackSpy });
        expirableCache.set('SAMPLE_KEY', "Sample121241323qweerttyysdf");
        expect(expirableCache.get('SAMPLE_KEY')).equals('Sample121241323qweerttyysdf');
        timer.tick(510);
        // after the cache expired.
        expect(expirableCache.get('SAMPLE_KEY')).equals(undefined);
        expect(callbackSpy.calledOnce).to.be.true;
    });
});
