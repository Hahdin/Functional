'use strict'

/**
 * Associate the value with the key in band
 * @param {object} band 
 * @param {string} key 
 * @param {string} value 
 */
const assoc = (band, key, value) => {
  let d = { ...band };
  d[key] = value;
  return d;
}
/**
 * Set Country key as Canada
 * @param {object} band 
 */
const setCanadaAsCountry = (band) => assoc(band, 'country', 'Canada');

/**
 * Removed '.' from the name field
 * @param {object} band 
 */
const stripPuncFromBand = (band) => assoc(band, 'name', band['name'].replace(/\./g, ''));

/**
 * Capitalize the first letter of each word in name field
 * @param {object} band 
 */
const capitalize = (band) => {
  let nameArray = band['name'].split(' ');//split names
  return assoc(band, 'name', combineStrings(nameArray));
}

/**
 * Capitalize all words in the array and return string.
 * @param {array} ar array of word(s)
 */
const combineStrings = (ar) => {
  let res = ar.map((text) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`);//capitalize each name
  let name = '';
  res.forEach(n => name += `${n} `);//put together again into string
  return name.trim();
}

/**
 * Pluck the keys you want out of the record
 * @param {array} keys Array of keys to extract
 */
const pluck = (keys) => (record) => keys.map(key => `${record[key]}`)

/**
 * Run the functions in the array against each band
 * @param {array} bands Array of band objects
 * @param {array} fcns Array of functions
 */
const pipeEach = (bands, fcns) => bands.map((band) => {
  fcns.forEach(fcn => band = fcn(band));//apply each function to the band object
  return band;
})

//the bands
let bands = [{ 'name': 'sunset rubdown', 'country': 'UK', 'active': false },
{ 'name': 'women', 'country': 'Germany', 'active': false },
{ 'name': 'a. silver. mt. zion', 'country': 'Spain', 'active': true }]

//make new bands array
let newBands = pipeEach(bands, [
  setCanadaAsCountry,
  stripPuncFromBand,
  capitalize,
  pluck(['name', 'country'])
]);
console.log('original, unmutated')
console.table(bands);
console.log('new bands')
console.table(newBands);