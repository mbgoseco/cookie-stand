'use strict';

var storeLocations = [];

function Store(location, minCustPerHour, maxCustPerHour, avgCookiesPerCust) {
  this.location = location;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.custPerHour = [];
  this.cookiesPerHour = [];
  this.hoursOfOps = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
  this.dailyTotal = 0;

  storeLocations.push(this);
  this.render();
};

Store.prototype.genRandCustPerHour = function(min, max) {
  for(var i = 0; i < this.hoursOfOps.length; i++) {
    var randCust = Math.floor(Math.random() * (max - min + 1) + min);
    this.custPerHour.push(randCust);
  }
};

Store.prototype.genHourlySales = function() {
  this.genRandCustPerHour(this.minCustPerHour, this.maxCustPerHour);

  for(var i = 0; i < this.hoursOfOps.length; i++) {
    var perHour = Math.round(this.custPerHour[i] * this.avgCookiesPerCust);
    this.cookiesPerHour.push(perHour);
    this.dailyTotal += perHour;
  }
};

Store.prototype.render = function() {
  this.genHourlySales();
  console.log(this);

  // Store row construction and header
  var tblBodyEl = document.getElementById('tbl-body');
  var storeRowEl = document.createElement('tr');
  var storeHeadEl = document.createElement('th');
  storeHeadEl.textContent = this.location;
  storeRowEl.appendChild(storeHeadEl);
  // Hourly store data passed to row
  for(var i = 0; i < this.cookiesPerHour.length; i++) {
    var cookiesPerHourEl = document.createElement('td');
    cookiesPerHourEl.innerText = this.cookiesPerHour[i];
    console.log(this.cookiesPerHour[i]);
    storeRowEl.appendChild(cookiesPerHourEl);
  }
  // Store's daily total
  var dailyTotalEl = document.createElement('td');
  dailyTotalEl.innerText = this.dailyTotal;
  storeRowEl.appendChild(dailyTotalEl);
  tblBodyEl.appendChild(storeRowEl);

  // Rebuilding footer totals of ALL stores by hour and day in table footer after each new instance
  var removeFootTds = document.querySelectorAll('#tbl-foot td');
  for(var x = 0; x < removeFootTds.length; x++){
    removeFootTds[x].parentNode.removeChild(removeFootTds[x]);
  }
  var tfootEl = document.getElementById('tbl-foot');
  var storeTotalAllPerDay = 0;
  for(var j = 0; j < this.cookiesPerHour.length; j++) {
    var storeTotalAllPerHour = 0;
    for(var k = 0; k < storeLocations.length; k++) {
      storeTotalAllPerHour += storeLocations[k].cookiesPerHour[j];
    }
    storeTotalAllPerDay += storeTotalAllPerHour;
    var hourlyStoreTotalAllEl = document.createElement('td');
    hourlyStoreTotalAllEl.innerText = storeTotalAllPerHour;
    tfootEl.appendChild(hourlyStoreTotalAllEl);
  }
  var dailyStoreTotalAllEl = document.createElement('td');
  dailyStoreTotalAllEl.innerText = storeTotalAllPerDay;
  tfootEl.appendChild(dailyStoreTotalAllEl);

};

function createTable() {
  // This function is used to establish ONE SINGLE table in the DOM for us to work with when we start rendering individual rows for each Store
  var mainEl = document.getElementById('main-content');
  var tblEl = document.createElement('table');
  var theadEl = document.createElement('thead');
  var tbodyEl = document.createElement('tbody');
  var tfootEl = document.createElement('tfoot');
  var tableTitleEl = document.createElement('h2');

  tableTitleEl.textContent = 'Cookies Needed By Location Each Day';
  mainEl.appendChild(tableTitleEl);
  mainEl.appendChild(tblEl);
  tblEl.appendChild(theadEl);
  tblEl.appendChild(tbodyEl);
  tblEl.appendChild(tfootEl);

  tblEl.id = 'store-table';
  theadEl.id = 'tbl-head';
  tbodyEl.id = 'tbl-body';
  tfootEl.id = 'tbl-foot';
  tblEl.className = 'tbl';

  // Creating hour headers
  var cornerEl = document.createElement('th');
  cornerEl.textContent = ' ';
  theadEl.appendChild(cornerEl);
  var hoursOfOps = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
  for(var i = 0; i < hoursOfOps.length; i++) {
    var hourHeadEl = document.createElement('th');
    hourHeadEl.textContent = hoursOfOps[i];
    theadEl.appendChild(hourHeadEl);
  }
  // Creating daily total header
  var storeTotalHead = document.createElement('th');
  storeTotalHead.textContent = 'Daily Location Total';
  theadEl.appendChild(storeTotalHead);
  // Creating row header for hourly and daily total for ALL stores
  var hourTotalHead = document.createElement('th');
  hourTotalHead.id = 'total-foot';
  hourTotalHead.textContent = 'Totals';
  tfootEl.appendChild(hourTotalHead);
};

createTable();

new Store('First and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);