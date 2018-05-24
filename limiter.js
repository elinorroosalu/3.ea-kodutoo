// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';


chrome.alarms.onAlarm.addListener(function() {
    chrome.storage.sync.get(['reason'], function(item) {
    let icon = 'stopwatchlarge.png';
    let text = item.reason;
    let title = 'Got to go!';
    let options = {
      body: text,
      icon: icon,
    }
    let notification = new Notification(title, options);
    let alarmSound = new Audio();
    alarmSound.src = "sound.wav";
    alarmSound.play();
    chrome.browserAction.setBadgeText({text: ''});
  });
});


chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: item.minutes});
  });
});
