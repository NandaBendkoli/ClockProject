// Get the DOM elements
const timeInput = document.getElementById('time');
const setAlarmButton = document.getElementById('set-alarm');
const stopAlarmButton = document.getElementById('stop-alarm');
const snoozeAlarmButton = document.getElementById('snooze-alarm');
const alarmSound = document.getElementById('alarm-sound');


// Function to play the alarm sound
function playAlarmSound() {
  alarmSound.play();
}

// Function to stop the alarm sound
function stopAlarmSound() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
}

// Function to set the alarm
function setAlarm() {
  // Get the current time and the alarm time
  const now = new Date();
  const alarmTime = new Date(now.toDateString() + ' ' + timeInput.value);

  // Check if the alarm time is in the past
  if (alarmTime < now) {
    alert('Please select time.');
    return;
  }

  // Get the time until the alarm goes off
  const timeUntilAlarm = alarmTime - now;

  // Set a timeout to play the alarm sound when the alarm time is reached
  setTimeout(playAlarmSound, timeUntilAlarm);

  // Disable the set alarm button
  setAlarmButton.disabled = true;

  // Enable the stop and snooze buttons
  stopAlarmButton.disabled = false;
  snoozeAlarmButton.disabled = false;


  // Set a timeout to stop the alarm sound after 10 seconds
  setTimeout(() => {
    stopAlarmSound();

    // Disable the stop and snooze buttons
    stopAlarmButton.disabled = true;
    snoozeAlarmButton.disabled = true;

 

    // Enable the set alarm button after the alarm time has passed
    setAlarmButton.disabled = false;
  }, timeUntilAlarm + 10000);
}

// Function to stop the alarm
function stopAlarm() {
  stopAlarmSound();

  // Disable the stop and snooze buttons
  stopAlarmButton.disabled = true;
  snoozeAlarmButton.disabled = true;

  
  // Enable the set alarm button
  setAlarmButton.disabled = false;
}

// Function to snooze the alarm
function snoozeAlarm() {
  stopAlarmSound();

  // Disable the stop and snooze buttons
  stopAlarmButton.disabled = true;
  snoozeAlarmButton.disabled = true;

  

  // Enable the set alarm button
  setAlarmButton.disabled = false;

  // Set a timeout to snooze the alarm for 5 minutes
  setTimeout(setAlarm, 300000);
}

// Add event listener to the set alarm button
setAlarmButton.addEventListener('click', setAlarm);

// Add event listener to the stop alarm button
stopAlarmButton.addEventListener('click', stopAlarm);

// Add event listener to the snooze alarm button
snoozeAlarmButton.addEventListener('click', snoozeAlarm);

// Add event listener to the alarm sound
alarmSound.addEventListener('loadedmetadata', function() {
  // Set the volume to 50%
  alarmSound.volume = 0.5;
});
